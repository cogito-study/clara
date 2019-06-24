import { FunctionComponent } from 'react';

export interface ResponsiveNoteCard<MobileProps = {}, DesktopProps = {}> {
  Mobile: FunctionComponent<MobileProps>;
  Desktop: FunctionComponent<DesktopProps>;
}
