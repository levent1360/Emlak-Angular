import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cikis-dialog',
  templateUrl: './cikis-dialog.component.html',
  styleUrls: ['./cikis-dialog.component.scss']
})
export class CikisDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CikisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}
