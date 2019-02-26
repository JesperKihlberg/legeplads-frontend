import React from "react";
import { Map, Marker, Popup, TileLayer, ScaleControl, WMSTileLayer } from "react-leaflet";
const styles = require("./Map.scss");

export interface ILocalMapDispatchProps {
  mapClick?: (lat: number, lng: number) => void;
}
export interface ILocalMapValueProps {
  mapCenter?: number[];
  mapZoom?: number;
  mapSelectedCoord?: number[];
}

interface ILocalMapProps extends ILocalMapDispatchProps, ILocalMapValueProps {}

interface ILocalMapState {
  zoomLevel: number;
}

class LocalMap extends React.Component<ILocalMapProps, ILocalMapState> {
  constructor(props: ILocalMapProps) {
    super(props);
    this.state = { zoomLevel: props.mapZoom };
  }
  componentDidUpdate(prevProps: ILocalMapProps) {
    if (this.props.mapZoom && this.props.mapZoom !== prevProps.mapZoom) {
      this.setState({ zoomLevel: this.props.mapZoom });
    }
  }
  mapClick(e: any) {
    this.props.mapClick(e.latlng.lat, e.latlng.lng);
  }
  onZoom = (e: { target: { _zoom: number } }) => {
    console.log(e.target._zoom);

    this.setState({ zoomLevel: e.target._zoom });
  };
  render() {
    return (
      <div className={styles.mapContainer}>
        <Map
          center={this.props.mapCenter as any}
          zoom={this.props.mapZoom}
          onclick={this.mapClick.bind(this)}
          onzoomend={this.onZoom}
        >
          <ScaleControl position="bottomright" />
          <TileLayer
            url="https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.state.zoomLevel > 14 && (
            <WMSTileLayer
              url="http://kort.aws.dk/geoserver/aws4_wms/ows"
              layers="vejnavnelinjer"
              format="image/png"
              transparent={true}
              cql_filter="id='7be9be74-d2cf-4cd1-8b75-cbaaf47cb5a9'"
            />
          )}
          {this.props.mapSelectedCoord ? (
            <Marker position={this.props.mapSelectedCoord as any}>
              <Popup>
                <span>
                  A pretty CSS3 popup.
                  <br />
                  Easily customizable.
                </span>
              </Popup>
            </Marker>
          ) : null}
        </Map>
      </div>
    );
  }
}

export default LocalMap;
