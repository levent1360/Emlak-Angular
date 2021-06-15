import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kullanici } from 'src/app/models/model';

@Component({
  selector: 'app-girisyap-dialog',
  templateUrl: './girisyap-dialog.component.html',
  styleUrls: ['./girisyap-dialog.component.scss']
})
export class GirisyapDialogComponent implements OnInit {

  
  yeniKullanici:Kullanici;
  form:FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GirisyapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.yeniKullanici=data.d;
      this.form=this.formOlustur();
    }

  ngOnInit() {
  }

  formOlustur() {
    return this.formBuilder.group({
      KullaniciMail: [this.yeniKullanici.KullaniciMail, [Validators.required,Validators.email]],
      KullaniciSifre: [this.yeniKullanici.KullaniciSifre, [Validators.required]],
    });
  }


}
