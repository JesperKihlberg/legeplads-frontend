const addressApi = {
  reverseGeocode(lat: number, lng: number) {
    return fetch("https://dawa.aws.dk/adgangsadresser/reverse?x=" + lng + "&y=" + lat + "&struktur=flad", {
      method: "GET"
    })
      .then(response => response.json())
      .catch(error => error)
      .then(data => data);
  },
  getAccessAddress(postnr: string, vejnavn: string, nummer: string) {
    return fetch("https://dawa.aws.dk/adgangsadresser?postnr=" + postnr + "&q=" + vejnavn + " " + nummer + "&struktur=flad", {
      method: "GET"
    })
      .then(response => response.json())
      .catch(error => error)
      .then(data => data);
  },

  getAdressesFromId(id: string) {
    return fetch("https://dawa.aws.dk/adresser/" + id + "?struktur=flad", {
      method: "GET"
    })
      .then(response => response.json())
      .catch(error => error)
      .then(data => data);
  },

  getAccessAdressesFromId(id: string) {
    return fetch("https://dawa.aws.dk/adgangsadresser/" + id + "?struktur=flad", {
      method: "GET"
    })
      .then(response => response.json())
      .catch(error => error)
      .then(data => data);
  },

  getAdressesFromAccessAdressId(id: string) {
    return fetch("https://dawa.aws.dk/adresser?adgangsadresseid=" + id + "&struktur=flad", {
      method: "GET"
    })
      .then(response => response.json())
      .catch(error => error)
      .then(data => data);
  },

  autoComplete(searchString: string, caretPos: number) {
    return fetch("https://dawa.aws.dk/autocomplete?q=" + searchString + "&caretpos=" + caretPos + "&fuzzy&per_side=10", {
      method: "GET"
    })
      .then(response => response.json())
      .catch(error => error)
      .then(data => data);
  }
};

export interface IAutoCompleteReponse {
  caretpos: number;
  data: IAutoCompleteVej | IAutoCompleteAddress;
  forslagstekst: string;
  stormodtagerpostnr?: boolean;
  tekst: string;
  type: string;
}

export interface IAutoCompleteVej {
  href: string;
  navn: string;
}

export interface IAutoCompleteAddress {
  dør?: string;
  etage?: string;
  href: string;
  husnr: string;
  id: string;
  postnr: string;
  postnrnavn: string;
  stormodtagerpostnr?: string;
  stormodtagerpostnrnavn?: string;
  supplerendebynavn?: string;
  vejnavn: string;
}
export interface IAWSAccessAdressBase {
  id: string;
  status: number;
  vejkode: string;
  vejnavn: string;
  adresseringsvejnavn: string;
  husnr: string;
  supplerendebynavn?: any;
  postnr: string;
  postnrnavn: string;
  kommunekode: string;
}

export interface IAWSAccessAdressMini extends IAWSAccessAdressBase {
  x: number;
  y: number;
}
export interface IAWSAccessAdressFlat extends IAWSAccessAdressBase {
  oprettet: Date;
  ændret: Date;
  stormodtagerpostnr?: any;
  stormodtagerpostnrnavn?: any;
  kommunenavn: string;
  ejerlavkode: number;
  ejerlavnavn: string;
  matrikelnr: string;
  esrejendomsnr: string;
  etrs89koordinat_øst: number;
  etrs89koordinat_nord: number;
  wgs84koordinat_bredde: number;
  wgs84koordinat_længde: number;
  nøjagtighed: string;
  kilde: number;
  tekniskstandard: string;
  tekstretning: number;
  adressepunktændringsdato: Date;
  ddkn_m100: string;
  ddkn_km1: string;
  ddkn_km10: string;
  regionskode: string;
  regionsnavn: string;
  jordstykke_ejerlavkode: number;
  jordstykke_matrikelnr: string;
  jordstykke_esrejendomsnr: string;
  jordstykke_ejerlavnavn: string;
  højde: number;
  adgangspunktid: string;
  vejpunkt_id: string;
  vejpunkt_kilde: string;
  vejpunkt_nøjagtighed: string;
  vejpunkt_tekniskstandard: string;
  vejpunkt_x: number;
  vejpunkt_y: number;
  sognekode: string;
  sognenavn: string;
  politikredskode: string;
  politikredsnavn: string;
  retskredskode: string;
  retskredsnavn: string;
  opstillingskredskode: string;
  opstillingskredsnavn: string;
  menighedsrådsafstemningsområdenummer: number;
  menighedsrådsafstemningsområdenavn: string;
  zone: string;
  afstemningsområdenummer: string;
  afstemningsområdenavn: string;
  brofast: boolean;
  supplerendebynavn_dagi_id?: any;
  navngivenvej_id: string;
  kvh: string;
}

export default addressApi;
