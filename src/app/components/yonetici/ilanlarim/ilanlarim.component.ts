import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Ilan, Sonuc } from 'src/app/models/model';
import { EmlakService } from 'src/app/services/emlak.service';
import { IlanDialogComponent } from '../yonetici-dialog/ilan-dialog/ilan-dialog.component';

@Component({
  selector: 'app-ilanlarim',
  templateUrl: './ilanlarim.component.html',
  styleUrls: ['./ilanlarim.component.scss']
})
export class IlanlarimComponent implements OnInit {

  
  ilanlarim: Ilan;

  ilansahibiId:string;

  ilandialogRef: MatDialogRef<IlanDialogComponent>

  dataSource: MatTableDataSource<Ilan>;

  displayedColumns: string[] = ['#', 'IlanAd', 'IlanFiyat','detay', 'islem'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public servis: EmlakService,
    public matdialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.ilansahibiId=sessionStorage.getItem("UID");
    this.IlanListele();
  }

  IlanListele() {
    this.servis.IlanListeleByUIDServis(this.ilansahibiId).subscribe((d: Ilan[]) => {
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  Ekle() {
    var yeniilan = new Ilan()
    this.ilandialogRef = this.matdialog.open(IlanDialogComponent, {
      width: "800px",
      data: {
        d: yeniilan,
        i: "ekle"
      }
    })

    this.ilandialogRef.afterClosed().subscribe(ilan => {
      if (ilan) {
        yeniilan.IlanAd=ilan.IlanAd;
        yeniilan.IlanFiyat=ilan.IlanFiyat;
        yeniilan.IlanAdres=ilan.IlanAdres;
        yeniilan.IlanEsyaId=ilan.IlanEsyaId;
        yeniilan.IlanFotoUrl=ilan.IlanFotoUrl;
        yeniilan.IlanILId=ilan.IlanILId;
        yeniilan.IlanILceId=ilan.IlanILceId;
        yeniilan.IlanMKare=ilan.IlanMKare;
        yeniilan.IlanOdaSayId=ilan.IlanOdaSayId;
        yeniilan.IlanSahibiId=this.ilansahibiId;
        yeniilan.IlanTipId=ilan.IlanTipId;
        yeniilan.IlanYakitTipId=ilan.IlanYakitTipId;

        this.servis.IlanEkleServis(yeniilan).subscribe((s: Sonuc) => {
          if (s.islem == false) {
            this.toastr.error(s.mesaj);
            this.IlanListele();
          } else {
            this.IlanListele();
            this.toastr.success(s.mesaj)
          }
        }, err => {
          console.log(err)
        })
      }
    })
  }

  ilanDuzenle(Duzenleilan:Ilan){
    this.ilandialogRef = this.matdialog.open(IlanDialogComponent, {
      width: "800px",
      data: {
        d: Duzenleilan,
        i: "duzenle"
      }
    })

    this.ilandialogRef.afterClosed().subscribe(ilan => {
      if (ilan) {
        Duzenleilan.IlanAd=ilan.IlanAd;
        Duzenleilan.IlanFiyat=ilan.IlanFiyat;
        Duzenleilan.IlanAdres=ilan.IlanAdres;
        Duzenleilan.IlanEsyaId=ilan.IlanEsyaId;
        Duzenleilan.IlanFotoUrl=ilan.IlanFotoUrl;
        Duzenleilan.IlanILId=ilan.IlanILId;
        Duzenleilan.IlanILceId=ilan.IlanILceId;
        Duzenleilan.IlanMKare=ilan.IlanMKare;
        Duzenleilan.IlanOdaSayId=ilan.IlanOdaSayId;
        Duzenleilan.IlanSahibiId=this.ilansahibiId;
        Duzenleilan.IlanTipId=ilan.IlanTipId;
        Duzenleilan.IlanYakitTipId=ilan.IlanYakitTipId;

        this.servis.IlanDuzenleServis(Duzenleilan).subscribe((s: Sonuc) => {
          if (s.islem == false) {
            this.toastr.error(s.mesaj);
            this.IlanListele();
          } else {
            this.IlanListele();
            this.toastr.success(s.mesaj)
          }
        }, err => {
          console.log(err)
        })
      }
    })
  }

  ilanSil(ILanId:string){
    this.servis.IlanSilServis(ILanId).subscribe((res: Sonuc) => {
      if (res.islem == false) {
        this.toastr.error(res.mesaj);
      }
      else {
        this.IlanListele();
        this.toastr.warning(res.mesaj)
      }
    }, err => {
      console.log(err)
    });
  }

  
  // Filtrele(e) {
  //   var arama = e.target.value;
  //   this.dataSource.filter = arama.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }

}
