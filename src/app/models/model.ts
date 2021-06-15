export class Iller {
    ILId: string;
    ILAd: string;
}

export class Ilceler {
    IlceId: string;
    IlceAd: string;
    IlceIlid: string;
    IlceIlAd: string;
}

export class IlanTip {
    TipId: string;
    TipAd: string;
}
export class EsyaDurumu {
    EsyaId: string;
    EsyaAd: string;
}
export class OdaSayisi{
    OdaSayisiId: string;
    OdaSayisiAd: string;
}
export class YakitTipi{
    YakitTipId: string;
    YakitTipAd: string;
}
export class KullaniciTipi{
    KullaniciTipId: string;
    KullaniciTipAd: string;
}
export class Kullanici{
    KullaniciId: string;
    KullaniciAdi: string;
    KullaniciSoyadi: string;
    KullaniciMail: string;
    KullaniciSifre: string;
    KullaniciTipId: string;
    KullaniciTipAd: string;
    KullaniciTel: string;
    KullaniciilanSay:number;
}
export class GirisKontrol{
    KullaniciId: string;
    KullaniciTipId: string;
    KullaniciTipAd:string;
}
export class Ilan{
    IlanId: string;
    IlanAd: string;
    IlanFiyat: number;
    IlanMKare: number;
    IlanILId: string;
    IlanILAd: string;
    IlanILceId: string;
    IlanILceAd: string;
    IlanTipId: string;
    IlanTipAd: string;
    IlanEsyaId: string;
    IlanEsyaAd: string;
    IlanYakitTipId: string;
    IlanYakitTipAd: string;
    IlanOdaSayId: string;
    IlanOdaSayAd: string;
    IlanFotoUrl: string;
    IlanAdres: string;
    IlanSahibiId:string;
    kullaniciBilgi: Kullanici;
}

export class Sonuc {
    islem: boolean;
    mesaj: string;
}