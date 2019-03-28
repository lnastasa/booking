DROP SCHEMA booking;
CREATE SCHEMA booking;
USE booking;

DROP USER IF EXISTS 'booking_server'@'localhost';
CREATE USER 'booking_server'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL ON *.* TO 'booking_server'@'localhost';

DROP USER IF EXISTS 'booking_server'@'172.17.0.1';
CREATE USER 'booking_server'@'172.17.0.1' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL ON *.* TO 'booking_server'@'172.17.0.1';

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS childs;
DROP TABLE IF EXISTS guardians;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS child_class;

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

CREATE TABLE `guardians` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `child_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE `classes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `teacher_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `child_class` (
  `child_id` bigint(20) NOT NULL,
  `class_id` bigint(20) NOT NULL,
  PRIMARY KEY (`child_id`,`class_id`)
); 

CREATE TABLE `attendance_report` (
  `id` bigint(20) NOT NULL  AUTO_INCREMENT,
  `class_id` bigint(20) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  PRIMARY KEY (`id`,`class_id`,`timestamp`)
); 

CREATE TABLE `attendance_report_child` (
  `attendance_report_id` bigint(20) NOT NULL,
  `child_id` bigint(20) NOT NULL,
  `present` tinyint(1) NOT NULL,
  PRIMARY KEY (`attendance_report_id`,`child_id`)
); 

CREATE TABLE `dismissal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `child_id` bigint(20) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `guardian_id` bigint(20),
  PRIMARY KEY (`id`)
);    
