import { Component } from '@angular/core';
import { 
ReactiveFormsModule,
FormBuilder,
Validators,
FormGroup
} from '@angular/forms';


@Component({

selector:'app-fund-transfer',

standalone:true,

imports:[ReactiveFormsModule],

templateUrl:'./fund-transfer.html'

})


export class FundTransferComponent {


transferForm:FormGroup;


constructor(private fb:FormBuilder){


this.transferForm=this.fb.group({

accountNumber:['',
Validators.required],


amount:[
'',
[
Validators.required,
Validators.min(100)
]
]

});


}



transfer(){

if(this.transferForm.valid){

console.log(this.transferForm.value);

alert("Money transferred successfully");

}

else{

alert("Minimum transfer amount is ₹100");

}

}


}