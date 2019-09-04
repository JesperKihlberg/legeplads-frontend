import { action, props } from "ts-action";

export const SetLatLon = action("MAP_SET_LAT_LON", props<{ lat: number; lng: number }>());
export const SetMapLocation = action("MAP_SET_MAP_LOCATION", props<{ lat: number; lng: number; zoom: number }>());
export const SetZoom = action("MAP_SET_ZOOM", props<{ zoom: number }>());
