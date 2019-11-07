import { format, formatDistance, parseISO } from 'date-fns';
import { hu } from 'date-fns/locale';

enum DateFormat {
  short = 'yyyy. MMMM d.',
}

export const dateService = {
  yearMonthDay: (date: string): string => format(parseISO(date), DateFormat.short, { locale: hu }),
  sinceNow: (date: string): string =>
    formatDistance(parseISO(date), new Date(), { addSuffix: true, locale: hu }),
};
