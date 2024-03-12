const timeToDate = (time) => {
  const timeArr = time.split(':');
  const date = new Date();
  date.setHours(Number(timeArr[0]));
  date.setMinutes(Number(timeArr[1]));

  return date;
};

const isMeetingPossible = (startTime, endTime, meetingStartTime, duration) => {
  const getEndMeetingDate = () => {
    const date = timeToDate(meetingStartTime);
    date.setMinutes(date.getMinutes() + duration);

    return date;
  };

  const startDate = timeToDate(startTime);
  const endDate = timeToDate(endTime);
  const startMeetingDate = timeToDate(meetingStartTime);
  const endMeetingDate = getEndMeetingDate();

  return startDate <= startMeetingDate && endMeetingDate <= endDate;
};

isMeetingPossible('08:00', '17:30', '07:30', 90);
