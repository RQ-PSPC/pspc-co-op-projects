
-- Select Views --

--SELECT * FROM viewProjectUsers; -- Displays project users
--SELECT * FROM viewSCStatusPerProject; -- Per project, see the control statuses
--SELECT * FROM Users; -- Users table
--SELECT * FROM Project; -- Project table
--SELECT * FROM SecurityControl; -- Security Controls table
--SELECT * FROM ProjectSecurityControlStatus; -- Status of security controls


-- The select views are in the database
/*
    viewProjectUsers
    viewSCStatusPerProject
*/


-- Creation of views --


-- What users own what projects

CREATE VIEW viewProjectUsers AS
	SELECT
		p.projectID,
		p.projectName,
		u.firstName,
		u.lastName

	FROM Project p

	JOIN Users u ON p.userID = u.userID;

-- Per project, display security control status

CREATE VIEW viewSCStatusPerProject AS
	SELECT
		p.projectName,
		sc.securityControlID,
		pscs.controlStatus

	FROM ProjectSecurityControlStatus pscs

	JOIN Project p ON p.projectID = pscs.projectID

	JOIN SecurityControl sc ON sc.securityControlID = pscs.securityControlID;

