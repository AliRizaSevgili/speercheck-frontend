import { getOverlappingSlots } from "./availabilityUtils";

describe("getOverlappingSlots", () => {
  it("should return overlapping time slots between engineer and candidate", () => {
    const engineerSlots = ["14:00", "14:30", "15:00", "15:30"];
    const candidateSlots = new Set([
      "Tuesday-14:00",
      "Tuesday-14:30",
      "Tuesday-16:00"
    ]);
    const day = "Tuesday";

    const result = getOverlappingSlots(engineerSlots, candidateSlots, day);

    expect(result).toEqual(["14:00", "14:30"]);
  });

  it("should return empty array if no overlap", () => {
    const engineerSlots = ["09:00", "09:30"];
    const candidateSlots = new Set(["Tuesday-14:00"]);
    const day = "Tuesday";

    const result = getOverlappingSlots(engineerSlots, candidateSlots, day);

    expect(result).toEqual([]);
  });
});
