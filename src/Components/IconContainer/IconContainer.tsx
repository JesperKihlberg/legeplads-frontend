import React from "react";
const styles = require("./IconContainer.scss");
const playgroundIcon = require("../../../public/playground-15.svg");


const IconContainer = (feature: { properties: { name: string } }) => (
  <div className={styles.container} tabIndex={0}>
    <div className={styles.icon}>
      <img src={playgroundIcon} className={styles.img} />
    </div>
    <div className={styles.text}>
      <span>{feature && feature.properties && feature.properties.name}</span>
    </div>
  </div>
);

export default IconContainer;
