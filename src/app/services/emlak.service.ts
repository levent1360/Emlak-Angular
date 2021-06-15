import { Ilceler, Iller, IlanTip, EsyaDurumu, OdaSayisi, YakitTipi, KullaniciTipi, Kullanici, Ilan } from './../models/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmlakService {

  apiUrl = "http://localhost:56862/api/"

  constructor(private httpClient: HttpClient) { }

  //iller servis
  IlListeleServis() {
    return this.httpClient.get(this.apiUrl + "illerliste")
  }
  IlByIdServis(ILId: string) {
    return this.httpClient.get(this.apiUrl + "Illerbyid/" + ILId)
  }
  IlEkleServis(il: Iller) {
    return this.httpClient.post(this.apiUrl + "ilekle", il)
  }
  ilDuzenleServis(il: Iller) {
    return this.httpClient.put(this.apiUrl + "ilduzenle", il)
  }
  ilSilServis(id: string) {
    return this.httpClient.delete(this.apiUrl + "ilsil/" + id)
  }


  //ilce servis
  IlceListeleServis() {
    return this.httpClient.get(this.apiUrl + "ilcelerliste")
  }

  IlceByİlIdListeleServis(ilId: string) {
    return this.httpClient.get(this.apiUrl + "Ilcelerbyilid/" + ilId)
  }

  IlceEkleServis(ilce: Ilceler) {
    return this.httpClient.post(this.apiUrl + "ilceekle", ilce)
  }
  ilceDuzenleServis(ilce: Ilceler) {
    return this.httpClient.put(this.apiUrl + "ilceduzenle", ilce)
  }
  ilceSilServis(id: string) {
    return this.httpClient.delete(this.apiUrl + "ilcesil/" + id)
  }

  //İlan Tipleri
  IlanTipiListeleServis() {
    return this.httpClient.get(this.apiUrl + "ilantipliste")
  }
  IlanTipEkleServis(ilanTip: IlanTip) {
    return this.httpClient.post(this.apiUrl + "ilantipekle", ilanTip)
  }
  IlanTipDuzenleServis(ilanTip: IlanTip) {
    return this.httpClient.put(this.apiUrl + "ilantipduzenle", ilanTip)
  }
  IlanTipSilServis(ilanTipId: string) {
    return this.httpClient.delete(this.apiUrl + "ilantipisil/" + ilanTipId)
  }

  //Eşya Durumu
  EsyaDurumuListeleServis() {
    return this.httpClient.get(this.apiUrl + "esyadurumuliste")
  }
  EsyaDurumuEkleServis(esyadurumu: EsyaDurumu) {
    return this.httpClient.post(this.apiUrl + "esyadurumuekle", esyadurumu)
  }
  EsyaDurumuDuzenleServis(esyadurumu: EsyaDurumu) {
    return this.httpClient.put(this.apiUrl + "esyadurumduzenle", esyadurumu)
  }
  EsyaDurumuSilServis(esyadurumuid: string) {
    return this.httpClient.delete(this.apiUrl + "esyadurumusil/" + esyadurumuid)
  }

  //Oda Sayısı
  OdaSayisiListeleServis() {
    return this.httpClient.get(this.apiUrl + "odasayisiliste")
  }
  OdaSayisiEkleServis(odasayisi: OdaSayisi) {
    return this.httpClient.post(this.apiUrl + "odasayisiekle", odasayisi)
  }
  OdaSayisiDuzenleServis(odasayisi: OdaSayisi) {
    return this.httpClient.put(this.apiUrl + "odasayisiduzenle", odasayisi)
  }
  OdaSayisiSilServis(odaid: string) {
    return this.httpClient.delete(this.apiUrl + "odasayisisil/" + odaid)
  }

    //Yakit Tipi
    YakitTipiListeleServis() {
      return this.httpClient.get(this.apiUrl + "yakittipiliste")
    }
    YakitTipiEkleServis(yakittipi: YakitTipi) {
      return this.httpClient.post(this.apiUrl + "yakittipiekle", yakittipi)
    }
    YakitTipiDuzenleServis(yakittipi: YakitTipi) {
      return this.httpClient.put(this.apiUrl + "yakittipiduzenle", yakittipi)
    }
    YakitTipiSilServis(yakitid: string) {
      return this.httpClient.delete(this.apiUrl + "yakittipisil/" + yakitid)
    }
    
    //Kullanıcı Tipi
    KullaniciTipiListeleServis() {
      return this.httpClient.get(this.apiUrl + "kullanicitipiliste")
    }
    KullaniciTipiByIdServis(kullaniciTipId:string) {
      return this.httpClient.get(this.apiUrl + "kullanicitipibyid/"+kullaniciTipId)
    }
    KullaniciTipiEkleServis(kullanicitipi: KullaniciTipi) {
      return this.httpClient.post(this.apiUrl + "kullanicitipiekle", kullanicitipi)
    }
    KullaniciTipiDuzenleServis(kullanicitipi: KullaniciTipi) {
      return this.httpClient.put(this.apiUrl + "kullanicitipiduzenle", kullanicitipi)
    }
    KullaniciTipiSilServis(kullanicitipid: string) {
      return this.httpClient.delete(this.apiUrl + "kullanicitipisil/" + kullanicitipid)
    }

    //Kullanıcı Ekle
    KullaniciEkleServis(kullanici:Kullanici){
      return this.httpClient.post(this.apiUrl+"kullaniciekle",kullanici)
    }
    KullaniciListeleServis(){
      return this.httpClient.get(this.apiUrl+"kullaniciliste")
    }
    KullaniciByIdServis(kullanciId:string){
      return this.httpClient.get(this.apiUrl+"kullanicibyid/"+kullanciId)
    }
    KullaniciDuzenleServis(kullanici:Kullanici){
      return this.httpClient.put(this.apiUrl+"kullaniciduzenle",kullanici)
    }


    //Giris
    KullaniciGirisKontrolServis(mail:string,sifre:string){
      return this.httpClient.get(this.apiUrl+"giriskontrol/"+mail+"/"+sifre);
    }
    //İlanlar
    IlanListeleServis(){
      return this.httpClient.get(this.apiUrl+"ilanliste")
    }
    IlanListeleByUIDServis(uid:string){
      return this.httpClient.get(this.apiUrl+"ilanlistebyuid/"+uid)
    }
    IlanEkleServis(ilan:Ilan){
      return this.httpClient.post(this.apiUrl+"ilanekle",ilan)
    }
    IlanDuzenleServis(ilan:Ilan){
      return this.httpClient.put(this.apiUrl+"ilanduzenle",ilan)
    }
    IlanSilServis(id:string){
      return this.httpClient.delete(this.apiUrl+"ilansil/"+id)
    }
}
