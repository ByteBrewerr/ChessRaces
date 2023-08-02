import React, { FC} from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import Main from "../pages/Main";
import Play from "../pages/Play";

const Routes: FC = () => {
  return (
    <RouterRoutes>
      <Route
       path="/"
       element={<Main/>}
      />
      <Route
       path="/play"
       element={<Play/>}
      />
    </RouterRoutes>
  );
};

export default Routes;