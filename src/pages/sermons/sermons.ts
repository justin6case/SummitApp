import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SermonService, FeedItem } from '../../app/services/sermons.service';
import { MediaPlugin } from 'ionic-native';
import { PlayMediaPage } from '../play-media/play-media';

@Component({
  selector: 'page-sermons',
  templateUrl: 'sermons.html'
})
export class SermonsPage {
  items: any;
  articles: FeedItem[];
  url: string;
  file: any;
  fileStatus: number;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private sermonService:SermonService) {
  }

  ngOnInit(){
    this.getPosts();
  }

  ngOnExit() {
    if (this.file) {
      this.file.stopAudio();
      this.file.release();
    }
  }

  getPosts(){
    this.sermonService.getArticlesForUrl('http://podcasts.subsplash.com/7f0ac04/podcast.rss').subscribe(response => {
      this.articles = response;
      });
   }

   viewItem(item) {
     this.navCtrl.push(PlayMediaPage, {
       item:item
     });
   }
}
