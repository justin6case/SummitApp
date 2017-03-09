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
  fileStatus: any;

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

   loadAudio(audioFileUrl) {
     try {
       console.log("Loading files");
       console.log("Audio file is " + audioFileUrl);
       this.file = new MediaPlugin(audioFileUrl);
       this.url == audioFileUrl;
       this.fileStatus = MediaPlugin.MEDIA_STOPPED;
     }
     catch (e) {
       this.showAlert('Error loading file');
     }
   }

   playPauseHandler(article) {
     // file is new, no previous file, load new file, play
     // file is new, previous file was being played, stop old file, load new file, play
     // file is not new, file is being played, stopped, or paused

     // file is new, no previous file, load new file, play
     if (this.url == null) {
       console.log("New file");
       try {
         this.loadAudio(article.link);
       }
       catch (e) {
          this.showAlert('Could not play 1.');
          return;
       }
       //if (this.url != null) {
         this.playAudio();
       //}
     }
     // file is new, previous file was being played, stop old file, load new file, play
     else if (this.url != article.link) {
       console.log("Switching files")
        this.file.this.stopAudio();
        try {
          this.loadAudio(article.link);
        }
        catch (e) {
           this.showAlert('Could not play 2.');
           return;
        }
        //if (this.url != null) {
          this.playAudio();
        //}
     }
     // file is not new, file is being played, stopped, or paused
     else if (this.url == article.link) {
       console.log("play/pause file");
        // file is being played
        if (this.fileStatus == MediaPlugin.MEDIA_RUNNING) {
          this.pauseAudio();
          console.log("pausing" + this.url);
        }
        // file is paused or stopped
        else {
          this.playAudio();
          console.log("playing" + this.url);
        }
     }
   }

   stopHandler() {
     //if (this.file != null) {
       this.stopAudio();
     //}
   }

    playAudio() {
      try {
        this.file.play();
        this.fileStatus = MediaPlugin.MEDIA_RUNNING;
      }
      catch (e) {
        this.showAlert('Could not play 3.');
      }
    }

   pauseAudio() {
     try {
       this.file.pause();
       this.fileStatus = MediaPlugin.MEDIA_PAUSED;
     }
     catch (e) {
       this.showAlert('Could not pause.');
     }
   }

   stopAudio() {
     try {
       this.file.stop();
       this.fileStatus = MediaPlugin.MEDIA_STOPPED;
     }
     catch (e) {
       this.showAlert('Could not stop.');
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
