// Vaccine.jsx
import { useState, useEffect } from "react";
import { getVaccines, createVaccine, updateVaccine, deleteVaccine } from "../../API/Vaccine";
import { getAnimals } from "../../API/Animal";
import { getReport } from "../../API/Report";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from '@mui/icons-material/Delete';
import '../Vaccine/Vaccine.css'

function Vaccine() {
  const [vaccine, setVaccine] = useState([]);
  const [reload, setReload] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);

  const [newVaccine, setNewVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "", 
    protectionFinishDate: "",
    animal: "",
    report: "" ,
  });
  const [updateVaccineData, setUpdateVaccineData] = useState({
    name: "",
    code: "",
    protectionStartDate: "", 
    protectionFinishDate: "", 
    animal: "",
    report: "" ,
  });

  useEffect(() => {
    getVaccines().then((data) => {
      setVaccine(data);
  });
  getAnimals().then((data) => {
      setAnimals(data);
  });
  getReport().then((data) => {
    setReports(data);
});
}, [reload]);


  
  const handleNewVaccine = (e) => {
    const { name, value } = e.target;
    setNewVaccine((prevVaccine) => ({
        ...prevVaccine,
        [name]: value
    }));
};

const handleDelete = (id) => {
  deleteVaccine(id).then(() => {
      setVaccine(!reload);
  });
};
const handleUpdate = () => {
  console.log(updateVaccineData)
  const newObj={
    name:updateVaccineData.name ,
    code: updateVaccineData.code,
    protectionStartDate:updateVaccineData.protectionStartDate , 
    protectionFinishDate:updateVaccineData.protectionFinishDate , 
    animal: updateVaccineData.animalForReportResponseDto?.id,
    report: updateVaccineData.appointmentForReportResponseDto?.id ,
  }
  console.log(newObj)
  updateVaccine(newObj)
  .then(() => {
    setReload(true);
    // Update işlemi sonrasında updateReportData nesnesini temizleme
    setUpdateVaccineData({
      name: "",
      code: "",
      protectionStartDate:"", 
      protectionFinishDate:"", // Değiştirildi
      animal:updateVaccineData.animal, // Randevu bilgisini temizleme
      report:updateVaccineData.report // Randevu bilgisini temizleme,
       
    });
})
.catch((error) => {
    console.error("Güncelleme işlemi sırasında bir hata oluştu:", error);
});
};

const handleUpdateBtn = (vac) => {
  setUpdateVaccineData({
      ...vac,
     animal: vac.animal ? { id: vac.animal.id } : {},
     report: vac.report ? { id: vac.report.id } : {}
      
  });
};
const handleCreate = () => {
  console.log(vaccine)
  const newVaccineData = {
    name: newVaccine.name,
    code: newVaccine.code,
    protectionStartDate: newVaccine.protectionStartDate, // Değiştirildi
    protectionFinishDate: newVaccine.protectionFinishDate, // Değiştirildi
    animalWithoutCustomer: {
      id: newVaccine.animal
    },
    reportId: newVaccine.report
  };

  createVaccine(newVaccineData)
    .then(() => {
      setReload(!reload);
    })
    .catch((error) => {
      console.error("Aşı ekleme işlemi sırasında bir hata oluştu:", error);
    });

  // Yeni aşı ekledikten sonra formu sıfırla
  setNewVaccine({
    name: "",
    code: "",
    protectionStartDate: "", // Değiştirildi
    protectionFinishDate: "", // Değiştirildi
    animal: "",
    report: ""
  });
};

const handleUpdateChange = (event) => {
  const { name, value } = event.target;
  if (name === "animal") {
    setUpdateVaccineData((prevVaccine) => ({
      ...prevVaccine,
      animal: {
        id: value,
      }
    }));
  } else if (name === "report") {
    setUpdateVaccineData((prevVaccine) => ({
      ...prevVaccine,
      report: {  // Burada "reportl" yerine "report" olmalı
        id: value,
      }
    }));
  } else {
    setUpdateVaccineData({
      ...updateVaccineData,
      [name]: value,
    });
  }
}
  return (
    <div>
       <h1 className="başlık">Aşı Yönetimi</h1> <br />
       <div>
      <h3>Aşı Ekleme</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newVaccine.name}
        onChange={handleNewVaccine}
      />
      <input
        type="text"
        name="code"
        placeholder="Code"
        value={newVaccine.code}
        onChange={handleNewVaccine}
      />
      <input
        type="date"
        name="protectionStartDate" // Değiştirildi
        value={newVaccine.protectionStartDate} // Değiştirildi
        onChange={handleNewVaccine}
      />
      <input
        type="date"
        name="protectionFinishDate" // Değiştirildi
        value={newVaccine.protectionFinishDate} // Değiştirildi
        onChange={handleNewVaccine}
      />
        <select className="vaccine-select"
        name="animal"
        value={newVaccine.animal}
        onChange={handleNewVaccine}>
        <option value="" disabled>Randevu Seç</option>
        {animals.map((animal) => (
        <option key={animal.id} value={animal.id}>
        {animal.name}
        </option>
        ))}
        </select> <br />                
      <button onClick={handleCreate}>Add Vaccine</button> <br />
      </div>
      <div>
      <h3>Aşı Güncelleme</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={updateVaccineData.name}
        onChange={handleUpdateChange}
      />
      <input
        type="text"
        name="code"
        placeholder="Code"
        value={updateVaccineData.code}
        onChange={handleUpdateChange}
      />
      <input
        type="date"
        name="protectionStartDate" // Değiştirildi
        value={updateVaccineData.protectionStartDate} // Değiştirildi
        onChange={handleUpdateChange}
      />
      <input
        type="date"
        name="protectionFinishDate" // Değiştirildi
        value={updateVaccineData.protectionFinishDate} // Değiştirildi
        onChange={handleUpdateChange}
      />
      <select className="vaccine-select"
        name="animal"
        value={updateVaccineData.animal}
        onChange={handleUpdateChange}>
        <option value="" disabled>Randevu Seç</option>
        {animals.map((animal) => (
        <option key={animal.id} value={animal.id}>
        {animal.name}
        </option>
        ))}
        </select> <br />    
      <button onClick={handleUpdate}>Update Vaccine</button> <br />
      </div>
      <br />
      <h3>Aşı Listesi</h3>
      <br />
      <table className="min-nav">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Protection Start Date</th>
            <th>Protection Finish Date</th>
            <th>Animal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vaccine.map((vaccine) => (
            <tr key={vaccine.id}>
              <td>{vaccine.name}</td>
              <td>{vaccine.code}</td>
              <td>{vaccine.protection_start_date}</td>
              <td>{vaccine.protection_finish_date}</td>
              <td>{vaccine.animal.name}</td>
              <td>
                <span onClick={() => handleDelete(vaccine.id)}>
                  <DeleteIcon />
                </span>
                <span onClick={() => handleUpdateBtn(vaccine)}>
                  <UpdateIcon />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  }
  
  export default Vaccine;
