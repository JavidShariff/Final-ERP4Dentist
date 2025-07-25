// components\Customerprofile\EMR.js
import React, { useState } from "react";
import "./EMR.css";
import Examination from "./EMR components/Examination";
import Observation from "./EMR components/Observation";
import Treatment from "./EMR components/Treatment";
import Clinicalnotes from "./EMR components/Clinicalnotes";
import Prescriptions from "./EMR components/Prescriptions";
import LabWorks from "./EMR components/LabWorks";
import Uploads from "./EMR components/Uploads";
import Billing from "./EMR components/Billing/Billing";
import InvoiceView from "./EMR components/InvoiceView/InvoiceView";

const tabs = [
  { id: "examination", label: "Examination", icon: "🩺" },
  { id: "observation", label: "Observation", icon: "🔬" },
  { id: "treatment", label: "Treatment", icon: "🩹" },
  { id: "clinical-notes", label: "Clinical Notes", icon: "📋" },
  { id: "prescriptions", label: "Prescriptions", icon: "📝" },
  { id: "lab-works", label: "Lab Works", icon: "🔬" },
  { id: "uploads", label: "Uploads", icon: "⬆️" },
  { id: "billing", label: "Billing", icon: "🧾" },
  { id: "invoice", label: "Invoice", icon: "📄" },
];

const EMR = ({
  activeTab,
  setActiveTab,
  handleBookClick,
  patient_details,
  onUpdatePatient,
  switchToTreatmentTab,
}) => {
  const [activeTab1, setActiveTab1] = useState("examination");

  console.log("💥 patient_details:", patient_details);

  const calculateInvoiceTotal = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, item) => sum + Number(item.invoice_amt || 0), 0);
  };

  return (
    <div>
      <div className="card" style={{ width: "78rem", minHeight: "100vh" }}>
        <div className="card-body">
          <div className="heading d-flex justify-content-between">
            <div className="d-flex">
              {["History", "Patient", "EMR"].map((tab) => (
                <div className="mx-2" key={tab}>
                  <button
                    className={`tab-button ${
                      activeTab === tab ? "active-tab" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                </div>
              ))}
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleBookClick}>
                Book Appointment for check
              </button>
            </div>
          </div>

          {/* Inner Tabs */}
          <div className="top-tabs" style={{ marginLeft: "60px" }}>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab-item ${activeTab1 === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab1(tab.id)}
                style={{ margin: "0px 5px" }}
              >
                <div className="tab-icon">{tab.icon}</div>
                <div className="tab-label">{tab.label}</div>
              </div>
            ))}
          </div>

          {/* Dynamic Tab Content */}
          {activeTab1 === "examination" && (
            <Examination data={patient_details.examination?.[0]} />
          )}
          {activeTab1 === "observation" && (
            <Observation
              data={patient_details.observ || []}
              onUpdatePatient={onUpdatePatient}
              appo_id={patient_details?.appo_id}
              branch={patient_details?.branch?.toString() || "1"}
              switchToTreatmentTab={() => setActiveTab1("treatment")}
            />
          )}

          {activeTab1 === "treatment" && (
            <Treatment data={patient_details.plan || []} />
          )}
          {activeTab1 === "clinical-notes" && (
            <Clinicalnotes data={patient_details.note || []} />
          )}
          {activeTab1 === "prescriptions" && (
            <Prescriptions data={patient_details.prescription || []} />
          )}
          {activeTab1 === "lab-works" && (
            <LabWorks labData={patient_details.lab} />
          )}
          {activeTab1 === "uploads" && <Uploads />}
          {activeTab1 === "billing" && (
            <Billing
              data={patient_details.planbill || []}
              bills={patient_details.bills || []}
              receipts={patient_details.receipt || []}
            />
          )}

          {activeTab1 === "invoice" && (
            <>
              {console.log("INVOICE DEBUG →", {
                invoiceplan: patient_details.invoiceplan,
                invoiceplan_total: patient_details.invoiceplan_total,
                patient_information: patient_details,
              })}

              <InvoiceView
                data={patient_details.invoiceplan || []} // ✅ FIXED
                total={patient_details.invoiceplan_total || 0} // ✅ FIXED
                patientinformations={[patient_details]} // ✅ Already correct
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EMR;
