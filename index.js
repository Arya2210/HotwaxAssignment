const express = require('express');
const app = express();

const mysql = require("mysql2");

//const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log('Incoming Request Body:', req.body);
    next();
  });

app.get('/',async(req,res)=>{
      res.send('Hey there')
})

const db = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'Hbd@12345',
    database:'emp_database'
})
db.query(`SELECT * FROM person` , (err , result ,field)=>{
    console.log(err)
    console.log(result)
    console.log(field)
})
// console.log(db)

app.listen(3000,function(){
   
    console.log("app is listeinigngs")
})
// done
app.get('/1',(req,resp)=>{
    resp.json('hello there2');
})
app.get('/persons', (req, res) => {
    db.query('SELECT * FROM Person', (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
  
  // GET a specific person by PARTY_ID
//   done
  app.get('/persons/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Person WHERE PARTY_ID = ?', [id], (error, results) => {
      if (error) throw error;
      res.json(results[0]);
    });
  });
  
  // POST a new person
  app.post('/persons', (req, res) => {
    const person = req.body;
    db.query('INSERT INTO Person SET ?', person, (error, results) => {
      if (error) throw error;
      res.json({ id: results.insertId });
    });
  });
  
  // PUT update a person by PARTY_ID
  // done
  app.put('/persons/:id', (req, res) => {
    const { id } = req.params;
    const updatedPerson = req.body;
    db.query('UPDATE Person SET ? WHERE PARTY_ID = ?', [updatedPerson, id], (error) => {
      if (error) throw error;
      res.json({ message: 'Person updated successfully' });
    });
  });
  
  // DELETE a person by PARTY_ID
  app.delete('/persons/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Person WHERE PARTY_ID = ?', [id], (error) => {
      if (error) throw error;
      res.json({ message: 'Person deleted successfully' });
    });
  });

// //   ***************************************************************************************************


// // Sample Data
// let orders = [];

// Create Order API
app.post('/create-order', (req, res) => {
  const order = req.body;
  order.orderId = (Math.floor(Math.random() * 90000) + 10000).toString();
  order.grandTotal = 0; // Calculate grandTotal based on items (not specified in the input)
  orders.push(order);
  res.json({ orderId: order.orderId });
});

app.get('/orders', (req, res) => {
  db.query('SELECT * FROM Order_Header', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});


app.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Order_Header WHERE Order_ID = ?', [id], (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});


 // Get an order by ID
 app.get('/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  db.query('SELECT * FROM Order_Header WHERE ORDER_ID = ?', [orderId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new order
app.post('/orders', (req, res) => {
  const newOrder = req.body;
  db.query('INSERT INTO Order_Header SET ?', newOrder, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ orderId: result.insertId });
    }
  });
});


// Update an existing order
app.put('/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const updatedOrder = req.body;
  db.query('UPDATE Order_Header SET ? WHERE ORDER_ID = ?', [updatedOrder, orderId], (err) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Order updated successfully' });
    }
  });
});

// Delete an order
app.delete('/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  db.query('DELETE FROM Order_Header WHERE ORDER_ID = ?', [orderId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json({ message: 'Order deleted successfully' });
    }
  });
});


























// // Add Order Items API
// app.post('/add-order-items/:orderId', (req, res) => {
//   const orderId = req.params.orderId;
//   const orderItems = req.body.item_details;

//   const order = orders.find((o) => o.orderId === orderId);

//   if (!order) {
//     res.status(404).json({ error: 'Order not found' });
//     return;
//   }

//   orderItems.forEach((item) => {
//     item.orderItemSeqId = (Math.floor(Math.random() * 90000) + 10000).toString();
//   });

//   order.order_parts.push({
//     orderPartSeqId: (Math.floor(Math.random() * 90000) + 10000).toString(),
//     item_details: orderItems,
//   });

//   res.json({ orderId, orderPartSeqId: order.order_parts[order.order_parts.length - 1].orderPartSeqId });
// });

// // Get all Orders API
// app.get('/get-all-orders', (req, res) => {
//   res.json({ orders });
// });

// // Get an Order API
// app.get('/get-order/:orderId', (req, res) => {
//   const orderId = req.params.orderId;
//   const order = orders.find((o) => o.orderId === orderId);

//   if (!order) {
//     res.status(404).json({ error: 'Order not found' });
//     return;
//   }

//   res.json(order);
// });

// // Update Order API
// app.put('/update-order/:orderId', (req, res) => {
//   const orderId = req.params.orderId;
//   const updatedOrderName = req.body.orderName;

//   const order = orders.find((o) => o.orderId === orderId);

//   if (!order) {
//     res.status(404).json({ error: 'Order not found' });
//     return;
//   }

//   order.orderName = updatedOrderName;

//   res.json(order);
// });







// //   // POST a new person (assuming partyId is provided and exists in the party table)
// //   app.post('/persons', (req, res) => {
// //     const person = req.body;
  
// //     // Validate that person.PARTY_ID exists in the party table before inserting
// //     // ...
  
// //     db.query('INSERT INTO Person SET ?', person, (error, results) => {
// //       if (error) throw error;
// //       res.json({ id: results.insertId });
// //     });
// //   });
  
// //   // PUT update a person by PARTY_ID (assuming partyId is provided and exists in the party table)
// //   app.put('/persons/:id', (req, res) => {
// //     const { id } = req.params;
// //     const updatedPerson = req.body;
  
// //     // Validate that updatedPerson.PARTY_ID exists in the party table before updating
// //     // ...
  
// //     db.query('UPDATE Person SET ? WHERE PARTY_ID = ?', [updatedPerson, id], (error) => {
// //       if (error) throw error;
// //       res.json({ message: 'Person updated successfully' });
// //     });
// //   });
  
// //   // DELETE a person by PARTY_ID
// //   app.delete('/persons/:id', (req, res) => {
// //     const { id } = req.params;
// //     db.query('DELETE FROM Person WHERE PARTY_ID = ?', [id], (error) => {
// //       if (error) throw error;
// //       res.json({ message: 'Person deleted successfully' });
// //     });
// //   });
  
// //   // Sample Data
// //   let orders = [];
  
// //   // Create Order API
// //   app.post('/create-order', (req, res) => {
// //     const order = req.body;
// //     order.orderId = (Math.floor(Math.random() * 90000) + 10000).toString();
// //     order.grandTotal = 0; // Calculate grandTotal based on items (not specified in the input)
// //     orders.push(order);
// //     res.json({ orderId: order.orderId });
// //   });
  
// //   // Add Order Items API
// //   app.post('/add-order-items/:orderId', (req, res) => {
// //     const orderId = req.params.orderId;
// //     const orderItems = req.body.item_details;
  
// //     const order = orders.find((o) => o.orderId === orderId);
  
// //     if (!order) {
// //       res.status(404).json({ error: 'Order not found' });
// //       return;
// //     }
  
// //     orderItems.forEach((item) => {
// //       item.orderItemSeqId = (Math.floor(Math.random() * 90000) + 10000).toString();
// //     });
  
// //     order.order_parts.push({
// //       orderPartSeqId: (Math.floor(Math.random() * 90000) + 10000).toString(),
// //       item_details: orderItems,
// //     });
  
// //     res.json({ orderId, orderPartSeqId: order.order_parts[order.order_parts.length - 1].orderPartSeqId });
// //   });
  
// //   // Get all Orders API
// //   app.get('/get-all-orders', (req, res) => {
// //     res.json({ orders });
// //   });
  
// //   // Get an Order API
// //   app.get('/get-order/:orderId', (req, res) => {
// //     const orderId = req.params.orderId;
// //     const order = orders.find((o) => o.orderId === orderId);
  
// //     if (!order) {
// //       res.status(404).json({ error: 'Order not found' });
// //       return;
// //     }
  
// //     res.json(order);
// //   });
  
// //   // Update Order API
// //   app.put('/update-order/:orderId', (req, res) => {
// //     const orderId = req.params.orderId;
// //     const updatedOrderName = req.body.orderName;
  
// //     const order = orders.find((o) => o.orderId === orderId);
  
// //     if (!order) {
// //       res.status(404).json({ error: 'Order not found' });
// //       return;
// //     }
  
// //     order.orderName = updatedOrderName;
  
// //     res.json(order);
// //   });






