import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subMonths,
  addMonths,
  isSameMonth,
  isSameDay,
  parseISO,
  isWithinInterval,
  isBefore,
  isAfter,
} from "date-fns";

const academicYear = "2025–2026";
const semesterLabel = "2nd Semester";
const semesterStart = new Date(2026, 0, 12);
const semesterEnd = new Date(2026, 4, 26);

const initialEvents = [
  { id: 1, title: "New Years Eve", startDate: "2026-01-01", endDate: "2026-01-01" },
  { id: 2, title: "Enrollment Period", startDate: "2026-01-05", endDate: "2026-01-09" },
  { id: 3, title: "Start of Classes", startDate: "2026-01-12", endDate: "2026-01-12" },
];

function UniversityCalendar() {
  const today = new Date();

  const initialMonth =
    isWithinInterval(today, { start: semesterStart, end: semesterEnd })
      ? today
      : semesterStart;

  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState(today);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const eventsThisMonth = initialEvents.filter((event) => {
    const start = parseISO(event.startDate);
    const end = parseISO(event.endDate);
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return (
      isWithinInterval(start, { start: monthStart, end: monthEnd }) ||
      isWithinInterval(end, { start: monthStart, end: monthEnd }) ||
      (isBefore(start, monthStart) && isAfter(end, monthEnd))
    );
  });

  const eventDays = new Set();
  initialEvents.forEach((event) => {
    let dt = parseISO(event.startDate);
    const endDt = parseISO(event.endDate);
    while (dt <= endDt) {
      if (
        dt.getMonth() === currentMonth.getMonth() &&
        dt.getFullYear() === currentMonth.getFullYear()
      ) {
        eventDays.add(dt.getDate());
      }
      dt = addDays(dt, 1);
    }
  });

  const handlePrevMonth = () => {
    const prev = subMonths(currentMonth, 1);
    if (!isBefore(prev, startOfMonth(semesterStart))) {
      setCurrentMonth(prev);
    }
  };

  const handleNextMonth = () => {
    const next = addMonths(currentMonth, 1);
    if (!isAfter(next, endOfMonth(semesterEnd))) {
      setCurrentMonth(next);
    }
  };

  const formatEventDateRange = (start, end) => {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    if (start === end) return format(startDate, "MMMM dd");
    return `${format(startDate, "MMMM dd")} - ${format(endDate, "dd")}`;
  };

  const downloadICS = () => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//QCU Student Portal//Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

    eventsThisMonth.forEach((event) => {
      const dtStart = format(parseISO(event.startDate), "yyyyMMdd");
      const dtEnd = format(addDays(parseISO(event.endDate), 1), "yyyyMMdd");
      icsContent += `BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART;VALUE=DATE:${dtStart}
DTEND;VALUE=DATE:${dtEnd}
END:VEVENT
`;
    });

    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `qcu_calendar_${format(currentMonth, "yyyy_MM")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4 pt-3 px-5">
      <button
        onClick={handlePrevMonth}
        aria-label="Previous Month"
        disabled={isBefore(subMonths(currentMonth, 1), startOfMonth(semesterStart))}
        className={`text-gray-600 hover:text-gray-900 ${
          isBefore(subMonths(currentMonth, 1), startOfMonth(semesterStart))
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        &#8249;
      </button>
      <h2 className="text-md font-semibold text-gray-900 select-none">{format(currentMonth, "MMMM yyyy")}</h2>
      <button
        onClick={handleNextMonth}
        aria-label="Next Month"
        disabled={isAfter(addMonths(currentMonth, 1), endOfMonth(semesterEnd))}
        className={`text-gray-600 hover:text-gray-900 ${
          isAfter(addMonths(currentMonth, 1), endOfMonth(semesterEnd))
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        &#8250;
      </button>
    </div>
  );

  const renderDays = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    return (
      <div className="grid grid-cols-7 border-b border-gray-300 pb-2 text-xs font-semibold text-gray-700 select-none">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="text-center">
            {format(addDays(startDate, i), "EEE").toUpperCase()}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    let rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, "d");
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, selectedDate);
        const hasEvent = eventDays.has(day.getDate()) && isCurrentMonth;

        days.push(
          <div
            key={day}
            onClick={() => isCurrentMonth && setSelectedDate(cloneDay)}
            aria-label={`Day ${formattedDate} ${hasEvent ? "with events" : ""}`}
            tabIndex={isCurrentMonth ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                isCurrentMonth && setSelectedDate(cloneDay);
              }
            }}
            className={`cursor-pointer select-none text-center py-2 rounded p-1 mx-1 mb-1 w-8 h-8 flex items-center justify-center
              ${!isCurrentMonth ? "text-gray-400" : "text-gray-900"}
              ${hasEvent ? "text-orange-500 font-semibold" : ""}
              ${isSelected ? "bg-blue-600 text-white font-semibold shadow-md" : ""}
              hover:bg-gray-50 transition`}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 justify-items-center">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <>

      {isPreviewOpen && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg max-w-md w-full z-50 p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-900 select-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
            </svg>
            Events Preview - {format(currentMonth, "MMMM yyyy")}
          </h3>
          <ul className="max-h-64 overflow-y-auto mb-6 space-y-3">
            {eventsThisMonth.length ? (
              eventsThisMonth.map((event) => (
                <li key={event.id} className="border border-gray-200 rounded p-3 text-gray-900">
                  <span className="font-semibold">{event.title}</span>
                  <time className="block text-sm text-gray-500 mt-1" dateTime={event.startDate}>
                    {format(parseISO(event.startDate), "MMMM d") +
                      (event.startDate !== event.endDate
                        ? ` - ${format(parseISO(event.endDate), "d")}`
                        : "")}
                  </time>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center">No events this month.</p>
            )}
          </ul>
          <button
            onClick={() => setIsPreviewOpen(false)}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer select-none font-semibold"
            aria-label="Close preview modal"
            type="button"
          >
            Close
          </button>
        </div>
      )}

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl select-none">

        <h1 className="text-lg font-semibold mb-1 flex items-center gap-2 text-gray-900">
          <svg
            className="w-6 h-6 fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM5 20V9h14v11H5z" />
          </svg>
          University Calendar - Academic Year {academicYear}
        </h1>
        <p className="text-xs text-gray-600 mb-6">
          {semesterLabel} | {format(semesterStart, "MMMM d, yyyy")} - {format(semesterEnd, "MMMM d, yyyy")}
        </p>


        <div className="bg-white rounded-xl shadow-lg p-4">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>


        <section className="mt-6">
          <h2 className="flex items-center gap-2 text-gray-900 font-semibold mb-3 text-sm select-none">
            <svg
              className="w-4 h-4 fill-current text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5 3v3H3v2h2v6H3v2h2v3h2v-3h6v3h2v-3h2v-2h-2v-6h2v-2h-2V3H5zm2 11h6v4H7v-4z" />
            </svg>
            All Events This Month
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {eventsThisMonth.length > 0 ? (
              eventsThisMonth.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-100 rounded-md py-2 px-3 text-gray-900 flex flex-col cursor-default"
                >
                  <span className="font-semibold">{event.title}</span>
                  <span className="text-xs text-gray-500 mt-1">
                    📅 {formatEventDateRange(event.startDate, event.endDate)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-2 text-center">No events this month</p>
            )}
          </div>
        </section>


        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center gap-2 border border-gray-400 rounded px-4 py-2 text-gray-900 hover:bg-gray-100 transition cursor-pointer select-none"
            aria-label="Preview calendar events"
            type="button"
          >
            <svg
              className="w-5 h-5 stroke-gray-900"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16l-4-4 4-4"></path>
            </svg>
            Preview
          </button>
          <button
            onClick={downloadICS}
            className="flex items-center gap-2 bg-blue-700 text-white rounded px-4 py-2 hover:bg-blue-800 transition cursor-pointer select-none"
            aria-label="Download calendar as ICS file"
            type="button"
          >
            <svg
              className="w-5 h-5 stroke-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14"></path>
              <path d="M5 12l7 7 7-7"></path>
            </svg>
            Download Calendar
          </button>
        </div>
      </div>
    </>
  );
}

export default UniversityCalendar;