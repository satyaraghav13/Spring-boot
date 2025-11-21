
import "bootstrap/dist/css/bootstrap.min.css";

function Verification() {
  return (
    <div
      className="container py-4"
      style={{ background: "#0b0e11", minHeight: "100vh",maxWidth :"100%"    , color: "white" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">

          {/* KYC Card */}
          <div className="card bg-dark text-light p-4 shadow border-secondary">

            <h3 className="mb-4 text-center fw-bold">KYC Verification</h3>

            <form>

              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label text-muted">Full Name</label>
                <input
                  type="text"
                  className="form-control bg-white text-light border-secondary"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* DOB */}
              <div className="mb-3">
                <label className="form-label text-muted">Date of Birth</label>
                <input
                  type="date"
                  className="form-control bg-whitetext-light border-secondary"
                  required
                />
              </div>

              {/* Aadhaar */}
              <div className="mb-3">
                <label className="form-label text-muted">Aadhaar Number</label>
                <input
                  type="text"
                  className="form-control bg-white text-light border-secondary"
                  placeholder="Enter Aadhaar number"
                  required
                />
              </div>

              {/* PAN */}
              <div className="mb-3">
                <label className="form-label text-muted">PAN Number</label>
                <input
                  type="text"
                  className="form-control bg-white text-light border-secondary"
                  placeholder="Enter PAN number"
                  required
                />
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label text-muted">Address</label>
                <textarea
                  rows="3"
                  className="form-control bg-white text-light border-secondary"
                  placeholder="Enter full address"
                  required
                ></textarea>
              </div>

              {/* Upload Photo */}
              <div className="mb-3">
                <label className="form-label text-muted">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control bg-black text-light border-secondary"
                  required
                />
              </div>

              {/* Aadhaar File */}
              <div className="mb-3">
                <label className="form-label text-muted">Upload Aadhaar</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control bg-black text-light border-secondary"
                  required
                />
              </div>

              {/* PAN File */}
              <div className="mb-3">
                <label className="form-label text-muted">Upload PAN Card</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control bg-black text-light border-secondary"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-warning w-100 fw-bold py-2 mt-2"
              >
                Submit KYC
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;
