import { YakitTipi } from './../../../../models/model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-yakittipi-dialog',
  templateUrl: './yakittipi-dialog.component.html',
  styleUrls: ['./yakittipi-dialog.component.scss']
})
export class YakittipiDialogComponent implements OnInit {

  detay: YakitTipi;
  form: FormGroup;
  dialogBaslik: string;
  islem: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<YakittipiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.i;
    this.detay = data.d;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Yeni Eşya Durumu Ekle";
      this.form = this.formOlustur();
    }
    else if (this.islem == "duzenle") {
      this.dialogBaslik = "Eşya Durumu Düzenle";
      this.form = this.formOlustur();
    }

  }

  ngOnInit() {
  }

  formOlustur() {
    return this.formBuilder.group({
      YakitTipAd: [this.detay.YakitTipAd, [Validators.required]]
    });
  }
}
