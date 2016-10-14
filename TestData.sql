CREATE DATABASE TestData;

CREATE TABLE Status(
	StatusId INT NOT NULL IDENTITY PRIMARY KEY,
	Status VARCHAR (55) NOT NULL
);

CREATE TABLE Samples(
	SampleId INT IDENTITY(1,1) PRIMARY KEY,
	Barcode VARCHAR (55) NOT NULL,
	CreatedBy INT NULL,
	StatusId INT NOT NULL
);

CREATE TABLE Users(
	UserId INT IDENTITY(1,1) PRIMARY KEY,
	FirstName VARCHAR (55) NOT NULL,
	LastName VARCHAR (55) NOT NULL
);

INSERT INTO Samples(
	Barcode, CreatedBy, StatusId
)VALUES
(1234567684339,1,1),
(1234563453499,2,1),
(0123453466623,3,0),
(8000149505001,4,3),
(1234567890128,5,2),
(2346234239874,6,2),
(2346234239855,7,1),
(2346234233344,8,0),
(2346234211221,9,3);


INSERT INTO Users(
FirstName,LastName
)VALUES
('Kristine','Butler'),
('Alfred','McKenzie'),
('Cora','Hunt'),
('Brad','Huff'),
('Dewey','McDonald'),
('Orlando','Holt'),
('Clint','Reid'),
('Kim','Mullins'),
('Blanche','Mack'),
('Dwayne','Pena');

INSERT INTO Status(
	Status
)VALUES
('Received'),
('Accessioning'),
('In Lab'),
('Report Generation');
