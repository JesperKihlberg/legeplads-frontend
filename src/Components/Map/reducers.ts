import IState from "./IState";
import { SetMapLocation
  // , SetZoom, SetLatLon
} from "./Actions";
import { union } from "ts-action";

const All = union({
  SetMapLocation
  // ,
  // SetZoom,
  // SetLatLon
});

const initialState: IState = {
  lat: 55.8,
  lng: 12,
  zoom: 7
};

function reducer(state: IState = initialState, action: typeof All) {
  switch (action.type) {
    case SetMapLocation.type:
      return { ...state, lat: action.lat, lng: action.lng, zoom: action.zoom };
    // case SetLatLon.type:
    //   return { ...state, lat: action.lat, lon: action.lon };
    // case SetZoom.type:
    //   return { ...state, zoom: action.zoom };
    default:
      return state;
  }
}

export default reducer;
