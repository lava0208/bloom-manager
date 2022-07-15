import React, { useState } from "react";
import moment from "moment";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import styles from "~styles/components/masterplan/calendar.module.scss";

const CalendarTab = () => {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
      type: "start",
    },
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
      type: "harden",
    },
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
      type: "transplant",
    },
  ]);

  const Calendar = withDragAndDrop(BigCalendar);

  const localizer = momentLocalizer(moment);

  const onEventResize = (data) => {
    const { start, end } = data;

    setEvents((state) => {
      state[0].start = start;
      state[0].end = end;
      return [...state];
    });
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "";
    switch (event.type) {
      case "start":
        backgroundColor = "#505168";
        break;
      case "harden":
        backgroundColor = "#707070";
        break;
      case "transplant":
        backgroundColor = "#eaf0ce";
        break;
      default:
        backgroundColor = "#505168";
    }

    let style = {
      backgroundColor,
      color: event.type === "transplant" ? "#2e2e2e" : "#fff",
    };

    return {
      style,
    };
  };

  return (
    <div className={styles.container}>
      <Calendar
        localizer={localizer}
        events={events}
        onEventDrop={onEventResize}
        eventPropGetter={eventStyleGetter}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default CalendarTab;
