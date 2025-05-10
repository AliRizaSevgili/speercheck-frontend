
export const getOverlappingSlots = (
  engineerSlots: string[],
  candidateSlots: Set<string>,
  day: string
): string[] => {
  return engineerSlots.filter((slot) => candidateSlots.has(`${day}-${slot}`));
};
