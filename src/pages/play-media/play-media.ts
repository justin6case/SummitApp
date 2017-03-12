import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';
import { VideoPlayer } from 'ionic-native';
import { Platform } from 'ionic-angular';

@Component({
  templateUrl: 'play-media.html'
})
export class PlayMediaPage {
  item: any;
  url: string;
  file: any;
  fileStatus: number;
  platform: any;
  none: number;
  starting: number;
  running: number;
  paused: number;
  stopped: number;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public plt: Platform) {
    this.item = navParams.get('item');
    this.fileStatus = 0;
    if ( plt.is('ios')) {
      this.platform = 'ios';
      // ios statuses are different than android
      this.none = MediaPlugin.MEDIA_NONE;
      this.starting = MediaPlugin.MEDIA_STARTING;
      this.running = MediaPlugin.MEDIA_PAUSED;
      this.paused = MediaPlugin.MEDIA_RUNNING;
      this.stopped = MediaPlugin.MEDIA_STOPPED;
    }
    else if ( plt.is('android')) {
      this.platform = 'android';
      this.none = MediaPlugin.MEDIA_NONE;
      this.starting = MediaPlugin.MEDIA_STARTING;
      this.running = MediaPlugin.MEDIA_RUNNING;
      this.paused = MediaPlugin.MEDIA_PAUSED;
      this.stopped = MediaPlugin.MEDIA_STOPPED;
    }
    else if ( plt.is('windows')) {
      this.platform = 'windows';
      this.none = MediaPlugin.MEDIA_NONE;
      this.starting = MediaPlugin.MEDIA_STARTING;
      this.running = MediaPlugin.MEDIA_RUNNING;
      this.paused = MediaPlugin.MEDIA_PAUSED;
      this.stopped = MediaPlugin.MEDIA_STOPPED;
    }
    else if ( plt.is('cordova')) {
      this.platform = 'cordova';
      this.none = MediaPlugin.MEDIA_NONE;
      this.starting = MediaPlugin.MEDIA_STARTING;
      this.running = MediaPlugin.MEDIA_RUNNING;
      this.paused = MediaPlugin.MEDIA_PAUSED;
      this.stopped = MediaPlugin.MEDIA_STOPPED;
    }
    console.log(this.platform);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayMediaPage');
  }

  loadAudio(audioFileUrl) {
    try {
      console.log("Loading audio file " + audioFileUrl);
      this.fileStatus = 1;
      this.file = new MediaPlugin(audioFileUrl, response => {this.fileStatus = response; console.log("Response is " + response);} );
      this.url = audioFileUrl;
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
