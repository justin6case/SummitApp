import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { VideoService, FeedItem } from '../../app/services/video.service';
import { MediaPlugin } from 'ionic-native';
import { PlayMediaPage } from '../play-media/play-media';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})

export class VideoPage {
  items: any;
  articles: FeedItem[];
  url: string;
  file: any;
  fileStatus: number;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private videoService:VideoService) {
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
    this.videoService.getArticlesForUrl('https://vimeo.com/thesummitstl/videos/all/rss').subscribe(response => {
      this.articles = response;
      });
   }

   viewItem(item) {
     this.navCtrl.push(PlayMediaPage, {
       item:item
     });
   }
}
