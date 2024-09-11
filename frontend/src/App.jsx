/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Movie from './Components/Home/Movie';
import Show from './Components/Home/Show';
import Buy from './Components/Home/Buy';
import AboutUs from './Components/Home/AboutUs';
import Contact from './Components/Home/ContactUs';

import AdminDashboard from './Components/Admin/AdminDashboard';
import UserDetails from './Components/Admin/Users/UserDetails';
import AddUser from './Components/Admin/Users/AddUser'; 
import UpdateUser from './Components/Admin/Users/UpdateUser';

import MovieDetails from './Components/Admin/Movie/MovieDetails';
import AddMovie from './Components/Admin/Movie/AddMovie';
import UpdateMovie from './Components/Admin/Movie/UpdateMovie';


import InventoryDetails from './Components/Admin/Payment/PaymentDetails'; 
import AddInventory from './Components/Admin/Payment/AddPayment'; 
import UpdateInventory from './Components/Admin/Payment/UpdatePayment'; 
import Inventory from './Components/Admin/Payment/Payment';

import StaffDetails from './Components/Admin/Staff/StaffDetails';
import Addstaff from './Components/Admin/Staff/AddStaff';
import Updatestaff from './Components/Admin/Staff/UpdateStaff';
import Staff from './Components/Admin/Staff/Staff';

import SupplierDetails from './Components/Admin/Maintanance/SupplierDetails'; 
import AddSupplier from './Components/Admin/Maintanance/AddSupplier'; 
import UpdateSupplier from './Components/Admin/Maintanance/UpdateSupplier'; 
import Supplier from './Components/Admin/Maintanance/Supplier'; 

import FeedbackDetails from './Components/Admin/Feedback/FeedbackDetails'; 
import AddFeedback from './Components/Admin/Feedback/AddFeedback'; 
import UpdateFeedback from './Components/Admin/Feedback/UpdateFeedback'; 
import Feedback from './Components/Admin/Feedback/Feedback'; 

import SupportDetails from './Components/Admin/Support/SupportDetails'; 
//import AddSupport from './Components/Admin/Support/AddSupport'; 
//import UpdateSupport from './Components/Admin/Support/UpdateSupport'; 
//import Support from './Components/Admin/Support/Support';

import OrderDetails from './Components/Admin/Promotion/OrderDetails';
//import AddOrder from './Components/Admin/Order/AddOrder';
//import UpdateOrder from './Components/Admin/Order/UpdateOrder';
//import Order from './Components/Admin/Order/Order';

import AppointmentDetails  from './Components/Admin/Booking/AppointmentDetails';
//import AddAppointment from './Components/Admin/Appointment/AddAppointment';
//import UpdateAppointment from './Components/Admin/Appointment/UpdateAppointment';
//import Appointment from './Components/Admin/Appointment/Appointment';

import Register from './Components/pages/Register';

function App() {
  return (
    <Router>
      <Routes>

        {/* Home Page as the default route */}
        <Route path="/" element={<Home />} />        

        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        <Route path='/Movie' element={<Movie/>}/>
        <Route path='/Show' element={<Show/>}/>
        <Route path='/Buy' element={<Buy/>}/>
        <Route path='/About' element={<AboutUs/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/signup' element={<Register/>}/>


        <Route path="/admindashboard" element={<AdminDashboard />}>
          <Route path="user-management" element={<UserDetails />} />
          <Route path="adduser" element={<AddUser />} />
          <Route path="update-user/:id" element={<UpdateUser />} />

          <Route path="Movie-management" element={<MovieDetails />} />
          <Route path="Movie/:JID" element={<Movie />} />
          <Route path="add-Movie" element={<AddMovie />} />
          <Route path="update-Movie/:JID" element={<UpdateMovie />} />

          <Route path="inventory-management" element={<InventoryDetails />} />
          <Route path="inventory/:id" element={<Inventory />} />
          <Route path="add-inventory" element={<AddInventory />} />
          <Route path="update-inventory/:id" element={<UpdateInventory />} />

          <Route path="Staff-management" element={<StaffDetails />} />
          <Route path="staff/:id" element={<Staff />} />
          <Route path="add-staff" element={<Addstaff />} />
          <Route path="update-staff/:id" element={<Updatestaff />} />

          <Route path="supplier-management" element={<SupplierDetails />} /> 
          <Route path="supplier/:id" element={<Supplier />} /> 
          <Route path="add-supplier" element={<AddSupplier />} /> 
          <Route path="update-supplier/:id" element={<UpdateSupplier />} />

          <Route path="feedback-management" element={<FeedbackDetails />} /> 
          <Route path="feedback/:id" element={<Feedback />} /> 
          <Route path="add-feedback" element={<AddFeedback />} /> 
          <Route path="update-feedback/:id" element={<UpdateFeedback />} /> 

          <Route path="support-management" element={<SupportDetails />} />

          <Route path='Order-Management' element={<OrderDetails />} />

          <Route path="appointment-management" element={<AppointmentDetails />} />



          

        </Route>
        <Route path="/" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
function NotFound() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;
