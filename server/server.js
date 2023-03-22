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
  const { email, name, phoneNumber, itemsHtml, totalAmount } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${email}, jackwhite5125@gmail.com`,
    subject: 'New Order',
    html: `
      <div>
        <p>Name: ${name}</p>
        <p>Phone Number: ${phoneNumber}</p>
        <p>Email: ${email}</p>
        <p>Total Amount: $${totalAmount}</p>
        <h3>Items:</h3>
        ${itemsHtml}
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Email sent successfully');
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
