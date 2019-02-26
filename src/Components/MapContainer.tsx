import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Map, { ILocalMapValueProps, ILocalMapDispatchProps } from "./Map";

import IState from "Redux/IState";
// import * as MapActions from "./Actions";

interface IMapContainerDispatchProps extends ILocalMapDispatchProps {}

interface IMapContainerInternalProps extends ILocalMapValueProps {}

interface IMapContainerProps extends IMapContainerDispatchProps, IMapContainerInternalProps {}

class MapContainer extends React.Component<IMapContainerProps, {}> {
  navigateMap(lat: number, lng: number) {
    this.props.mapClick(lat, lng);
  }
  render() {
    return (
      <Map
        mapClick={this.navigateMap.bind(this)}
        mapCenter={this.props.mapCenter}
        mapSelectedCoord={this.props.mapSelectedCoord}
        mapZoom={this.props.mapZoom}
      />
    );
  }
}

const mapStateToProps = (state: IState): IMapContainerInternalProps => {
  const mapState = {
    mapCenter: [55.8, 12],
    mapZoomLevel: 7,
    mapSelectedCoord: null as any
  };

  return {
    mapCenter: mapState.mapCenter,
    mapZoom: mapState.mapZoomLevel,
    mapSelectedCoord: mapState.mapSelectedCoord
  };
};

function mapDispatchToProps(dispatch: Dispatch<{}>): IMapContainerDispatchProps {
  return {
    mapClick: (lat: number, lng: number) => {
      console.log(lat + " " + lng);

      // dispatch(new MapActions.Click({ lat: lat, lng: lng }));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer) as React.ComponentClass<{}>;
