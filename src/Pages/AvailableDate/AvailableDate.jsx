import { useState, useEffect } from "react";
import { getAvailableDate, createAvailableDate, updateAvailableDateFunc, deleteAvailableDate } from "../../API/availableDate";
import { getDoctor } from "../../API/Doctor";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from '@mui/icons-material/Delete';
import '../AvailableDate/Available.css'

function AvailableDate() {
    const [availableDate, setAvailableDate] = useState([]);
    const [reload, setReload] = useState(true);
    const [doctor, setDoctor] = useState([]);
    const [newAvailableDate, setNewAvailableDate] = useState({
      availableDate: "",
      doctor: { id: "" }, // Default empty doctor
    });
    const [updateAvailableDate, setUpdateAvailableDate]= useState({
        availableDate: "",
        doctor: { id: "" },
      });

    useEffect(() => {
        getAvailableDate().then((data) => {
          setAvailableDate(data);
        });
        getDoctor().then((data) => {
          setDoctor(data);
        });
        setReload(false);
      }, [reload]);
      

      const handleCreate = () => {
        createAvailableDate(newAvailableDate).then(() => {
          setReload(true);
        });
        setNewAvailableDate((prevAvailableDate) => ({
          ...prevAvailableDate,
          date: "",
        }));
      };

      const handlenewAvailableDate = (e) => {
        const { name, value } = e.target;
        if (name === "doctor" ) {
          setNewAvailableDate((prevAvailableDate) => ({
            ...prevAvailableDate,
            [name]: { id: value },
          }));
        } else {
            setNewAvailableDate((prevAvailableDate) => ({
            ...prevAvailableDate,
            [name]: value,
          }));
        }
      };

      const handleDelete = (id) => {
      
        deleteAvailableDate(id).then(() => {
          setReload(true);
        });
      };

      const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        if (name === "doctor") {
          setUpdateAvailableDate((prevUpdateAvailableDate) => ({
            ...prevUpdateAvailableDate,
            [name]: { id: value },
          }));
        } else {
          setUpdateAvailableDate((prevUpdateAvailableDate) => ({
            ...prevUpdateAvailableDate,
            [name]: value,
          }));
        }
      };
      
      
    const handleUpdateBtn =(available) =>{
    
        setUpdateAvailableDate({
          date: available.availableDate,
          id: available.id
        });
    
      };
      
      const handleUpdate = () => {
        updateAvailableDateFunc(updateAvailableDate).then(() => {
          setReload(true);
        });
        console.log("Güncelleme bitti");
        setUpdateAvailableDate({
          availableDate: "",
          doctor: { id: "" },
        });
      };
      
      

    return (
        <div>
          <h3>AvailableDate</h3>
          <select
            name="doctor"
            value={newAvailableDate?.doctor?.id}
            onChange={handlenewAvailableDate}
          >
            <option value="" disabled>
              Select Doctor
            </option>
            {doctor.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="availableDate"
            value={newAvailableDate.date}
            onChange={handlenewAvailableDate}
          /> <br />
          <button onClick={handleCreate}>Add Appointment</button> <br />
          <input
            type="date"
            name="availableDate"
            value={updateAvailableDate.date}
            onChange={handleUpdateChange}
          />
          <select name="doctor" 
        value={updateAvailableDate?.doctor?.id} 
        onChange={handleUpdateChange}>
          <option value="" disabled> Select Customer
          </option>
          {doctor.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
          
        </select> <br />
          <button onClick={handleUpdate}>Update</button> <br />
          
          {availableDate.map((availableDate) => (
            <div key={availableDate.id}>
              {availableDate.availableDate}{" "}
              {doctor.find((doc) => doc.id === availableDate.doctor.id)?.name}
              <span id={availableDate.id} onClick={() => handleDelete(availableDate.id)}>
              <DeleteIcon/>
            </span>
              <span onClick={() => handleUpdateBtn(availableDate)}>
              <UpdateIcon/>
            </span>
            </div>
          ))}
        </div>
      );

}

export default AvailableDate
