import { format } from "date-fns";
import { id } from "date-fns/locale";

export const formatDateToIndo = (date) => {
  return format(new Date(date), "eeee, d MMMM yyyy", {
    locale: id,
  });
};

export const formatDateWithTimeToIndo = (date) => {
  return format(new Date(date), "eeee, d MMMM yyyy HH:mm", {
    locale: id,
  });
};
