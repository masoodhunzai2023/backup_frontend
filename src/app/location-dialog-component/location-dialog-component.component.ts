import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-location-dialog-component',
  templateUrl: './location-dialog-component.component.html',
  styleUrls: ['./location-dialog-component.component.css']
})
export class LocationDialogComponentComponent {
  selectedOptions: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<LocationDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Copy the selectedOptions from the data object
    this.selectedOptions = [...data.selectedOptions];
  }

  closeDialog(): void {
    this.dialogRef.close(this.selectedOptions);
  }
}

