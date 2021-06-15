import { IlanTip } from './../../../../models/model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ilantip-dialog',
  templateUrl: './ilantip-dialog.component.html',
  styleUrls: ['./ilantip-dialog.component.scss']
})
export class IlantipDialogComponent implements OnInit {

  detay: IlanTip;
  form: FormGroup;
  dialogBaslik: string;
  islem: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<IlantipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.i;
    this.detay = data.d;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Yeni İlan Tipi Ekle";
      this.form = this.formOlustur();
    }
    else if (this.islem == "duzenle") {
      this.dialogBaslik = "İlan Tipi Düzenle";
      this.form = this.formOlustur();
    }

  }

  ngOnInit() {
  }

  formOlustur() {
    return this.formBuilder.group({
      TipAd: [this.detay.TipAd, [Validators.required]]
    });
  }

}
