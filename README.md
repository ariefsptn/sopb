
# sopb

 **Sistem Otentikasi Produk menggunakan *Blockchain***

## **How to run**

 

    nvm use 8.12.0
    cd ~fabric-dev-servers
    ./teardownFabric.sh
    ./startFabric.sh
    ./createPeerAdminCard.sh
    cd ..
    composer archive create --sourceType dir --sourceName /home/asep/Desktop/TA/sopb
    composer network install -a sopb@0.0.8.2.bna -c PeerAdmin@hlfv1
    composer network start -c PeerAdmin@hlfv1 -n sopb -V 0.0.8.2 -A admin -S adminpw --file admin@sopb.card
    composer card import -f ./admin\@sopb.card
    composer network ping -c admin@sopb
    composer-rest-server -c admin@sopb -p 3001
    ./restartrest.sh






  



  





  





  


  






  
  

**

## Before run Cryptogen


    export PATH=/home/asep/fabric-samples/bin:$PATH

**
## Run Locust

    locust -f locustfile.py --host=http://localhost:3001"
