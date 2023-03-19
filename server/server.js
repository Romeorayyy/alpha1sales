require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-email', async (req, res) => {
  const { email, name, lastName, phoneNumber, cartItems, totalAmount } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'New Order',
    text: `
      Name: ${name}
      Last Name: ${lastName}
      Phone Number: ${phoneNumber}
      Email: ${email}
      Total Amount: $${totalAmount}
      Items: ${JSON.stringify(cartItems)}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Email sent successfully and this is a test');
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).send('Failed to send email');
  }
}); 

// Serve the static files from the client/build folder
app.use(express.static(path.join(__dirname, '../client/build')));

// Serve the index.html file for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
