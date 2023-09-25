const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Creating a MySQL database connection:
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_management',
});

db.connect((err) => {
    if (err) {
        console.error("Database connection error", err)
    } else {
        console.log("Connected to database");
    }
});
app.use('/home', (req, res) => {
    res.json("Hi this is done");
});

app.post('/submit-employee', (req, res) => {
    const { firstName, lastName, contactNo, email, dob, address, id } = req.body;

    const sql = 'INSERT INTO employees (first_name, last_name, contact_no, email, dob, address, emp_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [firstName, lastName, contactNo, email, dob, address, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data: ', err)
            res.status(500).json({ message: 'Error inserting data' })
        } else {
            console.log("Data inserted successfully");
            res.status(200).json({ message: 'Data inserted successfully' })
        }
    });
});

app.get('/get-all-employees', (req, res) => {
   
    const sql = 'SELECT * FROM employees';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data: ', err);
            res.status(500).json({ message: 'Error fetching data' });
        } else {
            res.status(200).json(results);
        }
    });
});
app.put('/update-employee/:id', (req, res) => {
    const { firstName, lastName, contactNo, email, dob, address } = req.body;
    const { id } = req.params;
  
    const sql = 'UPDATE employees SET first_name=?, last_name=?, contact_no=?, email=?, dob=?, address=? WHERE emp_id=?';
    const values = [firstName, lastName, contactNo, email, dob, address, id];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating data: ', err);
        res.status(500).json({ message: 'Error updating data' });
      } else {
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
      }
    });
  });
  app.delete('/delete-employee/:id', (req, res) => {
    const { id } = req.params;
    
    const sql = 'DELETE FROM employees WHERE emp_id = ?';
    
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting data: ', err);
        res.status(500).json({ message: 'Error deleting data' });
      } else {
        console.log('Data deleted successfully');
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });
  
  app.post('/login', (req, res) => {
    const { UserName, Password } = req.body;
    
    const sql = 'SELECT * FROM employees WHERE first_name = ? AND dob = ?';
    const values = [UserName, Password];
    console.log(values);
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error checking credentials: ', err);
        res.status(500).json({ message: 'Error checking credentials' });
      } else {
        console.log(results);
        if (results.length > 0) {
         
          const token = jwt.sign({ username: UserName }, secretKey, { expiresIn: '1h' }); 
  
          res.json({ message: 'Login successful', token });
        } else {
          res.status(401).json({ message: 'Login unsuccessful. Wrong username or password' });
        }
      }
    });
  });
  
  app.post('/get-user-info', (req, res) => {
    const { username, dob } = req.body;
  
    const sql = 'SELECT * FROM employees WHERE first_name = ? AND dob = ?';
    const values = [username, dob];
    console.log(values);
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error fetching user data: ', err);
        res.status(500).json({ message: 'Error fetching user data' });
      } else {
        if (results.length > 0) {
          // User found, send user data
          const user = results[0];
          console.log(user);
          res.status(200).json(user);
        } else {
          // User not found
          res.status(404).json({ message: 'User not found' });
        }
      }
    });
  });
  

  
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
