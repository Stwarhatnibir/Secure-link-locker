export const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "login", label: "Logins" },
  { value: "note", label: "Notes" },
  { value: "link", label: "Links" },
  { value: "card", label: "Cards" },
  { value: "identity", label: "Identity" },
  { value: "other", label: "Other" },
];

export const CATEGORY_COLORS = {
  login: "rgba(55,9,11,0.06)",
  note: "rgba(55,9,11,0.06)",
  link: "rgba(55,9,11,0.06)",
  card: "rgba(55,9,11,0.06)",
  identity: "rgba(55,9,11,0.06)",
  other: "rgba(55,9,11,0.06)",
};

export function getCategoryLabel(value) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}
