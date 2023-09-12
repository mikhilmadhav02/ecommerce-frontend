import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
product:any={}
wishresponse:boolean=false
wisherror:boolean=false
  constructor(private route:ActivatedRoute ,private view:ApiService){}

ngOnInit(): void {
  this.route.params.subscribe({next:(res:any)=>{
   
    const{id}=res
console.log(id);

// apicall
this.view.viewproduct(id).subscribe({next:(response:any)=>{
  console.log(response);
  this.product = response
  console.log(this.product);
 
},error:(err:any)=>{
  console.log(`${err}`);
  }})
// f
 console.log(id);
  },error:(err:any)=>{

  }})

}

// add to wishlist function
addtowishlist(){
 const id= this.product.id
 const title= this.product.title
 const price= this.product.price
 const image= this.product.image

 this.view.wishlistadd(id,title,price,image).subscribe({next:(res:any)=>{
  this.wishresponse=true
  console.log('product addes to wishlist',res);
  setTimeout(() => {
    this.wishresponse=false
  }, 2000);
  
 },error:(err:any)=>{
  this.wisherror=true
  console.log(`error, ${err.error}`);
  setTimeout(()=>{
this.wisherror=false
  },2000)
 }})
}



// carts add
cart(product:any){
  this.view.cartadd(product).subscribe({next:(res:any)=>{
    this.view.cartvalue()
    alert(res)
  },error:(err:any)=>{
alert(err.error)
  }})
}
}
