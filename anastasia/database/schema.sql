

-- The following relations are in this database
/*
	Project
	ProjectSecurityControlStatus
	SecurityControl
	Users
*/


-- Insertion of tables --


-- Users
CREATE TABLE Users (
	userID INT PRIMARY KEY,
	firstName VARCHAR,
	lastName VARCHAR,
	email VARCHAR
    );

-- Project
CREATE TABLE Project (
	projectID INT PRIMARY KEY,
	projectName VARCHAR,
	userID INT NOT NULL,
	
	FOREIGN KEY (userID) REFERENCES Users(userID)
	);
	
-- Security Control
CREATE TABLE SecurityControl (
	securityControlID VARCHAR PRIMARY KEY,
	controlName VARCHAR);

-- ProjectSecurityControlStatus
CREATE TABLE ProjectSecurityControlStatus (
	projectID INT,
	securityControlID VARCHAR,
	controlStatus VARCHAR NOT NULL,
	
	PRIMARY KEY (projectID, securityControlID),
	
	FOREIGN KEY (projectID) REFERENCES Project(projectID),
	
	FOREIGN KEY (securityControlID) REFERENCES SecurityControl(securityControlID),

	CHECK (
		controlStatus IN (
			'Not Met',
			'Partially Met',
			'Met')
			)
    );

