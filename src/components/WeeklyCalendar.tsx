import React from "react";
import engineersData from "../data/engineers.json";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const startHour = 9;
const endHour = 18;

type Props = {
  candidateAvailability: string;
  onConfirmSlot: (day: string, time: string, engineer: string) => void;
  confirmedSlot: {
    day: string;
    time: string;
    engineer: string;
  } | null;
  duration: number;
};

// Generate 30-minute time slots from 9:00 to 18:00
const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

// Convert candidate availability string like "Tuesday 14:00-17:00" into slot keys
const getCandidateSlotKeys = (availabilityStr: string): Set<string> => {
  const [day, timeRange] = availabilityStr.split(" ");
  const [start, end] = timeRange.split("-");

  const startHour = parseInt(start.split(":")[0]);
  const startMinute = parseInt(start.split(":")[1]);
  const endHour = parseInt(end.split(":")[0]);
  const endMinute = parseInt(end.split(":")[1]);

  const slots: string[] = [];

  for (
    let hour = startHour;
    hour < endHour || (hour === endHour && startMinute < endMinute);
    hour++
  ) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }

  const validSlots = slots.filter((time) => {
    const [h, m] = time.split(":").map(Number);
    return h < endHour || (h === endHour && m < endMinute);
  });

  return new Set(validSlots.map((time) => `${day}-${time}`));
};

// Type for engineer data
type Engineer = {
  id: string;
  name: string;
  availability: {
    [day: string]: string[];
  };
};

const WeeklyCalendar: React.FC<Props> = ({
  candidateAvailability,
  onConfirmSlot,
  confirmedSlot,
}) => {
  const timeSlots = generateTimeSlots();
  const engineers = engineersData as Engineer[];
  const candidateSlots = getCandidateSlotKeys(candidateAvailability);

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-6 border border-gray-300 text-sm">
        {/* Day headers */}
        <div className="bg-gray-100 font-semibold text-center p-2 border-r border-gray-300">
          Time
        </div>
        {days.map((day) => (
          <div
            key={day}
            className="bg-gray-100 font-semibold text-center p-2 border-r border-gray-300"
          >
            {day}
          </div>
        ))}

        {/* Time slots */}
        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            <div className="p-2 border-t border-gray-300 text-right pr-4 font-medium">
              {time}
            </div>

            {days.map((day) => {
              const isEngineerAvailable = engineers.some((engineer) =>
                engineer.availability[day]?.includes(time)
              );

              const isCandidateAvailable = candidateSlots.has(
                `${day}-${time}`
              );
              const isIntersecting =
                isEngineerAvailable && isCandidateAvailable;

              const firstEngineer = engineers.find((engineer) =>
                engineer.availability[day]?.includes(time)
              );

              const isLocked =
                confirmedSlot?.day === day &&
                confirmedSlot?.time === time;

              const className = `border-t border-r border-gray-300 h-12 transition ${
                isLocked
                  ? "bg-gray-300 cursor-not-allowed"
                  : isIntersecting
                  ? "bg-blue-300 hover:bg-blue-400 cursor-pointer"
                  : isEngineerAvailable
                  ? "bg-green-200"
                  : ""
              }`;

              return (
                <div
                  key={`${day}-${time}`}
                  className={className}
                  onClick={() =>
                    !isLocked &&
                    isIntersecting &&
                    firstEngineer &&
                    onConfirmSlot(day, time, firstEngineer.name)
                  }
                ></div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
