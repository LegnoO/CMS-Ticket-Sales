/** @format */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import DefaultLayout from "./components/Layout/DefaultLayout";
import TicketControl from "./Pages/TicketControl";
import TicketList from "./Pages/TicketList/TicketList";
import Setting from "./Pages/Setting/Setting";
import Home from "./Pages/Home/Home";

function Routing() {
  const pages = [
    {
      component: <Home />,
      path: "/",
    },
    {
      component: <TicketList />,
      path: "/list",
    },
    {
      component: <TicketControl />,
      path: "/control",
      layout: null,
    },
    {
      component: <Setting />,
      path: "/setting",
    },
 
  ];

  return (
    <Router>
      <Routes>
        {pages.map((route, index) => {
          const page = route.component;
          let Layout = DefaultLayout;
          if (route.layout === null) {
            Layout = Fragment;
          } else {
            Layout = DefaultLayout;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout>{page}</Layout>}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default Routing;
