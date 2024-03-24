// Vaccine.jsx
import React, { useState, useEffect } from "react";
import { getAllVaccines, createVaccine, updateVaccine, deleteVaccine } from "../../API/Vaccine";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from '@mui/icons-material/Delete';

function Vaccine() {
  const initialVaccineState = {
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animal: "",
    reportId: "" // reportId alanı eklendi
  };

  const [vaccines, setVaccines] = useState([]);
  const [reload, setReload] = useState(true);
  const [newVaccine, setNewVaccine] = useState(initialVaccineState);
  const [updateVaccineData, setUpdateVaccineData] = useState(initialVaccineState);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vaccinesData = await getAllVaccines();
        setVaccines(vaccinesData);

        // Eğer animal API'sini kullanacaksak, burada animals'i de güncellememiz gerekiyor.
        // const animalsData = await getAllAnimals();
        // setAnimals(animalsData);
      } catch (error) {
        console.error("Veriler alınırken bir hata oluştu:", error);
      }
    };

    fetchData();
  }, [reload]);

  // Yeni aşı oluşturma işlemi
  const handleCreate = async () => {
    try {
      await createVaccine(newVaccine);
      setReload(!reload);
      setNewVaccine(initialVaccineState);
    } catch (error) {
      console.error("Aşı oluşturulurken bir hata oluştu:", error);
    }
  };

  // Yeni aşı formundaki değişiklikleri takip etmek için
  const handleNewVaccineChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine((prevVaccine) => ({
      ...prevVaccine,
      [name]: value,
      reportId: prevVaccine.reportId // Eğer mevcutsa reportId'i de güncelle
    }));
  };

  // Aşı silme işlemi
  const handleDelete = async (id) => {
    try {
      await deleteVaccine(id);
      setReload(!reload);
    } catch (error) {
      console.error("Aşı silinirken bir hata oluştu:", error);
    }
  };

  // Aşı güncelleme işlemi
  const handleUpdate = async () => {
    try {
      await updateVaccine(updateVaccineData);
      setReload(!reload);
      setUpdateVaccineData(initialVaccineState); // Formu sıfırla
    } catch (error) {
      console.error("Aşı güncellenirken bir hata oluştu:", error);
    }
  };

  // Güncellenecek aşı verilerini doldurmak için
  const handleUpdateBtn = (vaccine) => {
    setUpdateVaccineData({
      ...vaccine, // Tüm aşı verilerini al
      animal: vaccine.animal.id, // Sadece animal alanını güncelle
      reportId: vaccine.reportId // reportId alanını da güncelle (varsa)
    });
  };

  // Güncelleme formundaki değişiklikleri takip etmek için
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateVaccineData((prevUpdateVaccineData) => ({
      ...prevUpdateVaccineData,
      [name]: value,
      reportId: prevUpdateVaccineData.reportId // Eğer mevcutsa reportId'i de güncelle
    }));
  };

  return (
    <div>
      <h3>Aşı Ekleme</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newVaccine.name}
        onChange={handleNewVaccineChange}
      />
      <input
        type="text"
        name="code"
        placeholder="Code"
        value={newVaccine.code}
        onChange={handleNewVaccineChange}
      />
      <input
        type="date"
        name="protectionStartDate"
        value={newVaccine.protectionStartDate}
        onChange={handleNewVaccineChange}
      />
      <input
        type="date"
        name="protectionFinishDate"
        value={newVaccine.protectionFinishDate}
        onChange={handleNewVaccineChange}
      />
      <input
        type="text"
        name="animal"
        placeholder="Animal"
        value={newVaccine.animal}
        onChange={handleNewVaccineChange}
      />
      <button onClick={handleCreate}>Add Vaccine</button>

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
        name="protectionStartDate"
        value={updateVaccineData.protectionStartDate}
        onChange={handleUpdateChange}
      />
      <input
        type="date"
        name="protectionFinishDate"
        value={updateVaccineData.protectionFinishDate}
        onChange={handleUpdateChange}
      />
      <input
        type="text"
        name="animal"
        placeholder="Animal"
        value={updateVaccineData.animal}
        onChange={handleUpdateChange}
      />
      <button onClick={handleUpdate}>Update Vaccine</button>

      <h3>Aşı Listesi</h3>
      <table>
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
          {vaccines.map((vaccine) => (
            <tr key={vaccine.id}>
              <td>{vaccine.name}</td>
              <td>{vaccine.code}</td>
              <td>{vaccine.protectionStartDate}</td>
              <td>{vaccine.protectionFinishDate}</td>
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
