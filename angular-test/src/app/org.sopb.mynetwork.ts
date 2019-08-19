import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.sopb.mynetwork{
   export abstract class SOPBParticipant extends Participant {
      userKey: string;
      userName: string;
   }
   export class Manufacturer extends SOPBParticipant {
      contact: Contact;
      manuLocation: string;
   }
   export class Owner extends SOPBParticipant {
      type: ownerType;
      ownerLocation: string;
      ownerContact: Contact;
   }
   export enum ownerType {
      CUSTOMER,
      RETAILER,
   }
   export class Contact {
      email: string;
      phoneNum: string;
   }
   export class Product extends Asset {
      prodId: string;
      prodTypeId: string;
      prodName: string;
      prodSpecs: string;
      imgUrl: string;
      prodLocation: string;
      prodDate: Date;
      ownerCount: number;
      firstOwner: Owner;
      currentOwner: Owner;
      newOwner: Owner;
      prodManu: Manufacturer;
      prodStat: Status;
   }
   export enum Status {
      PRODUCED,
      SENT,
      OWNED,
   }
   export class MakeProduct extends Transaction {
      id: string;
      prodTypeId: string;
      prodName: string;
      prodSpecs: string;
      imgUrl: string;
      prodLocation: string;
   }
   export class ProductCreated extends Event {
      prodId: string;
   }
   export class InitialTransfer extends Transaction {
      product: Product;
      firstOwner: Owner;
   }
   export class TransferProduct extends Transaction {
      product: Product;
      newOwner: Owner;
   }
   export class AcceptProduct extends Transaction {
      product: Product;
   }
// }
