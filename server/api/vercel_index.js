const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env.local') });
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const twilio = require('twilio');

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

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

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

const formatCartItemsForSMS = (items) => {
  return Object.entries(items)
    .map(([itemId, itemData]) => {
      const { productName, optionName, option, quantity } = itemData;
      return `${productName} - Option: ${optionName} - Quantity: ${quantity} - Price: $${option.price.toFixed(2)}`;
    })
    .join('\n');
};

async function sendSMS(to, message) {
  try {
    const result = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: to,
    });
    console.log('SMS sent successfully:', result);
  } catch (error) {
    console.error('Failed to send SMS:', error.message);
  }
}

app.post('/send-email', async (req, res) => {
  const { email, firstName, lastName, companyName, taxId, phoneNumber, address, cartItems, totalAmount } = req.body;
  console.log('Request body:', req.body);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${email}, admon2118@gmail.com`, 
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
    const smsMessage = `
    New Order
    Name: ${firstName} ${lastName}
    Company: ${companyName}
    Tax Id Number: ${taxId}
    Phone Number: ${phoneNumber}
    Shipping Address: ${address}
    Email: ${email}
    Total Amount: $${totalAmount.toFixed(2)}
    Items:
    ${formatCartItemsForSMS(cartItems)}
    `;
        sendSMS('+12487945509', smsMessage);
        sendSMS('+12484390211', smsMessage);
        sendSMS('+18003793133', smsMessage);
      } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).send('Failed to send email');
      }
    });
    
    
    const PORT = process.env.VERCEL_REGION || 3001;

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    
