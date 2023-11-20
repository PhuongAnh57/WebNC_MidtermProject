DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
	user_id INT PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 100 ) NOT NULL,
	first_name VARCHAR ( 50 )  NOT NULL,
	last_name VARCHAR ( 50 )  NOT NULL,
	gender VARCHAR ( 5 ),
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	day_of_birth date,
	address VARCHAR ( 255 )
);