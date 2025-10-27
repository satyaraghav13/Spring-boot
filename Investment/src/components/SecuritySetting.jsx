function SecuritySetting() {
return (
<>

  <h2>🔐 Security Settings</h2>


  <form className="kyc-form" action="#" method="post">
    <fieldset>
      <legend>Change Password</legend>

      <label  className="kyc-label">Old Password:</label>
      <input type="password" id="oldPassword" name="oldPassword"/>

      <label  className="kyc-label">New Password:</label>
      <input type="password" id="newPassword" name="newPassword"/>

      <label  className="kyc-label">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword"/>

      <button type="submit">Update Password</button>
    </fieldset>
  </form>

  <hr />

  <form className="kyc-form" action="#" method="post">
    <fieldset>
      <legend>Two-Factor Authentication (2FA)</legend>

      <label  className="kyc-label">Enable 2FA (via OTP):</label>
      <input type="checkbox" id="enable2fa" name="enable2fa"/>

      <button type="submit">Save Settings</button>
    </fieldset>
  </form>

  <hr />

 
  <form className="kyc-form" action="#" method="post">
    <fieldset>
      <legend>Logout from All Devices</legend>

      <p>Click below to log out from all active sessions.</p>
      <button type="submit">Logout All Devices</button>
    </fieldset>
  </form>

</>
)
};

export default SecuritySetting