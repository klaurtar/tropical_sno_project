const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const debug = require('debug')('app:mail');

const auth = {
    auth: {
       api_key: '2ad8550dda03e25f1ba070bb6f9fec79-e51d0a44-47cec0b6',
       domain: 'sandbox41c6c62e4294457cb58aef79e3388718.mailgun.org' 
    }
};

const transporter = nodemailer.createTransport(mailgun(auth));

function sendAppliedEmail(applicant) {
  let html = '<div style="background: url(http://kansascitysnowcones.com/wp-content/uploads/2016/04/slider-background.png) center center/cover no-repeat; background-size: auto;">'
  html += '<img src="https://www.tropicalsno.com/wp-content/uploads/header-logo.png" alt="logo" style="margin: 0 auto;">';
  html += '<h2 style="color: #f49842; text-align: center">New Applicant</h2>'
  html += '<ul>';

  Object.entries(applicant).forEach(([key, value]) => {
    // html += `<li>${key}: ${ typeof value === 'string' ? value : JSON.stringify((value), null, '\t')}</li>`;
    html += `<li>${key.replace(/([a-z])([A-Z])/g, `$1 $2`).toUpperCase().fontcolor('green')}: ${value}</li>`;
  });

  html += '</ul></div>';

  const mailOptions = {
    from: 'info@tropicalsno.com',
    to: 'talbertt@charter.net, klaurtar@gmail.com, talberttv@gmail.com',
    subject: 'New Applicant to Tropical Sno',
    html
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      debug(`Error: ${err}`);
    } else {
      debug(`Info: ${info}`);
    }
  });
}

module.exports = sendAppliedEmail;