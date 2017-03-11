import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ScenarioOnePage } from '../scenarioOne/scenarioOne';
import { ScenarioTwoPage } from '../scenarioTwo/scenarioTwo';
import { ScenarioThreePage } from '../scenarioThree/scenarioThree';
import { ScenarioFourPage } from '../scenarioFour/scenarioFour';

@Component({
  selector: 'page-scenarios',
  templateUrl: 'scenarios.html'
})
export class ScenariosPage {

    // class variable
    scenarios: any;

    constructor(public navCtrl: NavController) {

        this.scenarios = [
            {id: '1', description: 'Host - Blocking'},
            {id: '2', description: 'Switch - Blocking'},
            {id: '3', description: 'Rerouting'},
            {id: '4', description: 'Bandwidth Control'},
            {id: '5', description: 'Network Virtualization'}
        ];

    }

    handleClick(scenario) {

        if(scenario.id == 1){

            this.navCtrl.push(ScenarioOnePage, {
                id: scenario.id,
                description: scenario.description
            });
        }

        if(scenario.id == 2){
            this.navCtrl.push(ScenarioTwoPage, {
                id: scenario.id,
                description: scenario.description
            });
        }

        if(scenario.id == 3){
            this.navCtrl.push(ScenarioThreePage, {
                id: scenario.id,
                description: scenario.description
            });
        }

        if(scenario.id == 4){
            this.navCtrl.push(ScenarioFourPage, {
                id: scenario.id,
                description: scenario.description
            });
        }

        // ****************
        // Not Implemented
        // ****************
        // if(scenario.id == 5){
        //     this.navCtrl.push(ScenarioFivePage, {
        //         id: scenario.id,
        //         description: scenario.description
        //     });
        // }

    }

}
