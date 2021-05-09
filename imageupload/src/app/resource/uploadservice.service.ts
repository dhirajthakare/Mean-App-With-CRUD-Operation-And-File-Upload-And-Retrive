import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Uploadmodel } from './uploadmodel';

@Injectable({
  providedIn: 'root'
})
export class UploadserviceService {

    readonly insertUrl = "http://localhost:3000/fileupload";
    readonly fetchUrl = "http://localhost:3000/fetchData";
    readonly deleteUrl = "http://localhost:3000/delete";


  constructor(public http:HttpClient) { }

  insertdata(obj:Uploadmodel){
    console.log(obj.file );
    return this.http.post(this.insertUrl,obj);
  

  }
  fetch(){
    return this.http.get(this.fetchUrl);
  }
  deletedata(id){
   return this.http.delete(this.deleteUrl+"/"+id);
  }

}


