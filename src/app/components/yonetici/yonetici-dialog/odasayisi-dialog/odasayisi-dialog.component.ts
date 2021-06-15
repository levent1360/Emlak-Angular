import { OdaSayisi } from './../../../../models/model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-odasayisi-dialog',
  templateUrl: './odasayisi-dialog.component.html',
  styleUrls: ['./odasayisi-dialog.component.scss']
})
export class OdasayisiDialogComponent implements OnInit {

  detay: OdaSayisi;
  form: FormGroup;
  dialogBaslik: string;
  islem: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OdasayisiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.i;
    this.detay = data.d;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Yeni Oda Ekle";
      this.form = this.formOlustur();
    }
    else if (this.islem == "duzenle") {
      this.dialogBaslik = "Oda Düzenle";
      this.form = this.formOlustur();
    }

  }

  ngOnInit() {
  }

  formOlustur() {
    return this.formBuilder.group({
      OdaSayisiAd: [this.detay.OdaSayisiAd, [Validators.required]]
    });
  }

}
