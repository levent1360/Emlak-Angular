import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmlakService } from './../../../services/emlak.service';
import { Kullanici, Sonuc } from './../../../models/model';
import { Component, OnInit } from '@angular/core';
import { KullaniciDialogComponent } from '../yonetici-dialog/kullanici-dialog/kullanici-dialog.component';

@Component({
  selector: 'app-kullanicilar',
  templateUrl: './kullanicilar.component.html',
  styleUrls: ['./kullanicilar.component.scss']
})
export class KullanicilarComponent implements OnInit {
  panelOpenState = true;

  kullanicilar: Kullanici[];

  kullaniciDialogRef: MatDialogRef<KullaniciDialogComponent>

  constructor(
    private servis: EmlakService,
    private matdialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.KullaniciListele();
  }

  KullaniciListele() {
    this.servis.KullaniciListeleServis().subscribe((res: Kullanici[]) => {
      this.kullanicilar = res
    })
  }

  ekle() {
    var yenikullanici = new Kullanici();
    this.kullaniciDialogRef = this.matdialog.open(KullaniciDialogComponent, {
      width: "500px",
      data: {
        d: yenikullanici,
        i: "ekle"
      }
    })
  }

  KullaniciDuzenle(kullanici: Kullanici) {
    this.kullaniciDialogRef = this.matdialog.open(KullaniciDialogComponent, {
      width: "500px",
      data: {
        d: kullanici,
        i: "duzenle"
      }
    })
    this.kullaniciDialogRef.afterClosed().subscribe(d => {
      if (d) {
        kullanici.KullaniciAdi = d.KullaniciAdi;
        kullanici.KullaniciSoyadi = d.KullaniciSoyadi;
        kullanici.KullaniciMail = d.KullaniciMail;
        kullanici.KullaniciTel = d.KullaniciTel;
        kullanici.KullaniciTipId = d.KullaniciTipId;

        this.servis.KullaniciDuzenleServis(kullanici).subscribe((res: Sonuc) => {
          if (res.islem == false) {
            this.toastr.error(res.mesaj);
            this.KullaniciListele();
          } else {
            this.toastr.success(res.mesaj)
            this.KullaniciListele();
          }
        }, err => {
          console.log(err)
          this.KullaniciListele();
        })
      }
    })
  }

  Filtrele(e) {
    var arama = e.target.value;
    if (arama) {

      var filtre=this.kullanicilar.filter(s => s.KullaniciAdi.toLowerCase() === arama.trim().toLowerCase())
     console.log(filtre)
    }
  }

}
