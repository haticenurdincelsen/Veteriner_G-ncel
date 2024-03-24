import { useState, useEffect } from "react";
import { getAnimals, deleteAnimal, createAnimal, updateAnimalFunc } from "../../API/Animal";
import { getCustomer } from "../../API/Customer";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import '../Animal/Animal.css';

function Animal() {
    const [animal, setAnimal]= useState([]);
    const [reload, setReload]= useState(true);
    const [customer, setCustomer]= useState([]);
    const [newAnimal, setNewAnimal]= useState({
      name:"",
      species:"",
      breed:"",
      gender:"",
      dateOfBirth:"",
      colour:"",
      customer: {}
    });
    const [updateAnimal, setUpdateAnimal]= useState({
      name:"",
      species:"",
      breed:"",
      gender:"",
      dateOfBirth:"",
      colour:"",
      customer: {}
    });

    useEffect(()=> {
        //Dataları Çektiğimiz Kısım
        getAnimals().then((data) => {
            setAnimal(data);
        });
        
        getCustomer().then((data) => {
          setCustomer(data);
        });
        setReload(false);
    }, [reload]);

    //Delete işlem kısmı
    const handleDelete = (id) => {
      deleteAnimal(id).then(() => {
        setReload(true);
      });
    };
    
    //Create Animal
    const handleCreate = () => {
      createAnimal(newAnimal).then(() => {
        setReload(true);
      });
      setNewAnimal({
        name:"",
        species:"",
        breed:"",
        gender:"",
        dateOfBirth:"",
        colour:"",
        customer: {}
      });
    };

    //Update Animal
    const handleUpdate =() => {
      updateAnimalFunc(updateAnimal).then(() => {
        setReload(true);
      });
      setUpdateAnimal({
        name:"",
        species:"",
        breed:"",
        gender:"",
        dateOfBirth:"",
        colour:"",
        customer: {}
      });
    };

    const handleNewAnimal = (e) => {
      const { name, value } = e.target;
      if (name === "customer") {
        setNewAnimal((prevAnimal) => ({
          ...prevAnimal,
          customer: {
            id: value,
          },
        }));
      } else {
        setNewAnimal((prevAnimal) => ({
          ...prevAnimal,
          [name]: value,
        }));
      }
    };

    const handleUpdateBtn = (an) => {
        setUpdateAnimal({
          ...an,
          customer: an.customer ? { id: an.customer.id } : {} // mevcut hayvanın müşteri bilgisini değiştirebilmek için customer nesnesini de set ediyoruz
        });
      };
  
    const handleUpdateChange = (event) => {
      const { name, value } = event.target;
      if (name === "customer") {
        setUpdateAnimal((prevAnimal) => ({
          ...prevAnimal,
          customer: {
            id: value,
          },
        }));
      } else {
        setUpdateAnimal({
          ...updateAnimal,
          [name]: value,
        });
      }
    };

    return (
      <div>
        <h1 className="başlık">Hayvan Yönetimi</h1> <br />
        <h3>Hayvan Ekleme</h3>
        <div className="animal-newanimal">
          
          <input 
            type="text"
            name="name"
            placeholder="Name"
            value={newAnimal.name}
            onChange={handleNewAnimal}
          />
          <input 
            type="text"
            placeholder="Species"
            name="species" 
            value={newAnimal.species}
            onChange={handleNewAnimal} 
          />
          <input 
            type="text"
            placeholder="Breed"
            name="breed"
            value={newAnimal.breed}
            onChange={handleNewAnimal} 
          />
          <input 
            type="text"
            placeholder="Gender"
            name="gender"
            value={newAnimal.gender}
            onChange={handleNewAnimal} 
          />
          <input 
            type="date"
            placeholder="Date Of Birth"
            name="dateOfBirth"
            value={newAnimal.dateOfBirth}
            onChange={handleNewAnimal} 
          />
          <input 
            type="text"
            placeholder="Colour"
            name="colour"
            value={newAnimal.colour}
            onChange={handleNewAnimal} 
          /> <br />
          {/* Müşteri seçimi */}
          <select className="animal-select"
            name="customer" 
            value={newAnimal.customer.id} 
            onChange={handleNewAnimal}
          >
            <option value="" disabled> Select Customer
            </option>
            {customer.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select> <br />
          <button onClick={handleCreate}>Add Animal</button>
        </div>
        <div className="animal-updateanimal">
          <h3>Hayvan Bilgisi Güncelleme</h3>
          <input 
            type="text"
            name="name"
            placeholder="Name"
            value={updateAnimal.name}
            onChange={handleUpdateChange}
          />
          <input 
            type="text"
            placeholder="Species"
            name="species" 
            value={updateAnimal.species}
            onChange={handleUpdateChange} 
          />
          <input 
            type="text"
            placeholder="Breed"
            name="breed"
            value={updateAnimal.breed}
            onChange={handleUpdateChange} 
          />
          <input 
            type="text"
            placeholder="Gender"
            name="gender"
            value={updateAnimal.gender}
            onChange={handleUpdateChange} 
          />
          <input 
            type="date"
            placeholder="Date Of Birth"
            name="dateOfBirth"
            value={updateAnimal.dateOfBirth}
            onChange={handleUpdateChange} 
          />
          <input 
            type="text"
            placeholder="Colour"
            name="colour"
            value={updateAnimal.colour}
            onChange={handleUpdateChange} 
          /> <br />
          {/* Müşteri seçimi */}
          <select className="animal-select"
            name="customer" 
            value={updateAnimal.customer.id} 
            onChange={handleUpdateChange}
          >
            <option value="" disabled> Select Customer
            </option>
            {customer.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select> <br />
          <button onClick={handleUpdate}>Update</button>
        </div>
        <div>
            <br />
          <h3>Hayvan Listesi</h3>
          <br />
          <table className="min-nav">
            <thead>
              <tr>
                <th>Name</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Gender</th>
                <th>Date Of Birth</th>
                <th>Colour</th>
                <th>Customer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {animal.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.dateOfBirth}</td>
                  <td>{animal.colour}</td>
                  <td>{animal.customer ? animal.customer.name : ''}</td>
                  <td>
                    <span onClick={() => handleDelete(animal.id)}><DeleteIcon /></span>
                    <span onClick={() => handleUpdateBtn(animal)}><UpdateIcon /></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Animal;
