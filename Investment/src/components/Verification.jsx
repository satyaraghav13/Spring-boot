function Verification() {
return (
<>
  <form className="kyc-form" action="#" method="post">
    <h2 className="kyc-title">KYC Verification Form</h2>

    <div className="form-group">
      <label className="kyc-label" >Full Name:</label>
      <input className="kyc-input" type="text" id="fullname" name="fullname" placeholder="Enter your full name" required/>
    </div>

    <div className="form-group">
      <label className="kyc-label" >Date of Birth:</label>
      <input className="kyc-input" type="date" id="dob" name="dob" required/>
    </div>

    <div className="form-group">
      <label className="kyc-label">Aadhaar Number:</label>
      <input className="kyc-input" type="text" id="aadhaar" name="aadhaar" placeholder="Enter Aadhaar number" required/>
    </div>

    <div className="form-group">
      <label className="kyc-label" >PAN Number:</label>
      <input className="kyc-input" type="text" id="pan" name="pan" placeholder="Enter PAN number" required/>
    </div>

    <div className="form-group">
      <label className="kyc-label" >Address:</label>
      <textarea className="kyc-textarea" id="address" name="address" rows="3" placeholder="Enter your full address" required></textarea>
    </div>

    <div className="form-group">
      <label className="kyc-label">Upload Photo:</label>
      <input className="kyc-file" type="file" id="photo" name="photo" accept="image/*" required/>
    </div>

    <div className="form-group">
      <label className="kyc-label" >Upload Aadhaar:</label>
      <input className="kyc-file" type="file" id="aadhaarback" name="aadhaarback" accept="image/*" required/>
    </div>

    <div className="form-group">
      <label className="kyc-label" >Upload PAN Card:</label>
      <input className="kyc-file" type="file" id="panfile" name="panfile" accept="image/*" required/>
    </div>

    <button className="kyc-button" type="submit">Submit KYC</button>
  </form>
</>
)
}
export default Verification