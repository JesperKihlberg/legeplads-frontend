// import mainSaga from "Pages/Main/saga";
import mapSaga from "../Components/Map/saga";
import { fork } from "redux-saga/effects";

export default function* root() {
  yield [fork(mapSaga)];
}
  // yield [fork(mainSaga)];
