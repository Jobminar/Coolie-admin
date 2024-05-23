import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Header from "./components/Header/header";
import Sidebar from "./components/Sideheader/sidebar";
import Jobsarea from "./components/Sections/Jobsarea/jobsarea";
import Servermanager from "./components/Sections/Servermanager/Servermanager";
import Providerscorner from "./components/Sections/Providerscorner/Providerscorner";
import Loyalitycards from "./components/Sections/Loyalitycards/Loyalitycards";
import Banners from "./components/Sections/Banners/Banners";
import Accounting from "./components/Sections/Accounting/Accounting";
import Marketing from "./components/Sections/Marketing/Marketing";
import Subadmin from "./components/Sections/Subadmin/Subadmin";
import UserManager from "./components/Sections/Usercorner/Usercorner";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Sidebar>
          <Routes>
            <Route path="/" element={<Jobsarea />} />
            <Route path="/servermanager" element={<Servermanager />} />
            <Route path="/usercorner" element={<UserManager />} />
            <Route path="/providersrcorner" element={<Providerscorner />} />
            <Route path="/loyalitycards" element={<Loyalitycards />} />
            <Route path="/banners" element={<Banners />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/subadmin" element={<Subadmin />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
};

export default Routing;
