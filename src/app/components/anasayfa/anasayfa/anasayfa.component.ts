import { EmlakService } from './../../../services/emlak.service';
import { ToastrService } from 'ngx-toastr';
import { Kullanici, Sonuc, GirisKontrol, Ilan } from './../../../models/model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UyeolDialogComponent } from '../ana-dialogs/uyeol-dialog/uyeol-dialog.component';
import { GirisyapDialogComponent } from '../ana-dialogs/girisyap-dialog/girisyap-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.scss']
})
export class AnasayfaComponent implements OnInit {

  ilanlar: Ilan[];

  uyeGiris = false;

  uyeolDialogRef: MatDialogRef<UyeolDialogComponent>;
  girisYapDialogRef: MatDialogRef<GirisyapDialogComponent>;

  constructor(
    private matdialog: MatDialog,
    private servis: EmlakService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ilanlistele();
    this.girisKontrol();
  }


  GirisYap() {
    var yenikullanici = new Kullanici();
    this.girisYapDialogRef = this.matdialog.open(GirisyapDialogComponent, {
      width: "500px",
      data: {
        d: yenikullanici,
        i: "girisyap"
      }
    });
    this.girisYapDialogRef.afterClosed().subscribe(d => {
      if (d) {
        var mail = d.KullaniciMail;
        var sifre = d.KullaniciSifre;
        this.servis.KullaniciGirisKontrolServis(mail, sifre).subscribe((res: GirisKontrol) => {
          if (res == null) {
            this.toastr.error("Giriş bilgileri hatalı kontrol ediniz.");
          }
          else {
            this.toastr.success("Giriş başarılı");
            sessionStorage.setItem("UID", res.KullaniciId);
            sessionStorage.setItem("UTID", res.KullaniciTipId);
            window.location.reload();
          }
        })
      }
    })
  }


  UyeOl() {
    var yenikullanici = new Kullanici()
    this.uyeolDialogRef = this.matdialog.open(UyeolDialogComponent, {
      width: "500px",
      data: {
        d: yenikullanici,
        i: "ekle"
      }
    })
    this.uyeolDialogRef.afterClosed().subscribe(d => {
      if (d) {
        if (d.KullaniciSifre != d.KullaniciSifre2) {
          this.toastr.error("Girilen şifreler uyuşmamaktadır")
          this.uyeolDialogRef = this.matdialog.open(UyeolDialogComponent, {
            width: "500px",
            data: {
              d: d,
              i: "ekle"
            }
          })
        }
        else {
          yenikullanici.KullaniciAdi = d.KullaniciAdi;
          yenikullanici.KullaniciSoyadi = d.KullaniciSoyadi;
          yenikullanici.KullaniciMail = d.KullaniciMail;
          yenikullanici.KullaniciTel = d.KullaniciTel;
          yenikullanici.KullaniciSifre = d.KullaniciSifre;
          yenikullanici.KullaniciTipId = "1cf993b0-527d-47cd-94e1-9a88855966c9";
          this.servis.KullaniciEkleServis(yenikullanici).subscribe((res: Sonuc) => {
            if (res.islem == false) {
              this.toastr.error(res.mesaj);
            }
            else {
              this.toastr.success(res.mesaj);
            }
          }, err => console.error(err))
        }
      }
    })
  }

  ilanlistele() {
    this.servis.IlanListeleServis().subscribe((res: Ilan[]) => {
      this.ilanlar = res;
    })
  }

  girisKontrol() {
    if (sessionStorage.getItem("UID") && sessionStorage.getItem("UTID")) {
      this.uyeGiris = true;
    } else {
      this.uyeGiris = false;
    }
  }

}
