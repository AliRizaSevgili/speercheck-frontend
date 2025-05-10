import React from "react";

type Candidate = {
  id: string;
  name: string;
};

type Props = {
  candidates: Candidate[];
  selectedCandidateId: string;
  onSelect: (id: string) => void;
};

const CandidateSelector: React.FC<Props> = ({
  candidates,
  selectedCandidateId,
  onSelect,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor="candidate" className="block text-lg font-medium text-gray-700 mb-2">
        Select a candidate:
      </label>
      <select
        id="candidate"
        value={selectedCandidateId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Choose a candidate --</option>
        {candidates.map((candidate) => (
          <option key={candidate.id} value={candidate.id}>
            {candidate.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CandidateSelector;
