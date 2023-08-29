CREATE DATABASE nost_studio;
USE nost_studio;

CREATE OR REPLACE TABLE products(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name_product VARCHAR(32) NOT NULL,
	image VARCHAR(100) NOT NULL,
	price INT NOT NULL,
	stock INT NOT NULL,
	completeness TEXT NOT NULL,
	description VARCHAR(255) NOT NULL
	);

CREATE OR REPLACE TABLE users(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(25) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(25) NOT NULL,
	role VARCHAR (5),
	address VARCHAR (100),
	phone_number CHAR(13)
);



CREATE OR REPLACE TABLE sales(
	sales_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	product_id INT NOT NULL,
	user_id INT NOT NULL,
	date DATETIME, 
	qty INT,
	
	 CONSTRAINT fk_sales1 FOREIGN KEY  (product_id) REFERENCES products (id),
	 CONSTRAINT fk_sales2 FOREIGN KEY  (user_id) REFERENCES users (id)
);


DELIMITER $$
CREATE OR REPLACE TRIGGER kurang_stok
AFTER INSERT
ON sales
	FOR EACH ROW BEGIN
		UPDATE products SET stock = stock - qty WHERE product_id = id;
	END;
$$


INSERT INTO products VALUES 
(default,'Sony WM-F1','https://walkman.land/pics/model/sony/wm-f1/_feat.jpg',195000,2,'Walkman only','Kondisinya masih mulus'),
(default,'Sanyo JJ-P60','https://walkman.land/pics/model/sanyo/jj-p60/_feat.jpg',202000,2,'Walkman only','Kondisinya masih mulus'),
(default,'Sony WM-RX77','https://walkman.land/pics/model/sony/wm-rx77/_feat.jpg',189000,2,'Walkman only','Kondisinya masih mulus'),
(default,'Philips AQ6408','https://walkman.land/pics/model/philips/aq6408/_feat.jpg',330000,2,'Walkman only','Kondisinya masih mulus'),
(default,'Toshiba KT-V890','https://walkman.land/pics/model/toshiba/kt-v890/_feat.jpg',250000,2,'Walkman only','Kondisinya masih mulus'),
(default,'Sony WM-BF40','https://walkman.land/pics/model/sony/wm-bf40/_feat.jpg',228000,2,'Walkman only','Kondisinya masih mulus')


INSERT INTO users VALUES 
(default, 'Maulina','maulina@gmail.com','maulina','admin','Jalan Cikapundung No 23 Bandung','085723730363')

