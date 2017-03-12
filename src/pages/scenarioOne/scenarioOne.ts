import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { SwitchValidator } from '../../validators/switchValidator';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-scenarioOne',
  templateUrl: 'scenarioOne.html'
})

export class ScenarioOnePage {

    //class variables
    myForm: FormGroup;

    id: any;
    description: any;
    description_long: any;
    // animation: any;
    // hideAnimation: boolean = true;

    //switchNum: any;
    submitAttempted: boolean = false;


    scenarios: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http) {

      this.id = this.navParams.get('id');
      this.description = this.navParams.get('description');
      this.description_long = this.navParams.get('description_long');

      this.scenarios = [{
          id: this.navParams.get('id'),
          description: this.navParams.get('description'),
          description_long: this.navParams.get('description_long'),
          animation: this.navParams.get('animation'),
          hideAnimation: this.navParams.get('hideAnimation')
      }];

      this.myForm = formBuilder.group({
          switch: ['', SwitchValidator.isValid]
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
        let username = 'admin';
        let password = 'admin';
        let url = 'http://192.168.56.101:8181/restconf/config/opendaylight-inventory:nodes/node/openflow:' + userInput.switch + '/flow-node-inventory:table/0'

        this.submitAttempted = true;
        //   scenario.hideAnimation = false;

        console.log("Switch:" + userInput.switch);

        //   ******************************
        //   USED TO SEND THE POST REQUESTS
        //   ******************************
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append("Authorization", "Basic " + btoa(username + ":" + password));
        //let options = new RequestOptions({headers: headers});

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


        this.http.put(url, body, {headers: headers})
              .catch(this.handleError)
              .subscribe(data => {
                  console.log(data);
              });

          //*****************************************
          //INSERT ALERT POP UP OF SUCCESSFUL REQUEST
          //*****************************************
      }

  }

  // *************************
  //   TODO
  // *************************

  refresh(){
      let userInput = this.myForm.value;

      if(this.submitAttempted) {
          let username = 'admin';
          let password = 'admin';
          let url = 'http://192.168.56.101:8181/restconf/config/opendaylight-inventory:nodes/node/openflow:' + userInput.switch + '/flow-node-inventory:table/0'

          this.submitAttempted = true;
          //   scenario.hideAnimation = false;

          console.log("Switch:" + userInput.switch);

          //   ******************************
          //   USED TO SEND THE POST REQUESTS
          //   ******************************
          let headers = new Headers({'Content-Type': 'application/json'});
          headers.append("Authorization", "Basic " + btoa(username + ":" + password));
          //let options = new RequestOptions({headers: headers});

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


          this.http.put(url, body, {headers: headers})
                .catch(this.handleError)
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

  private handleError (error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
