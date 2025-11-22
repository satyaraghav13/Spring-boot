function PrivacyPolicy({ show, onClose }) {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
       <div
              className="modal-content text-black"
            style={{ background: "rgba(236, 225, 225, 1)" }}
>


          <div className="modal-header border-secondary">
            <h5 className="modal-title">Privacy Policy</h5>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body" style={{ maxHeight: "300px", overflowY: "auto" }}>
            <p>
             <b>Introduction & Overview -- </b>
OneTouch is committed to protecting your personal data and maintaining transparency about how it is collected, used, and secured. This Privacy Policy explains what information we gather when you create an account or interact with our platform, and how we safeguard your privacy. By using our services, you consent to the practices described in this document. We encourage you to read this policy carefully so you understand your rights and how we handle your information.
            </p>

            <p>
<b>Information We Collect -- </b>
During registration or platform usage, we collect essential details such as your email, mobile number, password, and device information. We may also gather usage data, login timestamps, and behavioral patterns to improve security and user experience. When interacting with trading charts, posts, or community features, additional non-sensitive data may be collected to personalize and enhance your experience. We do not collect unnecessary data and never store sensitive financial information without your permission.

            </p>
            <p>
<b>How Your Data is Used & Shared -- </b>
Your information is primarily used to create and manage your account, provide customer support, enhance platform security, and improve overall functionality. We may use anonymized data for analytics to understand user trends. OneTouch does not sell or trade your personal information. Data is only shared when required by law or when necessary to deliver essential features such as authentication, cloud storage, or fraud prevention. All such third-party partners follow strict privacy and security standards.
            </p>
            <p>
               <b>Your Rights & Data Protection -- </b> 
You have full control over your personal information. This includes the right to access, update, or request deletion of your data at any time. We use encryption, security protocols, and monitoring systems to protect your information against unauthorized access. If you disagree with any part of this Privacy Policy, you should stop using the service immediately. Continued use of OneTouch confirms your agreement and understanding of how your data is processed and protected.
            </p>
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

export default PrivacyPolicy;

