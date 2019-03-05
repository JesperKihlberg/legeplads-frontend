import React from "react";
import WMSTileLayer from "./WMSTileLayer";

// const styles = require("./RoadLayer.scss");

interface IRoadLayerDispatchProps {}

interface IRoadLayerExternalProps {
  zoomToSelected?: boolean;
  selectOnClick?: boolean;
  filterSelected?: boolean;
  showAllOnNoSelection?: boolean;
  selectedId?: string;
}

interface IRoadLayerProps extends IRoadLayerExternalProps, IRoadLayerDispatchProps {}

class RoadLayer extends React.Component<IRoadLayerProps, {}> {
  render() {
    return (
      <WMSTileLayer
        layer={{ url: "https://kort.aws.dk/geoserver/aws4_wms/ows", layer: "vejnavnelinjer" }}
        selectedId={this.props.selectedId}
      />
    );
  }
}

export default RoadLayer;
