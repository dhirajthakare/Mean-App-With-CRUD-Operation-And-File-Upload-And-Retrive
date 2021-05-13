import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Uploadmodel } from '../resource/uploadmodel';
import { UploadserviceService } from '../resource/uploadservice.service';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css']
})
export class UploadimageComponent implements OnInit {
  image;
  multipleimage = [];
  Id;
  Name;
  Email;
  Mob;
  file;
  data=[];
  displaySubmit="block";
  displayUpdate="none";

  constructor(
    public http:HttpClient,
    public service : UploadserviceService
    ) { }

  ngOnInit(): void {
    this.fetchdataList();
    this.reset();
  }
  
    // For get image
  selectImage(event){

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.image=file;
    }

  }


    //for insert and upload record
  onsubmit(form:NgForm){
   
    form.value.file=this.image;

      const formData = new FormData();
      formData.append('Name',this.service.model.Name)
      formData.append('Email',this.service.model.Email)
      formData.append('Mob',this.service.model.Mob)
      formData.append('file',this.image);

      this.service.insertdata(formData).subscribe((res)=>{
        console.log(res); 
        this.reset(form);
        this.fetchdataList();

      })

  }

  // for reset Form
  reset(form?:NgForm){
    if(form)
    form.reset();

    this.service.model = {

      _id: "",
      Name:"",
      Email:"",
      Mob:"",
      file:""
  
  }
   
    
  }

  // fetch data And image from server
  fetchdataList(){

  this.service.fetch().subscribe((res)=>{
 this.data = res as Uploadmodel[];
  })
  }

  
  // for delete record
  delete(id){

    if(confirm("Are you Sur You Want to Delete It? ")){
    this.service.deletedata(id).subscribe((res)=>{
      this.fetchdataList();
    })
  }
  
  }

  // for assign value to  form
  Edit(item){
   this.service.model=item;
    this.displaySubmit="none";
    this.displayUpdate="block";
    
  }


  // Update existing record
  update(form?:NgForm){
    
    const formData = new FormData();
    formData.append('Name',this.service.model.Name)
    formData.append('Email',this.service.model.Email)
    formData.append('Mob',this.service.model.Mob)
    formData.append('file',this.image);

      this.service.update(formData,this.service.model._id).subscribe((res)=>{
        console.log(res); 
        this.reset(form);
        this.fetchdataList();
        this.displaySubmit="block";
        this.displayUpdate="none";

      })
  }


}
