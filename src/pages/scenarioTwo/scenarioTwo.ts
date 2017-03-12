import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { NodeValidator } from '../../validators/nodeValidator';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-scenarioTwo',
  templateUrl: 'scenarioTwo.html'
})

export class ScenarioTwoPage {

    myForm: FormGroup;

    id: any;
    description: any;
    description_long: any;

    hostNum: any;
    submitAttempted: boolean = false;

    //HTTP Request args
    enableButton: boolean=false;
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

      this.myForm = formBuilder.group({
          host: ['', NodeValidator.isValid]
      });

  }

  submit(scenario) {

      //Take user input
      let userInput = this.myForm.value;

      //Check if userinput is valid
      //.valid works if form passes all validation checks within validator
      if (!this.myForm.valid) {
          console.log("User input not valid"); //should be unreachable due to form validator

     //check if user has submitted already
      } else if (!this.submitAttempted){

          this.submitAttempted = true;
          this.enableButton = true;

          let switchNum = this.getSwitch(userInput.host);

          this.url = 'http://192.168.56.101:8181/restconf/config/opendaylight-inventory:nodes/node/openflow:' + switchNum + '/flow-node-inventory:table/0';



          console.log("Switch:" + switchNum);
          console.log("Host:" + userInput.host);

          //   ******************************
          //   USED TO SEND THE POST REQUESTS
          //   ******************************
          this.headers = new Headers({'Content-Type': 'application/json'});
          this.headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
          //let options = new RequestOptions({headers: headers});
          if (userInput.host > 9) {
              this.body = {
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
                                            },
                                            "ethernet-source": {
                                                "address": "00:00:00:00:00:" + userInput.host + ""
                                            }
                                        },
                                        "ip-match": {
                                            "ip-protocol": 6
                                        }
                                    },
                                    "table_id": 0,
                                    "cookie": 305419896
                                }
                            ]
                        }
                    ]
              };
          } else {// if single digit host
              this.body = {
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
                                            },
                                            "ethernet-source": {
                                                "address": "00:00:00:00:00:0" + userInput.host + ""
                                            }
                                        },
                                        "ip-match": {
                                            "ip-protocol": 6
                                        }
                                    },
                                    "table_id": 0,
                                    "cookie": 305419896
                                }
                            ]
                        }
                    ]
              };
          }


          this.http.put(this.url, this.body, {headers: this.headers})
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

  //Handle HTTP request error
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

  //Select switch based on host selection, each host is tied to a switch.
  private getSwitch(host) {
      let hostNum = host;

      if (hostNum <= 2) {
          return 1;
      } else if (hostNum > 2 && hostNum <= 4) {
          return 2;
      } else if (hostNum > 4 && hostNum <= 6) {
          return 3;
      } else if (hostNum > 6 && hostNum <= 8) {
          return 4;
      } else if (hostNum > 8 && hostNum <= 10) {
          return 5;
      } else if (hostNum == 11) {
          return 6;
      } else if (hostNum == 12) {
          return 7;
      } else if (hostNum == 13) {
          return 8;
      } else if (hostNum == 14) {
          return 9;
      } else if (hostNum == 15) {
          return 10;
      } else if (hostNum == 16) {
          return 11;
      }

      return null;
  }
}
