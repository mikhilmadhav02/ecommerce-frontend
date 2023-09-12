import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   count = new BehaviorSubject(0)
   searchkey = new BehaviorSubject("")
base_url='http://localhost:3000'
  constructor(private api:HttpClient) {
    this.cartvalue()
   }

 allproducts(){
  return this.api.get(`${this.base_url}/allproducts`)
 }

//  viewproduct
viewproduct(id:any){
  return this.api.get(`${this.base_url}/view/${id}`)
}

// wishlistadd
wishlistadd(id:any,title:any,price:any,image:any){
  const body={id,title,price,image}
  return this.api.post(`${this.base_url}/wishlist`,body)
}

// wishdetails
wishdetails(){
 return this.api.get(`${this.base_url}/wishdetails`)
}
// wishdelete
wishdelete(id:any){
  return this.api.delete(`${this.base_url}/wishdelete/${id}`)
}
// addtocart
cartadd(product:any){
  const body={
    id:product.id,
    title:product.title,
    price:product.price,
    image:product.image,
    
  }
  return this.api.post(`${this.base_url}/cartsadd`,body)
}
// all carts products
getcarts(){
 return this.api.get(`${this.base_url}/getcarts`)
}

// cartdelete
cartdelete(id:any){
  return this.api.delete(`${this.base_url}/cartdelete/${id}`)
}

// emptycart
emptycart(){
 return this.api.delete(`${this.base_url}/emptycart`)
}

cartvalue(){
  this.getcarts().subscribe({next:(res:any)=>{

this.count.next(res.length)
  }})
}

// plus
quantityplus(id:any){
  return this.api.get(`${this.base_url}/plus/${id}`)
}

// minus
quantityminus(id:any){
  return this.api.get(`${this.base_url}/minus/${id}`)
}

// serachkey

}
