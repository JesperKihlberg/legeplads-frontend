import React from "react";
import WMSTileLayer from "./WMSTileLayer";

// const styles = require("./RoadLayer.scss");

interface IRoadLayerDispatchProps {}

interface IRoadLayerExternalProps {
  zoomToSelected?: boolean;
  filter: {
    selectedIds?: string[];
    name?: {
      like?: string;
      equal?: string;
    };
  };
  selectedId?: string;
}

interface IRoadLayerProps extends IRoadLayerExternalProps, IRoadLayerDispatchProps {}

class RoadLayer extends React.Component<IRoadLayerProps, {}> {
  render() {
    const selectedIdFilter =
      this.props.filter &&
      this.props.filter.selectedIds &&
      this.props.filter.selectedIds.map(id => (id ? "id = '" + id + "'" : "")).join(" or ");
    const nameFilter =
      this.props.filter &&
      this.props.filter.name &&
      (this.props.filter.name.equal
        ? "navn = '" + this.props.filter.name.equal + "'"
        : this.props.filter.name.like && "navn like '" + this.props.filter.name.like + "'");
    let filter = "";
    if (selectedIdFilter && nameFilter) filter = selectedIdFilter + " and " + nameFilter;
    else {
      if (selectedIdFilter) {
        filter = selectedIdFilter;
      }
      if (nameFilter) {
        filter = nameFilter;
      }
    }

    return (
      <WMSTileLayer layer={{ url: "https://kort.aws.dk/geoserver/aws4_wms/ows", layer: "vejnavnelinjer" }} filter={filter} />
    );
  }
}

export default RoadLayer;
