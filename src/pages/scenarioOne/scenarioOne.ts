import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { NodeValidator } from '../../validators/nodeValidator';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-scenarioOne',
  templateUrl: 'scenarioOne.html'
})

export class ScenarioOnePage {

    //class variables
    myForm: FormGroup;

    // id: any;
    // description: any;
    // description_long: any;
    // animation: any;
    // hideAnimation: boolean = true;

    hostNum: any;
    submitAttempted: boolean = false;


    scenarios: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http) {

    //   this.id = this.navParams.get('id');
    //   this.description = this.navParams.get('description');
    //   this.description_long = this.navParams.get('description_long');
    //   this.animation = this.navParams.get('animation');

      this.scenarios = [{
          id: this.navParams.get('id'),
          description: this.navParams.get('description'),
          description_long: this.navParams.get('description_long'),
          animation: this.navParams.get('animation'),
          hideAnimation: this.navParams.get('hideAnimation')
      }]

      this.myForm = formBuilder.group({
          host: ['', NodeValidator.isValid]
      });

  }

  submit(scenario) {


      //Take user input
      let userInput = this.myForm.value;

      //Check if userinput is valid
      //.valid works if form passes all validation checks within validator
      if(!this.myForm.valid) {
          console.log("User input not valid"); //should be unreachable

     //check if user has submitted already
      } else if (!this.submitAttempted){
          this.submitAttempted = true;
        //   scenario.hideAnimation = false;

          console.log("Host:" + userInput.host);


        //   ******************************
        //   USED TO SEND THE POST REQUESTS
        //   ******************************
        let headers = new Headers();

        headers.append( 'Content-Type', 'application/json');

        let body = {
          "flow-node-inventory:table": [
               {
                   "id": 0,
                   "flow": [
                       {
                           "id": "#UF$TABLE*0-36",
                           "instructions": {
                               "instruction": [
                                   {
                                       "order": 1,
                                       "apply-actions": {
                                           "action": [
                                               {
                                                   "order": 1,
                                                   "drop-action": {}
                                               }
                                           ]
                                       }
                                   }
                               ]
                           },
                           "match": {
                               "ethernet-match": {
                                   "ethernet-type": {
                                       "type": 2048
                                   }
                               },
                               "ip-match": {
                                   "ip-protocol": 6
                               },
                               "tcp-destination-port": 80
                           },
                           "table_id": 0,
                           "cookie": 305419896
                       }
                   ]
               }
           ]
        };
        //       {
        //             "flow-node-inventory:table": [
        //                 {
        //                     "id": 0,
        //                     "flow": [
        //                         {
        //                             "id": "#UF$TABLE*0-36",
        //                             "instructions": {
        //                                 "instruction": [
        //                                     {
        //                                         "order": 1,
        //                                         "apply-actions": {
        //                                             "action": [
        //                                                 {
        //                                                     "order": 1,
        //                                                     "drop-action": {}
        //                                                 }
        //                                             ]
        //                                         }
        //                                     }
        //                                 ]
        //                             },
        //                             "match": {
        //                                 "ethernet-match": {
        //                                     "ethernet-type": {
        //                                         "type": 2048
        //                                     }
        //                                 },
        //                                 "ip-match": {
        //                                     "ip-protocol": 6
        //                                 },
        //                                 "tcp-destination-port": 80
        //                             },
        //                             "table_id": 0,
        //                             "cookie": 305419896
        //                         }
        //                     ]
        //                 }
        //             ]
        //         } "
        //   } JSON.stringify(body),

        this.http.post('http://192.168.56.101:8181/restconf/config/opendaylight-inventory:nodes/node/openflow:1/flow-node-inventory:table/0 ', body, {headers: headers})
              .subscribe(data => {
                  console.log(data);
              });

          //*****************************************
          //INSERT ALERT POP UP OF SUCCESSFUL REQUEST
          //*****************************************
      }

  }

  back() {
      this.navCtrl.pop();
  }
}
