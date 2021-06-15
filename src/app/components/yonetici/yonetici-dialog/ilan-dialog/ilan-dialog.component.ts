import { EsyaDurumu, Ilan, IlanTip, OdaSayisi, YakitTipi, Iller, Ilceler } from './../../../../models/model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmlakService } from 'src/app/services/emlak.service';

@Component({
  selector: 'app-ilan-dialog',
  templateUrl: './ilan-dialog.component.html',
  styleUrls: ['./ilan-dialog.component.scss']
})
export class IlanDialogComponent implements OnInit {


  yeniİlan: Ilan;

  ilanTipler: IlanTip[];
  esyaDurumlar: EsyaDurumu[];
  odaSayilar: OdaSayisi[];
  yakittipler: YakitTipi[];
  iller: Iller[];
  ilceler: Ilceler[];
  ilcelert: Ilceler[];

  ilId: string;

  form: FormGroup;
  baslik: string;
  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<IlanDialogComponent>,
    private servis: EmlakService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.i == "ekle") {
      this.baslik = "İlan Ekle"
    } else if (data.i == "duzenle") {
      this.baslik = "İlan Düzenle"
    }
    this.yeniİlan = data.d;
    this.form = this.formOlustur();

    this.ilanTipiListele();
    this.esyaDurumuListele();
    this.odaSayisiListele();
    this.yakittipiListele();
    this.illerListele();
    this.ilcelistele(this.ilId);
  }

  ngOnInit() {
  }

  ilanTipiListele() {
    this.servis.IlanTipiListeleServis().subscribe((res: IlanTip[]) => {
      this.ilanTipler = res;
    }, err => console.error(err))
  }

  esyaDurumuListele() {
    this.servis.EsyaDurumuListeleServis().subscribe((res: EsyaDurumu[]) => {
      this.esyaDurumlar = res;
    }, err => console.error(err))
  }

  odaSayisiListele() {
    this.servis.OdaSayisiListeleServis().subscribe((res: OdaSayisi[]) => {
      this.odaSayilar = res;
    }, err => console.error(err))
  }

  yakittipiListele() {
    this.servis.YakitTipiListeleServis().subscribe((res: YakitTipi[]) => {
      this.yakittipler = res;
    }, err => console.error(err))
  }

  illerListele() {
    this.servis.IlListeleServis().subscribe((res: Iller[]) => {
      this.iller = res;
    }, err => console.error(err))
  }

  // ilcelerListele() {
  //   this.servis.IlceListeleServis().subscribe((res: Ilceler[]) => {
  //     this.ilcelert = res;
  //   }, err => console.error(err))
  // }

  ilcelistele(value) {
    if (value) {
      this.ilId = value;
      this.servis.IlceByİlIdListeleServis(this.ilId).subscribe((res: Ilceler[]) => {
        this.ilceler = res;
      }, err => console.error(err))
    } else {
      this.servis.IlceListeleServis().subscribe((res: Ilceler[]) => {
        this.ilceler = res;
      }, err => console.error(err))
    }

  }


  formOlustur() {
    return this.formBuilder.group({
      IlanFotoUrl: [this.yeniİlan.IlanFotoUrl, [Validators.required]],
      IlanAd: [this.yeniİlan.IlanAd, [Validators.required]],
      IlanFiyat: [this.yeniİlan.IlanFiyat, [Validators.required]],
      IlanMKare: [this.yeniİlan.IlanMKare, [Validators.required]],
      IlanILId: [this.yeniİlan.IlanILId, [Validators.required]],
      IlanILceId: [this.yeniİlan.IlanILceId, [Validators.required]],
      IlanTipId: [this.yeniİlan.IlanTipId, [Validators.required]],
      IlanEsyaId: [this.yeniİlan.IlanEsyaId, [Validators.required]],
      IlanYakitTipId: [this.yeniİlan.IlanYakitTipId, [Validators.required]],
      IlanOdaSayId: [this.yeniİlan.IlanOdaSayId, [Validators.required]],
      IlanAdres: [this.yeniİlan.IlanAdres, [Validators.required]]
    });
  }


}
