import React from "react";

const reportData = [
  {
    title: "1st Year Final Grade Report for S.Y. 2025-2026",
    course: "Bachelor of Science in Information and Technology",
    campus: "Batasan Hills, Quezon City",
    yearLevel: "1st Year (Freshman)",
    dateSubmitted: "Friday | January 10, 2026 | 09:30 AM",
    schoolYear: "2025 - 2026",
    semester: "1st (Finals)",
    grades: [
      {
        description: "Fundamentals of Programming",
        code: "CC 102",
        unit: 3,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Olayson, Joel M.",
      },
      {
        description: "Introduction to Computing",
        code: "CC 101",
        unit: 3,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Carlo, Romero A.",
      },
      {
        description: "National Service Training Program 1",
        code: "NSTP 1",
        unit: 3,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Junio, Alvin B.",
      },
      {
        description: "Physical Activities Towards Health and Fitness 1",
        code: "PATHFIT 1",
        unit: 2,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Vinluan, Anthony R.",
      },
      {
        description: "The Contemporary World",
        code: "SOCSCI 1",
        unit: 3,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Suyat, Arcadil C.",
      },
      {
        description: "The Life and Works of Rizal",
        code: "RIZAL",
        unit: 3,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Cruz, Raymond L.",
      },
      {
        description: "Web Systems and Technologies 1",
        code: "WS 101",
        unit: 3,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Cagolilan, Noel C.",
      },
    ],
    totalUnits: 23,
    gwa: 1.5,
    overallRemarks: "PASSED",
  },
  {
    title: "1st Year Midterm Grade Report for S.Y. 2025-2026",
    course: "Bachelor of Science in Information and Technology",
    campus: "Batasan Hills, Quezon City",
    yearLevel: "1st Year (Freshman)",
    dateSubmitted: "Friday | January 10, 2026 | 09:30 AM",
    schoolYear: "2025 - 2026",
    semester: "1st (Midterm)",
    grades: [
      {
        description: "Fundamentals of Programming",
        code: "CC 102",
        unit: 3,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Olayson, Joel M.",
      },
      {
        description: "Introduction to Computing",
        code: "CC 101",
        unit: 3,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Carlo, Romero A.",
      },
      {
        description: "National Service Training Program 1",
        code: "NSTP 1",
        unit: 3,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Junio, Alvin B.",
      },
      {
        description: "Physical Activities Towards Health and Fitness 1",
        code: "PATHFIT 1",
        unit: 2,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Vinluan, Anthony R.",
      },
      {
        description: "The Contemporary World",
        code: "SOCSCI 1",
        unit: 3,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Suyat, Arcadil C.",
      },
      {
        description: "The Life and Works of Rizal",
        code: "RIZAL",
        unit: 3,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Cruz, Raymond L.",
      },
      {
        description: "Web Systems and Technologies 1",
        code: "WS 101",
        unit: 3,
        grade: 1.5,
        remarks: "PASSED",
        professor: "Cagolilan, Noel C.",
      },
    ],
    totalUnits: 23,
    gwa: 1.5,
    overallRemarks: "PASSED",
  },
];

function Grades() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-12 text-gray-900">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M9 12h6M9 16h6M8 20h8a2 2 0 002-2v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5a2 2 0 002 2zM6 12h.01M6 16h.01" />
        </svg>
        Grade Report Card
      </h1>

      {reportData.map((report, idx) => (
        <div key={idx} className="mb-10 bg-white rounded-md shadow-lg p-6">
          <div className="bg-blue-900 text-white px-4 py-2 rounded-t-md mb-4 md:grid md:grid-cols-3 md:gap-x-6 md:text-sm">
            <div>
              <p><span className="font-semibold">Course:</span> {report.course}</p>
              <p><span className="font-semibold">Campus:</span> {report.campus}</p>
              <p><span className="font-semibold">Year Level:</span> {report.yearLevel}</p>
            </div>
            <div>
              <p><span className="font-semibold">Date Submitted:</span> {report.dateSubmitted}</p>
              <p><span className="font-semibold">School Year:</span> {report.schoolYear}</p>
            </div>
            <div>
              <p><span className="font-semibold">Semester:</span> {report.semester}</p>
            </div>
          </div>

          <table className="w-full text-left border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                {["DESCRIPTION", "CODE", "UNIT", "GRADE", "REMARKS", "PROFESSOR"].map((header) => (
                  <th
                    key={header}
                    className="border border-gray-300 py-2 px-3 text-xs font-semibold text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {report.grades.map((grade, idx2) => (
                <tr
                  key={idx2}
                  className={idx2 % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 py-2 px-3 text-xs">{grade.description}</td>
                  <td className="border border-gray-300 py-2 px-3 text-xs">{grade.code}</td>
                  <td className="border border-gray-300 py-2 px-3 text-xs text-center">{grade.unit}</td>
                  <td className="border border-gray-300 py-2 px-3 text-xs text-center">{grade.grade}</td>
                  <td className="border border-gray-300 py-2 px-3 text-xs text-center text-green-700 font-semibold">{grade.remarks}</td>
                  <td className="border border-gray-300 py-2 px-3 text-xs">{grade.professor}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-semibold text-xs text-gray-900">
                <td colSpan={2} className="px-3 py-2 border border-gray-300">Total Units:</td>
                <td className="text-center border border-gray-300 py-2">{report.totalUnits}</td>
                <td className="text-center border border-gray-300 py-2">General Weighted Average: {report.gwa}</td>
                <td className="text-center border border-gray-300 py-2" colSpan={2}>
                  Remarks: {report.overallRemarks}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 bg-yellow-100 border border-yellow-300 rounded px-4 py-3 text-xs text-yellow-900">
            <strong>IMPORTANT NOTES:</strong> NO CHANGES OF GRADES SHALL BE MADE UNLESS APPROVED BY THE COLLEGE DEPARTMENT CHAIR,
            VPO AND VPAA. NATIONAL SERVICE TRAINING PROGRAM IS NOT INCLUDED IN THE COMPUTATION OF GWA.
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => alert("Preview feature coming soon!")}
              className="flex items-center gap-1 border border-gray-600 rounded px-4 py-1.5 text-gray-700 hover:bg-gray-100 cursor-pointer select-none"
              type="button"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16l-4-4 4-4" />
              </svg>
              Preview
            </button>
            <button
              onClick={() => alert("Download Grades feature coming soon!")}
              className="flex items-center gap-1 bg-blue-700 text-white rounded px-4 py-1.5 hover:bg-blue-800 cursor-pointer select-none"
              type="button"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M12 5v14" />
                <path d="M5 12l7 7 7-7" />
              </svg>
              Download Grades
            </button>
          </div>
        </div>
      ))}

      <footer className="text-center text-xs text-gray-500 mt-12">
        © 2026 Quezon City University. All rights reserved.
      </footer>
    </div>
  );
}

export default Grades;