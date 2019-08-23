const uri = "https://dawa.aws.dk/";
const streetsApi = {
  getStreetsFromAddress(postnr: string, vejnavn: string, nummer: string) {
    console.log(process.env.NODE_ENV);

    return fetch(uri + "/getOnAddress/deltager/postnr/" + postnr + "/vejnavn/" + vejnavn + "/nummer/" + nummer, {
      method: "GET"
    })
      .then(response => response.json())
      .catch(error => error)
      .then(data => data);
  },
  getStreetsFromId(id: string): Promise<IAWSStreetFlat> {
    console.log(process.env.NODE_ENV);
    // http://dawa.aws.dk/navngivneveje/{id}
    return fetch(uri + "/navngivneveje/" + id + "?struktur=flad", {
      method: "GET"
    })
      .then(response => response.json())
      .catch(error => error)
      .then(data => data);
  }
};

export interface IAWSStreetMini {
  id: string;
  darstatus: string;
  navn: string;
  adresseringsnavn: string;
}
export interface IAWSStreetFlat extends IAWSStreetMini {
  oprettet: Date;
  ændret: Date;
  administrerendekommunekode: string;
  administrerendekommunenavn: string;
  retskrivningskontrol: string;
  udtaltvejnavn: string;
  beliggenhed_oprindelse_kilde: string;
  beliggenhed_oprindelse_nøjagtighedsklasse: string;
  beliggenhed_oprindelse_registrering: Date;
  beliggenhed_oprindelse_tekniskstandard: string;
  beliggenhed_geometritype: string;
  bbox_xmin: number;
  bbox_ymin: number;
  bbox_xmax: number;
  bbox_ymax: number;
  visueltcenter_x: number;
  visueltcenter_y: number;
}

export interface IAdministrerendekommune {
  href: string;
  kode: string;
  navn: string;
}

export interface IHistorik {
  oprettet: Date;
  ændret: Date;
}

export interface IVejstykker {
  href: string;
  kommunekode: string;
  kode: string;
  id: string;
}

export interface IPostnumre {
  href: string;
  nr: string;
  navn: string;
}

export interface IOprindelse {
  kilde: string;
  tekniskstandard: string;
  registrering: Date;
  nøjagtighedsklasse: string;
}

export interface IBeliggenhed {
  oprindelse: IOprindelse;
  vejtilslutningspunkter?: any;
  geometritype: string;
}

export interface IAWSStreetFull {
  id: string;
  href: string;
  darstatus: string;
  navn: string;
  adresseringsnavn: string;
  administrerendekommune: IAdministrerendekommune;
  retskrivningskontrol: string;
  udtaltvejnavn: string;
  visueltcenter: number[];
  bbox: number[];
  historik: IHistorik;
  vejstykker: IVejstykker[];
  postnumre: IPostnumre[];
  beliggenhed: IBeliggenhed;
}

export default streetsApi;
