import { useState, useEffect } from "react";
import { getCustomer, deleteCustomer, createCustomer, updateCustomerFunc } from "../../API/Customer";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import './Customer.css';

function Customer() {
  const [customer, setCustomer]= useState([]);
  const [reload, setReload]= useState(true);
  const [newCustomer, setNewCustomer]= useState({
    name:"", 
    phone:"", 
    mail:"", 
    address:"", 
    city:""
  });
  const [updateCustomer, setUpdateCustomer]= useState({
    name:"", 
    phone:"", 
    mail:"", 
    address:"", 
    city:"",
    id: ""
  });

  useEffect(() => {
    getCustomer().then((data) => {
      setCustomer(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete= (id) => {
    deleteCustomer(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdate =() =>{
    updateCustomerFunc(updateCustomer).then(() => {
      setReload(true);
    });
    setUpdateCustomer({
      name:"",
      phone:"",
      mail:"",
      address:"",
      city:"",
      id: ""
    });
  };

  const handleNewCustomer = (event) =>{
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate =() =>{
    createCustomer(newCustomer).then(() => {
      setReload(true);
    });
    setNewCustomer({
      name:"",
      phone:"",
      mail:"",
      address:"",
      city:""
    });
  };

  const handleUpdateBtn =(cust) =>{
    setUpdateCustomer({
      name: cust.name,
      phone:cust.phone,
      mail:cust.mail,
      address:cust.address,
      city:cust.city,
      id:cust.id
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h1 className="başlık">Müşteri Yönetimi</h1>
      <br />
      <h3>Müşteri Ekle</h3>
      <div className="customer-newcustomer">
        <input type="text" placeholder="Name" name="name" value={newCustomer.name} onChange={handleNewCustomer} />
        <input type="text" placeholder="Phone" name="phone" value={newCustomer.phone} onChange={handleNewCustomer} />
        <input type="text" placeholder="Mail" name="mail" value={newCustomer.mail} onChange={handleNewCustomer} />
        <input type="text" placeholder="Address" name="address" value={newCustomer.address} onChange={handleNewCustomer} />
        <input type="text" placeholder="City" name="city" value={newCustomer.city} onChange={handleNewCustomer} /><br />
        <button onClick={handleCreate}>Add</button>
      </div>
      <div className="customer-updatecustomer">
        <h3>Müşteri Bilgisi Güncelleme</h3>
        <input type="text" placeholder="Name" name="name" value={updateCustomer.name} onChange={handleUpdateChange} />
        <input type="text" placeholder="Phone" name="phone" value={updateCustomer.phone} onChange={handleUpdateChange} />
        <input type="text" placeholder="Mail" name="mail" value={updateCustomer.mail} onChange={handleUpdateChange} />
        <input type="text" placeholder="Address" name="address" value={updateCustomer.address} onChange={handleUpdateChange} />
        <input type="text" placeholder="City" name="city" value={updateCustomer.city} onChange={handleUpdateChange} /><br />
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div>
        <br />
        <h3>Müşteri Listesi</h3>
        <br />
        <table className="min-nav">
          <thead>
            <tr >
              <th>Müşteri Adı</th>
              <th>Müşteri Telefonu</th>
              <th>Müşteri Maili</th>
              <th>Müşteri Adresi</th>
              <th>Müşteri Şehri</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {customer.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.mail}</td>
                <td>{customer.address}</td>
                <td>{customer.city}</td>
                <td>
                  <span id={customer.id} onClick={() => handleDelete(customer.id)}><DeleteIcon /></span>
                  <span onClick={() => handleUpdateBtn(customer)}><UpdateIcon /></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customer;
