import React from "react";
import { connect } from "react-redux";
import { Dispatch, Action } from "redux";

import * as MapActions from "../Components/Map/Actions";
import { withRouter, RouteComponentProps } from "react-router";

interface ILatLngUrlContainerDispatchProps {
  setMapLocation: (lat: number, lng: number, zoom: number) => void;
}

interface ILatLngUrlContainerInternalProps {}
interface IRouteProps {
  lat: string;
  lng: string;
  zoom: string;
}

interface ILatLngUrlContainerProps
  extends ILatLngUrlContainerDispatchProps,
    ILatLngUrlContainerInternalProps,
    RouteComponentProps<IRouteProps> {}

class LatLngUrlContainer extends React.Component<ILatLngUrlContainerProps, {}> {
  componentWillMount() {
    this.props.setMapLocation(
      parseFloat(this.props.match.params.lat),
      parseFloat(this.props.match.params.lng),
      parseFloat(this.props.match.params.zoom)
    );
  }

  componentWillReceiveProps(nextProps: Readonly<ILatLngUrlContainerProps>) {
    if (
      this.props.match.params.lat !== nextProps.match.params.lat ||
      this.props.match.params.lng !== nextProps.match.params.lng ||
      this.props.match.params.zoom !== nextProps.match.params.zoom
    ) {
      nextProps.setMapLocation(
        parseFloat(nextProps.match.params.lat),
        parseFloat(nextProps.match.params.lng),
        parseFloat(nextProps.match.params.zoom)
      );
    }
  }
  render(): JSX.Element {
    return null;
  }
}

const mapStateToProps = (): ILatLngUrlContainerInternalProps => ({});

function mapDispatchToProps(dispatch: Dispatch<Action<any>>): ILatLngUrlContainerDispatchProps {
  return {
    setMapLocation: (lat: number, lng: number, zoom: number) => {
      dispatch(MapActions.SetMapLocation({ lat, lng, zoom }));
    }
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LatLngUrlContainer)
) as React.ComponentClass<{}>;
