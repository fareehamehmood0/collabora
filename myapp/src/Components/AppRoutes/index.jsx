import {  Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import AddStudent from "../../Pages/AddStudent";
import AddSupervisor from "../../Pages/AddSupervisor";
import Projects from "../../Pages/Projects";
import Events from "../../Pages/Events";
import ContactUs from "../../Pages/ContactUs";
import Logout from "../../Pages/Logout";
function AppRoutes() {
  return (
    
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/addsupervisor" element={<AddSupervisor/>}></Route>
      <Route path="/addstudent" element={<AddStudent />}></Route>
      <Route path="/projects" element={<Projects />}></Route>
      <Route path="/events" element={<Events />}></Route>
      <Route path="/contactus" element={<ContactUs />}></Route>
      <Route path="/logout" element={<Logout />}></Route>

    </Routes>
    
  );
}
export default AppRoutes;
