import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TopologyPage } from '../pages/topology/topology';
import { ScenariosPage } from '../pages/scenarios/scenarios';
import { ScenarioOnePage } from '../pages/scenarioOne/scenarioOne';
import { ScenarioTwoPage } from '../pages/scenarioTwo/scenarioTwo';
import { ScenarioThreePage } from '../pages/scenarioThree/scenarioThree';
import { ScenarioFourPage } from '../pages/scenarioFour/scenarioFour';
import { TabsPage } from '../pages/tabs/tabs';



@NgModule({
  declarations: [
    MyApp,
    TopologyPage,
    HomePage,
    ScenariosPage,
    ScenarioOnePage,
    ScenarioTwoPage,
    ScenarioThreePage,
    ScenarioFourPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
        tabsPlacement:'top'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TopologyPage,
    HomePage,
    ScenariosPage,
    ScenarioOnePage,
    ScenarioTwoPage,
    ScenarioThreePage,
    ScenarioFourPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
