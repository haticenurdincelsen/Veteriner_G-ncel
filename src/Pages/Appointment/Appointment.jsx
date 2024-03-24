import { useState, useEffect } from "react";
import { getAppointment, createAppointment, updateAppointment, deleteAppointment } from "../../API/Appointment.js";
import { getDoctor } from "../../API/Doctor";
import { getAnimals } from "../../API/Animal";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [reload, setReload] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    doctor: { id: "" }, // Default empty doctor
    animal: { id: "" }, // Default empty animal
  });
  const [updateAppointmentData, setUpdateAppointmentData] = useState({ // Değişiklik yapıldı
    date: "",
    doctor: { id: "" }, // Default empty doctor
    animal: { id: "" }, // Default empty animal
  })

  useEffect(() => {
    getAppointment().then((data) => {
      setAppointments(data);
    });
    getDoctor().then((data) => {
      setDoctors(data);
    });
    getAnimals().then((data) => {
      setAnimals(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteAppointment(id).then(() => {
      setReload(true);
    })
  }

  const handleCreate = () => {
    createAppointment(newAppointment).then(() => {
      setReload(true);
    });
    setNewAppointment((prevAppointment) => ({
      ...prevAppointment,
      date: "", // Reset only the date field
    }));
  };

  const handleUpdate = () => {
    updateAppointment(updateAppointmentData).then(() => { // Değişiklik yapıldı
      setReload(true);
    })
    setUpdateAppointmentData({ // Değişiklik yapıldı
      date: "",
      doctor: { id: "" }, // Default empty doctor
      animal: { id: "" }, // Default empty animal
    })
  }

  const handleNewAppointment = (e) => {
    const { name, value } = e.target;
    if (name === "doctor" || name === "animal") {
      setNewAppointment((prevAppointment) => ({
        ...prevAppointment,
        [name]: { id: value },
      }));
    } else {
      setNewAppointment((prevAppointment) => ({
        ...prevAppointment,
        [name]: value,
      }));
    }
  };

  const handleUpdateBtn = (ap) => {
    setUpdateAppointmentData({
      ...ap,
      doctor: ap.doctor ? { id: ap.doctor.id } : {},
      animal: ap.animal ? { id: ap.animal.id } : {},
    })
  }

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    if (name === "doctor") {
      setUpdateAppointmentData((prevAppointment) => ({
        ...prevAppointment,
        doctor: {
          id: value,
        }
      }));
    } else if (name === "animal") { // Hayvan alanı için özel işlem eklendi
      setUpdateAppointmentData((prevAppointment) => ({
        ...prevAppointment,
        animal: {
          id: value,
        }
      }));
    } else {
      setUpdateAppointmentData({
        ...updateAppointmentData,
        [name]: value,
      });
    }
  }
  return (
    <div>
      <h1 className="başlık">Randevu Yönetimi</h1> <br />
      <h3>Randevu Ekleme</h3>
      <div className="appointment-newappointment">
        <select
          name="doctor"
          value={newAppointment?.doctor?.id}
          onChange={handleNewAppointment}
        >
          <option value="" disabled>
            Select Doctor
          </option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <select
          name="animal"
          value={newAppointment?.animal?.id}
          onChange={handleNewAppointment}
        >
          <option value="" disabled>
            Select Animal
          </option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          name="date"
          value={newAppointment.date}
          onChange={handleNewAppointment}
        />
        <button onClick={handleCreate}>EKLE</button>
      </div>
      <div className="appointment-updateappointment">
        <select
          name="doctor"
          value={updateAppointmentData?.doctor?.id}
          onChange={handleUpdateChange}
        >
          <option value="" disabled>
            Select Doctor
          </option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <select
          name="animal"
          value={updateAppointmentData?.animal?.id}
          onChange={handleUpdateChange}
        >
          <option value="" disabled>
            Select Animal
          </option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          name="date"
          value={updateAppointmentData.date}
          onChange={handleUpdateChange}
        />
        <button onClick={handleUpdate}>Güncelle</button>
      </div>
      <h3>Randevu Listesi</h3>
      <table className="min-nav">
        <thead>
          <tr>
            <th>randevu</th>
            <th>doctor</th>
            <th>hayvan</th>
            <th>işlemler</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.date}</td>
              <td>{doctors.find((doc) => doc.id === appointment.doctor.id)?.name}</td>
              <td>{animals.find((ani) => ani.id === appointment.animal.id)?.name}</td>
              <td>
                <span onClick={() => handleDelete(appointment.id)}><DeleteIcon /></span>
                <span onClick={() => handleUpdateBtn(appointment)}><UpdateIcon /></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointment;
