import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-scenarioThree',
  templateUrl: 'scenarioThree.html'
})

export class ScenarioThreePage {

    myForm: FormGroup;

    id: any;
    description: any;

    submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

      this.id = this.navParams.get('id');
      this.description = this.navParams.get('description');

      this.myForm = formBuilder.group({
          switch: ['']
      });

  }

  submit() {
      //curl http...
  }

  back() {
      this.navCtrl.pop();
  }

}
