import { Iller } from './../../../../models/model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-iller-dialog',
  templateUrl: './iller-dialog.component.html',
  styleUrls: ['./iller-dialog.component.scss']
})
export class IllerDialogComponent implements OnInit {

  ilDetay: Iller;
  ilForm: FormGroup;
  dialogBaslik: string;
  islem: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<IllerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.ilDetay = data.kayit;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Yeni İl Ekle";
      this.ilForm = this.formOlustur();
    }
    else if (this.islem == "duzenle") {
      this.dialogBaslik = "Sınav Düzenle";
      this.ilForm = this.formOlustur();
    }

  }

  ngOnInit() {
  }

  formOlustur() {
    return this.formBuilder.group({
      ILAd: [this.ilDetay.ILAd, [Validators.required]]
    });
  }

}
