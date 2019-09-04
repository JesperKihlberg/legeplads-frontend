import React from "react";

import { HashRouter } from "react-router-dom";

import Main from "Pages/Main/Main";

// Apply any type to work around missing applyRouterMiddleware in d.t.s file.
import * as ReactRouterTS from "react-router";
import LatLngUrlContainer from "Containers/LatLngUrlContainer";
const Route = ReactRouterTS.Route as any;

interface IAppRootInternalProps {}
interface IAppRootExternalProps {}
interface IAppRootDispatchProps {
  registerBrandImageAction: (brandImage: new () => React.Component<any, any>) => void;
}

class AppRoutes extends React.Component<IAppRootExternalProps & IAppRootInternalProps & IAppRootDispatchProps, {}> {
  render() {
    return (
      <HashRouter>
        <React.Fragment>
          <Route path="/" component={Main} />
          <Route path={`/lat/:lat/lng/:lng/z/:zoom`} component={LatLngUrlContainer} />
        </React.Fragment>
      </HashRouter>
    );
  }
}

export const appRoutes = AppRoutes as React.ComponentClass<IAppRootExternalProps>;
