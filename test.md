
composer card delete -c admin@sopb
composer card delete -c restadmin@sopb
composer card delete -c 2121@sopb
composer card delete -c 2323@sopb
composer card delete -c 2424@sopb
composer card delete -c 2525@sopb
composer card delete -c 1234@sopb
composer card delete -c 12345@sopb

composer network install -a sopb@0.0.8.2.bna -c PeerAdmin@hlfv1
composer network install -a sopb@0.0.8.bna -c PeerAdmin@hlfv1

composer network start -c PeerAdmin@hlfv1 -n sopb -V 0.0.8.2 -A admin -S adminpw --file admin@sopb.card

composer network start -c PeerAdmin@hlfv1 -n sopb -V 0.0.8 -A admin -S adminpw --file admin@sopb.card

composer card import -f ./admin\@sopb.card

composer-rest-server -c admin@sopb -p 3001

{
  "$class": "org.sopb.mynetwork.Owner",
  "type": "CUSTOMER",
  "userId": "2525",
  "userName": "Arief Septian Nurhada"
}

composer identity issue -c admin@sopb -f 2525.card -u 2525 -a "resource:org.sopb.mynetwork.Owner#2525"

composer card import -f 2525.card

sed -e 's/localhost:6051/peer0.org1.example.com:7051/' -e 's/localhost:6053/peer0.org1.example.com:7053/' -e 's/localhost:7051/peer1.org1.example.com:7051/' -e 's/localhost:7053/peer1.org1.example.com:7053/' -e 's/localhost:8051/peer0.org1.example.com:7051/' -e 's/localhost:8053/peer0.org1.example.com:7053/' -e 's/localhost:9051/peer0.org1.example.com:7051/' -e 's/localhost:9053/peer0.org1.example.com:7053/' -e 's/localhost:7054/ca.org1.example.com:7054/' -e 's/localhost:7050/orderer.example.com:7050/'  < $HOME/.composer/cards/2525@sopb/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/2525@sopb/

composer card export -f 2525_exp.card -c 2525@sopb ; rm 2525.card 

{
  "$class": "org.sopb.mynetwork.Owner",
  "type": "RETAILER",
  "ownerLocation": "Jl. Cisitu Lama",
  "email": "nike@adidas.com",
  "phoneNum": "02121322",
  "userId": "2424",
  "userName": "Adidas Dago"
}

composer identity issue -c admin@sopb -f 2424.card -u 2424 -a "resource:org.sopb.mynetwork.Owner#2424"

composer card import -f 2424.card

sed -e 's/localhost:6051/peer0.org1.example.com:7051/' -e 's/localhost:6053/peer0.org1.example.com:7053/' -e 's/localhost:7051/peer1.org1.example.com:7051/' -e 's/localhost:7053/peer1.org1.example.com:7053/' -e 's/localhost:8051/peer0.org1.example.com:7051/' -e 's/localhost:8053/peer0.org1.example.com:7053/' -e 's/localhost:9051/peer0.org1.example.com:7051/' -e 's/localhost:9053/peer0.org1.example.com:7053/' -e 's/localhost:7054/ca.org1.example.com:7054/' -e 's/localhost:7050/orderer.example.com:7050/'  < $HOME/.composer/cards/2424@sopb/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/2424@sopb/

composer card export -f 2424_exp.card -c 2424@sopb ; rm 2424.card 

{
  "$class": "org.sopb.mynetwork.Owner",
  "type": "DISTRIBUTOR",
  "ownerLocation": "Jl. Dipatiukur 10",
  "email": "bambangdistribution@gmail.com",
  "phoneNum": "02121322",
  "userId": "2323",
  "userName": "NIKE distribution center"
}

composer identity issue -c admin@sopb -f 2323.card -u 2323 -a "resource:org.sopb.mynetwork.Owner#2323"

composer card import -f 2323.card

sed -e 's/localhost:6051/peer0.org1.example.com:7051/' -e 's/localhost:6053/peer0.org1.example.com:7053/' -e 's/localhost:7051/peer1.org1.example.com:7051/' -e 's/localhost:7053/peer1.org1.example.com:7053/' -e 's/localhost:8051/peer0.org1.example.com:7051/' -e 's/localhost:8053/peer0.org1.example.com:7053/' -e 's/localhost:9051/peer0.org1.example.com:7051/' -e 's/localhost:9053/peer0.org1.example.com:7053/' -e 's/localhost:7054/ca.org1.example.com:7054/' -e 's/localhost:7050/orderer.example.com:7050/'  < $HOME/.composer/cards/2323@sopb/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/2323@sopb/

composer card export -f 2323_exp.card -c 2323@sopb ; rm 2323.card 

{
  "$class": "org.sopb.mynetwork.Owner",
  "type": "CUSTOMER",
  "ownerLocation": "Jl. Sekeloa Utara 2",
  "email": "arie@gmail.com",
  "phoneNum": "0412121322",
  "userId": "2121",
  "userName": "Ikhsan Widi Adyatma"
}

composer identity issue -c admin@sopb -f 2121.card -u 2121 -a "resource:org.sopb.mynetwork.Owner#2121"

composer card import -f 2121.card

sed -e 's/localhost:6051/peer0.org1.example.com:7051/' -e 's/localhost:6053/peer0.org1.example.com:7053/' -e 's/localhost:7051/peer1.org1.example.com:7051/' -e 's/localhost:7053/peer1.org1.example.com:7053/' -e 's/localhost:8051/peer0.org1.example.com:7051/' -e 's/localhost:8053/peer0.org1.example.com:7053/' -e 's/localhost:9051/peer0.org1.example.com:7051/' -e 's/localhost:9053/peer0.org1.example.com:7053/' -e 's/localhost:7054/ca.org1.example.com:7054/' -e 's/localhost:7050/orderer.example.com:7050/'  < $HOME/.composer/cards/2121@sopb/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/2121@sopb/

composer card export -f 2121_exp.card -c 2121@sopb ; rm 2121.card 

{
  "$class": "org.sopb.mynetwork.Manufacturer",
  "email": "adidas@gmail.com",
  "phoneNum": "312412",
  "manuLocation": "Jalan Cibaduyut",
  "userId": "1234",
  "userName": "Adidas Indonesia"
}

composer identity issue -c admin@sopb -f 1234.card -u 1234 -a "resource:org.sopb.mynetwork.Manufacturer#1234"

composer card import -f 1234.card

sed -e 's/localhost:6051/peer0.org1.example.com:7051/' -e 's/localhost:6053/peer0.org1.example.com:7053/' -e 's/localhost:7051/peer1.org1.example.com:7051/' -e 's/localhost:7053/peer1.org1.example.com:7053/' -e 's/localhost:8051/peer0.org1.example.com:7051/' -e 's/localhost:8053/peer0.org1.example.com:7053/' -e 's/localhost:9051/peer0.org1.example.com:7051/' -e 's/localhost:9053/peer0.org1.example.com:7053/' -e 's/localhost:7054/ca.org1.example.com:7054/' -e 's/localhost:7050/orderer.example.com:7050/'  < $HOME/.composer/cards/1234@sopb/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/1234@sopb/

composer card export -f 1234_exp.card -c 1234@sopb ; rm 1234.card 

composer identity issue -c admin@sopb -f 12345.card -u 12345 -a "resource:org.sopb.mynetwork.Manufacturer#12345"

composer card import -f 12345.card

sed -e 's/localhost:6051/peer0.org1.example.com:7051/' -e 's/localhost:6053/peer0.org1.example.com:7053/' -e 's/localhost:7051/peer1.org1.example.com:7051/' -e 's/localhost:7053/peer1.org1.example.com:7053/' -e 's/localhost:8051/peer0.org1.example.com:7051/' -e 's/localhost:8053/peer0.org1.example.com:7053/' -e 's/localhost:9051/peer0.org1.example.com:7051/' -e 's/localhost:9053/peer0.org1.example.com:7053/' -e 's/localhost:7054/ca.org1.example.com:7054/' -e 's/localhost:7050/orderer.example.com:7050/'  < $HOME/.composer/cards/12345@sopb/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/12345@sopb/

composer card export -f 12345_exp.card -c 12345@sopb ; rm 12345.card 

{
  "$class": "org.sopb.mynetwork.ChangeVerificationStatusManufacturer",
  "man": "resource:org.sopb.mynetwork.Manufacturer#1234"
}

{
  "$class": "org.sopb.mynetwork.ChangeVerificationStatusManufacturer",
  "man": "resource:org.sopb.mynetwork.Manufacturer#1234"
}



./restartrest.sh



{
  "$class": "org.sopb.mynetwork.EnrollProduct",
  "id": "12",
  "prodTypeId": "12",
  "prodName": "Adidas Hypebeast XXX",
  "prodSpecs": "Bahan kulit asli",
  "imgUrl": "https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/Adidas_vwjdpe.jpg",
  "prodLocation": "Bogor Kota Hujan"
}

{
  "$class": "org.sopb.mynetwork.EnrollProduct",
  "id": "13",
  "prodTypeId": "12",
  "prodName": "Adidas Hypebeast XXX",
  "prodSpecs": "Bahan kulit asli",
  "imgUrl": "https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/Adidas_vwjdpe.jpg",
  "prodLocation": "Bogor Kota Hujan"
}


{
  "$class": "org.sopb.mynetwork.EnrollProduct",
  "id": "14",
  "prodTypeId": "12",
  "prodName": "Adidas Hypebeast XXX",
  "prodSpecs": "Bahan kulit asli",
  "imgUrl": "https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/Adidas_vwjdpe.jpg",
  "prodLocation": "Bogor Kota Hujan"
}

{
  "$class": "org.sopb.mynetwork.InitialTransfer",
  "productList": [
    "resource:org.sopb.mynetwork.Product#12-12","resource:org.sopb.mynetwork.Product#12-13","resource:org.sopb.mynetwork.Product#12-14"
  ],
  "firstOwner": "resource:org.sopb.mynetwork.Owner#2323"
}

{
  "$class": "org.sopb.mynetwork.TransferProduct",
  "productList": [
    "resource:org.sopb.mynetwork.Product#12-12"
  ],
  "newOwner": "resource:org.sopb.mynetwork.Owner#2424"
}

{
  "$class": "org.sopb.mynetwork.AcceptProduct",
  "productList": [
    "resource:org.sopb.mynetwork.Product#12-12"
  ]
}

{
  "$class": "org.sopb.mynetwork.TransferProduct",
  "productList": [
    "resource:org.sopb.mynetwork.Product#12-12"
  ],
  "newOwner": "resource:org.sopb.mynetwork.Owner#2525"
}

{
  "$class": "org.sopb.mynetwork.AcceptProduct",
  "productList": [
    "resource:org.sopb.mynetwork.Product#12-12"
  ]
}

{
  "$class": "org.sopb.mynetwork.TransferProduct",
  "productList": [
    "resource:org.sopb.mynetwork.Product#12-12"
  ],
  "newOwner": "resource:org.sopb.mynetwork.Owner#2121"
}

{
  "$class": "org.sopb.mynetwork.CancelTransfer",
  "productList": [
    "resource:org.sopb.mynetwork.Product#12-12"
  ],
  "desc": "Uji otentikasi"
}






