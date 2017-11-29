import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BackgroundMode } from '@ionic-native/background-mode';
/*
  Generated class for the PostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostProvider {

	DOMAIN_PATH = "http://203.115.215.24/salestracking/IONIC_TEST/";

  constructor(public http: Http, private backgroundMode: BackgroundMode) {
    console.log('Hello PostProvider Provider');
  }

  getAuthCode(){

    return new Promise((resolve,reject)=>{
      let webService = this.DOMAIN_PATH + "REQUEST_AUTHKEY.php?";

      this.http.post(webService,{})
      .map(res=>res.json())
      .subscribe(data=>{
        if (data.success == 'true') {
          resolve(data.key);
          
        }
        else{
          console.log('no key');
        }
      },err=>reject(err))
    })

  }
}
