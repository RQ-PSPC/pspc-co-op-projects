import { Router } from "express";
import { connect } from "./backend/DatabaseConnection.js";

const router = Router();

router.get("/projects/:projectName", async (req, res) => {

  const client = await connect();

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
      controls: result.rows.map(
        (row: any) => row.controlname
      )
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Database query failed"
    });

  } finally {

    await client.end();

  }
});

export default router;