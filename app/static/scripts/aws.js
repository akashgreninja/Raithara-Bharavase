const mysql = require('mysql');

// AWS RDS MySQL database configuration
const dbConfig = {
  host: 'farmer-thingy.your-region.rds.amazonaws.com',
  user: 'greninjamaster67',
  password: 'reducto',
  database: 'farmer-map-thing'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Perform a sample query
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }

  // Sample query
  const query = 'SELECT * FROM your_table_name';

  // Execute the query
  connection.query(query, (err, results) => {
    connection.release(); // Release the connection

    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    console.log('Query results:', results);
  });
});

export default pool;