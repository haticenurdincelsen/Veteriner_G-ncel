import { useState, useEffect } from "react";
import { getDoctor, deleteDoctor, createDoctor, updateDoctorFunc } from "../../API/Doctor";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';


function Doctor() {
    const [doctor, setDoctor] = useState([]);
    const [reload, setReload] = useState(true);
    const [newDoctor, setNewDoctor] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        phone: ""
    });
    const [updateDoctor, setUpdateDoctor] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        phone: ""
    });

    useEffect(() => {
        getDoctor().then((data) => {
            setDoctor(data);
        });
        setReload(false);
    }, [reload]);

    const handleNewDoctor = (event) => {
        setNewDoctor({
            ...newDoctor,
            [event.target.name]: event.target.value,
        });
    };

    const handleCreate = () => {
        createDoctor(newDoctor).then(() => {
            setReload(true);
        });
        setNewDoctor({
            name: "",
            email: "",
            address: "",
            city: "",
            phone: ""
        });
    };

    const handleDelete = (id) => {
        deleteDoctor(id).then(() => {
            setReload(true);
        });
    };

    const handleUpdate = () => {
        updateDoctorFunc(updateDoctor).then(() => {
            setReload(true);
        });
        setUpdateDoctor({
            name: "",
            email: "",
            address: "",
            city: "",
            phone: ""
        });
    };

    const handleUpdateChange = (event) => {
        setUpdateDoctor({
            ...updateDoctor,
            [event.target.name]: event.target.value,
        });
    };

    const handleUpdateBtn = (doc) => {
        setUpdateDoctor({
            name: doc.name,
            email: doc.email,
            address: doc.address,
            city: doc.city,
            phone: doc.phone,
            id: doc.id
        });
    };

    return (
        <div>
            <h1>Doktor Yönetimi</h1>
            <h3>Doktor Ekleme</h3>
            <div className="customer-newcustomer">
                <input type="text"
                    placeholder="Name"
                    name="name"
                    value={newDoctor.name}
                    onChange={handleNewDoctor} />
                <input type="text"
                    placeholder="Email"
                    name="email"
                    value={newDoctor.email}
                    onChange={handleNewDoctor} />
                <input type="text"
                    placeholder="Address"
                    name="address"
                    value={newDoctor.address}
                    onChange={handleNewDoctor} />
                <input type="text"
                    placeholder="City"
                    name="city"
                    value={newDoctor.city}
                    onChange={handleNewDoctor} />
                <input type="text"
                    placeholder="Phone"
                    name="phone"
                    value={newDoctor.phone}
                    onChange={handleNewDoctor} /> <br />
                <button onClick={handleCreate}>Add</button>
            </div>
            <div className="customer-updatecustomer">
                <h3>Doktor Güncelleme</h3>
                <input type="text"
                    placeholder="Name"
                    name="name"
                    value={updateDoctor.name}
                    onChange={handleUpdateChange} />
                <input type="text"
                    placeholder="Email"
                    name="email"
                    value={updateDoctor.email}
                    onChange={handleUpdateChange} />
                <input type="text"
                    placeholder="Address"
                    name="address"
                    value={updateDoctor.address}
                    onChange={handleUpdateChange} />
                <input type="text"
                    placeholder="City"
                    name="city"
                    value={updateDoctor.city}
                    onChange={handleUpdateChange} />
                <input type="text"
                    placeholder="Phone"
                    name="phone"
                    value={updateDoctor.phone}
                    onChange={handleUpdateChange} /> <br />
                <button onClick={handleUpdate}>Update</button>
            </div>
            <br />
        <h3>Müşteri Listesi</h3>
        <br />
            <table className="min-nav">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {doctor.map((doc) => (
                        <tr key={doc.id}>
                            <td>{doc.name}</td>
                            <td>{doc.email}</td>
                            <td>{doc.address}</td>
                            <td>{doc.city}</td>
                            <td>{doc.phone}</td>
                            <td>
                                <span onClick={() => handleDelete(doc.id)}><DeleteIcon /></span>
                                <span onClick={() => handleUpdateBtn(doc)}><UpdateIcon /></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Doctor;
