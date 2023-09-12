import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  searchkey:any
response:any=[]
constructor(private data:ApiService ){}



ngOnInit(): void {
  this.data.allproducts().subscribe({next:(res:any)=>{
    this.response = res
    console.log(`frontend response from server= ${res}`);
    
  },error:(err:any)=>{
    console.log(`frontend error from server, error= ${err.error}`);
    
  }})



  // searchkey
  this.data.searchkey.subscribe({next:(res:any)=>{
    this.searchkey = res
  }})
}

// cartadd
cart(product:any){
  this.data.cartadd(product).subscribe({next:(res:any)=>{
    this.data.cartvalue()
    alert(res)
  },error:(err:any)=>{
alert(err.error)
  }})
}


}
