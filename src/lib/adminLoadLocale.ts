// lib/loadLocaleClient.ts
export async function adminLoadLocale(locale: string, namespace: string) {
  const res = await fetch(`/locales/${locale}/${namespace}.json`);
  if (!res.ok) return { sidebar: [] };
  return res.json();
}
