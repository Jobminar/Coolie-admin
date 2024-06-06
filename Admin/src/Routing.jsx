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
import Servicemanager from "./components/Sections/Servicemanager/Servicemanager";
import ManageService from "./components/Sections/Servicemanager/ManageService"; // Import ManageService
import Providerscorner from "./components/Sections/Providerscorner/Providerscorner";
import Loyalitycards from "./components/Sections/Loyalitycards/Loyalitycards";
import Banners from "./components/Sections/Banners/Banners";
import Accounting from "./components/Sections/Accounting/Accounting";
import Marketing from "./components/Sections/Marketing/Marketing";
import Subadmin from "./components/Sections/Subadmin/Subadmin";
import UserManager from "./components/Sections/Usercorner/Usercorner";
import Inductionmain from "./components/Sections/Induction/inductionmain";
import Addsubadmin from "./components/Sections/Subadmin/Addsubadmin";
import EditBanner from "./components/Sections/Banners/Editbanner";
import Editloyalitycards from "./components/Sections/Loyalitycards/editloyalitycards";
import Userpromotions from "./components/Sections/Promotions/userpromotions";


const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Sidebar>
          <Routes>
            <Route path="/" element={<Jobsarea />} />
            <Route path="/addservice" element={<Servicemanager />} />
            <Route path="/manageservice" element={<ManageService />} />{" "}
            {/* Add ManageService route */}
            <Route path="/usercorner" element={<UserManager />} />
            <Route path="/providersrcorner" element={<Providerscorner />} />
            <Route path="/loyalitycards" element={<Loyalitycards />} />
            <Route path="/banners" element={<Banners />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/subadmin" element={<Subadmin />} />
            <Route path="/inductionmain" element={<Inductionmain />} />
            <Route path="/addsubadmin" element={<Addsubadmin />} />
            <Route path="/editbanner" element={<EditBanner/>} />
            <Route path="/editloyality" element={<Editloyalitycards/>} />
            <Route path="/userpromotion" element={<Userpromotions/>} />

          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
};

export default Routing;
