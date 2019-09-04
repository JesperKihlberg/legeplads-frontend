import { GeoJSON } from "react-leaflet";
import { GeoJsonObject, Feature } from "geojson";

import React, { ReactElement } from "react";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";

interface IGeoJSONLayerProps {
  data: GeoJsonObject & { feature: any };
  renderIconElement: (feature: any) => ReactElement;
  renderPopupElement: (feature: any) => ReactElement;
  styles?: { popUp?: string; icon?: string };
}
const GeoJSONLayer = (props: IGeoJSONLayerProps) => {
  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => console.log(e),
      mouseout: (e: any) => console.log(e),
      click: (e: any) => console.log(e, feature)
    });
  };
  const pointToLayer = (feature: Feature, latlng: any) => {
    console.log("--- Point to layer");
    console.log("feature: ", feature);
    // console.log("latlng: ", latlng);
    const iconElement = ReactDOMServer.renderToString(props.renderIconElement(feature));
    const myIcon = L.divIcon({
      html: iconElement,
      className: props.styles && props.styles.icon,
      iconAnchor: [18, 18],
      popupAnchor: [0, 64]
    });
    const popupElement = ReactDOMServer.renderToString(props.renderPopupElement(feature));
    var popup = L.popup({
      className: props.styles && props.styles.popUp,
      closeButton: true,
      autoClose: false
    }).setContent(popupElement);
    const marker = L.marker(latlng, { icon: myIcon });
    if (popup) marker.bindPopup(popup);
    return marker;
  };

  return <GeoJSON data={props.data} onEachFeature={onEachFeature.bind(this)} pointToLayer={pointToLayer} />;
};

export default GeoJSONLayer;
