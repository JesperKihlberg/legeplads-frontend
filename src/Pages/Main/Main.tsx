import React from "react";

interface IMainDispatchProps {}

interface IMainExternalProps {}

interface IMainProps extends IMainExternalProps, IMainDispatchProps {}

class Main extends React.Component<IMainProps, {}> {
  render() {
    return <div>Let Kort 2</div>;
  }
}

export default Main;
