DROP SCHEMA booking;
CREATE SCHEMA booking;

USE BOOKING;

DROP USER IF EXISTS 'booking_server'@'localhost';
CREATE USER 'booking_server'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON *.* TO 'booking_server'@'localhost';

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id BIGINT NOT NULL AUTO_INCREMENT,
    type VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password_hash VARCHAR(100),
    salt VARCHAR(3),
    PRIMARY KEY (id)
) AUTO_INCREMENT = 35000; 