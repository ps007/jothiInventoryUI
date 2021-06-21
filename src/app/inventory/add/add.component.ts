import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service'
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private apiService:ApiService) { }
  ImageBaseData:string | ArrayBuffer=null;
  InventoryList:any;
  error:any;
  filename:string;

  @ViewChild('inputFile') 
  myInputVariable;
  
  ngOnInit() {
  }

  uploadfile()
  {
        
    if(this.ImageBaseData==null){
      alert("Please select file");
    }else{     
      var fileContent=this.ImageBaseData.toString();
      const data={
        
      fileContent:fileContent.split(",")[1],
      fileName:this.filename

      }
      console.log(data);
      this.apiService.uploadfile(data).subscribe(data =>{ 
        this.InventoryList=data.inventoryList;
        this.error=data.error;
        this.myInputVariable.nativeElement.value = '';
        this.ImageBaseData=null;
      },
      error => {
        alert(error.message);
      });
    }
    
    
  }


  filetoBase64(files: FileList) {
    let me = this;
    let file = files[0];
   this.filename=files[0].name;
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      me.ImageBaseData=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

}
