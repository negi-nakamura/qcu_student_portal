import express from "express";
import pool from "../config/db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/calendar", authenticateToken, async (req, res) => {
	try {
		const { school_year, semester, event_type } = req.query;

		const currentYear = new Date().getFullYear();
		const defaultSchoolYear = `${currentYear - 1}-${currentYear}`;
		const selectedSchoolYear = school_year || defaultSchoolYear;

		const baseYear = parseInt(selectedSchoolYear.split("-")[0]);

		let uniQuery = `
			SELECT 
				id,
				title,
				semester,
				TO_CHAR(start_date, 'YYYY-MM-DD') AS start_date,
				TO_CHAR(end_date, 'YYYY-MM-DD') AS end_date,
				event_type,
				'University' AS source
			FROM university_calendar
			WHERE school_year = $1
		`;

		const values = [selectedSchoolYear];
		let index = 2;

		if (semester) {
			uniQuery += ` AND semester = $${index++}`;
			values.push(semester);
		}

		if (event_type) {
			uniQuery += ` AND event_type = $${index++}`;
			values.push(event_type);
		}

		const universityResult = await pool.query(uniQuery, values);

		const holidayQuery = `
			SELECT
				id,
				title,
				TO_CHAR(MAKE_DATE($1, month, day), 'YYYY-MM-DD') AS start_date,
				TO_CHAR(MAKE_DATE($1, month, day), 'YYYY-MM-DD') AS end_date,
				'holiday' AS event_type,
				'Holiday' AS source
			FROM holiday_calendar
		`;

		const holidayResult = await pool.query(holidayQuery, [baseYear]);

		const events = [...universityResult.rows, ...holidayResult.rows].sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

		res.json({
			school_year: selectedSchoolYear,
			total_events: events.length,
			events
		});

	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
