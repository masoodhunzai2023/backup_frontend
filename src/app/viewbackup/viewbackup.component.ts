import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-viewbackup',
  templateUrl: './viewbackup.component.html',
  styleUrls: ['./viewbackup.component.css']
})

export class ViewbackupComponent implements OnInit {
  selectedOption: string;
  selectedDate: '';
  filteredData: any[] = [];

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}-${year}`;
  }
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  viewbackupmongo(option: string) {
    this.selectedOption = option;
    this.selectedDate = '';
    this.filteredData = [];

  }

  viewbackupsql(option: string) {
    this.selectedOption = option;
    this.selectedDate = '';
    this.filteredData = [];
  
  }

  //HTTP request to either mongo or sql depending on the value of selectedOption
  populateTable() {
    if (this.selectedOption === 'option1') {
      this.http.get(`http://192.168.1.88:8080/mongo/showBackup/${this.formatDate(new Date(this.selectedDate))}`).subscribe((data: any) => {
        this.filteredData = Object.entries(data).map(([key, value]) => {
          return {
            name: key,
            contents: value,
            downloadLink: `http://192.168.1.88:8080/mongo/zip/${key}`
          };
        });
      });
    } else if (this.selectedOption === 'option2') {
      this.http.get(`http://192.168.1.88:8080/sql/showBackupFiles/${this.formatDate(new Date(this.selectedDate))}`).subscribe((data: any) => {
        this.filteredData = Object.entries(data).map(([key, value]) => {
          return {
            name: key,
            contents: value,
            downloadLink: `http://192.168.1.88:8080/sql/createzip/${key}`
          };
        });
      });
    }
  }
  
}

