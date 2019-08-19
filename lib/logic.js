/**
 * Create Product Transaction
 * @param {org.sopb.mynetwork.CreateProduct} productData
 * @transaction
 */

function createProduct(productData) {

    // Get the Asset Registry

  return getAssetRegistry('org.sopb.mynetwork.Product')
  
      .then(function(productRegistry){
          // Now add the Flight - global function getFactory() called
          var  factory = getFactory();

          var  NS =  'org.sopb.mynetwork';

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
 
          var currentParticipant = getCurrentParticipant();
        
          newProduct.prodManu = currentParticipant;

          // 3 Emit the event ProductCreated
          var event = factory.newEvent(NS, 'ProductCreated');
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
    init.product.firstOwner = init.firstOwner;
    init.product.currentOwner = init.firstOwner;
    if (init.product.ownerCount > 0) 
              throw new Error('You can not transfer an owned product');
    init.product.ownerCount = 1;
    init.product.prodStat = "OWNED";
    var currentParticipant = getCurrentParticipant();
    if (init.product.prodManu.getIdentifier() != currentParticipant["$identifier"]) 
              throw new Error('You can not transfer someone else\'s product');
    let assetRegistry = await getAssetRegistry('org.sopb.mynetwork.Product');
    await assetRegistry.update(init.product);
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.sopb.mynetwork.TransferProduct} transfer - the trade to be processed
 * @transaction
 */
async function transferProduct(transfer) {
    var currentParticipant = getCurrentParticipant();
    if (transfer.product.prodStat != "OWNED") 
              throw new Error('You can only transfer an owned product');
    if (transfer.product.currentOwner.getIdentifier() != currentParticipant["$identifier"]) 
              throw new Error('You can only transfer your own product'); 
    transfer.product.newOwner = transfer.newOwner;
    transfer.product.prodStat = "SENT";         
    let assetRegistry = await getAssetRegistry('org.sopb.mynetwork.Product');
    await assetRegistry.update(transfer.product);
}


/**
 * Track the trade of a commodity from one trader to another
 * @param {org.sopb.mynetwork.AcceptProduct} accept - the trade to be processed
 * @transaction
 */
async function acceptProduct(accept) {
    var currentParticipant = getCurrentParticipant();
    if (accept.product.newOwner.getIdentifier() != currentParticipant["$identifier"]) 
             throw new Error('You can only accept your own product'); 
    accept.product.currentOwner = currentParticipant;
    accept.product.ownerCount++;
    if (accept.product.prodStat != "SENT") 
              throw new Error('You can only accept an transferred product');
    accept.product.prodStat = "OWNED";
    let assetRegistry = await getAssetRegistry('org.sopb.mynetwork.Product');
    await assetRegistry.update(accept.product);
}
