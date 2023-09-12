import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  showSuccess:boolean=false
  showCancel:boolean=false
  showError:boolean=false
  public payPalConfig?: IPayPalConfig;
modelfooter:boolean=true
products:any=[]
emptycart:any
cartotalamount:number=0
click:boolean=false
pay:boolean=false
offer:boolean=false
discountm:boolean=true
discountn:boolean=true
checkout = this.form.group({
username:['',[Validators.required,]],
flat:['',[Validators.required,]],
state:['',[Validators.required,]],
pincode:['',[Validators.required,]]
})

username:any
flat:any
state:any
pincode:any



constructor(private data:ApiService,private form:FormBuilder){}
// checkout
check(){
if(this.checkout.valid){
  this.click=true


   this.username=this.checkout.value.username
   this.flat = this.checkout.value.flat
   this.state = this.checkout.value.state
   this.pincode = this.checkout.value.pincode
  



}else{
  alert('enter valid details')
}
}

ngOnInit(): void {
  this.data.getcarts().subscribe({next:(res:any)=>{
     this.products = res
this.cartotal()
this.initConfig()
  },error:(err:any)=>{
      this.emptycart = err
  }})
}
// localstorage

// cartdelete
cartdelete(id:any){
this.data.cartdelete(id).subscribe({next:(res:any)=>{
this.ngOnInit()
this.data.cartvalue()
},error:(err:any)=>{

}})
}


// emptycart
cart(){
  this.data.emptycart().subscribe({next:(res:any)=>{
    this.ngOnInit()
    this.data.cartvalue()

this.cartotal()
  },error:(err:any)=>{

  }})
}

// carttotal
cartotal(){
  let total:number=0
  this.products.forEach((item:any)=>{
   total= total+item.total
      this.cartotalamount = Math.ceil(total)
  })
}


// quantity plus
plus(id:any){
this.data.quantityplus(id).subscribe({next:(res:any)=>{
  console.log('plus res = ', res);
  
this.products = res
this.cartotal()
},error:(err:any)=>{
console.log(err);

}})
}

// minus
minus(id:any){
  this.data.quantityminus(id).subscribe({next:(res:any)=>{
    console.log('plus res = ', res);
    
  this.products = res
  this.cartotal()
  this.data.cartvalue()
  },error:(err:any)=>{
  console.log(err);
  
  }})
  }


offers(){
this.offer=true
}


// discount
discount10(){
if(this.cartotalamount>50 && this.cartotalamount<250){
  
  this.discountn=false
  this.discountm=false
  this.cartotalamount -= Math.ceil(this.cartotalamount*.1)
}else{
  alert('offer cannot apply')
}
}

discount50(){
  if(this.cartotalamount>250 ){
    
    this.discountn=false
    this.discountm=false
    this.cartotalamount -= Math.ceil(this.cartotalamount*.5)
  }else{
    alert('offer cannot apply')
  }
  }

  // 
  paypal(){
    this.pay=true
  }

  // paypal function


  private initConfig(): void {

    let amount = this.cartotalamount.toString()
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value:amount
              }
            }
          },
          
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
      this.cart()
      this.modelfooter=false
      this.pay=false

    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
      this.showCancel=true
      this.pay=false
    },
    onError: err => {
      console.log('OnError', err);
      this.showError=true
      this.pay=false
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

// payapal ends

}
