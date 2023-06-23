import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-clean-db',
  templateUrl: './clean-db.component.html',
  styleUrls: ['./clean-db.component.css']
})
export class CleanDbComponent implements OnInit {
  selectedOption: string;
  options: string[];
  selectedOptions: string[];
  results: any[] = []; 
  selectedDatabases:[] = [];
  dropdownData: any[];
  dataBackup: any;
  showdatabases: boolean;
  filteredTableNames: string[] = [];
  selectedItems: string[] = [];
  orgaCode: string;


  p: number = 1; 
  pageSize: number = 4; 
  

  onPageChange(event: number) {
    this.p = event; 
  }


  constructor(private http: HttpClient) {
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
    val = 'sql/showTables';
  }

  this.showdatabases = true;
  this.http.get(`http://192.168.1.88:8080/${val}/${this.selectedOptions}`).subscribe((data: any) => {
    if (data) {
      this.results = data.map((item: []) => {
        return {
          name: item,
          selected: false 
        };
      });
    }
    this.showdatabases = false;
  });
}

 removeSelected() {
  let endpoint;
  if (this.selectedOption === 'option1') {
    endpoint = 'mongo/remove';
  } else {
    endpoint = `sql/deleteData/${this.selectedOptions[0]}/${this.selectedItems}`;
  }
  const url = `http://192.168.1.88:8080/${endpoint}`;
  
  this.http.request('delete', url, { body: this.selectedDatabases }).subscribe((data: any) => {
    if (data) {
      this.results = data.map((item: []) => item);
    }
    console.log(this.selectedItems);
    this.showdatabases = false;
  });

 }  
 deleteOrgaCode(event: Event) {
  event.preventDefault(); // Prevent the default form submission behavior

  let endpoint: string;

  if (this.selectedOption === 'option1') {
    endpoint = `http://192.168.1.88:8080/mongo/clean/${this.selectedOptions}/${this.orgaCode}`;
  } else if (this.selectedOption === 'option2') {
    endpoint = `http://192.168.1.88:8080/sql/deleteSpecialRow/${this.selectedOptions}/${this.orgaCode}`;
  this.http.get(endpoint).subscribe(
    (response) => {
      // Handle the response if needed
      console.log('GET request successful', response);
    },
    (error) => {
      // Handle the error if needed
      console.error('GET request error', error);
    }
  );
}
}


  Del_rest_of_orga_code(event:Event){
    event.preventDefault(); // Prevent the default form submission behavior

    const endpoint = `http://192.168.1.88:8080/sql/deleteRestOfRow/${this.selectedOptions}/${this.orgaCode}`;

    this.http.get(endpoint).subscribe(
      (response) => {
        // Handle the response if needed
        console.log('GET request successful', response);
      },
      (error) => {
        // Handle the error if needed
        console.error('GET request error', error);
      }
    );
  }
  
  

  getDataFromBackendsql(option: any) {
    this.results = [];
    this.dropdownData = [];
    this.selectedOption = option;
    this.http.get('http://192.168.1.88:8080/sql/alldatabases').subscribe((data) => {
      if (data) {
        this.dropdownData = Object.values(data);
        console.log(this.dropdownData);
      }
    });
  }
  onCheckboxChange(item: any) {
    if (item.selected) {
      this.selectedItems.push(item.name);
    } else {
      const index = this.selectedItems.indexOf(item.name);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    }
  }
  


  getDataFromBackendmongo(option: string) {
    this.results = [];
    this.selectedOption = option;
    this.dropdownData = [];
    this.http.get('http://192.168.1.88:8080/mongo/showAll').subscribe((data) => {
      if (data) {
        this.dropdownData = Object.values(data);
      }
    });
  }

  ngOnInit(): void {}
}
