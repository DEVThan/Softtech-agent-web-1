export async function getLocaleFromSubdomain(): Promise<string> {
  if (typeof window === "undefined") return "mm";
  const sub = window.location.hostname.split(".")[0].toLocaleLowerCase();
  if (sub === "agentmm") return "mm";
  if (sub === "agenten") return "en";
  if (sub === "agentth") return "th";
  return "mm"; // default
};