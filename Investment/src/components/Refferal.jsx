import "bootstrap/dist/css/bootstrap.min.css";

function Refferal() {
  return ( 
    <div
      className="container py-4"
      style={{ background: "#1a1c1cff", minHeight: "100vh",maxWidth:"100%", color: "white" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">

          <h3 className="fw-bold mb-4 text-center">Referral & Support</h3>

          <div className="card bg-dark text-light p-3 shadow border-secondary">

            {/* Service Agreement */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-secondary">
              <span>Service Agreement</span>
              <span className="text-muted fs-5">›</span>
            </div>

            {/* Certificate Trust */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-secondary">
              <span>Certificate Trust</span>
              <span className="text-muted fs-5">›</span>
            </div>

            {/* Referral */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-secondary">
              <span>Referral</span>
              <span className="text-muted fs-5">›</span>
            </div>

            {/* Follow us */}
            <div className="d-flex justify-content-between align-items-center py-3">
              <span>Follow Us</span>
              <span className="text-muted fs-5">›</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Refferal;
