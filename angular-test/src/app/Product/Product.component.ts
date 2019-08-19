/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from './Product.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  prodId = new FormControl('', Validators.required);
  prodTypeId = new FormControl('', Validators.required);
  prodName = new FormControl('', Validators.required);
  prodSpecs = new FormControl('', Validators.required);
  imgUrl = new FormControl('', Validators.required);
  prodLocation = new FormControl('', Validators.required);
  prodDate = new FormControl('', Validators.required);
  ownerCount = new FormControl('', Validators.required);
  firstOwner = new FormControl('', Validators.required);
  currentOwner = new FormControl('', Validators.required);
  newOwner = new FormControl('', Validators.required);
  prodManu = new FormControl('', Validators.required);
  prodStat = new FormControl('', Validators.required);

  constructor(public serviceProduct: ProductService, fb: FormBuilder) {
    this.myForm = fb.group({
      prodId: this.prodId,
      prodTypeId: this.prodTypeId,
      prodName: this.prodName,
      prodSpecs: this.prodSpecs,
      imgUrl: this.imgUrl,
      prodLocation: this.prodLocation,
      prodDate: this.prodDate,
      ownerCount: this.ownerCount,
      firstOwner: this.firstOwner,
      currentOwner: this.currentOwner,
      newOwner: this.newOwner,
      prodManu: this.prodManu,
      prodStat: this.prodStat
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceProduct.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.sopb.mynetwork.Product',
      'prodId': this.prodId.value,
      'prodTypeId': this.prodTypeId.value,
      'prodName': this.prodName.value,
      'prodSpecs': this.prodSpecs.value,
      'imgUrl': this.imgUrl.value,
      'prodLocation': this.prodLocation.value,
      'prodDate': this.prodDate.value,
      'ownerCount': this.ownerCount.value,
      'firstOwner': this.firstOwner.value,
      'currentOwner': this.currentOwner.value,
      'newOwner': this.newOwner.value,
      'prodManu': this.prodManu.value,
      'prodStat': this.prodStat.value
    };

    this.myForm.setValue({
      'prodId': null,
      'prodTypeId': null,
      'prodName': null,
      'prodSpecs': null,
      'imgUrl': null,
      'prodLocation': null,
      'prodDate': null,
      'ownerCount': null,
      'firstOwner': null,
      'currentOwner': null,
      'newOwner': null,
      'prodManu': null,
      'prodStat': null
    });

    return this.serviceProduct.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'prodId': null,
        'prodTypeId': null,
        'prodName': null,
        'prodSpecs': null,
        'imgUrl': null,
        'prodLocation': null,
        'prodDate': null,
        'ownerCount': null,
        'firstOwner': null,
        'currentOwner': null,
        'newOwner': null,
        'prodManu': null,
        'prodStat': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.sopb.mynetwork.Product',
      'prodTypeId': this.prodTypeId.value,
      'prodName': this.prodName.value,
      'prodSpecs': this.prodSpecs.value,
      'imgUrl': this.imgUrl.value,
      'prodLocation': this.prodLocation.value,
      'prodDate': this.prodDate.value,
      'ownerCount': this.ownerCount.value,
      'firstOwner': this.firstOwner.value,
      'currentOwner': this.currentOwner.value,
      'newOwner': this.newOwner.value,
      'prodManu': this.prodManu.value,
      'prodStat': this.prodStat.value
    };

    return this.serviceProduct.updateAsset(form.get('prodId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceProduct.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceProduct.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'prodId': null,
        'prodTypeId': null,
        'prodName': null,
        'prodSpecs': null,
        'imgUrl': null,
        'prodLocation': null,
        'prodDate': null,
        'ownerCount': null,
        'firstOwner': null,
        'currentOwner': null,
        'newOwner': null,
        'prodManu': null,
        'prodStat': null
      };

      if (result.prodId) {
        formObject.prodId = result.prodId;
      } else {
        formObject.prodId = null;
      }

      if (result.prodTypeId) {
        formObject.prodTypeId = result.prodTypeId;
      } else {
        formObject.prodTypeId = null;
      }

      if (result.prodName) {
        formObject.prodName = result.prodName;
      } else {
        formObject.prodName = null;
      }

      if (result.prodSpecs) {
        formObject.prodSpecs = result.prodSpecs;
      } else {
        formObject.prodSpecs = null;
      }

      if (result.imgUrl) {
        formObject.imgUrl = result.imgUrl;
      } else {
        formObject.imgUrl = null;
      }

      if (result.prodLocation) {
        formObject.prodLocation = result.prodLocation;
      } else {
        formObject.prodLocation = null;
      }

      if (result.prodDate) {
        formObject.prodDate = result.prodDate;
      } else {
        formObject.prodDate = null;
      }

      if (result.ownerCount) {
        formObject.ownerCount = result.ownerCount;
      } else {
        formObject.ownerCount = null;
      }

      if (result.firstOwner) {
        formObject.firstOwner = result.firstOwner;
      } else {
        formObject.firstOwner = null;
      }

      if (result.currentOwner) {
        formObject.currentOwner = result.currentOwner;
      } else {
        formObject.currentOwner = null;
      }

      if (result.newOwner) {
        formObject.newOwner = result.newOwner;
      } else {
        formObject.newOwner = null;
      }

      if (result.prodManu) {
        formObject.prodManu = result.prodManu;
      } else {
        formObject.prodManu = null;
      }

      if (result.prodStat) {
        formObject.prodStat = result.prodStat;
      } else {
        formObject.prodStat = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'prodId': null,
      'prodTypeId': null,
      'prodName': null,
      'prodSpecs': null,
      'imgUrl': null,
      'prodLocation': null,
      'prodDate': null,
      'ownerCount': null,
      'firstOwner': null,
      'currentOwner': null,
      'newOwner': null,
      'prodManu': null,
      'prodStat': null
      });
  }

}
