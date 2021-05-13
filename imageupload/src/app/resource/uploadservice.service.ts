import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Uploadmodel } from './uploadmodel';

@Injectable({
  providedIn: 'root'
})
export class UploadserviceService {

  public model:Uploadmodel;
  public storedata:Uploadmodel[];

    readonly insertUrl = "http://localhost:3000/fileupload";
    readonly fetchUrl = "http://localhost:3000/fetchData";
    readonly updateUrl = "http://localhost:3000/fileupload/";
    readonly deleteUrl = "http://localhost:3000/delete";


  constructor(public http:HttpClient) { }

  insertdata(obj:any){
    return this.http.post(this.insertUrl,obj);
  

  }
  update(obj:any,id:any){
    return this.http.post(this.updateUrl+id,obj);
  

  }
  fetch(){
    return this.http.get(this.fetchUrl);
  }
  deletedata(id){
   return this.http.delete(this.deleteUrl+"/"+id);
  }

}


