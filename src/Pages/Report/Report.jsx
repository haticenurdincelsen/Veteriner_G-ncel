import { useState, useEffect } from "react";
import { createReport, getReport, deleteReport, updateReportFunc } from "../../API/Report";
import { getAppointment } from "../../API/Appointment";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

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
        updateReportFunc(updateReportData)
            .then(() => {
                setReload(!reload);
                setUpdateReportData({
                    id: "",
                    diagnosis: "",
                    price: "",
                    appointment: ""
                });
            })
            .catch((error) => {
                console.error("Güncelleme işlemi sırasında bir hata oluştu:", error);
            });
    };
    const handleUpdateBtn = (rep) => {
        if (rep && rep.id && rep.appointment && rep.appointment.id) {
            setUpdateReportData({
                ...rep,
                appointment: { id: rep.appointment.id } // Randevu ID'siyle doldur
            });
        } else {
            console.error("Güncelleme için geçerli bir rapor seçilmedi veya randevu bilgisi eksik.");
        }
    };
  
    

    const handleCreate = () => {
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

    return (
        <div>
            <h3>Raporlar</h3>
            <div>
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
                        onChange={handleNewReport} />
                    <select
                        name="appointment"
                        value={newReport.appointment}
                        onChange={handleNewReport}>
                        <option value="" disabled>Randevu Seç</option>
                        {appointments.map((appointment) => (
                            <option key={appointment.id} value={appointment.id}>
                                {appointment.animal.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleCreate}>Rapor Ekle</button>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Teşhis"
                        name="diagnosis"
                        value={updateReportData.diagnosis}
                        onChange={(event) => setUpdateReportData({...updateReportData, diagnosis: event.target.value})} />
                    <input
                        type="text"
                        placeholder="Fiyat"
                        name="price"
                        value={updateReportData.price}
                        onChange={(event) => setUpdateReportData({...updateReportData, price: event.target.value})} />
                    <select
                        name="appointment"
                        value={updateReportData.appointment}
                        onChange={(event) => setUpdateReportData({...updateReportData, appointment: event.target.value})}>
                        <option value="" disabled>Randevu Seç</option>
                        {appointments.map((appointment) => (
                            <option key={appointment.id} value={appointment.id}>
                                {appointment.animal.name}
                            </option>
                        ))}
                    </select>
                    
                    <button onClick={handleUpdate}>Rapor Güncelle</button>
                
                </div>
                {report.map((report) => (
                    <div key={report.id}>
                        {report.diagnosis} {report.price}
                        <span id={report.id} onClick={() => handleDelete(report.id)} style={{ cursor: 'pointer' }}>
                            <DeleteIcon />
                        </span>
                        <span onClick={() => handleUpdateBtn(report)} style={{ cursor: 'pointer' }}>
                            <UpdateIcon />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Report;
