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

   loadAudio(audioFileUrl) {
     try {
       console.log("Loading audio file " + audioFileUrl);
       this.file = new MediaPlugin(audioFileUrl, response => {this.fileStatus = response; console.log("Response is " + response);} );
       this.url = audioFileUrl;
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
       if (this.url != null) {
         this.playAudio();
       }
     }
     // file is new, previous file was being played, stop old file, load new file, play
     else if (this.url != article.link) {
       console.log("Switching files")
        this.stopAudio();
        try {
          this.loadAudio(article.link);
        }
        catch (e) {
           this.showAlert('Could not play 2.');
           return;
        }
        if (this.url != null) {
          this.playAudio();
        }
     }
     // file is not new, file is being played, stopped, or paused
     else if (this.url == article.link) {
       console.log("play/pause file");
        // file is being played
        if (this.fileStatus == MediaPlugin.MEDIA_RUNNING ||
            this.fileStatus == MediaPlugin.MEDIA_STARTING) {
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
     if (this.file != null) {
       this.stopAudio();
     }
   }

    playAudio() {
      try {
        this.file.play();
      }
      catch (e) {
        this.showAlert('Could not play 3.');
      }
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
