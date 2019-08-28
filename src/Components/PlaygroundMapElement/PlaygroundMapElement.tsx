import React from "react";
import PlaygroundIcon from "./PlaygroundIcon";
const styles = require("./PlaygroundMapElement.scss");

const PlaygroundMapElement = (feature: { properties: { name: string } }) => (
  <div className={styles.container} tabIndex={0}>
    <div className={styles.icon}>
      <PlaygroundIcon className={styles.path} />
    </div>
    <div className={styles.text}>
      <span>{feature && feature.properties && feature.properties.name}</span>
    </div>
  </div>
);

export default PlaygroundMapElement;
