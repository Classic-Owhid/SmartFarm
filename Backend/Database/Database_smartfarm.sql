use SmartFarm;

CREATE TABLE Customer (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    Address VARCHAR(255),
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL
);

select * from Customer;

CREATE TABLE cropinfo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cropname VARCHAR(200) NOT NULL,
    season_to_plant VARCHAR(200) NOT NULL,
    image_paths JSON NOT NULL,                 -- store 3 images in one column as JSON
    howtogrow TEXT NOT NULL,
    advantage TEXT NOT NULL,
    harvest_time VARCHAR(200) NOT NULL,
    expected_market_income VARCHAR(200) NOT NULL
);

ALTER TABLE cropinfo
ADD COLUMN created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;


select * from cropinfo;

	CREATE TABLE fertilizerdetails (
		id INT AUTO_INCREMENT PRIMARY KEY,
		fertilizername VARCHAR(200) NOT NULL,
		when_to_use VARCHAR(200) NOT NULL,
		usage_guide TEXT NOT NULL,
		advantages TEXT NOT NULL
	);
    
    
    ALTER TABLE fertilizerdetails
ADD COLUMN created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;


select * from fertilizerdetails;


CREATE TABLE diseaseinfo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    cure TEXT,
    symptoms TEXT
);

ALTER TABLE diseaseinfo
ADD COLUMN created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;


select * from diseaseinfo;



CREATE TABLE Admin (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL
);
insert into admin(email,password) values('md12owhid@gmail.com',"1234567");

select * from admin;



    
    
    
    
ALTER TABLE cropinfo
ADD COLUMN AdminID INT NOT NULL DEFAULT 1;
select *from cropinfo;

ALTER TABLE cropinfo
ADD FOREIGN KEY (AdminID)
REFERENCES Admin(AdminID);







ALTER TABLE fertilizerdetails
ADD COLUMN AdminID INT NOT NULL DEFAULT 1;
select *from fertilizerdetails;

ALTER TABLE fertilizerdetails
ADD FOREIGN KEY (AdminID)
REFERENCES Admin(AdminID);


ALTER TABLE diseaseinfo
ADD COLUMN AdminID INT NOT NULL DEFAULT 1;

ALTER TABLE diseaseinfo
ADD FOREIGN KEY (AdminID)
REFERENCES Admin(AdminID);
select *from diseaseinfo;










