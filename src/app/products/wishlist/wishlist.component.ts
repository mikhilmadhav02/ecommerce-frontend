import { Component ,OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
wishdetails:any={}

constructor(private api:ApiService ,private nav:Router ){}


ngOnInit(): void {
  this.api.wishdetails().subscribe({next:(res:any)=>{
    console.log('wish full details= ',res);
    this.wishdetails=res
      },error:(err:any)=>{
    console.log(err.error);
    
      }})
}


// common functio



// wishdelete
wishdelete(id:any){
this.api.wishdelete(id).subscribe({next:(res:any)=>{
this.wishdetails = res
},error:(err:any)=>{

}})
}

// carts add
cart(product:any){
  this.api.cartadd(product).subscribe({next:(res:any)=>{
    this.wishdelete(product.id)
    this.api.cartvalue()
    alert(res)
  },error:(err:any)=>{
alert(err.error)
  }})
}
}
