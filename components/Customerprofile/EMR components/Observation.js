// components\Customerprofile\EMR components\Observation.js
"use client";
import { useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa";
import "./Observation.css";
import ObservationModal from "@/components/PopupModals/ObservationModal/ObservationModal";
import AddTreatmentModal from "@/components/PopupModals/AddTreatmentModal/AddTreatmentModal";

const Observation = ({ data = [], onUpdatePatient, appo_id, branch, switchToTreatmentTab }) => {
  const [show, setShow] = useState(false); // For ObservationModal
  const [showModal, setShowModal] = useState(false); // For AddTreatmentModal
  const [selectedObsId, setSelectedObsId] = useState(null); // Track clicked observation row

  const handleOpen = (id) => {
    setSelectedObsId(id);
    setShowModal(true);
  };

  const handleClose = (didSubmit = false) => {
    setShowModal(false);
    setSelectedObsId(null);
    if (didSubmit && typeof onUpdatePatient === "function") {
      onUpdatePatient();
      setTimeout(() => {
        document.querySelector(".treatment-container")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleModalClose = () => {
    setShow(false);
    if (typeof onUpdatePatient === "function") {
      onUpdatePatient(); // Refresh data after Observation POST
    }
  };

  const extractTeeth = (observation) => {
    const teethNumbers = [];
    for (const key in observation) {
      if (key.startsWith("teeth_") && observation[key]) {
        teethNumbers.push(key.replace("teeth_", ""));
      }
    }
    return teethNumbers.join(", ");
  };

  const firstObservation = data[0] || {};

  return (
    <div className="observation-container">
      <h2 className="observation-heading">Observation</h2>

      {firstObservation && (
        <div className="observation-header">
          <div className="observation-info">
            <p><strong>Examination Date:</strong> <span className="dim-text">{firstObservation.startDate}</span></p>
            <p><strong>Chief Complaint:</strong> <span className="dim-text">{firstObservation.observation}</span></p>
            <p><strong>Occlusion:</strong> <span className="dim-text">{firstObservation.occlusion || "-"}</span></p>
            <p><strong>Wisdom Teeth:</strong></p>
            <p>
              <strong>Calculus:</strong> <span className="dim-text">{firstObservation.calculus || "++"}</span>
              <span style={{ marginLeft: "3rem" }}>
                <strong>Stains:</strong> <span className="dim-text">{firstObservation.stains || "++"}</span>
              </span>
            </p>
          </div>

          <div className="observation-actions">
            <p>Doctor: <strong>{firstObservation.doctor}</strong></p>

            {show && (
              <ObservationModal
                onClose={handleModalClose}
                appo_id={appo_id}
                branch={branch}
              />
            )}
            {!show && (
              <button className="add-observation-btn" onClick={() => setShow(true)}>
                <FaPlus style={{ marginRight: "6px" }} /> Add New Observation
              </button>
            )}
          </div>
        </div>
      )}

      <table className="observation-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Dr</th>
            <th>Tooth Number</th>
            <th>Observations</th>
            <th>Notes</th>
            <th>Add New Plan Treatment</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((obs, index) => (
            <tr key={index}>
              <td>{obs.startDate}</td>
              <td>
                <div className="doctor-badge">
                  <span
                    className="doctor-color"
                    style={{
                      backgroundColor: obs.doc_cal_color || "#3a6351",
                    }}
                  ></span>
                  {obs.doctor}
                </div>
              </td>
              <td>{extractTeeth(obs)}</td>
              <td>{obs.observation}</td>
              <td>{obs.note}</td>
              <td>
                <button className="action-btn" onClick={() => handleOpen(obs.id)}>
                  <FaPen style={{ marginRight: "6px" }} /> Add Treatment
                </button>
                {showModal && selectedObsId === obs.id && (
                  <AddTreatmentModal
                    onClose={handleClose}
                    obsId={selectedObsId}
                    appo_id={appo_id}
                    branch={branch}
                    switchToTreatmentTab={switchToTreatmentTab}
                  />
                )}
              </td>
              <td>
                <button className="edit-icon" onClick={() => setShow(true)}>
                  <FaPen />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="back-link">
        <a href="#">Back to History</a>
      </div>
    </div>
  );
};

export default Observation;
