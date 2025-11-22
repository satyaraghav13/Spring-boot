function TermsService({ show, onClose }) {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
              className="modal-content text-black"
            style={{ background: "rgba(227, 222, 222, 1)" }}
>
          <div className="modal-header border-secondary">
            <h5 className="modal-title">Terms of Service</h5>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body" style={{ maxHeight: "300px", overflowY: "auto" }}>
          
              <p> <b>Acceptance of  -- </b>
  By creating an account or accessing the OneTouch platform, you agree to these Terms of Service.
 These terms govern your relationship with OneTouch and outline your responsibilities while using our website, mobile application,
  or any other service provided under our name. You must read and understand these terms carefully before using our services. 
  If you do not agree with any part of these terms, you should stop using OneTouch immediately. 
  Your continued use of our platform confirms that you fully accept and understand all rules,
   guidelines, and obligations mentioned here. </p>

<p> <b>User Responsibilities -- </b>
As a registered user, you are responsible for maintaining the confidentiality of your login details and ensuring that all information you provide is accurate, updated, and truthful. You must not misuse the platform by attempting unauthorized access, spreading harmful content, or engaging in illegal activities. Any action that disrupts the security, stability, or performance of the platform may result in suspension or termination of your account. You are also responsible for reviewing updates to these terms, as we may modify them from time to time to improve our services.</p>

<p>  <b>Service Usage & Limitations --    </b>
OneTouch provides trading-related content, tools, analytics, and community interactions for informational purposes only. We do not guarantee profits, returns, or financial outcomes. Market conditions can be unpredictable, and users should always act with caution. OneTouch reserves the right to modify, pause, or discontinue any part of the service at any time, without prior notice. While we aim to offer a seamless experience, we cannot guarantee uninterrupted or error-free service due to technical, maintenance, or third-party issues.</p>

<p>  <b>Account Termination & Legal Compliance  --   </b>
OneTouch may terminate or restrict access to your account if you violate these terms or engage in harmful or suspicious activities. We comply with all legal requirements and may share necessary information with authorities if required by law. By using our services, you acknowledge that you are solely responsible for your activities and actions. These Terms of Service form a binding agreement between you and OneTouch, ensuring a safe, secure, and fair environment for every user.</p>
           
          </div>

          <div className="modal-footer border-secondary">
            
            <button className="btn btn-success" onClick={onClose}>
              I Agree
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TermsService;

