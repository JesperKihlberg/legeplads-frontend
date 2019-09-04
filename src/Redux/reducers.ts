import { combineReducers } from "redux";
import IState from "./IState";
import mainReducers from "Pages/Main/reducers";
import mapReducers from "Components/Map/reducers";

const reducers = combineReducers<IState>({
  main: mainReducers,
  map: mapReducers
});

export default reducers;
