import { KullanicitipDialogComponent } from './../yonetici-dialog/kullanicitip-dialog/kullanicitip-dialog.component';
import { YakittipiDialogComponent } from './../yonetici-dialog/yakittipi-dialog/yakittipi-dialog.component';
import { OdasayisiDialogComponent } from './../yonetici-dialog/odasayisi-dialog/odasayisi-dialog.component';
import { EsyadurumuDialogComponent } from './../yonetici-dialog/esyadurumu-dialog/esyadurumu-dialog.component';
import { IlantipDialogComponent } from './../yonetici-dialog/ilantip-dialog/ilantip-dialog.component';
import { EmlakService } from './../../../services/emlak.service';
import { IlanTip, Sonuc, EsyaDurumu, OdaSayisi, YakitTipi, KullaniciTipi } from './../../../models/model';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kategori-ayarlar',
  templateUrl: './kategori-ayarlar.component.html',
  styleUrls: ['./kategori-ayarlar.component.scss']
})
export class KategoriAyarlarComponent implements OnInit {

  ilanTipler: IlanTip[];
  esyaDurumlar: EsyaDurumu[];
  odaSayilar: OdaSayisi[];
  yakittipler:YakitTipi[];
  kullaniciTipler:KullaniciTipi[];

  ilanTipDialogRef: MatDialogRef<IlantipDialogComponent>;
  esyadurumDialogRef: MatDialogRef<EsyadurumuDialogComponent>;
  odasayisiDialogRef: MatDialogRef<OdasayisiDialogComponent>;
  yakittipiDialogRef: MatDialogRef<YakittipiDialogComponent>;
  kullanicitipiDialogRef: MatDialogRef<KullanicitipDialogComponent>;

  constructor(
    private servis: EmlakService,
    public matdialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.ilanTipiListele();
    this.esyaDurumuListele();
    this.odaSayisiListele();
    this.yakittipiListele();
    this.kullanicitipiListele();
  }

  //İlan Tipi
  ilanTipiListele() {
    this.servis.IlanTipiListeleServis().subscribe((res: IlanTip[]) => {
      this.ilanTipler = res;
    }, err => console.error(err))
  }
  ilanTipEkle() {
    var yeniIlanTip = new IlanTip()
    this.ilanTipDialogRef = this.matdialog.open(IlantipDialogComponent, {
      width: "400px",
      data: {
        d: yeniIlanTip,
        i: "ekle"
      }
    })
    this.ilanTipDialogRef.afterClosed().subscribe(d => {
      if (d) {
        yeniIlanTip.TipAd = d.TipAd;
        this.servis.IlanTipEkleServis(yeniIlanTip).subscribe((res: Sonuc) => {
          if (res.islem == false) {
            this.toastr.error(res.mesaj)
            this.ilanTipiListele();
          }
          else {
            this.toastr.success(res.mesaj);
            this.ilanTipiListele();
          }
        }, err => console.error(err))
      }
    })
  }
  ilanTipDuzenle(ilanTipi: IlanTip) {
    this.ilanTipDialogRef = this.matdialog.open(IlantipDialogComponent, {
      width: "400px",
      data: {
        d: ilanTipi,
        i: "duzenle"
      }
    })
    this.ilanTipDialogRef.afterClosed().subscribe(d => {
      if (d) {
        ilanTipi.TipAd = d.TipAd;
        this.servis.IlanTipDuzenleServis(ilanTipi).subscribe((res: Sonuc) => {
          if (res.islem == false) {
            this.toastr.error(res.mesaj)
            this.ilanTipiListele();
          }
          else {
            this.toastr.success(res.mesaj);
            this.ilanTipiListele();
          }
        }, err => console.error(err))
      }
    })
  }
  ilanTipSil(id: string) {
    this.servis.IlanTipSilServis(id).subscribe((res: Sonuc) => {
      if (res.islem == false) {
        this.toastr.error(res.mesaj);
        this.ilanTipiListele();
      }
      else {
        this.ilanTipiListele();
        this.toastr.warning(res.mesaj)
      }
    }, err => {
      console.log(err)
    });
  }

  //Eşya Durumu
  esyaDurumuListele() {
    this.servis.EsyaDurumuListeleServis().subscribe((res: EsyaDurumu[]) => {
      this.esyaDurumlar = res;
    }, err => console.error(err))
  }
  esyaDurumuEkle() {
    var yeniEsyaDurumu = new EsyaDurumu()
    this.esyadurumDialogRef = this.matdialog.open(EsyadurumuDialogComponent, {
      width: "400px",
      data: {
        d: yeniEsyaDurumu,
        i: "ekle"
      }
    })
    this.esyadurumDialogRef.afterClosed().subscribe(d => {
      if (d) {
        yeniEsyaDurumu.EsyaAd = d.EsyaAd;
        this.servis.EsyaDurumuEkleServis(yeniEsyaDurumu).subscribe((res: Sonuc) => {
          if (res.islem == false) {
            this.toastr.error(res.mesaj)
            this.esyaDurumuListele()
          }
          else {
            this.toastr.success(res.mesaj);
            this.esyaDurumuListele()
          }
        }, err => console.error(err))
      }
    })
  }
  esyaDurumDuzenle(esyadurum: EsyaDurumu) {
    this.esyadurumDialogRef = this.matdialog.open(EsyadurumuDialogComponent, {
      width: "400px",
      data: {
        d: esyadurum,
        i: "duzenle"
      }
    })
    this.esyadurumDialogRef.afterClosed().subscribe(d => {
      if (d) {
        esyadurum.EsyaAd = d.EsyaAd;
        this.servis.EsyaDurumuDuzenleServis(esyadurum).subscribe((res: Sonuc) => {
          if (res.islem == false) {
            this.toastr.error(res.mesaj)
            this.ilanTipiListele();
          }
          else {
            this.toastr.success(res.mesaj);
            this.ilanTipiListele();
          }
        }, err => console.error(err))
      }
    })
  }
  esyaDurumuSil(id: string) {
    this.servis.EsyaDurumuSilServis(id).subscribe((res: Sonuc) => {
      if (res.islem == false) {
        this.toastr.error(res.mesaj);
        this.esyaDurumuListele()
      }
      else {
        this.esyaDurumuListele()
        this.toastr.warning(res.mesaj)
      }
    }, err => {
      console.log(err)
    });
  }

  //Oda Sayisi
  odaSayisiListele() {
    this.servis.OdaSayisiListeleServis().subscribe((res: OdaSayisi[]) => {
      this.odaSayilar = res;
    }, err => console.error(err))
  }
  odaSayisiEkle() {
    var yeniodaSayisi = new OdaSayisi()
    this.odasayisiDialogRef = this.matdialog.open(OdasayisiDialogComponent, {
      width: "400px",
      data: {
        d: yeniodaSayisi,
        i: "ekle"
      }
    })
    this.odasayisiDialogRef.afterClosed().subscribe(d => {
      if (d) {
        yeniodaSayisi.OdaSayisiAd = d.OdaSayisiAd;
        this.servis.OdaSayisiEkleServis(yeniodaSayisi).subscribe((res: Sonuc) => {
          if (res.islem == false) {
            this.toastr.error(res.mesaj)
            this.odaSayisiListele()
          }
          else {
            this.toastr.success(res.mesaj);
            this.odaSayisiListele()
          }
        }, err => console.error(err))
      }
    })
  }
  odaSayisiDuzenle(odasayisi: OdaSayisi) {
    this.odasayisiDialogRef = this.matdialog.open(OdasayisiDialogComponent, {
      width: "400px",
      data: {
        d: odasayisi,
        i: "duzenle"
      }
    })
    this.odasayisiDialogRef.afterClosed().subscribe(d => {
      if (d) {
        odasayisi.OdaSayisiAd = d.OdaSayisiAd;
        this.servis.OdaSayisiDuzenleServis(odasayisi).subscribe((res: Sonuc) => {
          if (res.islem == false) {
            this.toastr.error(res.mesaj)
            this.odaSayisiListele();
          }
          else {
            this.toastr.success(res.mesaj);
            this.odaSayisiListele();
          }
        }, err => console.error(err))
      }
    })
  }
  odaSayisiSil(id: string) {
    this.servis.OdaSayisiSilServis(id).subscribe((res: Sonuc) => {
      if (res.islem == false) {
        this.toastr.error(res.mesaj);
        this.odaSayisiListele();
      }
      else {
        this.odaSayisiListele();
        this.toastr.warning(res.mesaj)
      }
    }, err => {
      console.log(err)
    });
  }

    //Yakit Tipi
    yakittipiListele() {
      this.servis.YakitTipiListeleServis().subscribe((res: YakitTipi[]) => {
        this.yakittipler = res;
      }, err => console.error(err))
    }
    yakittipiEkle() {
      var yeniyakittipi = new YakitTipi()
      this.yakittipiDialogRef = this.matdialog.open(YakittipiDialogComponent, {
        width: "400px",
        data: {
          d: yeniyakittipi,
          i: "ekle"
        }
      })
      this.yakittipiDialogRef.afterClosed().subscribe(d => {
        if (d) {
          yeniyakittipi.YakitTipAd = d.YakitTipAd;
          this.servis.YakitTipiEkleServis(yeniyakittipi).subscribe((res: Sonuc) => {
            if (res.islem == false) {
              this.toastr.error(res.mesaj)
              this.yakittipiListele()
            }
            else {
              this.toastr.success(res.mesaj);
              this.yakittipiListele()
            }
          }, err => console.error(err))
        }
      })
    }
    yakittipiDuzenle(yakittipi: YakitTipi) {
      this.yakittipiDialogRef = this.matdialog.open(YakittipiDialogComponent, {
        width: "400px",
        data: {
          d: yakittipi,
          i: "duzenle"
        }
      })
      this.yakittipiDialogRef.afterClosed().subscribe(d => {
        if (d) {
          yakittipi.YakitTipAd = d.YakitTipAd;
          this.servis.YakitTipiDuzenleServis(yakittipi).subscribe((res: Sonuc) => {
            if (res.islem == false) {
              this.toastr.error(res.mesaj)
              this.yakittipiListele()
            }
            else {
              this.toastr.success(res.mesaj);
              this.yakittipiListele()
            }
          }, err => console.error(err))
        }
      })
    }
    yakittipiSil(id: string) {
      this.servis.YakitTipiSilServis(id).subscribe((res: Sonuc) => {
        if (res.islem == false) {
          this.toastr.error(res.mesaj);
          this.yakittipiListele()
        }
        else {
          this.yakittipiListele()
          this.toastr.warning(res.mesaj)
        }
      }, err => {
        console.log(err)
      });
    }
    
    //Kullanici Tipi
    kullanicitipiListele() {
      this.servis.KullaniciTipiListeleServis().subscribe((res: KullaniciTipi[]) => {
        this.kullaniciTipler = res;
      }, err => console.error(err))
    }
    kullanicitipiEkle() {
      var yenikullanicitipi = new KullaniciTipi()
      this.kullanicitipiDialogRef = this.matdialog.open(KullanicitipDialogComponent, {
        width: "400px",
        data: {
          d: yenikullanicitipi,
          i: "ekle"
        }
      })
      this.kullanicitipiDialogRef.afterClosed().subscribe(d => {
        if (d) {
          yenikullanicitipi.KullaniciTipAd = d.KullaniciTipAd;
          this.servis.KullaniciTipiEkleServis(yenikullanicitipi).subscribe((res: Sonuc) => {
            if (res.islem == false) {
              this.toastr.error(res.mesaj)
              this.kullanicitipiListele();
            }
            else {
              this.toastr.success(res.mesaj);
              this.kullanicitipiListele();
            }
          }, err => console.error(err))
        }
      })
    }
    kullanicitipiDuzenle(kullanicitipi: KullaniciTipi) {
      this.kullanicitipiDialogRef = this.matdialog.open(KullanicitipDialogComponent, {
        width: "400px",
        data: {
          d: kullanicitipi,
          i: "duzenle"
        }
      })
      this.kullanicitipiDialogRef.afterClosed().subscribe(d => {
        if (d) {
          kullanicitipi.KullaniciTipAd = d.KullaniciTipAd;
          this.servis.KullaniciTipiDuzenleServis(kullanicitipi).subscribe((res: Sonuc) => {
            if (res.islem == false) {
              this.toastr.error(res.mesaj)
              this.kullanicitipiListele();
            }
            else {
              this.toastr.success(res.mesaj);
              this.kullanicitipiListele();
            }
          }, err => console.error(err))
        }
      })
    }
    kullanicitipiSil(id: string) {
      this.servis.KullaniciTipiSilServis(id).subscribe((res: Sonuc) => {
        if (res.islem == false) {
          this.toastr.error(res.mesaj);
          this.kullanicitipiListele();
        }
        else {
          this.kullanicitipiListele();
          this.toastr.warning(res.mesaj)
        }
      }, err => {
        console.log(err)
      });
    }

}
