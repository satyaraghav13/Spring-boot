import "bootstrap/dist/css/bootstrap.min.css";

function SecuritySetting() {
  return (
    <div
      className="container py-4"
      style={{ background: "#0b0e11", minHeight: "100vh"  ,maxWidth :"100%" , color: "white" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">

          <h3 className="fw-bold mb-4 text-center">Security Settings</h3>

         
          <div className="card bg-dark text-light p-4 shadow border-secondary mb-4">
            <h5 className="text-warning">Change Password</h5>

            <div className="mt-3">
              <label className="form-label text-muted">Old Password</label>
              <input
                type="password"
                className="form-control bg-White border-secondary text-light"
                  placeholder="Old Password"
                  required
              />
            </div>

            <div className="mt-3">
              <label className="form-label text-muted">New Password</label>
              <input
                type="password"
                className="form-control bg-White  border-secondary text-light"
                
                  placeholder="New Password"
                  required
              />
            </div>

            <div className="mt-3">
              <label className="form-label text-muted">Confirm Password</label>
              <input
                type="password"
                className="form-control bg-White  border-secondary text-light"
                  placeholder="Confirm New Password"
                  required
              />
            </div>

            <button className="btn btn-warning w-100 mt-4 fw-bold">
              Update Password
            </button>
          </div>

         
          <div className="card bg-dark text-light p-4 shadow border-secondary mb-4">
            <h5 className="text-warning">Two-Factor Authentication (2FA)</h5>

            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="2fa-check"
              />
              <label className="form-check-label" htmlFor="2fa-check">
                Enable 2FA (via OTP)
              </label>
            </div>

            <button className="btn btn-primary w-100 mt-4 fw-bold">
              Save Settings
            </button>
          </div>

         
          <div className="card bg-dark text-light p-4 shadow border-secondary mb-4">
            <h5 className="text-warning">Logout from All Devices</h5>
            <p className="text-muted mt-2">
              Click the button below to log out from all active sessions.
            </p>

            <button className="btn btn-danger w-100 fw-bold">
              Logout All Devices
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SecuritySetting;
