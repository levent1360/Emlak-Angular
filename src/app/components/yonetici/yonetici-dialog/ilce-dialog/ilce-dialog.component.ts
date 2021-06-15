import { Ilceler } from './../../../../models/model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ilce-dialog',
  templateUrl: './ilce-dialog.component.html',
  styleUrls: ['./ilce-dialog.component.scss']
})
export class IlceDialogComponent implements OnInit {

  ilceDetay: Ilceler;
  ilceForm: FormGroup;
  dialogBaslik: string;
  islem: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<IlceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.ilceDetay = data.ilce;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Yeni İlçe Ekle";
      this.ilceForm = this.formOlustur();
    }
    else if (this.islem == "duzenle") {
      this.dialogBaslik = "İlçe Düzenle";
      this.ilceForm = this.formOlustur();
    }

  }

  ngOnInit() {
  }

  formOlustur() {
    return this.formBuilder.group({
      ILceAd: [this.ilceDetay.IlceAd, [Validators.required]]
    });
  }

}
