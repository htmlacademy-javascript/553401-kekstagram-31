const timeToDate = (time) => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));

  return date;
};

const isMeetingPossible = (startTime, endTime, meetingStartTime, duration) => {
  const getEndMeetingDate = () => {
    const date = timeToDate(meetingStartTime);
    const meetingStartMinutes = date.getMinutes();
    date.setMinutes(meetingStartMinutes + duration);

    return date;
  };

  const startDate = timeToDate(startTime);
  const endDate = timeToDate(endTime);
  const startMeetingDate = timeToDate(meetingStartTime);
  const endMeetingDate = getEndMeetingDate();

  return startDate <= startMeetingDate && endMeetingDate <= endDate;
};

isMeetingPossible('08:00', '17:30', '07:30', 90);
