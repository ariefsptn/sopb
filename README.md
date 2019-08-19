# sopb

Sistem Otentikasi Produk berbasis Blockchain

composer network ping -c admin@sopb

composer network start -c PeerAdmin@hlfv1 -n sopb -V 0.0.2 -A admin -S adminpw --file admin@sopb.card

composer network upgrade -V 0.0.3 -n sopb -c PeerAdmin@hlfv1


composer network install -a sopb@0.0.3.bna -c PeerAdmin@hlfv1

composer card import --file

composer archive create  --sourceType dir --sourceName /home/asep/Desktop/TA/sopb

composer card import -f ./admin\@sopb.card

composer card list


di folder /fabric-dev-servers

export FABRIC_VERSION=hlfv12
./downloadFabric.sh
./startFabric.sh
./stopFabric.sh
./createPeerAdminCard.sh

COMPOSER-REST-SERVER
npm install -g composer-rest-server@0.20
composer-rest-server

https://mimiz.github.io/2017/04/02/Debian-Install-NodeJS-globally-with-NVM.html


---kalo rest server gak sync---

https://stackoverflow.com/questions/50592522/hyperledger-composer-got-stuck-when-upgrading-the-network