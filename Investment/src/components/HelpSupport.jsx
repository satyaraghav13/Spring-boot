import { useState } from "react";

function HelpSupport() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container my-3">

    
      <div
        className="d-flex justify-content-between align-items-center p-3 bg-dark text-light rounded"
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        <h5 className="m-0">Help & Support</h5>
        <span style={{ fontSize: "20px" }}>
          {open ? "▲" : "▼"}
        </span>
      </div>


      {open && (
        <div className="bg-dark text-light p-3 mt-2 rounded border border-secondary">
          <p className="text-muted m-0">
            Raise queries or find answers to your questions
          </p>

         
          <div className="mt-3">
            <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
              <span>FAQs</span>
              <span>›</span>
            </div>

            <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
              <span>Account Issues</span>
              <span>›</span>
            </div>

            <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
              <span>Payment & Withdrawals</span>
              <span>›</span>
            </div>

            <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
              <span>Contact Support</span>
              <span>›</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default HelpSupport;
