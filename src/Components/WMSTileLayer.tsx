import React from "react";
import { WMSTileLayer } from "react-leaflet";

interface ILetKortWMSTileLayerDispatchProps {}

interface ILetKortWMSTileLayerExternalProps {
  layer: TileLayer;
  filter?: string;
}

interface ILetKortWMSTileLayerProps extends ILetKortWMSTileLayerExternalProps, ILetKortWMSTileLayerDispatchProps {}

class LetKortWMSTileLayer extends React.Component<ILetKortWMSTileLayerProps, {}> {
  render() {
    let additionalLayerProps = {};
    const filter = this.props.filter;

      if (this.props.filter) {
      additionalLayerProps = additionalLayerProps && {
        cql_filter: filter
      };
    }
    return (
      <WMSTileLayer
        url={this.props.layer.url}
        layers={this.props.layer.layer}
        format="image/png"
        transparent={true}
        {...additionalLayerProps}
      />
    );
  }
}
export type TileLayer =
  | {
      url: "https://kort.aws.dk/geoserver/aws4_wms/ows";
      layer:
        | "adgangsadresser"
        | "vejnavnelinjer"
        | "vejnavneomraader"
        | "vejpunkter"
        | "vejpunktlinjer"
        | "vejtilslutningspunkter";
    }
  | {
      url: "https://services.kortforsyningen.dk/forvaltning?ignoreillegallayers=TRUE&transparent=TRUE&login=hvemborher&password=p2AAzpEA9wa7M4s";
      layer: "BRUGSGRAENSE" | "kommunegraense" | "matrikelskel" | "vejnavne";
    };
export default LetKortWMSTileLayer;
