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
            {id: '1', icon: 'md-remove-circle', description: 'Switch - Blocking', description_long: 'This feature will enable the user to block HTTP traffic by blocking port 80 on the selected switch.', disableButton: false},
            {id: '2', icon: 'md-pause', description: 'Host - Blocking', description_long: 'This feature will enable the user to block HTTP traffic by blocking port 80 on the selected host.', disableButton: false},
            {id: '3', icon: 'md-git-branch', description: 'Traffic Rerouting', description_long: 'This feature will enable the user to reroute traffic.', disableButton: false},
            {id: '4', icon: 'ios-funnel', description: 'Bandwidth Control', description_long: 'This feature will enable users to control the bandwidth limit of a host.', disableButton: false},
            {id: '5', icon: 'md-globe', description: 'Network Virtualization', description_long: '', disableButton: true}
        ];

    }

    handleClick(scenario) {

        if(scenario.id == 1){

            this.navCtrl.push(ScenarioOnePage, {
                id: scenario.id,
                description: scenario.description,
                description_long: scenario.description_long
            });
        }

        if(scenario.id == 2){
            this.navCtrl.push(ScenarioTwoPage, {
                id: scenario.id,
                description: scenario.description,
                description_long: scenario.description_long
            });
        }

        if(scenario.id == 3){
            this.navCtrl.push(ScenarioThreePage, {
                id: scenario.id,
                description: scenario.description,
                description_long: scenario.description_long
            });
        }

        if(scenario.id == 4){
            this.navCtrl.push(ScenarioFourPage, {
                id: scenario.id,
                description: scenario.description,
                description_long: scenario.description_long
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
