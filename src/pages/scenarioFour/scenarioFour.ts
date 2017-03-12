import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { NodeValidator } from '../../validators/nodeValidator';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-scenarioFour',
  templateUrl: 'scenarioFour.html'
})

export class ScenarioFourPage {

    myForm: FormGroup;

    id: any;
    description: any;

    bandwidth: any;
    submitAttempted: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

      this.id = this.navParams.get('id');
      this.description = this.navParams.get('description');

      this.myForm = formBuilder.group({
          bandwidth: ['', NodeValidator.isValid]
      });

  }

  submit(scenario) {
      //curl http...
  }

  back() {
      this.navCtrl.pop();
  }
}
