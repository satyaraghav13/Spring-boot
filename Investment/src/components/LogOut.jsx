import { useState } from "react";
import { Link } from "react-router-dom";

function LogOut() {
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"; // redirect to home
  };

  return (
    <>
      <div className="nav-links">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>

          <li
            style={{ cursor: "pointer" }}
            onClick={() => setShow(true)}
          >
            Logout
          </li>
        </ul>
      </div>

      {show && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.6)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light">

              <div className="modal-header border-secondary">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShow(false)}
                ></button>
              </div>

              <div className="modal-body">
                Are you sure you want to logout?
              </div>

              <div className="modal-footer border-secondary">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default LogOut;
