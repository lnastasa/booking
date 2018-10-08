CREATE SCHEMA booking;

USE BOOKING;

CREATE USER booking_server IDENTIFIED BY 'password';

GRANT ALL ON booking TO booking_server;

