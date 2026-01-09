"use client";

import React, { useState, useEffect, useCallback } from "react";

const CalendarContent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [slotsByDate, setSlotsByDate] = useState<Record<string, string[]>>({});
  const [days, setDays] = useState<React.ReactElement[]>([]);
  const [slots, setSlots] = useState<React.ReactElement[]>([]);
  const [monthYear, setMonthYear] = useState("");
  const [timeTitle, setTimeTitle] = useState("Select A Date");

  const generateSlots = (): string[] => {
    const baseSlots = [
      "8:00 AM",
      "8:30 AM",
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
      "5:00 PM",
    ];
    const shuffled = [...baseSlots].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 5) + 3;
    return shuffled.slice(0, count);
  };

  // ✅ No deps: use functional update to avoid re-creating the callback
  const handleSlotClick = useCallback((index: number) => {
    setSlots((prev) =>
      prev.map((slot, i) =>
        React.cloneElement(slot as React.ReactElement<HTMLDivElement>, {
          className: i === index ? "slot active" : "slot",
        })
      )
    );
  }, []);

  const renderSlots = useCallback(
    (slotsArray: string[]) => {
      const slotsElements = slotsArray.map((time, index) => (
        <div
          key={index}
          className="slot"
          onClick={() => handleSlotClick(index)}
        >
          {time}
        </div>
      ));
      setSlots(slotsElements);
    },
    [handleSlotClick]
  );

  const handleDayClick = useCallback(
    (day: number) => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const newSelectedDate = new Date(year, month, day);
      const key = newSelectedDate.toISOString().split("T")[0];

      if (!slotsByDate[key]) {
        const newSlots = generateSlots();
        setSlotsByDate((prev) => ({ ...prev, [key]: newSlots }));
        renderSlots(newSlots);
      } else {
        renderSlots(slotsByDate[key]);
      }

      setTimeTitle(
        `Available Times - ${day} ${currentDate.toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        })}`
      );
    },
    [currentDate, slotsByDate, renderSlots]
  );

  const goToPrevMonth = useCallback(() => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  const renderCalendar = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    setMonthYear(
      currentDate.toLocaleDateString("default", {
        month: "long",
        year: "numeric",
      })
    );

    const daysArray: React.ReactElement[] = [];

    for (let i = firstDay; i > 0; i--) {
      daysArray.push(
        <div key={`prev-${i}`} className="prev-date">
          {prevLastDate - i + 1}
        </div>
      );
    }

    for (let i = 1; i <= lastDate; i++) {
      const isToday =
        i === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      daysArray.push(
        <div
          key={`current-${i}`}
          className={isToday ? "active" : ""}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </div>
      );
    }

    const totalDays = firstDay + lastDate;
    const nextDays = 7 - (totalDays % 7 === 0 ? 7 : totalDays % 7);
    for (let i = 1; i <= nextDays; i++) {
      daysArray.push(
        <div key={`next-${i}`} className="next-date">
          {i}
        </div>
      );
    }

    setDays(daysArray);

    // Auto-select today's date (once per render of the grid)
    const todayElement = daysArray.find(
      (day) =>
        (day as React.ReactElement<HTMLDivElement>).props.className === "active"
    );
    if (todayElement) {
      const children = (todayElement as React.ReactElement<HTMLDivElement>)
        .props.children;
      const dayNumber = parseInt(String(children), 10) || 0;
      if (dayNumber) handleDayClick(dayNumber);
    }
  }, [currentDate, handleDayClick]);

  // ✅ Only depend on currentDate to avoid re-running due to callback identity churn
  useEffect(() => {
    renderCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  return (
    <>
      <div className="calendar-container">
        <div className="month">
          <button id="prev-wrap" onClick={goToPrevMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="22"
              viewBox="0 0 12 22"
              fill="none"
            >
              <path
                d="M0 11C0 11.2557 0.0977488 11.5117 0.292998 11.707L10.2929 21.7069C10.6837 22.0977 11.3164 22.0977 11.7069 21.7069C12.0974 21.3162 12.0977 20.6834 11.7069 20.2929L2.41399 11L11.7069 1.70697C12.0977 1.31622 12.0977 0.683468 11.7069 0.292969C11.3162 -0.0975304 10.6834 -0.0977802 10.2929 0.292969L0.292998 10.293C0.0977488 10.4882 0 10.7442 0 11Z"
                fill="#5A6A85"
              />
            </svg>
          </button>
          <span id="month-year">{monthYear}</span>
          <button id="next-wrap" onClick={goToNextMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="22"
              viewBox="0 0 12 22"
              fill="none"
            >
              <path
                d="M12 11C12 11.2557 11.9023 11.5117 11.707 11.707L1.70705 21.7069C1.31631 22.0977 0.683559 22.0977 0.293061 21.7069C-0.097437 21.3162 -0.097687 20.6834 0.293061 20.2929L9.58601 11L0.293061 1.70697C-0.097687 1.31622 -0.097687 0.683468 0.293061 0.292969C0.683809 -0.0975304 1.31656 -0.0977802 1.70705 0.292969L11.707 10.293C11.9023 10.4882 12 10.7442 12 11Z"
                fill="#5A6A85"
              />
            </svg>
          </button>
        </div>

        <div className="weekdays">
          <div>SU</div>
          <div>MO</div>
          <div>TU</div>
          <div>WE</div>
          <div>TH</div>
          <div>FR</div>
          <div>SA</div>
        </div>

        <div className="days" id="days">
          {days}
        </div>

        <div className="time-slots">
          <h4 id="time-title">{timeTitle}</h4>
          <div className="slots" id="slots">
            {slots}
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarContent;
