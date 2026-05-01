type HesitationSignal = {
  timestamp: number;
  type: "pause" | "delete" | "hover";
  duration?: number;
};

export function detectHesitation(signals: HesitationSignal[]) {
  return signals.filter(s => {
    if (s.type === "pause" && (s.duration || 0) > 800) return true;
    if (s.type === "delete") return true;
    return false;
  });
}

export function predictNextAction(signals: HesitationSignal[]) {
  const hesitation = detectHesitation(signals);

  if (hesitation.length > 3) {
    return "user_uncertain";
  }

  return "user_committed";
}
