import React from "react";
import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import Map, { ILocalMapDispatchProps } from "./Map";

import IState from "Redux/IState";
import { withRouter, RouteComponentProps } from "react-router";
// import * as MapActions from "./Actions";

interface IMapContainerDispatchProps extends ILocalMapDispatchProps {}

interface IMapContainerInternalProps {
  lat: number;
  lng: number;
  zoom: number;
}

interface IMapContainerProps extends IMapContainerDispatchProps, IMapContainerInternalProps, RouteComponentProps<{}> {}

class MapContainer extends React.Component<IMapContainerProps, {}> {
  navigateMap(lat: number, lng: number) {
    this.props.mapClick(lat, lng);
  }
  onMoveEnd = (lat: number, lng: number, z: number) => {
    if (lat !== this.props.lat || lng != this.props.lng || z !== this.props.zoom)
      this.props.history.push(`/lat/${lat}/lng/${lng}/z/${z}`);
  };
  render() {
    console.log(this.props);
    return (
      <Map
        mapClick={this.navigateMap.bind(this)}
        onMoveEnd={this.onMoveEnd}
        lat={this.props.lat}
        lng={this.props.lng}
        zoom={this.props.zoom}
      />
    );
  }
}

const mapStateToProps = (state: IState): IMapContainerInternalProps => {
  return {
    lat: state.map.lat,
    lng: state.map.lng,
    zoom: state.map.zoom
  };
};

function mapDispatchToProps(dispatch: Dispatch<Action>): IMapContainerDispatchProps {
  return {
    mapClick: (lat: number, lng: number) => {
      console.log(lat + " " + lng);
    }
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MapContainer)
) as React.ComponentClass<{}>;
