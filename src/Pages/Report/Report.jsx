import { useState, useEffect } from "react";
import { createReport, getReport, deleteReport, updateReportFunc } from "../../API/Report";
import { getAppointment } from "../../API/Appointment";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import '../Report/Report.css';

function Report() {
    const [report, setReport] = useState([]);
    const [reload, setReload] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [newReport, setNewReport] = useState({
        diagnosis: "",
        price: "",
        appointment: ""
    });
    const [updateReportData, setUpdateReportData] = useState({
        id: "",
        diagnosis: "",
        price: "",
        appointment: ""
    });

    useEffect(() => {
        getReport().then((data) => {
            setReport(data);
        });
        getAppointment().then((data) => {
            setAppointments(data);
        });
    }, [reload]);

    const handleNewReport = (e) => {
        const { name, value } = e.target;
        setNewReport((prevReport) => ({
            ...prevReport,
            [name]: value
        }));
    };

    const handleDelete = (id) => {
        deleteReport(id).then(() => {
            setReload(!reload);
        });
    };

    const handleUpdate = () => {
        console.log(updateReportData)
        const newObj={
            id:updateReportData.id,
            diagnosis: updateReportData.diagnosis,
             price: updateReportData.price,
             appointmentId: updateReportData.appointmentForReportResponseDto?.id
        }
        console.log(newObj)
        updateReportFunc(newObj)
            .then(() => {
                setReload(true);
                // Update işlemi sonrasında updateReportData nesnesini temizleme
                setUpdateReportData({
                    id: "",
                    diagnosis: "",
                    price: "",
                    appointment: updateReportData.appointment // Randevu bilgisini temizleme
                });
            })
            .catch((error) => {
                console.error("Güncelleme işlemi sırasında bir hata oluştu:", error);
            });
    };
    

    const handleUpdateBtn = (rep) => {
        setUpdateReportData({
            ...rep,
            // rep.appointmentId alanını kontrol etmek yerine rep.appointment alanını kontrol etmek daha doğru
            appointment: rep.appointment ? { id: rep.appointment.id } : {}
        });
    };
    
    const handleCreate = () => {
        console.log(report)
        const selectedAppointmentId = newReport.appointment;
        const newReportData = {
            diagnosis: newReport.diagnosis,
            price: newReport.price,
            appointmentId: selectedAppointmentId
        };
        createReport(newReportData).then(() => {
            setReload(!reload);
        });
        setNewReport({
            diagnosis: "",
            price: "",
            appointment: ""
        });
    };

    const handleUpdateChange = (event) => {
        const { name, value } = event.target;
        if (name === "appointment") {
            // Seçilen randevunun id'sini alarak updateReportData'ya atayın
            const selectedAppointment = appointments.find(appointment => appointment.id === value);
            const appointmentId = selectedAppointment ? selectedAppointment.id : null;
            setUpdateReportData((prevReport) => ({
                ...prevReport,
                appointment: appointmentId // Seçilen randevu id'sini set edin
            }));
        } else {
            setUpdateReportData({
                ...updateReportData,
                [name]: value,
            });
        }
    };

    return (
        <div>
            <h1 className="başlık">Rapor Yönetimi</h1> <br />
            <h3>Rapor Ekleme</h3>
            <div  className="animal-newanimal">
                <div>
                    <input
                        type="text"
                        placeholder="Teşhis"
                        name="diagnosis"
                        value={newReport.diagnosis}
                        onChange={handleNewReport} />
                    <input
                        type="text"
                        placeholder="Fiyat"
                        name="price"
                        value={newReport.price}
                        onChange={handleNewReport} /> <br />
                    <select className="report-select"
                        name="appointment"
                        value={newReport.appointment}
                        onChange={handleNewReport}>
                        <option value="" disabled>Randevu Seç</option>
                        {appointments.map((appointment) => (
                            <option key={appointment.id} value={appointment.id}>
                                {appointment.animal.name}
                            </option>
                        ))}
                    </select> <br />
                    <button onClick={handleCreate}>Rapor Ekle</button>
                    </div>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Teşhis"
                        name="diagnosis"
                        value={updateReportData.diagnosis}
                        onChange={handleUpdateChange} />
                    <input
                        type="text"
                        placeholder="Fiyat"
                        name="price"
                        value={updateReportData.price}
                        onChange={handleUpdateChange} /> <br />
                    <select className="report-select"
                        name="appointment"
                        value={updateReportData.appointment}
                        onChange={handleUpdateChange}>
                        <option value="" disabled>Randevu Seç</option>
                        {appointments.map((appointment) => (
                            <option key={appointment.id} value={appointment.id}>
                                {appointment.animal.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button onClick={handleUpdate}>Rapor Güncelle</button>
                <br />
                </div>
                <div>
            <br />
          <h3>Rapor Listesi</h3>
          <br />
                <table className="min-nav">
                    <thead>
                        <tr>
                            <th>Teşhis</th>
                            <th>Fiyat</th>
                            <th>Randevu</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((report) => (
                            <tr key={report.id}>
                                <td>{report.diagnosis}</td>
                                <td>{report.price}</td>
                                <td>{report.appointment ? report.appointment.animal.name : ""}</td>
                                <td>
                                    <span onClick={() => handleDelete(report.id)} style={{ cursor: 'pointer' }}>
                                        <DeleteIcon />
                                    </span>
                                    <span onClick={() => handleUpdateBtn(report)} style={{ cursor: 'pointer' }}>
                                        <UpdateIcon />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Report;
