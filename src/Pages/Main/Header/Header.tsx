import React from "react";

const styles = require("./Header.scss");

interface IHeaderDispatchProps {}

interface IHeaderExternalProps {}

interface IHeaderProps extends IHeaderExternalProps, IHeaderDispatchProps {}

class Header extends React.Component<IHeaderProps, {}> {
  render() {
    return <div className={styles.header}>Header</div>;
  }
}

export default Header;
