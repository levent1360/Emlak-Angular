import { EsyaDurumu } from './../../../../models/model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-esyadurumu-dialog',
  templateUrl: './esyadurumu-dialog.component.html',
  styleUrls: ['./esyadurumu-dialog.component.scss']
})
export class EsyadurumuDialogComponent implements OnInit {


  detay: EsyaDurumu;
  form: FormGroup;
  dialogBaslik: string;
  islem: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EsyadurumuDialogComponent>,
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
      EsyaAd: [this.detay.EsyaAd, [Validators.required]]
    });
  }

}
