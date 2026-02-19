import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths, isSameMonth, isSameDay, parseISO, isWithinInterval, isBefore, isAfter, } from "date-fns";
import { Icon } from "@iconify/react";

const academicYear = "2025–2026";
const semesterLabel = "2nd Semester";
const semesterStart = new Date(2026, 0, 12);
const semesterEnd = new Date(2026, 4, 26);

const initialEvents = [
	{
		id: 1,
		title: "New Years Eve",
		startDate: "2026-01-01",
		endDate: "2026-01-01",
	},
	{
		id: 2,
		title: "Enrollment Period",
		startDate: "2026-01-05",
		endDate: "2026-01-09",
	},
	{
		id: 3,
		title: "Start of Classes",
		startDate: "2026-01-12",
		endDate: "2026-01-12",
	},
];

function UniversityCalendar() {

	const today = new Date();
	const initialMonth = isWithinInterval(today, {start: semesterStart, end: semesterEnd, }) ? today : semesterStart;
	const eventDays = new Set();

	const [currentMonth, setCurrentMonth] = useState(initialMonth);
	const [selectedDayEvents, setSelectedDayEvents] = useState([]);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [isDayModalOpen, setIsDayModalOpen] = useState(false);

	useEffect(() => {
		if (isPreviewOpen || isDayModalOpen) {
			const scrollY = window.scrollY;

			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = '100%';
			document.body.style.overflow = 'hidden';
			
			return () => {
				document.body.style.position = '';
				document.body.style.top = '';
				document.body.style.width = '';
				document.body.style.overflow = '';
				window.scrollTo(0, scrollY);
			};
		}
	}, [isPreviewOpen, isDayModalOpen]);

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

	const handleDayClick = (date) => {
		const eventsForDay = initialEvents.filter((event) => {
			const start = parseISO(event.startDate);
			const end = parseISO(event.endDate);

			return (
				isSameDay(date, start) ||
				isSameDay(date, end) ||
				(date >= start && date <= end)
			);
		});

		if (eventsForDay.length > 0) {
			setSelectedDayEvents(eventsForDay);
			setIsDayModalOpen(true);
		}
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
		<>
			<div className="flex justify-between items-center mb-4 pt-3 px-2 sm:px-5 gap-2 sm:gap-15">
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
					<Icon icon="iconamoon:arrow-left-2-duotone" width={32} height={32} className="sm:w-10 sm:h-10 text-neutral-900"/>
				</button>

				<h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 select-none text-center">
					{format(currentMonth, "MMMM yyyy")}
				</h2>

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
					<Icon icon="iconamoon:arrow-right-2-duotone" width={32} height={32} className="sm:w-10 sm:h-10 text-neutral-900"/>
				</button>
			</div>
			<hr className="text-neutral-800" />
		</>
	);

	const renderDays = () => {
		const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
		return (
			<div className="grid grid-cols-7 text-sm sm:text-base md:text-lg font-bold text-gray-700 h-12 sm:h-16 select-none items-center justify-center">
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
				const isToday = isSameDay(day, new Date());
				const hasEvent = eventDays.has(day.getDate()) && isCurrentMonth;

				days.push(
					<div
						key={day}
						aria-label={`Day ${formattedDate} ${hasEvent ? "with events" : ""}`}
						tabIndex={isCurrentMonth ? 0 : -1}
						onClick={() => isCurrentMonth && handleDayClick(cloneDay)}
						className={`cursor-pointer select-none text-center m-[1px] grow h-12 sm:h-16 flex items-center justify-center text-base sm:text-xl
							${!isCurrentMonth ? "text-gray-400" : "text-gray-900"}
							${hasEvent ? "text-orange-500 font-semibold" : ""}
							${isToday ? "bg-primary-500 text-white font-semibold" : ""}
							${!isToday ? "bg-white hover:bg-gray-100" : ""}
							transition`}
					>
						{formattedDate}
					</div>,
				);
				day = addDays(day, 1);
			}
			rows.push(
				<div key={day} className="grid grid-cols-7">
					{days}
				</div>,
			);
			days = [];
		}
		return <div>{rows}</div>;
	};

	return (
		<>
			{isDayModalOpen && (
				<>
					<div
						className="fixed inset-0 backdrop-blur-sm z-100"
						style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
						onClick={() => setIsDayModalOpen(false)}
					></div>

					<div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
									bg-white rounded-xl shadow-lg 
									w-[90%] sm:max-w-md
									max-h-[80vh] overflow-y-auto
									z-100 px-4 pt-4 pb-2 sm:p-6">
						
						<h3 className="font-semibold text-base sm:text-lg mb-4 text-gray-900 pr-8">
							Events on{" "}
							{selectedDayEvents[0] && format(parseISO(selectedDayEvents[0].startDate), "MMMM d, yyyy")}
						</h3>

						<button 
							onClick={() => setIsDayModalOpen(false)}
							className="absolute top-3 right-4 sm:hidden p-1 text-gray-500 hover:text-gray-700"
							aria-label="Close"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
							</svg>
						</button>

						<ul className="space-y-3 mb-3">
							{selectedDayEvents.map((event) => (
								<li key={event.id} className="border rounded p-3">
									<span className="font-semibold text-sm sm:text-base">{event.title}</span>
								</li>
							))}
						</ul>

						<div className="flex justify-end hidden sm:flex">
							<button
								onClick={() => setIsDayModalOpen(false)}
								className="w-full sm:w-auto px-5 py-2.5 sm:py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition text-sm sm:text-base"
							>
								Close
							</button>
						</div>
					</div>
				</>
			)}

			{isPreviewOpen && (
				<>
					<div
						className="fixed inset-0 backdrop-blur-sm z-100"
						style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
						onClick={() => setIsPreviewOpen(false)}
					></div>
					
					<div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
									bg-white rounded-xl shadow-lg 
									w-[90%] sm:max-w-md
									max-h-[80vh] overflow-y-auto
									z-100 px-5 pt-5 pb-3 sm:p-6">
						
						<h3 className="font-semibold text-base sm:text-lg mb-4 flex items-center gap-2 text-gray-900 select-none pr-8">
							<Icon
								icon="solar:calendar-bold"
								width={20}
								height={20}
								className="sm:w-5 sm:h-5 text-neutral-800 flex-shrink-0"
							/>
							<span>Events Preview - {format(currentMonth, "MMMM yyyy")}</span>
						</h3>
						
						<button 
							onClick={() => setIsPreviewOpen(false)}
							className="absolute top-3 right-4 p-2 text-gray-500 hover:text-gray-700 sm:hidden"
							aria-label="Close"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
							</svg>
						</button>
						
						<ul className="max-h-[50vh] overflow-y-auto mb-3 space-y-3">
							{eventsThisMonth.length ? (
								eventsThisMonth.map((event) => (
									<li
										key={event.id}
										className="border border-gray-200 rounded py-3 px-4 text-gray-900"
									>
										<span className="font-semibold text-sm sm:text-base">{event.title}</span>
										<time
											className="block text-xs sm:text-sm text-gray-500 "
											dateTime={event.startDate}
										>
											{format(parseISO(event.startDate), "MMMM d") +
												(event.startDate !== event.endDate
													? ` - ${format(parseISO(event.endDate), "d")}`
													: "")}
										</time>
									</li>
								))
							) : (
								<p className="text-gray-500 text-center py-8">No events this month.</p>
							)}
						</ul>
						
						<div className="flex justify-end">
							<button
								onClick={() => setIsPreviewOpen(false)}
								className="w-full sm:w-auto px-5 py-2.5 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer select-none font-semibold text-sm sm:text-base hidden sm:block"
								aria-label="Close preview modal"
								type="button"
							>
								Close
							</button>
						</div>
					</div>
				</>
			)}

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[900px]">
				{/* Title */}
				<div className="mb-4 sm:mb-6">
					<h1 className="text-[15px] sm:text-[21px] md:text-[26px] font-semibold flex items-center gap-2 text-gray-800 mt-4 sm:mt-5">
						<Icon
							icon="solar:calendar-bold"
							width={24}
							height={24}
							className="hidden sm:w-7 sm:h-7 sm:block text-neutral-800"
						/>
						<span className="break-words">University Calendar - Academic Year {academicYear}</span>
					</h1>
					<p className="text-sm sm:text-base md:text-lg font-regular text-gray-600 mb-3 pl-0 sm:pl-10">
						{semesterLabel} | {format(semesterStart, "MMMM d, yyyy")} -{" "}
						{format(semesterEnd, "MMMM d, yyyy")}
					</p>
				</div>

				<div className="w-full max-w-[900px] mx-auto mt-2 mb-10 rounded-xl select-none bg-neutral-50 px-4 sm:px-6 md:px-10 pb-6 sm:pb-8 pt-4 sm:pt-8 shadow-[0_13px_34px_rgba(0,0,0,0.1)]">
					{/* Calendar */}
					<div className="rounded-xl overflow-hidden">
						{renderHeader()}
						{renderDays()}
						{renderCells()}
					</div>

					{/* Events */}
					<section className="mt-4 sm:mt-6">
						<h2 className="flex items-center gap-2 text-gray-900 font-semibold mb-3 text-sm select-none">
							<Icon icon="clarity:event-solid" width={20} height={20} className="sm:w-6 sm:h-6 text-neutral-900"/>
							<p className="text-base sm:text-lg md:text-xl font-medium">All Events This Month</p>
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
							{eventsThisMonth.length > 0 ? (
								eventsThisMonth.map((event) => (
									<div key={event.id} className="bg-white rounded-md py-2 px-4 sm:px-5 text-gray-900 flex flex-col cursor-default min-h-[60px] sm:h-17">
										<span className="font-semibold text-base sm:text-[18px] truncate">{event.title}</span>
										<span className="text-xs text-gray-500 flex items-center gap-1 sm:gap-2">
											<Icon icon="solar:calendar-bold" width={14} height={14} className="sm:w-4 sm:h-4 text-neutral-800 flex-shrink-0"/>
											<span className="text-xs sm:text-sm truncate"> {formatEventDateRange(event.startDate, event.endDate)} </span> 
										</span>
									</div>
								))
							) : (
								<p className="text-gray-500 col-span-1 sm:col-span-2 text-center">
									No events this month
								</p>
							)}
						</div>
					</section>

					<hr className="text-neutral-200 mt-4" />

					{/* Action Buttons */}
					<div className="mt-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
						<button
							onClick={() => setIsPreviewOpen(true)}
							className="flex items-center justify-center gap-2 border border-gray-400 rounded-lg px-3 sm:px-4 py-3 text-gray-900 hover:bg-gray-100 transition cursor-pointer select-none w-full sm:w-auto"
							aria-label="Preview calendar events"
							type="button"
						>
							<Icon
								icon="charm:eye"
								width={18}
								height={18}
								className="sm:w-5 sm:h-5 text-neutral-500"
							/>
							<span className="text-sm sm:text-base text-neutral-500">Preview</span>
						</button>

						<button
							onClick={downloadICS}
							className="flex items-center justify-center gap-2 bg-primary-500 text-white rounded-lg px-3 sm:px-4 py-3 hover:bg-blue-800 transition cursor-pointer select-none w-full sm:w-auto"
							aria-label="Download calendar as ICS file"
							type="button"
						>
							<Icon
								icon="material-symbols:download"
								width={18}
								height={18}
								className="sm:w-5 sm:h-5 text-white"
							/>
							<span className="text-sm sm:text-base">Download Calendar</span>
						</button>
					</div>
				</div>
				
			</div>
		</>
	);
}

export default UniversityCalendar;