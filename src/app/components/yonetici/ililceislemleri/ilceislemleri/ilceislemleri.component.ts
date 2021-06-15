import { Ilceler, Sonuc, Iller } from './../../../../models/model';
import { EmlakService } from './../../../../services/emlak.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { IlceDialogComponent } from '../../yonetici-dialog/ilce-dialog/ilce-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ilceislemleri',
  templateUrl: './ilceislemleri.component.html',
  styleUrls: ['./ilceislemleri.component.scss']
})
export class IlceislemleriComponent implements OnInit {

  dataSource: any;

  displayedColumns: string[] = ['#', 'ilceAd', 'islem'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ilcedialogRef: MatDialogRef<IlceDialogComponent>


  ilId: string;
  il: Iller;

  constructor(
    private activeroute: ActivatedRoute,
    private servis: EmlakService,
    private toastr: ToastrService,
    public matdialog: MatDialog


  ) { }

  ngOnInit() {
    this.activeroute.params.subscribe(p => {
      if (p) {
        this.ilId = p.id;
        this.IlceByIlId()
        this.IlById()
      }
    })
  }

  IlById() {
    this.servis.IlByIdServis(this.ilId).subscribe((res: Iller) => {
      this.il = res;
    })
  }

  IlceByIlId() {
    this.servis.IlceByİlIdListeleServis(this.ilId).subscribe((ilce: Ilceler[]) => {
      if (ilce) {
        this.dataSource = new MatTableDataSource(ilce);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    },
      err => {
        console.log(err)
      })
  }

  Ekle() {
    var yeniilce = new Ilceler();
    this.ilcedialogRef = this.matdialog.open(IlceDialogComponent, {
      width: "400px",
      data: {
        ilce: yeniilce,
        islem: "ekle"
      }
    })

    this.ilcedialogRef.afterClosed().subscribe(d => {
      if (d) {
        yeniilce.IlceAd = d.ILceAd;
        yeniilce.IlceIlid = this.ilId;
        console.log(yeniilce)

        this.servis.IlceEkleServis(yeniilce).subscribe((res: Sonuc) => {
          if (res.islem == false) {
            this.toastr.error(res.mesaj);
            this.IlceByIlId();
          } else {
            this.IlceByIlId();
            this.toastr.success(res.mesaj)
          }
        })
      }
    })
  }

  ilceDuzenle(ilce: Ilceler) {
    this.ilcedialogRef = this.matdialog.open(IlceDialogComponent, {
      width: "400px",
      data: {
        ilce: ilce,
        islem: "duzenle"
      }
    })

    this.ilcedialogRef.afterClosed().subscribe(d => {
      if (d) {
        ilce.IlceAd = d.ILceAd;
        ilce.IlceIlid = this.ilId;

        this.servis.ilceDuzenleServis(ilce).subscribe((res: Sonuc) => {
          if (res.islem == false) {
            this.toastr.error(res.mesaj);
            this.IlceByIlId();
          } else {
            this.IlceByIlId();
            this.toastr.warning(res.mesaj)
          }
        })
      }
    })
  }
  ilceSil(IlceId: string) {
    this.servis.ilceSilServis(IlceId).subscribe((res: Sonuc) => {
      if (res.islem == false) {
        this.toastr.error(res.mesaj);
        this.IlceByIlId()
      }
      else {
        this.toastr.success(res.mesaj);
        this.IlceByIlId()
      }
    },
      err => {
        console.error(err)
      })
  }
}
