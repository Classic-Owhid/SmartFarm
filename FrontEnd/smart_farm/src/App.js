import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./Source_Code/Navbar";
import HomePage from "./Source_Code/HomePage";
import Services from "./Source_Code/Services";
import About from "./Source_Code/About";
import ContactPage from "./Source_Code/ContactPage";
import CropRecommendForm from "./Source_Code/CropRecommendForm";
import PredictionPage from "./Source_Code/PredictionPage";
import DiseaseClassify from "./Source_Code/DiseaseClassify";
import AppleDiseasePredict from "./Source_Code/AppleDiseasePredict";
import AppleFruitDisease from "./Source_Code/AppleFruitDisease";
import CustomerRegister from "./Source_Code/CustomerRegister";
import CustomerLogin from "./Source_Code/CustomerLogin";
import ProtectedRoute from "./Source_Code/Auth";
import CropInfoHome from "./Source_Code/CropInfoHome";
import CropInfoCard from "./Source_Code/CropInfoCard";
import DiseaseList from "./Source_Code/DiseaseList";
import DiseaseCard from "./Source_Code/DiseaseCard";
import FertilizerList from "./Source_Code/FertilizerList";
import FertilizerDetail from "./Source_Code/FertilizerDetails";
import ChatPage from "./Source_Code/ChatPage";
import NormalCropRec from "./Source_Code/NormalCropRec";
import NormalCropResult from "./Source_Code/NormalCropResult";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/login" element={<CustomerLogin setUser={setUser} />} />

        {/* Protected customer features */}
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />

        <Route path="/reccrop" element={<CropRecommendForm />} />
        <Route path="/prediction" element={<PredictionPage />} />
        <Route path="/disease" element={<DiseaseClassify />} />
        <Route path="/leafdisease" element={<AppleDiseasePredict />} />
        <Route path="/fruitdisease" element={<AppleFruitDisease />} />
        <Route path="/cropinfohome" element={<CropInfoHome />} />
        <Route path="/cropinfo/details" element={<CropInfoCard />} />
        <Route path="/diseaseinfo" element={<DiseaseList/>}/>
        <Route path="/diseasecard" element={<DiseaseCard/>}/>
        <Route path="/fertilizerlist" element={<FertilizerList/>}/>
        <Route path="/fertilizerdetails" element={<FertilizerDetail/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
        <Route path="/nfreecroprec" element={<NormalCropRec/>}/>
        <Route path="normalcropresult" element={<NormalCropResult/>}/>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
