const { sendEmail } = require("./sendEmail");

sendEmail({
  to: 'sw.linkedin.learning+test1@gmail.com',
  from: 'sw.linkedin.learning@gmail.com',
  subject: 'Does this work?',
  text: 'If you\'re reading this, then... yes!!!',
})
  .then(() => { console.log('Email sent!') })
  .catch(e => console.log(e));