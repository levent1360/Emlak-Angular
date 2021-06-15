import { AdminGuard } from './services/admin.guard';
import { UyeGuard } from './services/uye.guard';
import { IlanlarimComponent } from './components/yonetici/ilanlarim/ilanlarim.component';
import { AnasayfaComponent } from './components/anasayfa/anasayfa/anasayfa.component';
import { KullanicilarComponent } from './components/yonetici/kullanicilar/kullanicilar.component';
import { KategoriAyarlarComponent } from './components/yonetici/kategori-ayarlar/kategori-ayarlar.component';
import { IlceislemleriComponent } from './components/yonetici/ililceislemleri/ilceislemleri/ilceislemleri.component';
import { IlilceislemleriComponent } from './components/yonetici/ililceislemleri/ililceislemleri.component';
import { SidenavComponent } from './components/yonetici/sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { IlanlarComponent } from './components/yonetici/ilanlar/ilanlar.component';

const routes: Routes = [
  {path:"",component:AnasayfaComponent},
  {path:"yonetici", component:SidenavComponent, canActivate:[AdminGuard], children:
[
  {path:"ililceislemleri", component:IlilceislemleriComponent},
  {path:"ilanlar", component:IlanlarComponent},
  {path:"ilceislemleri/:id", component:IlceislemleriComponent},
  {path:"kategoriler", component:KategoriAyarlarComponent},
  {path:"kullanicilar",component:KullanicilarComponent},
  {path:"ilanlarim",component:IlanlarimComponent}
]
},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
