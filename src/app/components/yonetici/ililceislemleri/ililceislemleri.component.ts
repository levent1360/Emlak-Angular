import { IllerDialogComponent } from './../yonetici-dialog/iller-dialog/iller-dialog.component';
import { EmlakService } from './../../../services/emlak.service';
import { Iller, Sonuc } from './../../../models/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ililceislemleri',
  templateUrl: './ililceislemleri.component.html',
  styleUrls: ['./ililceislemleri.component.css']
})
export class IlilceislemleriComponent implements OnInit {

  yeniIl: Iller;

  ildialogRef: MatDialogRef<IllerDialogComponent>

  dataSource: MatTableDataSource<Iller>;

  displayedColumns: string[] = ['#', 'iladi', 'ilceler', 'islem'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public servis: EmlakService,
    public matdialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.IllerListele();
  }

  IllerListele() {
    this.servis.IlListeleServis().subscribe((d: Iller[]) => {
      console.log(d)
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  Ekle() {
    var yeniil = new Iller()
    this.ildialogRef = this.matdialog.open(IllerDialogComponent, {
      width: "400px",
      data: {
        kayit: yeniil,
        islem: "ekle"
      }
    })

    this.ildialogRef.afterClosed().subscribe(il => {
      if (il) {
        this.servis.IlEkleServis(il).subscribe((s: Sonuc) => {
          if (s.islem == false) {
            this.toastr.error(s.mesaj);
            this.IllerListele();
          } else {
            this.IllerListele();
            this.toastr.success(s.mesaj)
          }
        }, err => {
          console.log(err)
        })
      }
    })
  }

  ilDuzenle(Duzenleil:Iller){
    this.ildialogRef = this.matdialog.open(IllerDialogComponent, {
      width: "400px",
      data: {
        kayit: Duzenleil,
        islem: "duzenle"
      }
    })
    this.ildialogRef.afterClosed().subscribe(il=>{
      if(il){
        Duzenleil.ILAd=il.ILAd;

        this.servis.ilDuzenleServis(Duzenleil).subscribe((res:Sonuc)=>{
          if (res.islem == false) {
            this.toastr.error(res.mesaj);
            this.IllerListele();
          } else {
            this.toastr.success(res.mesaj)
            this.IllerListele();
          }
        },err=>{
          console.log(err)
          this.IllerListele();
        })
      }
    })
  }

  ilSil(ILId:string){
    this.servis.ilSilServis(ILId).subscribe((res: Sonuc) => {
      if (res.islem == false) {
        this.toastr.error(res.mesaj);
      }
      else {
        this.IllerListele();
        this.toastr.warning(res.mesaj)
      }
    }, err => {
      console.log(err)
    });
  }

  Filtrele(e) {
    var arama = e.target.value;
    this.dataSource.filter = arama.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
