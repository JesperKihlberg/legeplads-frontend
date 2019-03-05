
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
      .then(response =>
        response.json())
      .catch(error => error)
      .then(data => data);

  },

  getAccessAdressesFromId(id: string) {
    return fetch("https://dawa.aws.dk/adgangsadresser/" + id + "?struktur=flad", {
      method: "GET"
    })
      .then(response =>
        response.json())
      .catch(error => error)
      .then(data => data);

  },

  getAdressesFromAccessAdressId(id: string) {
    return fetch("https://dawa.aws.dk/adresser?adgangsadresseid=" + id + "&struktur=flad", {
      method: "GET"
    })
      .then(response =>
        response.json())
      .catch(error => error)
      .then(data => data);

  },

  autoComplete(searchString: string, caretPos: number) {
    return fetch("https://dawa.aws.dk/autocomplete?q=" + searchString + "&caretpos=" + caretPos + "&fuzzy&per_side=10", {
      method: "GET"
    })
      .then(response =>
        response.json())
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

export default addressApi;
