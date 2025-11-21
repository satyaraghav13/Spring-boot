import "bootstrap/dist/css/bootstrap.min.css";

function Setting() {
  return (
    <div
      className="container py-4"
      style={{ background: "#0b0e11", minHeight: "100vh",maxWidth :"100%"  , color: "white" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">

          {/* Settings Title */}
          <h2 className="fw-bold mb-4 text-center">Settings</h2>

          {/* GENERAL*/}
          <div className="card bg-dark text-light p-3 mb-3 shadow border-secondary">
            <h5 className="text-muted mb-3">General</h5>

            <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
              <span>Notification Preference</span>
              <span className="text-muted">›</span>
            </div>

            <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
              <span>Currency</span>
              <span className="text-warning fw-bold">INR</span>
            </div>

            <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
              <span>Language</span>
              <span className="text-warning fw-bold">English</span>
            </div>

            <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
              <span>Withdrawal Address</span>
              <span className="text-muted">›</span>
            </div>

            <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
              <span>Floating Window</span>
              <span className="text-muted">›</span>
            </div>

            <div className="d-flex justify-content-between py-2">
              <span>Using BNB</span>
              <span className="text-muted">›</span>
            </div>
          </div>

          {/* APPEARANCE */}
          <div className="card bg-dark text-light p-3 mb-3 shadow border-secondary">
            <h5 className="text-muted mb-3">Appearance</h5>

            <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
              <span>Theme</span>
              <span className="text-warning">Use device settings</span>
            </div>

            <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
              <span>Color Preference</span>
              <span className="text-muted">›</span>
            </div>

            <div className="d-flex justify-content-between py-2">
              <span>Change(%) & Chart Timezone</span>
              <span className="text-warning">Last 24 hours</span>
            </div>
          </div>

          {/* PAYMENT*/}
          <div className="card bg-dark text-light p-3 mb-3 shadow border-secondary">
            <h5 className="text-muted mb-3">Payment</h5>

            <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
              <span>Payment Currency</span>
              <span className="text-warning fw-bold">INR</span>
            </div>

            <div className="d-flex justify-content-between py-2">
              <span>Payment Methods</span>
              <span className="text-muted">›</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Setting;
