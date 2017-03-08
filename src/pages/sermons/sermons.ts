import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SermonService, FeedItem } from '../../app/services/sermons.service';
import { MediaPlugin } from 'ionic-native';

@Component({
  selector: 'sermons',
  templateUrl: 'sermons.html'
})
export class SermonsPage {
  items: any;
  articles: FeedItem[];
  url;
  file;
  status;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private sermonService:SermonService) {

  }

  ngOnInit(){
    this.getPosts();
  }

  getPosts(){
    this.sermonService.getArticlesForUrl('http://podcasts.subsplash.com/7f0ac04/podcast.rss').subscribe(response => {
      this.articles = response;
      });
   }

   playAudio(article) {
     // this is a new file
     if (this.url != article.link) {
        this.stopAudio();
        try {
           if (this.file != null)
           {
              this.stopAudio();
              this.file.delete();
           }
           this.file = new MediaPlugin(article.link, this.onStatusUpdate);
        }
        catch (e) {
           this.showAlert('Could not open url ' + this.url);
        }
     }
     this.url = article.link;
     try {
       this.file.play();
     }
     catch (e) {
        this.showAlert('Could not play.');
     }
   }

   onStatusUpdate(status) {
      this.status = status;
      console.log("onStatusUpdate" + status);
      this.showAlert("onStatusUpdate" + status);
    }

   pauseAudio() {
     try {
       this.file.pause();
     }
     catch (e) {
       this.showAlert('Could not pause.');
     }
   }

   stopAudio() {
     try {
       this.file.stop();
     }
     catch (e) {
       this.showAlert('Could not stop.');
     }
     try {
       this.file.release();
     }
     catch (e) {
       this.showAlert('Could not release.');
     }
   }

   showAlert(message) {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: message,
    buttons: ['OK']
  });
  alert.present();
}
}
