import React from "react";
import MapContainer from "Components/MapContainer";

const styles = require("./Main.scss");

interface IMainDispatchProps {}

interface IMainExternalProps {}

interface IMainProps extends IMainExternalProps, IMainDispatchProps {}

class Main extends React.Component<IMainProps, {}> {
  render() {
    return (
      <div>
        <h1>Let Kort</h1>
        <div className={styles.map}>
          <MapContainer />
        </div>
      </div>
    );
  }
}

export default Main;
