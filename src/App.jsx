import Report from './Pages/Report/Report'
import Appointment from './Pages/Appointment/Appointment'
import Vaccine from './Pages/Vaccine/Vaccine'
import Navbar from './Components/Navbar'
import Customer from './Pages/Customer/Customer'
import './App.css'
import { Route, Routes} from 'react-router-dom'
import Animal from './Pages/Animal/Animal'
import Doctor from './Pages/Doctor/Doctor'
import AvailableDate from './Pages/AvailableDate/AvailableDate'


function App() {
    
  

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='report' element={<Report/>}/>
      <Route path='appointment' element={<Appointment/>}/>
      <Route path='vaccine' element={<Vaccine/>}/>
      <Route path='/customer' element={<Customer/>}/>
      <Route path='/animal' element={<Animal/>}/> 
      <Route path='/doctor' element={<Doctor/>}/> 
      <Route path='/availableDate' element={<AvailableDate/>}/> 


    </Routes>
   
    </>
  )
}

export default App
