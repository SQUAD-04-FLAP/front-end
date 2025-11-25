export const formatDate = (date) => {
  if (!date) return '-';
  const cleanDate = date.split('.')[0]; // remove microsegundos extras
  const parsedDate = new Date(cleanDate);
  if (isNaN(parsedDate.getTime())) return '-';
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(parsedDate);
};