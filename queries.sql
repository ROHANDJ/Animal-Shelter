CREATE TABLE USERS(
    id SERIAL PRIMARY KEY,
    name VHARCHAR(30) NOT NULL,
    phone BIGINT(10) NOT NULL UNIQUE,
    email VHARCHAR(30) NOT NULL UNIQUE,
    password VHARCHAR(30) NOT NULL
);

CREATE TABLE DOG

INSERT INTO users(name,phone,email,password) VALUES ('reyaan',8826389434,'reyaan007@gmail.com','theboys@123');
INSERT INTO users(name,phone,email,password) VALUES ('Rohan DJ',7676333078,'rohandj@gmail.com','rohan');

-- CREATE ANIMALS TABLE --

CREATE TABLE ANIMALS(
   animal_id SERIAL PRIMARY KEY,
   name VARCHAR(20) NOT NULL,
   type VARCHAR(10) NOT NULL,
   user_id INTEGER REFERENCES users(id);
);

-- ADD ANIMAL TO DATABASE --

INSERT INTO ANIMALS VALUES(name,type,user_id) VALUES ($1,$2,$3), [];

-- CREATE ADOPTED ANIMALS TABLE -- 

CREATE TABLE ADOPTED_ANIMALS(
   owner_user_id INTEGER REFERENCES users(id),
   animal_id INTEGER REFERENCES ANIMALS(animal_id),
   adopter_user_id INTEGER REFERENCES users(user_id)
);

-- EMPLOYEE TABLE --

CREATE TABLE EMPLOYEE(
    E_ID SERIAL PRIMARY KEY,
    E_NAME VARCHAR(20),
    E_PHONE BIGINT(10) NOT NULL UNIQUE
);

-- DOCTOR CREATE TABLE --

CREATE TABLE DOCTOR(
   D_ID SERIAL PRIMARY KEY,
   D_NAME VARCHAR(20),
   D_PHONE BIGINT(10) NOT NULL UNIQUE
);