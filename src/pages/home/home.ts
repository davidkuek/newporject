import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PostProvider } from '../../providers/post/post';
// import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

number : number = 0;
interval : any;
postInterval : any;
key : any;

options = {
	title : 'App is running',
	text : 'For few seconds'

}

  constructor(public navCtrl: NavController, private backgroundMode: BackgroundMode
  	, public post: PostProvider, public platform : Platform) {

  	this.platform.ready()
  	.then(()=>platform.registerBackButtonAction(()=>{
  		this.backgroundMode.moveToBackground();
  	}))


  }



postHttp(){

	this.postInterval = setInterval(()=>{
	this.post.getAuthCode()
	.then(res=>{
		this.key = res;
		this.number++;
	})
	.catch(err=>console.log(err))	
	},1000)

}

stopCount(){
	clearInterval(this.postInterval);
	this.number = 0;
	this.key = 'no key';
}

moveToBackground(){
	this.backgroundMode.enable();
	// this.backgroundMode.moveToBackground();
	this.backgroundMode.setDefaults(this.options);
}

}