import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';
import { VideoPlayer } from 'ionic-native';

@Component({
  templateUrl: 'play-media.html'
})
export class PlayMediaPage {
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayMediaPage');
  }

}
