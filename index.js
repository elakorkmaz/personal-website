const express = require('express'),
      pug = require('pug'),
      morgan = require('morgan'),
      nodemailer = require('nodemailer'),
      bodyParser = require('body-parser');

console.log(process.env.PERSONAL_WEBSITE_EMAIL_ADDRESS);

var app = express(),
  transporter = nodemailer.createTransport(
    'smtps://' + process.env.PERSONAL_WEBSITE_EMAIL_ADDRESS + ':' +
    process.env.PERSONAL_WEBSITE_EMAIL_PASSWORD + '@smtp.gmail.com'
  );

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', function(request, response) {
  response.render('index.pug');
});

app.post('/send-email', (request, response) => {
  console.log('HTTP Request body was:');
  console.log(request.body);

  transporter.sendMail({
    from: request.body.emailAddress,
    to: process.env.PERSONAL_WEBSITE_EMAIL_ADDRESS,
    subject: 'Email received from Personal Website',
    text: request.body.message + '\nSender Email: ' +
    request.body.emailAddress  + '\nSender Full Name: ' + request.body.fullName
  }, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log('Message sent: ' + info.response);
  });

  response.redirect('/');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
