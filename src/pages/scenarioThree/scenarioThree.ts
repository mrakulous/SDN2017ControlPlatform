import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ScenarioThreeValidator } from '../../validators/scenarioThreeValidator';
import { ScThreeNodeValidator } from '../../validators/scThreeNodeValidator';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-scenarioThree',
  templateUrl: 'scenarioThree.html'
})

export class ScenarioThreePage {

    myForm: FormGroup;

    id: any;
    description: any;
    description_long: any;

    submitAttempted: boolean = false;
    scenarios: any;
    enableButton: boolean=false;

    //HTTP Request args

    body: any;
    url: any;
    headers: any;

    //OpenDaylight Authorization
    username = 'admin';
    password = 'admin';

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
          switch: ['', ScenarioThreeValidator.isValid],
          host: ['', ScThreeNodeValidator.isValid]
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
        this.enableButton = true;

        console.log("Switch: " + userInput.switch);
        console.log("Switch: " + userInput.host);

        //Opendaylight authorization
        this.url = 'http://192.168.56.101:8181/restconf/config/opendaylight-inventory:nodes/node/openflow:' + userInput.switch + '/flow-node-inventory:table/0/flow/1';



        //   scenario.hideAnimation = false;

        console.log("Switch:" + userInput.switch);
        console.log("Host:" + userInput.host);

        //   ******************************
        //   USED TO SEND THE POST REQUESTS
        //   ******************************
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
        //let options = new RequestOptions({headers: headers});

        if (userInput.host > 9) {
            this.body = {
                "flow-node-inventory:flow": [
                  {
                      "id": "1",
                      "instructions": {
                          "instruction": [
                              {
                                  "order": 1,
                                  "apply-actions": {
                                      "action": [
                                          {
                                              "order": 1,
                                              "set-dl-dst-action": {
                                                  "address": "00:00:00:00:00:10"
                                              }
                                          },
                                          {
                                              "order": 2,
                                              "set-nw-dst-action": {
                                                  "ipv4-address": "10.0.0.10/32"
                                              }
                                          },
                                          {
                                              "order": 3,
                                              "output-action": {
                                                  "output-node-connector": "6"
                                              }
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
                          "ipv4-destination": "10.0.0.0/29",
                          "ip-match": {
                              "ip-proto": "ipv4"
                          }
                      },
                      "table_id": 0,
                      "cookie": 53617458
                  }
              ]
            };
        } else {
            this.body = {
                "flow-node-inventory:flow": [
                  {
                      "id": "1",
                      "instructions": {
                          "instruction": [
                              {
                                  "order": 1,
                                  "apply-actions": {
                                      "action": [
                                          {
                                              "order": 1,
                                              "set-dl-dst-action": {
                                                  "address": "00:00:00:00:00:0" + userInput.host + ""
                                              }
                                          },
                                          {
                                              "order": 2,
                                              "set-nw-dst-action": {
                                                  "ipv4-address": "10.0.0." + userInput.host + "/32"
                                              }
                                          },
                                          {
                                              "order": 3,
                                              "output-action": {
                                                  "output-node-connector": "6"
                                              }
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
                          "ipv4-destination": "10.0.0.0/29",
                          "ip-match": {
                              "ip-proto": "ipv4"
                          }
                      },
                      "table_id": 0,
                      "cookie": 53617458
                  }
              ]
            };
        }


        this.http.delete(this.url, new RequestOptions ({
            headers: this.headers,
            body: this.body
        }))
              .catch(this.handleError)
              .subscribe(data => {
                  console.log(data);
              });

          //*****************************************
          //INSERT ALERT POP UP OF SUCCESSFUL REQUEST
          //*****************************************
      }
  }

  refresh() {
      let userInput = this.myForm.value;

      if(this.submitAttempted) {
          console.log("Switch:" + userInput.switch);

          //Headers and body passed into options param of delete
          this.http.delete(this.url, new RequestOptions({
              headers: this.headers,
              body: this.body
          }))
                .catch(this.handleError)
                .subscribe(data => {
                    console.log(data);
                });
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
