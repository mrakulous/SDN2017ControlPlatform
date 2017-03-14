import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { TopologyPage } from '../topology/topology';
import { ScenariosPage } from '../scenarios/scenarios';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = TopologyPage;
  tab3Root: any = ScenariosPage;
  // tab4Root: any = MininetPage;

  constructor() {

  }
}
