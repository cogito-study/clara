import { format, formatDistance, Locale, parseISO } from 'date-fns';
import { enUS, hu } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

const mapLocale = (languageCode?: string): Locale => {
  switch (languageCode) {
    case 'hu':
      return hu;
    case 'en':
      return enUS;

    default:
      return enUS;
  }
};

const parseDate = (date: string | Date) => (typeof date === 'string' ? parseISO(date) : date);

export enum DateFormat {
  short = 'yyyy. MMMM d.',
}

export const useDateFormatter = () => {
  const { i18n } = useTranslation();

  const formatDate = (date: string | Date, dateFormat: DateFormat = DateFormat.short) =>
    format(parseDate(date), dateFormat, { locale: mapLocale(i18n.language) });

  const since = (date: string | Date): string =>
    formatDistance(parseDate(date), new Date(), {
      addSuffix: true,
      locale: mapLocale(i18n.language),
    });

  return { formatDate, since };
};
