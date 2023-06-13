
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LocationDialogComponentComponent } from '../location-dialog-component/location-dialog-component.component';

@Component({
  selector: 'app-takebackup',
  templateUrl: './takebackup.component.html',
  styleUrls: ['./takebackup.component.css']
})
export class TakebackupComponent implements OnInit {
  selectedOption: string;
  options: string[];
  selectedOptions: string[];
  results: any;
  dropdownData: string[];
  dataBackup: any;
  backupInProgress: boolean;

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.selectedOptions = [];
    this.results = [];
  }

  onOptionSelected(option: string) {
    this.selectedOption = option;
  }

  onOptionChange(event: any) {
    if (event.target.checked) {
      this.selectedOptions.push(event.target.value);
    } else {
      const index = this.selectedOptions.indexOf(event.target.value);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
      }
    }
  }

  showResults() {
    let val;
    if (this.selectedOption === 'option1') {
      val = 'mongo/backup';
    } else {
      val = 'sql/getbackup';
    }
    this.backupInProgress = true;
    this.http.get(`http://192.168.1.82:8080/${val}/${this.selectedOptions}`).subscribe((data: any) => {
      if (data) {
        this.dataBackup = data;
        this.results = this.dataBackup.map((dropdownData: any) => {
          return {
            option: this.selectedOption === 'option1' ? dropdownData.Database : dropdownData.database,
            result: dropdownData.Date,
            downloadLink: this.selectedOption === 'option1'? `http://192.168.1.82:8080/mongo/zip/${dropdownData.Date}`:`http://192.168.1.82:8080/sql/createzip/${dropdownData.Date}`
          };
        });
      }
      this.backupInProgress = false;
    });
  }

  getDataFromBackendsql(option: string) {
    this.results = [];
    this.dropdownData = [];
    this.selectedOption = option;
    this.http.get('http://192.168.1.82:8080/sql/alldatabases').subscribe((data) => {
      if (data) {
        this.dropdownData = Object.values(data);
        console.log(this.dropdownData);
      }
    });
  }

  getDataFromBackendmongo(option: string) {
    this.results = [];
    this.selectedOption = option;
    this.dropdownData = [];
    this.http.get('http://192.168.1.82:8080/mongo/showAll').subscribe((data) => {
      if (data) {
        this.dropdownData = Object.values(data);
      }
    });
  }
  openLocationDialog() {
    const dialogRef = this.dialog.open(LocationDialogComponentComponent, {
      width: '400px',
      data: { selectedOptions: this.selectedOptions }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedOptions = result;
      }
    });
  }

  ngOnInit(): void {}
}
