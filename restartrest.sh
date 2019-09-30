source envvars.txt
docker stop myorg/composer-rest-server
docker rm myorg/composer-rest-server
docker stop mongo
docker rm mongo
docker stop /rest
docker rm /rest

docker run -d --name mongo --network composer_default -p 27017:27017 mongo
cd ~/dockertmp
docker build -t myorg/composer-rest-server .
cd

composer participant add -c admin@sopb -d '{"$class":"org.hyperledger.composer.system.NetworkAdmin", "participantId":"restadmin"}'

composer identity issue -c admin@sopb -f restadmin.card -u restadmin -a "resource:org.hyperledger.composer.system.NetworkAdmin#restadmin"

composer card import -f  restadmin.card


sed -e 's/localhost:6051/peer0.org1.example.com:7051/' -e 's/localhost:6053/peer0.org1.example.com:7053/' -e 's/localhost:7051/peer1.org1.example.com:7051/' -e 's/localhost:7053/peer1.org1.example.com:7053/' -e 's/localhost:8051/peer0.org1.example.com:7051/' -e 's/localhost:8053/peer0.org1.example.com:7053/' -e 's/localhost:9051/peer0.org1.example.com:7051/' -e 's/localhost:9053/peer0.org1.example.com:7053/' -e 's/localhost:7054/ca.org1.example.com:7054/' -e 's/localhost:7050/orderer.example.com:7050/'  < $HOME/.composer/cards/restadmin@sopb/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/restadmin@sopb/ 

#sed -e 's/localhost:7051/peer0.org1.example.com:7051/' -e 's/localhost:7053/peer0.org1.example.com:7053/' -e 's/localhost:8051/peer1.org1.example.com:7051/' -e 's/localhost:8053/peer1.org1.example.com:7053/' -e 's/localhost:7054/ca.org1.example.com:7054/'  -e 's/localhost:7050/orderer.example.com:7050/'  < $HOME/.composer/cards/admin@sopb/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/admin@sopb/ 
composer network ping -c restadmin@sopb

docker run \
-d \
-e COMPOSER_CARD=${COMPOSER_CARD} \
-e COMPOSER_NAMESPACES=${COMPOSER_NAMESPACES} \
-e COMPOSER_AUTHENTICATION=${COMPOSER_AUTHENTICATION} \
-e COMPOSER_MULTIUSER=${COMPOSER_MULTIUSER} \
-e COMPOSER_PROVIDERS="${COMPOSER_PROVIDERS}" \
-e COMPOSER_DATASOURCES="${COMPOSER_DATASOURCES}" \
-v ~/.composer:/home/composer/.composer \
--name rest \
--network composer_default \
-p 3000:3000 \
myorg/composer-rest-server

docker logs -f rest