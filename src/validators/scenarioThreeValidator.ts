import { FormControl } from '@angular/forms';

//Used to validate form input
export class ScenarioThreeValidator {

    static isValid(control: FormControl): any {

        //check if number
        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }

        //check if integer
        if(control.value % 1 !== 0){
           return {
               "not a whole number": true
           };
       }

       if(control.value > 5 || control.value < 1){
           return {
               "switch does not exist": true
           };
       }

       return null;
    }
}
