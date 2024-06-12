import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import Header from "./components/Header/header";
import Sidebar from "./components/Sideheader/sidebar";
import Jobsarea from "./components/Sections/Jobsarea/jobsarea";
import Servicemanager from "./components/Sections/Servicemanager/Servicemanager";
import ManageService from "./components/Sections/Servicemanager/Manageservices/ManageService";
import Providerscorner from "./components/Sections/Providerscorner/Providerscorner";
import Loyalitycards from "./components/Sections/Loyalitycards/Loyalitycards";
import Accounting from "./components/Sections/Accounting/Accounting";
import Marketing from "./components/Sections/Marketing/Marketing";
import Subadmin from "./components/Sections/Subadmin/Subadmin";
import UserManager from "./components/Sections/Usercorner/Usercorner";
import Inductionmain from "./components/Sections/Induction/inductionmain";
import Addsubadmin from "./components/Sections/Subadmin/Addsubadmin";
import EditBanner from "./components/Sections/Banners/Editbanner";
import Editloyalitycards from "./components/Sections/Loyalitycards/editloyalitycards";
import Userpromotions from "./components/Sections/Promotions/userpromotions";
import Providerpackage from "./components/Sections/Packages/providerpackage";
import Userpackage from "./components/Sections/Packages/userpackage";
import Providerpromotions from "./components/Sections/Promotions/providerpromotions";
import USerbanners from "./components/Sections/Banners/userBanners";
import Providerbanners from "./components/Sections/Banners/Providerbanners";
import Userbanners from "./components/Sections/Banners/userBanners";
import EditPromotion from "./components/Sections/Promotions/Editproviderpromotions";
import EditUserPromotion from "./components/Sections/Promotions/Edituserpromotions";
import EditproviderPromotion from "./components/Sections/Promotions/Editproviderpromotions";
import EditUserPackage from "./components/Sections/Packages/Edit-user-packages";
import EditProviderPackage from "./components/Sections/Packages/Edit-provider-package";
import Viewadmin from "./components/Sections/Subadmin/view-admin";
import Addadmin from "./components/Sections/Subadmin/Addsubadmin";

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
            <Route path="/usercorner" element={<UserManager />} />
            <Route path="/providersrcorner" element={<Providerscorner />} />
            <Route path="/loyalitycards" element={<Loyalitycards />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/subadmin" element={<Subadmin />} />
            <Route path="/inductionmain" element={<Inductionmain />} />
            <Route path="/addsubadmin" element={<Addsubadmin />} />
            <Route path="/editbanner" element={<EditBanner />} />
            <Route path="/editloyality" element={<Editloyalitycards />} />
            <Route path="/userpromotion" element={<Userpromotions />} />
            <Route path="/providerpromitions" element={<Providerpromotions/>} />
            <Route path="/editproviderpromotion" element={<EditproviderPromotion/>} />
            <Route path="/edituserpromotion" element={<EditUserPromotion/>} />
            <Route path="/providerpackages" element={<Providerpackage />} />
            <Route path="/userpackages" element={<Userpackage />} />
            <Route path="/editproviderpackage" element={<EditProviderPackage />} />
            <Route path="/edituserpackage" element={<EditUserPackage />} />
            <Route path="/userbanners" element={<Userbanners />} />
            <Route path="/providerbanners" element={<Providerbanners />} />
            <Route path="/viewadmin" element={<Viewadmin />} />
            <Route path="/addsubadmin" element={<Addadmin />} />
            <Route path="*" element={<Navigate to="/" />} />{" "}
            {/* Default redirect */}
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
};

export default Routing;
