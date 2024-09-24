import React from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import ManageService from "./Pages/Servicemanager/Manageservices/ManageService";
import Providerscorner from "./Pages/Providerscorner/Providerscorner";
import Loyalitycards from "./Pages/Loyalitycards/Loyalitycards";
import Accounting from "./Pages/Accounting/Accounting";
import Marketing from "./Pages/Marketing/Marketing";
import Subadmin from "./Pages/Subadmin/Subadmin";
import UserManager from "./Pages/Usercorner/Usercorner";
import Addsubadmin from "./Pages/Subadmin/Addsubadmin";
import EditBanner from "./Pages/Banners/Editbanner";
import Editloyalitycards from "./Pages/Loyalitycards/editloyalitycards";
import Userpromotions from "./Pages/Promotions/userpromotions";
import Providerpackage from "./Pages/Packages/providerpackage";
import Userpackage from "./Pages/Packages/userpackage";
import Providerpromotions from "./Pages/Promotions/providerpromotions";
import Providerbanners from "./Pages/Banners/Providerbanners";
import Userbanners from "./Pages/Banners/userBanners";
import EditUserPromotion from "./Pages/Promotions/Edituserpromotions";
import EditproviderPromotion from "./Pages/Promotions/Editproviderpromotions";

import EditProviderPackage from "./Pages/Packages/Edit-provider-package";
import Viewadmin from "./Pages/Subadmin/view-admin";
import Addadmin from "./Pages/Subadmin/Addsubadmin";
import { FilterBarProvider } from "./FilterBarContext";
import Popupbanners from "./Pages/Banners/Popupbanners";

import Managesubadmin from "./Pages/Subadmin/managesubadmin";
import Header from "./components/Header/header";
import Sidebar from "./components/Sideheader/sidebar";
import Jobsarea from "./Pages/Jobsarea/jobsarea";
import Servermanager from "./Pages/Servicemanager/Addservices/Servicemanager";
import FAQContainer from "./Pages/FAQ/FAQContainer";
import IEContainer from "./Pages/Inclusions/IEContainer";
import Reels from "./Pages/Banners/Reels/Reels";
import Inductionmain from "./Pages/Induction/inductionmain";
import Trainingmain from "./Pages/Induction/trainingmain";
import Locations from "./Pages/Locations/Locations";
import Pricing from "./Pages/Locations/Pricing";
import Blogs from "./Pages/Blogs/Blogs";

const Routing = () => {
  return (
    <FilterBarProvider>
      <BrowserRouter>
        <Header />
        <Sidebar>
          <Routes>
            <Route path="/" element={<Jobsarea />} />
            <Route path="/addservice" element={<Servermanager />} />
            <Route path="/manageservice" element={<ManageService />} />
            <Route path="/usercorner" element={<UserManager />} />
            <Route path="/providersrcorner" element={<Providerscorner />} />
            {/* loyality cards */}
            <Route path="/loyality-cards" element={<Loyalitycards />} />
            <Route
              path="/edit-loyality-cards"
              element={<Editloyalitycards />}
            />
            {/* banners */}
            <Route path="/user-banners" element={<Userbanners />} />
            <Route path="/provider-banners" element={<Providerbanners />} />
            <Route path="/popup-banners" element={<Popupbanners />} />
            <Route path="/edit-banner" element={<EditBanner />} />
            <Route path="/reels" element={<Reels />} />
            {/* promotions */}
            <Route path="/user-promotion" element={<Userpromotions />} />
            <Route
              path="/provider-promotion"
              element={<Providerpromotions />}
            />
            <Route
              path="/edit-provider-promotion"
              element={<EditproviderPromotion />}
            />
            <Route
              path="/edit-user-promotion"
              element={<EditUserPromotion />}
            />
            {/* Packages */}
            <Route path="/provider-packages" element={<Providerpackage />} />
            <Route path="/user-packages" element={<Userpackage />} />
            <Route
              path="/edit-provider-package"
              element={<EditProviderPackage />}
            />
            {/* Induction & Training */}
            <Route path="/induction" element={<Inductionmain />} />
            <Route path="/training" element={<Trainingmain />} />
            {/* subadmin */}
            <Route path="/subadmin" element={<Subadmin />} />
            <Route path="/add-subadmin" element={<Addsubadmin />} />
            <Route path="/view-subadmin" element={<Viewadmin />} />
            <Route path="/manage-subadmin" element={<Managesubadmin />} />
            {/* marketing */}
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/marketing" element={<Marketing />} />
            {/* Inclusions & Exclusions */}
            <Route path="/inclusions-exclusions" element={<IEContainer />} />
            {/* FAQs */}
            <Route path="/faq" element={<FAQContainer />} />
            {/*Location and pricing*/}
            <Route path="/locations" element={<Locations />} />
            <Route path="/pricing" element={<Pricing />} />
            {/* Default redirect */}
            <Route path="/blogs" element={<Blogs />} />
            <Route path="*" element={<Navigate to="/" />} />{" "}
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </FilterBarProvider>
  );
};

export default Routing;
