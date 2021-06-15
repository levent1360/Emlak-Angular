import { CikisDialogComponent } from './components/yonetici/yonetici-dialog/cikis-dialog/cikis-dialog.component';
import { IlanDialogComponent } from './components/yonetici/yonetici-dialog/ilan-dialog/ilan-dialog.component';
import { IlanlarimComponent } from './components/yonetici/ilanlarim/ilanlarim.component';
import { KullanicisidenavComponent } from './components/kullanici/kullanicisidenav/kullanicisidenav.component';
import { GirisyapDialogComponent } from './components/anasayfa/ana-dialogs/girisyap-dialog/girisyap-dialog.component';
import { AnasayfaComponent } from './components/anasayfa/anasayfa/anasayfa.component';
import { KullaniciDialogComponent } from './components/yonetici/yonetici-dialog/kullanici-dialog/kullanici-dialog.component';
import { KullanicilarComponent } from './components/yonetici/kullanicilar/kullanicilar.component';
import { KullanicitipDialogComponent } from './components/yonetici/yonetici-dialog/kullanicitip-dialog/kullanicitip-dialog.component';
import { YakittipiDialogComponent } from './components/yonetici/yonetici-dialog/yakittipi-dialog/yakittipi-dialog.component';
import { OdasayisiDialogComponent } from './components/yonetici/yonetici-dialog/odasayisi-dialog/odasayisi-dialog.component';
import { EsyadurumuDialogComponent } from './components/yonetici/yonetici-dialog/esyadurumu-dialog/esyadurumu-dialog.component';
import { IlantipDialogComponent } from './components/yonetici/yonetici-dialog/ilantip-dialog/ilantip-dialog.component';
import { KategoriAyarlarComponent } from './components/yonetici/kategori-ayarlar/kategori-ayarlar.component';
import { IllerDialogComponent } from './components/yonetici/yonetici-dialog/iller-dialog/iller-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material.module';
import { SidenavComponent } from './components/yonetici/sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { IlilceislemleriComponent } from './components/yonetici/ililceislemleri/ililceislemleri.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IlceislemleriComponent } from './components/yonetici/ililceislemleri/ilceislemleri/ilceislemleri.component';
import { IlceDialogComponent } from './components/yonetici/yonetici-dialog/ilce-dialog/ilce-dialog.component';
import { UyeolDialogComponent } from './components/anasayfa/ana-dialogs/uyeol-dialog/uyeol-dialog.component';
import { IlanlarComponent } from './components/yonetici/ilanlar/ilanlar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    IlilceislemleriComponent,
    IlceislemleriComponent,
    KategoriAyarlarComponent,
    KullanicilarComponent,
    IlanlarComponent,
    //admin dialogs
    IllerDialogComponent,
    IlceDialogComponent,
    IlantipDialogComponent,
    EsyadurumuDialogComponent,
    OdasayisiDialogComponent,
    YakittipiDialogComponent,
    KullanicitipDialogComponent,
    KullaniciDialogComponent,
    IlanDialogComponent,
    CikisDialogComponent,
    //anasayfa
    AnasayfaComponent,

    //uye ol
    UyeolDialogComponent,
    GirisyapDialogComponent,


    //kulllanicilar
    KullanicisidenavComponent,
    IlanlarimComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    ToastrModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
