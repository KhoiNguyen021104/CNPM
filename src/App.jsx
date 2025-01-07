import { Route, Routes as ReactRoutes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Drivers from "./pages/drivers/Drivers";
import AddDriver from "./pages/drivers/AddDriver";
import EditDriver from "./pages/drivers/EditDriver";
import Vehicles from "./pages/vehicles/Vehicles";
import AddVehicle from "./pages/vehicles/AddVehicle";
import EditVehicle from "./pages/vehicles/EditVehicle";
import Schedules from "./pages/schedules/Schedules";
import Routes from "./pages/routes/Routes";
import AddRoute from "./pages/routes/AddRoute";
import EditRoute from "./pages/routes/EditRoute";
import AddSchedule from "./pages/schedules/AddSchedule";
import EditSchedule from "./pages/schedules/EditSchedule";
import Bookings from "./pages/bookings/Bookings";
import AddBookingForm from "./pages/clients/booking/Booking";
import AddBooking from "./pages/bookings/AddBooking";

function App() {
  return (
    <>
      <ReactRoutes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/drivers'>
          <Route path='' element={<Drivers />} />
          <Route path='add' element={<AddDriver />} />
          <Route path=':_id' element={<EditDriver />} />
        </Route>
        <Route path='/vehicles'>
          <Route path='' element={<Vehicles />} />
          <Route path='add' element={<AddVehicle />} />
          <Route path=':_id' element={<EditVehicle />} />
        </Route>
        <Route path='/schedules'>
          <Route path='' element={<Schedules />} />
          <Route path='add' element={<AddSchedule />} />
          <Route path=':_id' element={<EditSchedule />} />
        </Route>
        <Route path='/routes'>
          <Route path='' element={<Routes />} />
          <Route path='add' element={<AddRoute />} />
          <Route path=':_id' element={<EditRoute />} />
        </Route>
        <Route path='/bookings'>
          <Route path='' element={<Bookings />} />
          <Route path='add' element={<AddBooking />} />
          {/* <Route path=':_id' element={<EditRoute />} /> */}
        </Route>
        <Route path='/booking'>
          <Route path='' element={<AddBookingForm />} />
        </Route>
      </ReactRoutes>
    </>
  );
}

export default App;
