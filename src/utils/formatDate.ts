export function formatDateFR(dateString: string) {
  if (!dateString) return "—";

  const date = new Date(dateString);

  // vérifier si le backend a envoyé une heure
  const hasTime = /T\d{2}:\d{2}|\s\d{2}:\d{2}/.test(dateString);

  const datePart = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(date)
    .replace(/\//g, "-"); // remplace / par -

  if (hasTime) {
    const timePart = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    return `${datePart} à ${timePart}`;
  }

  return datePart;
}