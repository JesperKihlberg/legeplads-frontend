import React, { createRef } from "react";
import ReactDOMServer from "react-dom/server";
import L, { divIcon } from "leaflet";
import { GeoJSON, Map, Marker, Popup, TileLayer, ScaleControl, Rectangle, CircleMarker } from "react-leaflet";
// import WMSTileLayer from "Components/WMSTileLayer";
import RoadLayer from "./RoadLayer";
import addressApi from "API/aws";
import streetsApi, { IAWSStreetFlat } from "API/streets";
import { LatLngBoundsExpression } from "leaflet";
import { GeoJsonObject } from "geojson";
import GeoJSONLayer from "./GeoJSONLayer";
import IconContainer from "./IconContainer/IconContainer";
const styles = require("./Map.scss");
// const icon = require("favicon.ico");
const marker = require("./graphiqlfavicon.png");

const copenhagen = require("./copenhagen.json");
const frederiksberg = require("./frederiksberg.json");
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

// const PlaygroundMarkerContent = (feature: { properties: { name: string } }) => {
//   console.log(feature.properties);
//   return (
//     <div className={styles.container}>
//       <div className={styles.icon}>
//         <img src={playgroundIcon} className={styles.img} />
//       </div>
//       <div className={styles.text}>
//         <span>{feature && feature.properties && feature.properties.name}</span>
//       </div>
//     </div>
//   );
// };
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
    // addressApi.reverseGeocode(e.latlng.lat, e.latlng.lng).then(res => {
    //   console.log(res.navngivenvej_id);
    //   streetsApi.getStreetsFromId(res.navngivenvej_id).then(streetRes => {
    //     console.log(streetRes);
    //     this.setState({
    //       selectedRoad: streetRes
    //     });
    //   });
    // });

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
  // onEachFeature = (feature: any, layer: any) => {
  //   layer.on({
  //     mouseover: (e: any) => console.log(e),
  //     mouseout: (e: any) => console.log(e),
  //     click: (e: any) => console.log(e, feature)
  //   });
  // };

  // pointToLayer = (feature: any, latlng: any) => {
  //   console.log("--- Point to layer");
  //   console.log("feature: ", feature);
  //   // console.log("latlng: ", latlng);
  //   const element = <PlaygroundMarkerContent feature={...feature as any} />;
  //   const myIcon = L.divIcon({
  //     html: ReactDOMServer.renderToString(element),
  //     // iconSize: [64, 64],
  //     iconAnchor: [0, 0],
  //     popupAnchor: [0, 64]
  //   });
  //   this.props.children;
  //   const elem = ReactDOMServer.renderToString(<PlaygroundMarkerContent feature={feature} />);
  //   var popup = L.popup({
  //     className: styles.popUp,
  //     closeButton: true,
  //     autoClose: false
  //   }).setContent(elem);
  //   return L.marker(latlng, { icon: myIcon }).bindPopup(popup);
  // };
  render() {
    console.log(this.state, this.popUpRef);
    const geoJsonCop = {
      type: "FeatureCollection",
      features: copenhagen.map((location: any) => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [location.lon, location.lat]
          },
          properties: {
            ...location
          }
        };
      })
    } as GeoJsonObject;

    const geoJsonFrb = {
      type: "FeatureCollection",
      features: frederiksberg.map((location: any) => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [location.lon, location.lat]
          },
          properties: {
            ...location
          }
        };
      })
    } as GeoJsonObject;

    console.log(geoJsonCop);

    // const LeafletMarkers = markers.map(marker => (
    //   <Marker position={marker.latlng} key={`marker_${marker.name}`}>
    //     <Popup>
    //       <span>{marker.name}</span>
    //     </Popup>
    //   </Marker>
    // ));

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
          <GeoJSONLayer
            data={geoJsonCop as any}
            renderIconElement={IconContainer}
            renderPopupElement={()=><div>Hej</div>}
            styles={{ icon: styles.iconContainer }}
          />
          <GeoJSONLayer
            data={geoJsonFrb as any}
            renderIconElement={IconContainer}
            renderPopupElement={()=><div>Hej</div>}
            styles={{ icon: styles.iconContainer }}
          />
          {/* <GeoJSON data={geoJsonFrb} onEachFeature={this.onEachFeature.bind(this)} pointToLayer={this.pointToLayer} /> */}
          {/* https://kk.sites.itera.dk/apps/kk_legepladser_ny/punkter.php?action=all */}
          {/* {this.state.zoomLevel > 12 && ( */}
          {/* <RoadLayer
            filter={{
              selectedIds: [this.state.selectedRoad && this.state.selectedRoad.id, "831a760e-4e3f-42e8-a9a5-0b771f72880a"]
            }}
          /> */}
          {/* <RoadLayer
            filter={{
              name: { like: "Store Kon%" }
            }}
          /> */}
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
          {/* <Marker position={[55.70400354, 12.51663793]} /> */}
          {/* <Rectangle bounds={this.state.bounds} /> */}
          {/* {this.state.selectedRoad && (
            <Popup
              position={[this.state.selectedRoad.visueltcenter_y, this.state.selectedRoad.visueltcenter_x]}
              ref={this.popUpRef}
              closeOnClick={false}
              closeButton={false}
              className={styles.sign}
            >
              <div className={styles.innerSign}>{this.state.selectedRoad.navn}</div>
            </Popup>
          )} */}
          {/* {this.state.selectedRoad && (
            <Marker position={[this.state.selectedRoad.visueltcenter_y, this.state.selectedRoad.visueltcenter_x]} />
          )} */}
          {/* ) : null} */}
        </Map>
        {/* <div className={styles.sign}>
          <div className={styles.innerSign}>Bisiddervej</div>
        </div> */}
      </div>
    );
  }
}

export default LocalMap;
