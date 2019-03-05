import React, { createRef } from "react";
import { Map, Marker, Popup, TileLayer, ScaleControl, Rectangle } from "react-leaflet";
// import WMSTileLayer from "Components/WMSTileLayer";
import RoadLayer from "./RoadLayer";
import addressApi from "API/aws";
import streetsApi, { IAWSStreetFlat } from "API/streets";
import { LatLngBoundsExpression } from "leaflet";
const styles = require("./Map.scss");
// const icon = require("favicon.ico");
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
  selectedRoad?: IAWSStreetFlat;
  bounds?: LatLngBoundsExpression;
}

// export const pointerIcon = new Icon({
//   iconUrl: icon,
//   iconAnchor: [5, 55],
//   popupAnchor: [10, -44],
//   iconSize: [25, 55],
//   shadowSize: [68, 95],
//   shadowAnchor: [20, 92]
// });

class LocalMap extends React.Component<ILocalMapProps, ILocalMapState> {
  private popUpRef = createRef<Popup>();
  constructor(props: ILocalMapProps) {
    super(props);
    this.state = {
      zoomLevel: props.mapZoom,
      bounds: [[55.70400354, 12.51663793], [55.70951436, 12.53838263]]
    };
  }
  componentDidUpdate(prevProps: ILocalMapProps) {
    if (this.props.mapZoom && this.props.mapZoom !== prevProps.mapZoom) {
      this.setState({ zoomLevel: this.props.mapZoom });
    }
  }
  mapClick(e: any) {
    // console.log(e);
    addressApi.reverseGeocode(e.latlng.lat, e.latlng.lng).then(res => {
      console.log(res.navngivenvej_id);
      streetsApi.getStreetsFromId(res.navngivenvej_id).then(streetRes => {
        console.log(streetRes);
        this.setState({
          selectedRoad: streetRes
        });
      });
    });

    this.props.mapClick(e.latlng.lat, e.latlng.lng);
  }
  onZoom = (e: { target: { _zoom: number } }) => {
    console.log(e, (e.target as any).getBounds());
    this.setState({ zoomLevel: e.target._zoom });
    this.setState({ bounds: (e.target as any).getBounds() });
  };
  onDrag = (e: any) => {
    console.log(e);
  };

  render() {
    console.log(this.state, this.popUpRef);

    return (
      <div className={styles.mapContainer}>
        <Map
          bounds={
            this.state.selectedRoad
              ? [
                  [this.state.selectedRoad.bbox_ymin, this.state.selectedRoad.bbox_xmin],
                  [this.state.selectedRoad.bbox_ymax, this.state.selectedRoad.bbox_xmax]
                ]
              : [[55.70400354, 12.51663793], [55.70951436, 12.53838263]]
          }
          onclick={this.mapClick.bind(this)}
          onzoomend={this.onZoom}
          ondragend={this.onDrag}
        >
          <ScaleControl position="bottomright" />
          <TileLayer
            url="https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* {this.state.zoomLevel > 12 && ( */}
          <RoadLayer selectedId={this.state.selectedRoad && this.state.selectedRoad.id} />
          {/* )} */}
          {/* {this.state.zoomLevel > 12 && (
            <WMSTileLayer
              layer={{
                url:
                  "https://services.kortforsyningen.dk/forvaltning?ignoreillegallayers=TRUE&transparent=TRUE&login=hvemborher&password=p2AAzpEA9wa7M4s",
                layer: "matrikelskel"
              }}
            />
          )} */}
          {/* {this.props.mapSelectedCoord ? ( */}
          {/* <Marker position={[55.70400354, 12.51663793]} > */}
          <Rectangle
            bounds={
              this.state.bounds
            }
          />
          {this.state.selectedRoad && (
            <Popup
              position={[this.state.selectedRoad.visueltcenter_y, this.state.selectedRoad.visueltcenter_x]}
              ref={this.popUpRef}
              closeOnClick={false}
              closeButton={false}
            >
              <span>
                {this.state.selectedRoad.navn}
                <br />
                Easily customizable.
              </span>
            </Popup>
          )}
          {/* </Marker> */}
          {/* ) : null} */}
        </Map>
      </div>
    );
  }
}

export default LocalMap;
