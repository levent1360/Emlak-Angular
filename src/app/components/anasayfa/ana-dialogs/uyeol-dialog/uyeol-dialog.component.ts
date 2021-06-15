import { Kullanici } from './../../../../models/model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-uyeol-dialog',
  templateUrl: './uyeol-dialog.component.html',
  styleUrls: ['./uyeol-dialog.component.scss']
})
export class UyeolDialogComponent implements OnInit {

  yeniKullanici:Kullanici;
  form:FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UyeolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.yeniKullanici=data.d;
      this.form=this.formOlustur();
    }

  ngOnInit() {
  }

  formOlustur() {
    return this.formBuilder.group({
      KullaniciAdi: [this.yeniKullanici.KullaniciAdi, [Validators.required]],
      KullaniciSoyadi: [this.yeniKullanici.KullaniciSoyadi, [Validators.required]],
      KullaniciMail: [this.yeniKullanici.KullaniciMail, [Validators.required,Validators.email]],
      KullaniciSifre: [this.yeniKullanici.KullaniciSifre, [Validators.required]],
      KullaniciSifre2: [this.yeniKullanici.KullaniciSifre, [Validators.required]],
      KullaniciTel: [this.yeniKullanici.KullaniciTel, [Validators.required]]
    });
  }
}
