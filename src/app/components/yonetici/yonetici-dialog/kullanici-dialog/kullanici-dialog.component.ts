import { EmlakService } from './../../../../services/emlak.service';
import { KullaniciTipi } from './../../../../models/model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UyeolDialogComponent } from 'src/app/components/anasayfa/ana-dialogs/uyeol-dialog/uyeol-dialog.component';
import { Kullanici } from 'src/app/models/model';

@Component({
  selector: 'app-kullanici-dialog',
  templateUrl: './kullanici-dialog.component.html',
  styleUrls: ['./kullanici-dialog.component.scss']
})
export class KullaniciDialogComponent implements OnInit {


  yeniKullanici:Kullanici;
  kullaniciTipler:KullaniciTipi[];
  form:FormGroup;
  baslik:string;
  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UyeolDialogComponent>,
    private servis:EmlakService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if(data.i=="ekle"){
        this.baslik="Kullanıcı Ekle"
      }else if(data.i=="duzenle"){
        this.baslik="Kullanıcı Düzenle"
      }
      this.yeniKullanici=data.d;
      this.form=this.formOlustur();
      this.KullaniciTipListele();
    }

  ngOnInit() {
  }

  KullaniciTipListele(){
    this.servis.KullaniciTipiListeleServis().subscribe((res:KullaniciTipi[])=>{
      this.kullaniciTipler=res;
    })
  }

  formOlustur() {
    return this.formBuilder.group({
      KullaniciAdi: [this.yeniKullanici.KullaniciAdi, [Validators.required]],
      KullaniciSoyadi: [this.yeniKullanici.KullaniciSoyadi, [Validators.required]],
      KullaniciMail: [this.yeniKullanici.KullaniciMail, [Validators.required,Validators.email]],
      KullaniciTel: [this.yeniKullanici.KullaniciTel, [Validators.required]],
      KullaniciTipId: [this.yeniKullanici.KullaniciTipId, [Validators.required]]
    });
  }


}
