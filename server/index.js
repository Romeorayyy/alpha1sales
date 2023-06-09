const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

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

const formatCartItems = (items) => {
  return Object.entries(items)
    .map(([itemId, itemData]) => {
      const { productName, productImage, optionName, option, quantity } = itemData;
      return `
        <tr>
          <td><img src="${productImage}" alt="${productName}" style="width: 100px; height: auto;"></td>
          <td>${productName}</td>
          <td>${optionName}</td>
          <td>${quantity}</td>
          <td>$${option.price.toFixed(2)}</td>
        </tr>
      `;
    })
    .join('');
};

app.post('/send-email', async (req, res) => {
  const { email, firstName, lastName, companyName, taxId, phoneNumber, address, cartItems, totalAmount } = req.body;
  console.log('Request body:', req.body);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, 
    subject: `New Order from ${companyName}`,
    html: `
      <h1>New Order</h1>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Company Name:</strong> ${companyName}</p>
      <p><strong>Tax Id Number:</strong> ${taxId}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Shipping Address:</strong> ${address}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
      <h2>Items:</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Option</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${formatCartItems(cartItems)}
        </tbody>
      </table>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
    console.error('Error details:', error.message);
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
