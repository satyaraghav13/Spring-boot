import "bootstrap/dist/css/bootstrap.min.css";

function About() {
  return (
    <div
      className="container py-4"
      style={{ background: "#0b0e11", minHeight: "100vh" ,maxWidth :"100%" , color: "white" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">

          <h3 className="fw-bold mb-4 text-center">About</h3>

          <div className="card bg-dark text-light p-3 shadow border-secondary">

           
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-secondary">
              <span>Service Agreement</span>
              <span className="text-muted fs-5">›</span>
            </div>

            <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-secondary">
              <span>Certificate Trust</span>
              <span className="text-muted fs-5">›</span>
            </div>


            <div className="d-flex justify-content-between align-items-center py-3">
              <span>Follow us</span>
              <span className="text-muted fs-5">›</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
