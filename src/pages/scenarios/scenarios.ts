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
            {id: '1', description: 'Host - Blocking', description_long: '', animation: 'https://publish.animatron.io/1159e456740f7574676a6143?w=640&amp;h=360&amp;a=1&amp;r=0&amp;c=0', hideAnimation: true},
            {id: '2', description: 'Switch - Blocking', description_long: '', animation: 'https://publish.animatron.io/1159e456740f7574676a6143?w=640&amp;h=360&amp;a=1&amp;r=0&amp;c=0', hideAnimation: true},
            {id: '3', description: 'Traffic Rerouting', description_long: '', animation: 'https://publish.animatron.io/1159e456740f7574676a6143?w=640&amp;h=360&amp;a=1&amp;r=0&amp;c=0', hideAnimation: true},
            {id: '4', description: 'Bandwidth Control', description_long: '', animation: 'https://publish.animatron.io/1159e456740f7574676a6143?w=640&amp;h=360&amp;a=1&amp;r=0&amp;c=0', hideAnimation: true},
            {id: '5', description: 'Network Virtualization', description_long: '', animation: 'https://publish.animatron.io/1159e456740f7574676a6143?w=640&amp;h=360&amp;a=1&amp;r=0&amp;c=0', hideAnimation: true}
        ];

    }

    handleClick(scenario) {

        if(scenario.id == 1){

            this.navCtrl.push(ScenarioOnePage, {
                id: scenario.id,
                description: scenario.description,
                description_long: scenario.description_long,
                animation: scenario.animation,
                hideAnimation: scenario.hideAnimation
            });
        }

        if(scenario.id == 2){
            this.navCtrl.push(ScenarioTwoPage, {
                id: scenario.id,
                description: scenario.description,
                description_long: scenario.description_long,
                animation: scenario.animation,
                hideAnimation: scenario.hideAnimation
            });
        }

        if(scenario.id == 3){
            this.navCtrl.push(ScenarioThreePage, {
                id: scenario.id,
                description: scenario.description,
                description_long: scenario.description_long,
                animation: scenario.animation,
                hideAnimation: scenario.hideAnimation
            });
        }

        if(scenario.id == 4){
            this.navCtrl.push(ScenarioFourPage, {
                id: scenario.id,
                description: scenario.description,
                description_long: scenario.description_long,
                animation: scenario.animation,
                hideAnimation: scenario.hideAnimation
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
