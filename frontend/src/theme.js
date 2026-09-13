// Single source of truth for the color palette. Kept as a plain JS object
// (rather than only Tailwind classes) because a lot of colors here are
// picked dynamically from data (status = "cleared" | "in_process" | "disputed"),
// which is awkward to express with static Tailwind class names.
export const C = {
  navy: "#0B3D91",
  navyDark: "#06264F",
  navyDeeper: "#041A38",
  saffron: "#FF9933",
  saffronDark: "#DB7B15",
  green: "#138808",
  greenDark: "#0E6606",
  bg: "#F4F6F9",
  card: "#FFFFFF",
  ink: "#16233B",
  inkSoft: "#4B5A72",
  inkFaint: "#8592A6",
  line: "#E3E8EF",
  lineSoft: "#EDF0F5",
  amber: "#B45309",
  amberBg: "#FEF3E2",
  amberLine: "#F6DDB0",
  red: "#C0362C",
  redBg: "#FBEAE8",
  redLine: "#EFC7C1",
  greenBg: "#E7F3E5",
  greenLine: "#C3E0BE",
};

export const STATUS = {
  cleared: { label: "Cleared", fg: C.greenDark, bg: C.greenBg, line: C.greenLine },
  in_process: { label: "In process", fg: C.amber, bg: C.amberBg, line: C.amberLine },
  disputed: { label: "Disputed", fg: C.red, bg: C.redBg, line: C.redLine },
};
