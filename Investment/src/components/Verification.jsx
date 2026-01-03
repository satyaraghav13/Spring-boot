import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";

function Verification() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    aadhaar: "",
    pan: "",
    address: "",
    photo: "",
    aadhaarFile: "",
    panFile: "",
  });

  const [photo, setPhoto] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔴 Frontend validation
    if (
      !formData.name ||
      !formData.dob ||
      !formData.aadhaar ||
      !formData.pan ||
      !formData.address
    ) {
      setError("❌ All fields are required");
      return;
    }

    if (!photo || !aadhaarFile || !panFile) {
      setError("❌ Please upload all required files");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("dob", formData.dob);
    data.append("aadhaar", formData.aadhaar);
    data.append("pan", formData.pan);
    data.append("address", formData.address);
    data.append("photo", photo);
    data.append("aadhaarFile", aadhaarFile);
    data.append("panFile", panFile);

    try {
      setLoading(true);
      // const res = await axios.post("http://localhost:8080/kyc/reg", data);
      const res = await axios.post("http://localhost:8080/reg", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ KYC Submitted Successfully");
      console.log(res.data);
    } catch (err) {
      const msg =
        err.response?.data?.message || err.response?.data || "Server Error ❌";
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container py-4"
      style={{
        background: "#0b0e11",
        minHeight: "100vh",
        maxWidth: "100%",
        color: "white",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card bg-dark text-light p-4 shadow border-secondary">
            <h3 className="mb-4 text-center fw-bold">KYC Verification</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-3"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
              />
              <input
                type="date"
                className="form-control mb-3"
                name="dob"
                onChange={handleChange}
              />
              <input
                className="form-control mb-3"
                name="aadhaar"
                placeholder="Aadhaar Number"
                onChange={handleChange}
              />
              <input
                className="form-control mb-3"
                name="pan"
                placeholder="PAN Number"
                onChange={handleChange}
              />
              <textarea
                className="form-control mb-3"
                name="address"
                placeholder="Address"
                onChange={handleChange}
              />
              <label className="form-label fw-semibold text-info">Aadhaar Front</label>
              <input
                type="file"
                className="form-control mb-3"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              <label className="form-label fw-semibold text-info"> Aadhaar Back</label>
              <input
                type="file"
                className="form-control mb-3"
                onChange={(e) => setAadhaarFile(e.target.files[0])}
              />
              <label className="form-label fw-semibold text-info">PAN Card Front</label>
              <input
                type="file"
                className="form-control mb-3"
                onChange={(e) => setPanFile(e.target.files[0])}
              />


             

              <button
                className="btn btn-warning w-100 fw-bold"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit KYC"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;
