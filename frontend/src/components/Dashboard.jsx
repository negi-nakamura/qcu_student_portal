import React, { useState, useRef, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { useNavigate } from "react-router-dom";

const announcements = [
  {
    id: 1,
    title: "Quezon City University",
    description:
      "Quezon City University successfully concluded its Faculty Immersion Program...",
    source: "facebook.com",
    imageUrl:
      "",
  },
  {
    id: 2,
    title: "Campus Reopening",
    description: "Campus opens on February 1, 2026 to welcome all students...",
    source: "qcu.edu.ph",
    imageUrl:
      "",
  },
  {
    id: 3,
    title: "Scholarship Applications",
    description:
      "Scholarship applications are now open for the 2nd semester...",
    source: "qcu.edu.ph",
    imageUrl:
      "",
  },
  {
    id: 4,
    title: "Library Renovation",
    description: "The main library will be closed for renovation starting March...",
    source: "qcu.edu.ph",
    imageUrl:
      "",
  },
  {
    id: 5,
    title: "New Cafeteria Menu",
    description:
      "Enjoy a new variety of meals now available at the campus cafeteria.",
    source: "qcu.edu.ph",
    imageUrl:
      "",
  },
];

const gradeReport = {
  title: "1st Year Midterm Grade Report for S.Y. 2025-2026",
  campus: "Batasan Hills, Quezon City",
  dateSubmitted: "January 10, 2026 | 09:30 AM",
  gwa: 1.5,
  totalUnits: 23,
};

const loginActivities = [
  {
    status: "Login Successfully!",
    date: "Friday | January 10, 2026 | 07:40:30 PM",
    device: "Desktop",
    browser: "Chrome",
  },
  {
    status: "Last Access",
    date: "Friday | January 10, 2026 | 07:40:30 PM",
    device: "Desktop",
    browser: "Chrome",
  },
];

const enrolledCourses = [
  {
    code: "WS102",
    name: "Web System and Technologies",
    professor: "Prof. Teresita Cruz",
    schedule: "Saturday",
    time: "7:00 AM - 9:00 AM | 10:30 - 1:30 PM",
    room: "Room 201a | Laboratory 103b",
    bannerBg: "bg-[#6D5DE7]", 
    bannerImg:
      "",
  },
  {
    code: "GEE1",
    name: "Gender and Society",
    professor: "Prof. Edmund Rubio",
    schedule: "Friday",
    time: "7:00 AM - 9:00 AM | 10:30 - 1:30 PM",
    room: "Room 304a",
    bannerBg: "bg-[#F0859A]", 
    bannerImg:
      "",
  },
];

const calendarEvents = [
  { id: 1, title: "New Year", date: "2026-01-01" },
  { id: 2, title: "Enrollment Period", startDate: "2026-01-05", endDate: "2026-01-09" },
  { id: 3, title: "Start of Classes", date: "2026-01-12" },
];

function Dashboard() {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const childWidth = scrollRef.current.firstChild?.offsetWidth || 0;
      scrollRef.current.scrollTo({ left: childWidth * index, behavior: "smooth" });
    }
    setAnnouncementIndex(index);
  };

  const prevAnnouncement = () => {
    const prevIndex = announcementIndex === 0 ? announcements.length - 1 : announcementIndex - 1;
    scrollToIndex(prevIndex);
  };
  const nextAnnouncement = () => {
    const nextIndex = announcementIndex === announcements.length - 1 ? 0 : announcementIndex + 1;
    scrollToIndex(nextIndex);
  };

  useEffect(() => {
    scrollToIndex(announcementIndex);
  }, []);

  const currentMonth = new Date(2026, 0);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = [];
  let day = startDate;
  while (day <= endDate) {
    calendarDays.push(day);
    day = addDays(day, 1);
  }

  const getEventsForDay = (date) => {
    return calendarEvents.filter((ev) => {
      if (ev.date) return isSameDay(parseISO(ev.date), date);
      if (ev.startDate && ev.endDate)
        return date >= parseISO(ev.startDate) && date <= parseISO(ev.endDate);
      return false;
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans select-none text-gray-900">

      <section className="mb-8">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12v8a3 3 0 006 0v-8M12 2a3 3 0 00-3 3v10h6V5a3 3 0 00-3-3z"
            />
          </svg>
          <h1>
            Welcome Back, <strong>Christian Postrado Regalado</strong>!
          </h1>
        </div>
        <p className="text-sm text-gray-600 mt-1">25-0333 | Bachelor of Science in Information Technology</p>
      </section>


      <section className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-gray-800 font-semibold flex items-center gap-2 text-sm">
            <span>📰</span> News and Announcements
          </h2>
          <button
            onClick={() => navigate("/announcements")}
            className="text-blue-700 text-xs hover:underline focus:outline-none"
            aria-label="View all announcements"
          >
            View all <span aria-hidden="true">›</span>
          </button>
        </div>

        <div className="relative bg-blue-50 rounded-md overflow-hidden h-[130px]">

          <button
            onClick={prevAnnouncement}
            className="absolute top-1/2 -left-3 transform -translate-y-1/2 rounded-full w-8 h-8 bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 focus:outline-none"
            aria-label="Previous announcement"
          >
            ‹
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory h-full"
            aria-live="polite"
          >
            {announcements.map((item, idx) => (
              <article
                key={item.id}
                className="shrink-0 snap-center flex items-center gap-4 p-3 w-[380px] h-full"
                tabIndex={idx === announcementIndex ? 0 : -1}
                aria-label={`${item.title}, announcement ${idx + 1}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-24 w-24 rounded-md object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-700 line-clamp-3 max-w-[260px]">{item.description}</p>
                  <small className="text-gray-400 text-xs">{item.source}</small>
                </div>
              </article>
            ))}
          </div>


          <button
            onClick={nextAnnouncement}
            className="absolute top-1/2 -right-3 transform -translate-y-1/2 rounded-full w-8 h-8 bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 focus:outline-none"
            aria-label="Next announcement"
          >
            ›
          </button>
        </div>


        <div className="flex justify-center mt-2 space-x-2">
          {announcements.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-2.5 h-2.5 rounded-full ${
                i === announcementIndex ? "bg-blue-700" : "bg-blue-300"
              }`}
              aria-label={`Go to announcement ${i + 1}`}
              aria-current={i === announcementIndex ? "true" : undefined}
              type="button"
              tabIndex={i === announcementIndex ? 0 : -1}
            />
          ))}
        </div>
      </section>


      <section className="grid grid-cols-1 md:grid-cols-7 gap-6 mb-8">

        <div className="md:col-span-4 bg-blue-50 rounded-md p-6 flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-4 text-xs font-semibold text-gray-800">
            <h3 className="text-base">Grade Report</h3>
            <button
              onClick={() => navigate("/grades")}
              className="text-blue-700 hover:underline focus:outline-none"
              aria-label="View all grade reports"
            >
              View all <span aria-hidden="true">›</span>
            </button>
          </div>
          <h4 className="font-semibold mb-2 text-sm">{gradeReport.title}</h4>
          <p className="text-xs mb-1">
            <strong>Campus:</strong> {gradeReport.campus}
          </p>
          <p className="text-xs mb-4">
            <strong>Date Submitted:</strong> {gradeReport.dateSubmitted}
          </p>
          <div className="flex justify-between text-xs font-semibold text-gray-700 mt-auto">
            <p>
              General Weighted Average: <span className="font-bold">{gradeReport.gwa}</span>
            </p>
            <p>
              Total Units: <span className="font-bold">{gradeReport.totalUnits}</span>
            </p>
          </div>
        </div>


        <div className="md:col-span-3 bg-blue-50 rounded-md p-6 flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-4 text-xs font-semibold text-gray-800">
            <h3 className="text-base">Login Activity</h3>
            <button
              onClick={() => navigate("/login-activity")}
              className="text-blue-700 hover:underline focus:outline-none"
              aria-label="View all login activities"
            >
              View all <span aria-hidden="true">›</span>
            </button>
          </div>
          <div className="space-y-4 text-xs text-gray-900">
            {loginActivities.map((item, idx) => {
              const isSuccess = item.status.toLowerCase().includes("success");
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 rounded bg-white shadow-sm"
                  role="group"
                  aria-label={item.status}
                >
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full ${
                      isSuccess ? "bg-green-200 text-green-600" : "bg-gray-300 text-gray-600"
                    }`}
                    aria-hidden="true"
                  >
                    {isSuccess ? (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    ) : (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <path d="M15 12H9m6 0l-3 3m3-3l-3-3" />
                      </svg>
                    )}
                  </span>
                  <div className="space-y-0.5 leading-tight">
                    <p className="font-semibold">{item.status}</p>
                    <p>{item.date}</p>
                    <p>
                      {item.device} | {item.browser}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 bg-[#EBF0FF] rounded-lg p-6 select-none">

        <div className="md:col-span-7">
          <div className="flex justify-between items-center mb-5">
            <h3 className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 14l1-1m4-4l-1 1m-2 8v-6m3-1V7a3 3 0 00-6 0v3h6z"
                />
              </svg>
              Currently Enrolled Courses
            </h3>
            <button
              onClick={() => navigate("/courses")}
              className="text-blue-700 hover:underline text-sm font-medium focus:outline-none"
              aria-label="View all courses"
            >
              View all <span aria-hidden="true">›</span>
            </button>
          </div>

          <div className="flex gap-6">
            {enrolledCourses.map((course) => (
              <article
                key={course.code}
                className="w-72 rounded-lg shadow-md flex flex-col overflow-hidden"
                tabIndex={0}
                aria-label={`Course: ${course.name}`}
              >
                <div className={`${course.bannerBg} relative h-32 p-4`}>
                  <span className="absolute top-4 left-4 bg-[#1C68FF] text-xs font-semibold px-3 py-1 rounded select-none cursor-default text-white">
                    {course.code}
                  </span>
                  <img
                    src={course.bannerImg}
                    alt={`${course.name} illustration`}
                    loading="lazy"
                    className="absolute bottom-0 right-0 w-28 h-28 object-cover pointer-events-none select-none rounded-tr-lg"
                    aria-hidden="true"
                  />
                </div>
                <div className="bg-[#4B4F7B] p-4 flex flex-col gap-3 text-white flex-grow">
                  <h2 className="font-semibold text-lg leading-tight">{course.name}</h2>
                  <hr className="border-white/30" />
                  <ul className="flex flex-col gap-2">
                    <li className="flex items-center gap-3 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.121 17.804A3 3 0 016 11a3 3 0 016 0 3 3 0 016 6v1a3 3 0 01-3 3H6a3 3 0 01-2.879-2.196z"
                        />
                      </svg>
                      Prof. {course.professor}
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3M5 11h14M12 21v-6m-7-2h14a2 2 0 002-2v-1a2 2 0 00-2-2H5a2 2 0 00-2 2v1a2 2 0 002 2z"
                        />
                      </svg>
                      {course.schedule}
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                      </svg>
                      {course.time}
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 3L7 21H3l10-18h4z" />
                      </svg>
                      {course.room}
                    </li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>


        <div className="md:col-span-5 bg-white rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4 text-gray-900 font-semibold text-lg">
            <h3>Calendar</h3>
            <button
              onClick={() => navigate("/calendar")}
              className="text-blue-700 hover:underline text-sm focus:outline-none"
              aria-label="View all calendar events"
            >
              View all <span aria-hidden="true">›</span>
            </button>
          </div>

          <div className="flex justify-between items-center mb-3 text-gray-600 text-xs font-semibold select-none">
            <button disabled aria-label="Previous month" type="button" className="cursor-not-allowed">
              ‹
            </button>
            <div className="font-semibold text-gray-900">January 2026</div>
            <button disabled aria-label="Next month" type="button" className="cursor-not-allowed">
              ›
            </button>
          </div>


          <div className="grid grid-cols-7 gap-1 text-gray-600 text-center font-semibold text-xs border-b border-gray-300 pb-2 select-none">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>


          <div className="grid grid-cols-7 gap-y-1 mt-1 text-center text-sm text-gray-900 select-none">
            {calendarDays.map((d, i) => {
              const isCurrentMonth = isSameMonth(d, currentMonth);
              const dayNum = format(d, "d");
              const hasEvent = getEventsForDay(d).length > 0;
              const isToday = isSameDay(d, new Date(2026, 0, 12));

              return (
                <div
                  key={i}
                  className={`mx-auto w-7 h-7 flex items-center justify-center rounded cursor-default select-none ${
                    isCurrentMonth
                      ? hasEvent
                        ? "text-orange-400 font-semibold"
                        : "text-gray-900"
                      : "text-gray-300"
                  } ${isToday ? "bg-blue-700 text-white font-semibold" : ""}`}
                  aria-label={`Day ${dayNum}${hasEvent ? ", has event" : ""}`}
                >
                  {dayNum}
                </div>
              );
            })}
          </div>


          <div className="mt-3 text-xs text-gray-900 select-text space-y-1">
            <ul>
              {calendarEvents.map((ev) => (
                <li key={ev.id} className="flex justify-between bg-gray-50 rounded p-2">
                  <span>{ev.title}</span>
                  <time>
                    {ev.date
                      ? format(parseISO(ev.date), "MMMM dd")
                      : `${format(parseISO(ev.startDate), "MMMM dd")} - ${format(
                          parseISO(ev.endDate),
                          "dd"
                        )}`}
                  </time>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;