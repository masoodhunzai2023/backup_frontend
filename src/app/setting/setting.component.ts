import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  showMongoForm = false;
  showMySQLForm = false;
  username: string = '';
  password: string = '';
  dbIP: string = '';
  results: any[] = [];
  myForm: FormGroup;
  savedData: any;
  path: string;

  

  constructor(private http: HttpClient, private toastr: ToastrService, private formBuilder: FormBuilder) { 

    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      dbIP: ['', Validators.required],
      path:['', Validators.required]
    });
  }
  ngOnInit(){
    const savedDataString = localStorage.getItem('savedData');
    if (savedDataString) {
      this.savedData = JSON.parse(savedDataString);
      this.username = this.savedData.username;
      this.password = this.savedData.password;
      this.dbIP = this.savedData.dbIP;
      this.path= this.savedData.path;
    }
  }

  showMongo() {
    this.showMongoForm = true;
    this.showMySQLForm = false;
    this.results=[];
  }

  showMySQL() {
    this.showMySQLForm = true;
    this.showMongoForm = false;
    this.results=[];
  }

  handleSaveMongo() {
    const formData = {
      user: this.username,
      pass: this.password,
      host: this.dbIP,
      path: this.path
    };

    console.log('Form Data:', formData);
    const URL = `http://192.168.1.82:8080/mongo/saveMongoHost/body`;
  
    this.http.post(URL,formData).subscribe(
        response => {
          console.log(response);
          this.toastr.success('Successfully saved config for mongo');
          this.savedData = {
            username: this.username,
            password: this.password,
            dbIP: this.dbIP,
            path: this.path
          };
          localStorage.setItem('savedData', JSON.stringify(this.savedData));
        },
        error => {
          console.error('Error saving SQL config:', error);
          this.toastr.error('Error saving config!');
        }
      );
  }
  
  handleSaveSql() {

    const formData = {
      user: this.username,
      pass: this.password,
      host: this.dbIP,
      path: this.path
    };

    console.log('Form Data:', formData);
    const URL = `http://192.168.1.82:8080/sql/saveMysqlHost/body`;
  
    this.http.post(URL,formData).subscribe(
        response => {
          console.log(response);
          this.toastr.success('Successfully saved config for SQL');
          this.savedData = {
            username: this.username,
            password: this.password,
            dbIP: this.dbIP,
            path: this.path
          };
          localStorage.setItem('savedData', JSON.stringify(this.savedData));
        },
        error => {
          console.error('Error saving SQL config:', error);
          this.toastr.error('Error saving config!');
        }
      );
  }

 
  showTable = false;

  viewinTable() {
    if (this.showMongoForm === true) {
      this.http.get('http://192.168.1.82:8080/mongo/getMongoHost').subscribe((data: any) => {
        this.results = Array.isArray(data) ? data : [data];
        this.showTable = true;
      });
    } else if (this.showMySQLForm === true) {
      this.http.get('http://192.168.1.82:8080/sql/getMysqlHost').subscribe((data: any) => {
        this.results = Array.isArray(data) ? data : [data];
        this.showTable = true;
      });
    }
  }
  editMongoForm() {

    this.username = ''; 
    this.password = ''; 
    this.dbIP = ''; 
    this.path='';
  }
  editMySQLForm() {
   
    this.username = ''; 
    this.password = ''; 
    this.dbIP = '';
    this.path='';
  }

}






