import pg from 'pg'; // PostgreSQL library (PG)

const { Client } = pg; // Get the Client class from pg, client creates database connections

export async function connect() {
    
    try {
        const client = new Client({ // Create a new PG client with the following connection info
            host: 'localhost',
            port: 5432,
            database: 'rap',
            user: 'anastasia',
            password: 'a'
        });

        await client.connect(); // Await pauses execution until the client connects to the database

        console.log('Database is connected!');

        return client; // return client so that it can be used to execute SQL queries

    } catch (error) {

        console.log('Connection failure');
        console.log ("Error message: ", error.message);
        console.error(error);

        return null;
    }
}