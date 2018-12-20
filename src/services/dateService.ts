import { format } from 'date-fns';
import { hu } from 'date-fns/locale';

enum DateFormat {
  short = 'yyyy. MMMM d.',
}

export const dateService = {
  yearMonthDay: (date: Date | string): string => format(date, DateFormat.short, { locale: hu }),
};
