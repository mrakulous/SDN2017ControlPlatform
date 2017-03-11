import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { NodeValidator } from '../../validators/nodeValidator';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-scenarioTwo',
  templateUrl: 'scenarioTwo.html'
})

export class ScenarioTwoPage {

    myForm: FormGroup;

    id: any;
    description: any;

    switchNum: any;
    submitAttempted: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

      this.id = this.navParams.get('id');
      this.description = this.navParams.get('description');

      this.myForm = formBuilder.group({
          switch: ['', NodeValidator.isValid]
      });

  }

  submit(event) {

      //Take user input
      let userInput = this.myForm.value;

      //Check if userinput is valid
      //.valid works if form passes all validation checks within validator
      if(!this.myForm.valid) {
          console.log("User input not valid"); //should be unreachable

     //check if user has submitted already
      } else if (!this.submitAttempted){
          this.submitAttempted = true;

          console.log("Switch:" + userInput.switch);


          // ******************************
          // USED TO SEND THE POST REQUESTS
          // ******************************
          //   this.submitAttempt = true;
          //   let headers = new Headers();
          //
          //   headers.append( 'Content-Type', 'application/json');
          //
          //     let body = {
          //         <Enter xml body>
          //     }
                //
          //   this.http.post('<opendaylightURL>', JSON.stringify(body), {headers: headers})
          //         .subscribe(data => {
          //             console.log(data);
          //         });

          //*****************************************
          //INSERT ALERT POP UP OF SUCCESSFUL REQUEST
          //*****************************************

          this.back();
      }
  }

  back() {
      this.navCtrl.pop();
  }

  showAler

}
