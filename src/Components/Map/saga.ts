// import { union } from "ts-action";
// import { takeLatest, select, put } from "redux-saga/effects";
// import { SetZoom } from "./Actions";
// import IState from "Redux/IState";
// import IMapState from "./IState";

// const All = union({ SetZoom });

// function* setZoom(action: typeof All) {
//   yield console.log("Hestepærer", action);

//   try {
//     if (action.type === SetZoom.type) {
//       const stateProps: IMapState = yield select((state: IState) => state.map);
//       if (action.zoom !== stateProps.zoom) {
//         yield put(push(`/lat/${stateProps.lat}/lng/${stateProps.lng}/z/${action.zoom}`));
//       }
//     }
//   } catch (e) {}
// }

// export default function* saga() {
//   yield takeLatest(SetZoom.type, setZoom);
// }
