function capitalizeFirstLetter(str: string | undefined): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function truncateText(text: string, maxLength: number = 50) {
  if (!text) return "";
  const toUpperCase = capitalizeFirstLetter(text);
  return toUpperCase.length > maxLength
    ? toUpperCase.substring(0, maxLength) + "..."
    : toUpperCase;
}

function splitName(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);

  const firstName = parts[0] || "";
  const lastName = parts[1] ? parts.slice(1).join(" ") : "";

  return { firstName, lastName };
}

export { capitalizeFirstLetter, truncateText, splitName };
