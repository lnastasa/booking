DROP SCHEMA booking;
CREATE SCHEMA booking;


DROP USER IF EXISTS 'booking_server'@'localhost';
CREATE USER 'booking_server'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON *.* TO 'booking_server'@'localhost';

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS childs;

CREATE TABLE users (
	id BIGINT NOT NULL AUTO_INCREMENT,
    type VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phoneNumber VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    salt VARCHAR(3) NOT NULL,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 35000; 

CREATE TABLE childs (
	id BIGINT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    date_of_birth BIGINT NOT NULL,
    parent_id BIGINT NOT NULL,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 42000;