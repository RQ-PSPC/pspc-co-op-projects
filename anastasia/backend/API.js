import express from "express";
import { connect } from "./DatabaseConnection.js";

const router = express.Router();

router.get("/employee/:id", async (req, res) => {
    const client = await connect();

    console.log("Project requested:", req.params.projectName);

    if (!client) {
        return res.status(500).json({
            error: "Database connection failed"
        });
    }

    try {
        const employeeId = req.params.id;

        const result = await client.query(
            "SELECT * FROM employees WHERE id = $1",
            [employeeId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Query failed"
        });
    } finally {
        await client.end();
    }
});

router.get("/projects/:projectName", async (req, res) => {

    console.log("=== PROJECT ROUTE HIT ===");
    console.log("Project requested:", req.params.projectName);
    const client = await connect();

    if (!client) {
        return res.status(500).json({
            error: "Database connection failed"
        });
    }

    try {

        const result = await client.query(
            `
            SELECT sc.controlName
            FROM Project p
            JOIN ProjectSecurityControlStatus pscs
                ON p.projectID = pscs.projectID
            JOIN SecurityControl sc
                ON pscs.securityControlID = sc.securityControlID
            WHERE p.projectName = $1
            `,
            [req.params.projectName]
        );

        res.json({
            controls: result.rows.map(row => row.controlname)
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Query failed"
        });

    } finally {

        await client.end();

    }
});

export default router;