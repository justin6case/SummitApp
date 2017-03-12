import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SermonsPage } from '../pages/sermons/sermons';
import { VideoPage } from '../pages/video/video';
import { PlayMediaPage } from '../pages/play-media/play-media';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    SermonsPage,
    VideoPage,
    PlayMediaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    SermonsPage,
    VideoPage,
    PlayMediaPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
