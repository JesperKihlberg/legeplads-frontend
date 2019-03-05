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
  },
  getFis() {
    return;
  }
};

export interface IAWSStreetFlat {
  id: string;
  darstatus: string;
  oprettet: Date;
  ændret: Date;
  navn: string;
  adresseringsnavn: string;
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

export default streetsApi;
