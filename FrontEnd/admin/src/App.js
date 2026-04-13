import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerLogin from "./Source_code/CustomerLogin";
import AdminDash from "./Source_code/AdminDash";
import Auth from "./Source_code/Auth";
import AdminWelcome from "./Source_code/AdminWelcome";
import CropInfoEdit from "./Source_code/CropInfoEdit";
import CropInformation from "./Source_code/CropInformation";
import FertilizerDetails from "./Source_code/FertilizerDetails";
import Fertilizeredit from "./Source_code/Fertilizeredit";
import DiseaseInfo from "./Source_code/DiseaseInfo";
import Diseaseedit from "./Source_code/Diseaseedit";

const App = () => {
  // Add user state to handle login/logout
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<CustomerLogin setUser={setUser} />} />

        {/* Admin Dashboard with nested routes */}
        <Route path="/admindash" element={<Auth><AdminDash setUser={setUser} /></Auth>} >
          <Route index element={<AdminWelcome />} /> 
          <Route path="adminwel" element={<AdminWelcome />} />
          <Route path="cropinfo" element={<CropInformation />} />
          <Route path="cropedit" element={<CropInfoEdit />} />
          <Route path="fertilizerinfo" element={<FertilizerDetails />} />
          <Route path="fertilizeredit" element={<Fertilizeredit />} />
          <Route path="diseaseinfo" element={<DiseaseInfo />} />
          <Route path="diseaseedit" element={<Diseaseedit />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
