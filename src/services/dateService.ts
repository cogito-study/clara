import { format, formatDistance } from 'date-fns';
import { hu } from 'date-fns/locale';

enum DateFormat {
  short = 'yyyy. MMMM d.',
}

export const dateService = {
  yearMonthDay: (date: Date | string): string => format(date, DateFormat.short, { locale: hu }),
  sinceNow: (date: Date | string): string => formatDistance(date, new Date(), { addSuffix: true, locale: hu }),
};
