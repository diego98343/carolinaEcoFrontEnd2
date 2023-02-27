import { FormControl, ValidationErrors } from "@angular/forms";

export class EcommerceValidator {


   static noOnlyWhiteSpace(control: FormControl): ValidationErrors{

    //chaeck if the string only contains whitespace

    if((control.value !=null) && (control.value.trim().length===0)){
        return {'noOnlyWhiteSpace':true}
    }
    //valid return null
    return null;
   }

}
