CREATE SCHEMA booking;

USE BOOKING;

CREATE USER booking_server IDENTIFIED BY 'password';

GRANT ALL ON booking TO booking_server;

CREATE TABLE users (
	id BIGINT NOT NULL,
    type SMALLINT NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(100),
    password_hash VARCHAR(100),
    salt VARCHAR(3),
    PRIMARY KEY (id)
) AUTO_INCREMENT = 35000; 