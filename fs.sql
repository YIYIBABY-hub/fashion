SET NAMES UTF8;
DROP DATABASE IF EXISTS fs;
CREATE DATABASE fs CHARSET=UTF8;
USE fs;
CREATE TABLE fs_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	phone CHAR(11) NOT NULL UNIQUE,
	password VARCHAR(16) NOT NULL,
	uname VARCHAR(32),
	gender BOOL DEFAULT 0,
	email VARCHAR(16),
	birthday VARCHAR(10),
	reg_time VARCHAR(16) NOT NULL
);
INSERT INTO fs_user VALUES
('1','13513636547','123456','张总','0','zz@126.com','1974-4-4','0000-00-00 00:00'),
('2','13516895566','123456','林静','1','11@dd.com','1988-08-03','2020-08-14 06:20'),
('3','13111111111','123456','张得','0','zz@qq.com','1999-9-4','2020-09-01 13:04');
CREATE TABLE fs_user_add(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	user_name VARCHAR(32),
	district VARCHAR(8),
	detail VARCHAR(128),
	add_phone VARCHAR(16),
	phone CHAR(11),
	FOREIGN KEY (phone) REFERENCES fs_user(phone)
);
INSERT INTO fs_user_add VALUES
('1','张总','海淀区','跑跑路哈哈哈哈小区1号楼3单元6666','13513636547','13513636547'),
('2','张总','海淀区','银行号或或或或或大厦6651','13513636547','13513636547'),
('3','张总','海淀区','广发基金小区1号楼3单元6666','011-86565555','13513636547');