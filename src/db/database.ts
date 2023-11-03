import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'recipes_db'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default connection;
