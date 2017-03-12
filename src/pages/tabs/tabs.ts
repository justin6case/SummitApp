import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SermonsPage } from '../sermons/sermons';
import { VideoPage } from '../video/video';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SermonsPage;
  tab3Root: any = VideoPage;

  constructor() {

  }
}
