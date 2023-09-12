import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
length:any


constructor(private data:ApiService){}

ngOnInit(): void {
  this.data.count.subscribe({next:(res:any)=>{
this.length= res
  },error:(err:any)=>{
alert('error in getting cart products')
  }})



  
}

search(event:any){
  const{value}=event.target
  this.data.searchkey.next(value)
  
}




}