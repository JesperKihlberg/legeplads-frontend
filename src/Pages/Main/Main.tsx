import React from "react";
import MapContainer from "Components/Map/MapContainer";
import Header from "./Header/Header";
// import AutoDropdown from "react-autodropdown";
const styles = require("./Main.scss");

interface IMainDispatchProps {}

interface IMainExternalProps {}

interface IMainProps extends IMainExternalProps, IMainDispatchProps {}

class Main extends React.Component<IMainProps, {}> {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.main}>
          <MapContainer />
        </div>
      </div>
    );
  }
}

export default Main;
