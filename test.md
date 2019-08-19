
composer card delete -c admin@sopb
composer card delete -c 2202@sopb
composer card delete -c 3672@sopb
composer card delete -c 1171@sopb
composer card delete -c 4983@sopb


{
  "$class": "org.sopb.mynetwork.Manufacturer",
  "contact": {
    "$class": "org.sopb.mynetwork.Contact",
    "email": "adidasxnike@gmail.com",
    "phoneNum": "0888333"
  },
  "manuLocation": "Jl. Cisitu Lama",
  "userKey": "1171",
  "userName": "Adidas Cisitu",
  "userPass": "bismillahoktober"
}

{
  "$class": "org.sopb.mynetwork.Owner",
  "type": "CUSTOMER",
  "userKey": "2208",
  "userName": "Kepet Lasaga",
  "userPass": "bismillahoktober"
}

{
  "$class": "org.sopb.mynetwork.Owner",
  "type": "RETAILER",
  "ownerLocation": "",
  "ownerContact": {
    "$class": "org.sopb.mynetwork.Contact",
    "email": "adidasdu@gmail.com",
    "phoneNum": "3131313"
  },
  "userKey": "3672",
  "userName": "Adidas Dipatiukur",
  "userPass": "bismillahoktober"
}

{
  "$class": "org.sopb.mynetwork.Owner",
  "type": "CUSTOMER",
  "userKey": "4983",
  "userName": "Arief Septian Nurhada",
  "userPass": "bismillahoktober"
}

{
 "$class": "org.sopb.mynetwork.CreateProduct",
 "id": "60",
 "prodTypeId": "25",
 "prodName": "ADIDAS DRAGON BALL Z",
 "prodSpecs": "Adidas warna putih ungu hypebeast",
 "imgUrl": "https://www.flightclub.com/media/catalog/product/cache/1/image/1600x1140/9df78eab33525d08d6e5fb8d27136e95/8/0/805194_01.jpg",
 "prodLocation": "Sekeloa Utara 2"
}


{
  "$class": "org.sopb.mynetwork.InitialTransfer",
  "product": "resource:org.sopb.mynetwork.Product#25-60",
  "firstOwner": "resource:org.sopb.mynetwork.Owner#3672"
}

{
  "$class": "org.sopb.mynetwork.TransferProduct",
  "product": "resource:org.sopb.mynetwork.Product#25-60",
  "newOwner": "resource:org.sopb.mynetwork.Owner#4983"
}

{
  "$class": "org.sopb.mynetwork.AcceptProduct",
  "product": "resource:org.sopb.mynetwork.Product#25-60"
}
