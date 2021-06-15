import { KullaniciTipi } from './../../../../models/model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-kullanicitip-dialog',
  templateUrl: './kullanicitip-dialog.component.html',
  styleUrls: ['./kullanicitip-dialog.component.scss']
})
export class KullanicitipDialogComponent implements OnInit {


  detay: KullaniciTipi;
  form: FormGroup;
  dialogBaslik: string;
  islem: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<KullanicitipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.i;
    this.detay = data.d;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Yeni Kullanıcı Tipi Ekle";
      this.form = this.formOlustur();
    }
    else if (this.islem == "duzenle") {
      this.dialogBaslik = "Kullanıcı Tipi Düzenle";
      this.form = this.formOlustur();
    }

  }

  ngOnInit() {
  }

  formOlustur() {
    return this.formBuilder.group({
      KullaniciTipAd: [this.detay.KullaniciTipAd, [Validators.required]]
    });
  }

}
