/**
 * Create Product Transaction
 * @param {org.sopb.mynetwork.EnrollProduct} productData
 * @transaction
 */

function enrollProduct(productData) {

    // Get the Asset Registry

  return getAssetRegistry('org.sopb.mynetwork.Product')
  
      .then(function(productRegistry){
          // Now add the Flight - global function getFactory() called
          var  factory = getFactory();

          var  NS =  'org.sopb.mynetwork';
          var currentParticipant = getCurrentParticipant();
          if (currentParticipant.ver == "NO") 
             throw new Error('You must be verified to do transaction');
          // Solution to exercise - Removed hardcoded value & invoked
          // generate the flight ID
          // 2.1 Set the flightNumber, flightId ... 
          
          var  prodId = generateProductId(productData.prodTypeId,productData.id);
          var  newProduct = factory.newResource(NS,'Product',prodId);

          newProduct.prodTypeId = productData.prodTypeId;
          newProduct.prodName = productData.prodName;
          newProduct.prodSpecs = productData.prodSpecs;
          newProduct.imgUrl = productData.imgUrl;

          // 2.5 Set location 
          newProduct.prodLocation = productData.prodLocation;

          // 2.6 Set Manufacturer
         
          newProduct.prodDate = productData.timestamp;
 
          
        
          newProduct.prodManu = currentParticipant;

          /*if (currentParticipant.ver =="NO") 
            throw new Error('You must be verified to Enroll Product');*/
          // 3 Emit the event ProductCreated
          var event = factory.newEvent(NS, 'ProductEnrolled');
          event.prodId = prodId;
          
          emit(event);
        
          // 4. Add to registry
          return productRegistry.add(newProduct);
      });
}

/****
 * Creates the flight number from Flight number and the schedule
 * Solution to Exercise.
 */
function generateProductId(typeId, id){
    return typeId+'-'+id;
}


/**
 * Track the trade of a commodity from one trader to another
 * @param {org.sopb.mynetwork.InitialTransfer} init - the trade to be processed
 * @transaction
 */
async function initialTransfer(init) {
    var currentParticipant = getCurrentParticipant();
    //var  NS =  'org.sopb.mynetwork';
    var factory = getFactory();
    const history = factory.newConcept('org.sopb.mynetwork', 'History');
    var event = factory.newEvent('org.sopb.mynetwork', 'ProductTransferred');
    if (currentParticipant.ver == "NO") 
             throw new Error('You must be verified to do transaction');
    for (i = 0; i < init.productList.length; i++) {
        if (init.productList[i].prodManu.getIdentifier() != currentParticipant["$identifier"]) 
                throw new Error('You can not transfer someone else\'s product');
        if (init.productList[i].ownerCount > 0) 
                throw new Error('You can not transfer an owned product');
    }
    //init.product.currentOwner = init.firstOwner;
    //let productArray[];
    
    for (i = 0; i < init.productList.length; i++) {
        
        if (init.firstOwner.type == "DISTRIBUTOR") {
            init.productList[i].prodStat = "ONDISTRIBUTION";
        } else if (init.firstOwner.type == "RETAILER") {
            init.productList[i].prodStat = "ONRETAIL";
        } else {
            throw new Error('You can only transfer to DISTRIBUTOR/RETAILER');
        }
        
        init.productList[i].owners= [init.firstOwner];
        //init.productList[i].owners.push(init.firstOwner);
        
        event.prodId = init.productList[i].prodId;
        event.transferredFrom = currentParticipant.getIdentifier();
        event.transferredTo = init.firstOwner.getIdentifier();
        emit(event);
        //Add history
        history.ownerId = currentParticipant.getIdentifier();
        history.ownerType = "MANUFACTURER";
        history.transactionType = "Initial Transfer to";
        history.timestamp = init.timestamp;
        if (init.productList[i].transactionHistory){
            init.productList[i].transactionHistory.push(history);
        } else {
            init.productList[i].transactionHistory = [history];
        }
        
        init.productList[i].ownerCount = 1;
    
    }

    let assetRegistry = await getAssetRegistry('org.sopb.mynetwork.Product');
    await assetRegistry.updateAll(init.productList);
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.sopb.mynetwork.TransferProduct} transfer - the trade to be processed
 * @transaction
 */
async function transferProduct(transfer) {
    var currentParticipant = getCurrentParticipant();
    var factory = getFactory();
    var history = factory.newConcept('org.sopb.mynetwork', 'History');
    var event = factory.newEvent('org.sopb.mynetwork', 'ProductTransferred');
   
    if (currentParticipant.ver == "NO") 
             throw new Error('You must be verified to do transaction');
    for (i = 0; i < transfer.productList.length; i++) {
        var currentOwner = ((transfer.productList[i].ownerCount)-1);
        if (transfer.productList[i].prodStat == "SENT")
            throw new Error('You can only transfer an owned product');
        if (transfer.productList[i].owners[currentOwner].getIdentifier() != currentParticipant["$identifier"]) 
            throw new Error('You can only transfer your own product'); 
    }
    
    for (i = 0; i < transfer.productList.length; i++) {
        var ownCount = (transfer.productList[i].ownerCount-1);
        var currentOwner = transfer.productList[i].owners[ownCount];
        
        event.prodId = transfer.productList[i].prodId;
        event.transferredFrom = currentOwner.getIdentifier();
        event.transferredTo = transfer.newOwner.getIdentifier();
        emit(event);
        if ((transfer.newOwner.type == "RETAILER") || (transfer.newOwner.type == "DISTRIBUTOR") || (transfer.newOwner.type == "CUSTOMER")){
            transfer.productList[i].newOwner = transfer.newOwner;
        } else {
            throw new Error('newOwner not found'); 
        }
            
        transfer.productList[i].prodStat = "SENT";    
        //Add history
        history.ownerId = currentParticipant.getIdentifier();
        history.ownerType = currentParticipant.type;
        history.transactionType = "Product Transfer";
        if (transfer.desc) {
            history.desc = transfer.desc;
        } else {
            history.desc = "-";
        }
        
        history.timestamp = transfer.timestamp;
        transfer.productList[i].transactionHistory.push(history);     
    }
    let assetRegistry = await getAssetRegistry('org.sopb.mynetwork.Product');
    await assetRegistry.updateAll(transfer.productList);
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.sopb.mynetwork.CancelTransfer} trf - the trade to be processed
 * @transaction
 */
async function cancelTransfer(trf) {
    var currentParticipant = getCurrentParticipant();
    var factory = getFactory();
    const history = factory.newConcept('org.sopb.mynetwork', 'History');
    var event = factory.newEvent('org.sopb.mynetwork', 'TransferCancelled');
    if (currentParticipant.ver == "NO") 
             throw new Error('You must be verified to do transaction');
    for (i = 0; i < trf.productList.length; i++) {
        var currentOwner = ((trf.productList[i].ownerCount)-1);
        if (trf.productList[i].prodStat != "SENT") 
            throw new Error('The product is not being transferred');

        if ((currentParticipant["$identifier"] != trf.productList[i].owners[currentOwner].getIdentifier()) && (currentParticipant["$identifier"] != trf.productList[i].newOwner.getIdentifier()))
            throw new Error('You can only cancel products which are associated to you'); 
    }
    
    for (i = 0; i < trf.productList.length; i++) {
        event.prodId = trf.productList[i].prodId;
        var ownCount = ((trf.productList[i].ownerCount)-1);
        var currentOwner = trf.productList[i].owners[ownCount];

        if ((currentParticipant["$identifier"] == currentOwner.getIdentifier())) {
            trf.productList[i].newOwner = currentParticipant;
            event.cancelledBy = currentParticipant["$identifier"];
        } 
        else if (currentParticipant["$identifier"] == trf.productList[i].newOwner.getIdentifier()) {
            trf.productList[i].newOwner = currentOwner;
            event.cancelledBy = currentParticipant["$identifier"];
        } 

        trf.productList[i].prodStat = "OWNED";        
        // 3 Emit the event ProductCancelled
        event.transferredFrom = currentOwner.getIdentifier();
        event.transferredTo = currentParticipant.getIdentifier();
        
        emit(event);
        
        //Add history
        history.ownerId = currentParticipant.getIdentifier();
        history.ownerType = currentParticipant.type;
        history.transactionType = "Product Transfer Cancelled";
        history.desc = trf.desc;
        history.timestamp = trf.timestamp;
        trf.productList[i].transactionHistory.push(history); 
    }
    let assetRegistry = await getAssetRegistry('org.sopb.mynetwork.Product');
    await assetRegistry.updateAll(trf.productList);
}


/**
 * Track the trade of a commodity from one trader to another
 * @param {org.sopb.mynetwork.AcceptProduct} accept - the trade to be processed
 * @transaction
 */
async function acceptProduct(accept) {
    var currentParticipant = getCurrentParticipant();
    var factory = getFactory();
    const history = factory.newConcept('org.sopb.mynetwork', 'History');
    var event = factory.newEvent('org.sopb.mynetwork', 'ProductAccepted');
    if (currentParticipant.ver == "NO") 
             throw new Error('You must be verified to do transaction');
    for (i = 0; i < accept.productList.length; i++) {
        if (currentParticipant.getIdentifier() != accept.productList[i].newOwner.getIdentifier()) 
             throw new Error('You can only accept your own product');
        if (accept.productList[i].prodStat != "SENT") 
             throw new Error('You can only accept a transferred product');
    }
    for (i = 0; i < accept.productList.length; i++) {
        
        // 3 Emit the event ProductTransferred
        event.prodId = accept.productList[i].prodId;
        var ownCount = ((accept.productList[i].ownerCount)-1);
        var currentOwner = accept.productList[i].owners[ownCount];
        event.transferredFrom = currentOwner.getIdentifier();
        event.transferredTo = currentParticipant["$identifier"];
        emit(event);
        //Add history
        history.ownerId = currentParticipant.getIdentifier();
        history.ownerType = currentParticipant.type;
        history.transactionType = "Product Accepted";
        history.timestamp = accept.timestamp;
        accept.productList[i].transactionHistory.push(history);

        accept.productList[i].owners.push(currentParticipant);
        accept.productList[i].ownerCount++;
        
        if (currentParticipant.ownerType=="DISTRIBUTOR") {
            accept.productList[i].prodStat = "ONDISTRIBUTION";
        } else if (currentParticipant.ownerType=="RETAILER") {
            accept.productList[i].prodStat = "ONRETAIL";
        } else {
            accept.productList[i].prodStat = "OWNED";
        }
    }

    let assetRegistry = await getAssetRegistry('org.sopb.mynetwork.Product');
    await assetRegistry.updateAll(accept.productList);
}


/**
 * 
 * @param {org.sopb.mynetwork.ChangeVerificationStatusManufacturer} verify - the trade to be processed
 * @transaction
 */
async function changeVerificationStatusManufacturer(verify) {

    if (verify.man.ver =="NO") {
        verify.man.ver = "YES";
    } else {
        verify.man.ver = "NO";
    }
          
    let participantRegistry = await getParticipantRegistry('org.sopb.mynetwork.Manufacturer');
    await participantRegistry.update(verify.man);
}

/**
 * 
 * @param {org.sopb.mynetwork.ChangeVerificationStatusOwner} verif - the trade to be processed
 * @transaction
 */
async function changeVerificationStatusOwner(verif) {
    
    if (verif.owner.ver =="NO") {
    	verif.owner.ver = "YES";
    } else { 
        verif.owner.ver = "NO";
    }
    let participantRegistry = await getParticipantRegistry('org.sopb.mynetwork.Owner');
    await participantRegistry.update(verif.owner);
}

/**
 * 
 * @param {org.sopb.mynetwork.EditDataOwner} edit - the trade to be processed
 * @transaction
 */
async function editDataOwner(edit) {
    var currentParticipant = getCurrentParticipant();
    if (edit.owner.getIdentifier()!=currentParticipant["$identifier"])
        throw new Error('You can only edit your own data'); 
    edit.owner.userName = edit.userName;
    edit.owner.ownerLocation = edit.ownerLocation;
    edit.owner.email = edit.email;
    edit.owner.phoneNum = edit.phoneNum;
    
    let participantRegistry = await getParticipantRegistry('org.sopb.mynetwork.Owner');
    await participantRegistry.update(edit.owner);
}

/**
 * 
 * @param {org.sopb.mynetwork.EditDataManufacturer} editm - the trade to be processed
 * @transaction
 */
async function editDataManufacturer(editm) {
    var currentParticipant = getCurrentParticipant();
    if (editm.man.getIdentifier()!=currentParticipant["$identifier"])
        throw new Error('You can only edit your own data'); 
    editm.man.manuLocation = editm.ownerLocation;
    editm.man.email = editm.email;
    editm.man.phoneNum = editm.phoneNum;
    
    let participantRegistry = await getParticipantRegistry('org.sopb.mynetwork.Manufacturer');
    await participantRegistry.update(editm.man);
}
