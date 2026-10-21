export const PAGE_SIZE = 6;

export const STATUSES = ["active", "injured", "suspended"];

export const STATUS_LABEL = {
  active: "Active",
  injured: "Injured",
  suspended: "Suspended",
};

export const POSITIONS = ["PG", "SG", "SF", "PF", "C"];

export const NEXT_ACTION = {
  active: { to: "injured", label: "Place on injury report" },
  injured: { to: "active", label: "Clear to play" },
  suspended: { to: "active", label: "Reinstate" },
};
