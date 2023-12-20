import  express  from "express";
// const midtransClient = import ('midtrans-client');
import midtransClient from 'midtrans-client';
import axios from "axios";




const app = express();
const port = 5000;



let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-6ymOtGFFKlOSW89CYdAsBPMf',
  clientKey: 'SB-Mid-client-AtOW9oZnfrdt7kFT'
});



// Handle request to get products
export const getProducts = ('/products', async (req, res) => {
  try {
    const [results] = await Products.findAll('SELECT * FROM products');

    res.json(results);  
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const placeOrder = async (orderId, productName, productId, price, image) => {
  const query = `
    INSERT INTO Orders (OrderID, ProductName, ProductID, Price, Image)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [orderId, productName, productId, price, image];

  try {
    await pool.query(query, values);
    console.log('Order placed successfully!');
  } catch (err) {
    console.error('Error placing order:', err);
  }
};

export const postTransaksi = ('/get-payment-token', async (req, res) => {
  const { orderId, price } = req.body;

  try {
      // Konversi price ke format angka jika diperlukan
      const grossAmount = parseFloat(price);

      const parameter = {
          "transaction_details": {
              "order_id": orderId,
              "gross_amount": price
          },
          "credit_card": {
              "secure": true
          }
      };

      const transaction = await snap.createTransaction(parameter);

      // Mendapatkan transaction token
      const transactionToken = transaction.token;
      console.log('transactionToken:', transactionToken);

      res.json({ token: transactionToken });
  } catch (error) {
      console.error('Error creating payment token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to place an order (HTTP POST)
export const postOrder = ('/api/placeOrder', (req, res) => {
  const { OrderId, productName, productID, price, image } = req.body;

  // Save the order to the Orders table
  placeOrder(OrderId, productName, productID, price, image);

  // Send the response to the frontend
  res.status(200).json({ message: 'Order placed successfully!' });
});

// Handle HTTP GET requests to /api/placeOrder
export const getOrder = ('/api/placeOrder', async (req, res) => {
  try {
    // Retrieve orders from the Orders table
    const [results] = await pool.query('SELECT * FROM Orders');
    res.json(results);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const listen = (port, () => {
  console.log(`Server is running on port ${port}`);
});

