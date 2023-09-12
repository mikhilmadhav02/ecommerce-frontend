import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products:any[],searchkey:string,name:string): any[] {
    const result:any=[]
    if(!products || searchkey=="" || name==""){
      return products
    }else{
      products.forEach((item:any)=>{
        if(item[name].trim().toLowerCase().includes(searchkey.trim().toLowerCase())){
          result.push(item)
        }
      })
    }
    return result
  }

}
