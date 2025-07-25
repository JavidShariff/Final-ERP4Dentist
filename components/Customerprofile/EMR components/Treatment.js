// components\Customerprofile\EMR components\Treatment.js
"use client";
import React, { useState } from "react";
import "./Treatment.css";
import AddNoteModal from "@/components/PopupModals/AddNoteModal/AddNoteModal";
import AddLabWorkModal from "@/components/PopupModals/AddLabWorkModal/AddLabWorkModal";

const Treatment = ({ data = [] }) => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showLabWorkModal, setShowLabWorkModal] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleAddNote = (planId) => {
    console.log(`Add Note for Plan ID: ${planId}`);
    setShowNoteModal(true);
    setOpenDropdownIndex(null);
  };

  const handleAddLabWork = (planId) => {
    console.log(`Add Lab Work for Plan ID: ${planId}`);
    setShowLabWorkModal(true);
    setOpenDropdownIndex(null);
  };

  const handleDelete = (planId) => {
    if (window.confirm(`Are you sure you want to delete Plan ID: ${planId}?`)) {
      // handle deletion logic here
    }
    setOpenDropdownIndex(null);
  };

  const extractTeeth = (plan) => {
    const teethNumbers = [];
    for (const key in plan) {
      if (
        key.startsWith("teeth_") &&
        plan[key] &&
        plan[key] !== "0" &&
        plan[key] !== null
      ) {
        teethNumbers.push(key.replace("teeth_", ""));
      }
    }
    return teethNumbers.join(",");
  };

  const totalEstimated = data.reduce(
    (sum, t) => sum + parseFloat(t.price_proce || 0),
    0
  );
  const totalConfirmed = data.reduce(
    (sum, t) => sum + parseFloat(t.price_proce || 0),
    0
  ); // Adjust logic if needed

  return (
    <div className="treatment-container">
      <h2 className="treatment-header">Treatment</h2>

      <div className="treatment-summary">
        <span>Total Estimated Plan Amount: ₹ {totalEstimated}</span>
        <span>Total Confirmed Plan Amount: ₹ {totalConfirmed}</span>
      </div>

      {data.length === 0 ? (
        <p>No treatment plans available.</p>
      ) : (
        <div className="table-responsive">
        <table className="treatment-table">
          <thead>
            <tr>
              <th>Plan ID</th>
              <th>Plan Date</th>
              <th>Dr</th>
              <th>Tooth Number</th>
              <th>Procedure</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Discount</th>
              <th>Treatment Cost</th>
              <th>Invoiced Amount</th>
              <th>Balance Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((plan, index) => (
              <tr key={index}>
                <td>{plan.id}</td>
                <td>{plan.startDate}</td>
                <td>
                  <div className="doctor-badge">
                    <span
                      className="doctor-color"
                      style={{
                        backgroundColor: plan.doc_cal_color || "#3a6351",
                      }}
                    ></span>
                    {plan.doctor}
                  </div>
                </td>
                <td className="tooth-column" title={extractTeeth(plan)}>
                  {extractTeeth(plan)}
                </td>
                <td>{plan.procedure}</td>
                <td>{plan.type}</td>
                <td>₹ {plan.price_proce}</td>
                <td>₹ {plan.dicount}</td>
                <td>₹ {plan.price_proce}</td>
                <td>₹ {plan.invoice_amt}</td>
                <td>₹ {plan.balance_amt}</td>
                <td className="action-cell">
                  <span
                    onClick={() => toggleDropdown(index)}
                    className="action-dots"
                  >
                    ⋮
                  </span>
                  {openDropdownIndex === index && (
                    <div className="action-dropdown">
                      <div
                        className="dropdown-item"
                        onClick={() => handleAddNote(plan.id)}
                      >
                        Add Note
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() => handleAddLabWork(plan.id)}
                      >
                        Add Lab Work
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() => handleDelete(plan.id)}
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      {/* Modals */}
      {showNoteModal && (
        <AddNoteModal onClose={() => setShowNoteModal(false)} />
      )}
      {showLabWorkModal && (
        <AddLabWorkModal onClose={() => setShowLabWorkModal(false)} />
      )}

      <div className="back-link">
        <a href="#">Back to History</a>
      </div>
    </div>
  );
};

export default Treatment;
