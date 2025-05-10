import React, { useState } from "react";
import CandidateSelector from "./components/CandidateSelector";
import WeeklyCalendar from "./components/WeeklyCalendar";
import candidatesData from "./data/candidates.json";

type Candidate = {
  id: string;
  name: string;
  availability: string;
};

// Converts 24-hour time string to AM/PM format (e.g., "14:30" → "2:30 PM")
const formatToAmPm = (time24: string): string => {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const suffix = hour >= 12 ? "PM" : "AM";
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${suffix}`;
};

function App() {
  const [selectedCandidateId, setSelectedCandidateId] = useState("");

  const [confirmedSlot, setConfirmedSlot] = useState<{
    day: string;
    time: string;
    engineer: string;
  } | null>(null);

  const [duration, setDuration] = useState<number>(30); // ⏳ New state for duration

  const handleCandidateSelect = (id: string) => {
    setSelectedCandidateId(id);
    setConfirmedSlot(null); // Clear selection when changing candidate
  };

  const selectedCandidate = candidatesData.find(
    (c: Candidate) => c.id === selectedCandidateId
  );

  const handleConfirmSlot = (day: string, time: string, engineer: string) => {
    setConfirmedSlot({ day, time, engineer });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          SpeerCheck Interview Scheduler
        </h1>

        <CandidateSelector
          candidates={candidatesData}
          selectedCandidateId={selectedCandidateId}
          onSelect={handleCandidateSelect}
        />

        {selectedCandidate && (
          <>
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
              Selected Candidate: <strong>{selectedCandidate.name}</strong>
              <br />
              Availability: <strong>{selectedCandidate.availability}</strong>
            </div>

            {/* ⏳ Duration Dropdown */}
            <div className="mt-4">
              <label className="block font-medium mb-1 text-gray-700">Select Duration:</label>
              <select
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>

            <div className="mt-6">
              <WeeklyCalendar
                candidateAvailability={selectedCandidate.availability}
                onConfirmSlot={handleConfirmSlot}
                confirmedSlot={confirmedSlot}
                duration={duration}
              />

            </div>

            {confirmedSlot && (
              <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
                ✔️ Interview confirmed with{" "}
                <strong>{confirmedSlot.engineer}</strong> and{" "}
                <strong>{selectedCandidate.name}</strong> on{" "}
                <strong>
                  {confirmedSlot.day} at {formatToAmPm(confirmedSlot.time)}
                </strong>.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
