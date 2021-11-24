/**
 * mailer functions
 */

/* imports*/

const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const config = require('../config/config');

/* setup */

// fill client id and client secret

const oAuth = new google.auth.OAuth2(
  '377525267557-ous157vpt3p00bbpe52dufm54gestri8.apps.googleusercontent.com',
  config.CLIENT_SECRET,
  config.REDIRECT_URI
);
oAuth.setCredentials({ refresh_token: config.REFRESH_TOKEN });

/* functions */

/**
 * sends an email
 *
 * @param to
 * @param cc
 * @param bcc
 * @param subject
 * @param text
 * @param html
 * @returns {Promise<*|*>}
 */
const send = async (to, cc, bcc, subject, text, html) => {

  try {

    // fill client id and client secret

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'oauth2',
        user: 'tododorotimer@gmail.com',
        clientId: '377525267557-ous157vpt3p00bbpe52dufm54gestri8.apps.googleusercontent.com',
        clientSecret: config.CLIENT_SECRET,
        refreshToken: config.REFRESH_TOKEN,
        accessToken: oAuth.getAccessToken()
      }
    });

    const options = {
      from: 'TodoDoro: Productivity Todo List',
      to,
      cc,
      bcc,
      subject,
      text,
      html,
    };
    return await transport.sendMail(options);

  } catch (e) {
    return e;
  }
};

/**
 * sends an email with the verification code
 *
 * @param to
 * @param code
 * @returns {Promise<void>}
 */
const sendVerificationCode = async (to, code) => {
  const emailBody = `
  Hello from TodoDoro!
  
  We are happy to have you with us! Please use the following code to verify your account:
  
  ${code}
  
  Please note the code expires in 24 hours.
  `;

  return await send(to, null, null, 'Verify your new TodoDoro account', emailBody, null);
};

/* exports */

module.exports = {
  send,
  sendVerificationCode
};