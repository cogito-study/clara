import { LanguageFragment } from './language-fragment.generated';

type Options = {
  languages?: Readonly<LanguageFragment[]>;
  code?: string;
};

export const findLanguageByCode = ({ languages, code }: Options) =>
  languages?.find((language) => language.code === code) ?? undefined;

export const sortLanguagesBySelectedFirst = ({ languages, code }: Options) => {
  if (languages && code) {
    return [...languages].sort((lang) => (lang.code === code ? -1 : 1));
  }

  return undefined;
};

export * from './language-fragment.generated';
export * from './language-fragment.mock';
export * from './language-list-query.generated';
