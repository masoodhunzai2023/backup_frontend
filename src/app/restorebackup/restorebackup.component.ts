import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-restorebackup',
  templateUrl: './restorebackup.component.html',
  styleUrls: ['./restorebackup.component.css']
})
export class RestorebackupComponent implements OnInit {
  selectedOption: string;
  selectedDate: '';
  filteredData: any[] = [];
  selectAllChecked = false;
  tableRendered: boolean = false;
  dataShow:any;
  checkedoptions: any[] = [];


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}-${year}`;
  }

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  selectAll() {
    const allSelected = this.filteredData.every(item => item.selected);
    this.filteredData.forEach(item => item.selected = !allSelected);

    if (allSelected) {
      // If "select all" is unchecked, clear the checkedoptions array
      this.checkedoptions = [];
    } else {
      // If "select all" is checked, add all items to the checkedoptions array
      this.checkedoptions = [...this.filteredData];
    }
  }

  onOptionSelected(option: string) {
    this.selectedOption = option;
  }

  populateTable() {
    if (this.selectedOption === 'option1') {
      this.http.get(`http://192.168.1.88:8080/mongo/showBackup/${this.formatDate(new Date(this.selectedDate))}`).subscribe((data: any) => {
        if (Object.keys(data).length === 0) {
          this.filteredData = []; // No data backup on selected date
          alert('No data backup available for the selected date');
        } else {
          this.filteredData = Object.entries(data).map(([key, value]) => {
            return {
              name: key,
              contents: value,
              downloadLink: `http://192.168.1.88:8080/mongo/zip/${key}`
            };
          });
        }
      });
    } else if (this.selectedOption === 'option2') {
      this.http.get(`http://192.168.1.88:8080/sql/showBackupFiles/${this.formatDate(new Date(this.selectedDate))}`).subscribe((data: any) => {
        if (Object.keys(data).length === 0) {
          this.filteredData = []; // No data backup on selected date
          alert('No data backup available for the selected date');
        } else {
          this.filteredData = Object.entries(data).map(([key, value]) => {
            return {
              name: key,
              contents: value,
              downloadLink: `http://192.168.1.88:8080/sql/createzip/${key}`
            };
          });
        }
      });
    }
  }
  
  
  
  sqlData(option: string){
    this.filteredData = [];
    this.selectedDate=''
    this.tableRendered = false;  
    this.selectedOption = option;
  }

  mongoData(option:string){
    this.filteredData = [];
    this.selectedDate=''
    this.tableRendered = false;  
    this.selectedOption = option;
  } 
  updateSelectedItems() {
    this.checkedoptions = this.filteredData.filter(item => item.selected);
  }
  restoreData(){
    this.checkedoptions.forEach(date => {
      if (date.selected) {
        if(this.selectedOption === "option1")
          date.contents.forEach((type:string) =>{
            this.http.get(`http://192.168.1.88:8080/mongo/restore/${date.name}/${type}`).subscribe(
              (response) => {
                const result= 
                // handle success
                console.log(response);
              },
              (error) => {
                // handle error
                console.log(error);
              }
            );
          })

          if(this.selectedOption === "option2")

          date.contents.forEach((type:string) =>{
            this.http.get(`http://192.168.1.88:8080/sql/restore/${date.name}/${type}`).subscribe(
              (response) => {
                // handle success
                console.log(response);
              },
              (error) => {
                // handle error
                console.log(error);
              }
            );
          })
        }
      });
  }
  
    }
    

   
    
     






