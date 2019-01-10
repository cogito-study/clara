import { Box, Button, Grommet, TextInput } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { Footer, FormField, InfoCard, NoteCard, NoteComment, RegistrationCard } from './components';

import { NotificationContext } from '../contexts/notification/NotificationContext';
import { theme } from '../ui/theme';

const registrationCardName = 'Körmendy Bertalan';
const registrationCardEmail = 'berci.kormendy@cogito.study';
const noteCardTitle = 'Origin of heart murmurs. Diastolic murmurs.';
const noteCardAbstracts = [
  'Létfontos szerv: bőr és nyálkahártya nélkül nincs élet (ld. súlyos égést követő állapotok, Lyell szindróma)!',
  'Létfontos szerv: bőr és nyálkahártya nélkül nincs élet (ld. súlyos égést követő állapotok',
  'Létfontos szerv: bőr és nyálkahártya nélkül nincs élet (ld. súlyos égést követő állapotok Létfontos szerv: bőr és nyálkahártya nélkül nincs élet (ld. súlyos égést követő állapotok',
  'Létfontos szerv: bőr és nyálkahártya nélkül nincs',
];
const infoCardTitle = 'Követelmények';
const infoCardSubtitle = 'Ilyen, ha van alcím';
const infoCardContent =
  'Az előadásokon történő részvétel kötelező, a hallgatókat az előadásokon tájékoztatjuk arról, hogy azok anyagait az adott tárgy (Sebészet III.) vizsgáján teszt formájában számon kérjük. Az előadás tematikájára a tanszékvezető javaslatokat tehet. A hallgatók minden előadáson lehetőséget kapnak visszajelzésekre, ill. kérdéseik feltevésére. A gyakorlatokon történő részvétel kötelező, minden gyakorlaton katalógust vezetünk (titkárságon elzárva). Erről a hallgatókat az egyetemi hallgatói tájékoztatóban írásban, ill. a gyakorlatokon szóban tájékoztatjuk. A gyakorlatokon a hallgatókat köpennyel, ill. személyre szóló névtáblával látjuk el, minden csoport kinyomtatott formában megkapja a részletes órarend egy példányát. A vizsgán számon kért anyagokról, illetve az ajánlott irodalmakról (jegyzet, könyv, előadások, gyakorlatok stb.) a hallgatókat az egyetem hallgatói tájékoztatójában és honlapunkon tájékoztatjuk. Irodalom: Acsády Gy. – Nemes A.: Az érsebészet tankönyve. Medicina, Budapest, 2007. Acsády Gy. – Nemes A.: Az érbetegségek klinikai és műtéttani atlasza. Medicina, Budapest, 2005. Gaál Cs.: Sebészet. Medicina, Budapest, 2012.';
const commentParagraph =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const GrommetComponents: FunctionComponent<RouteComponentProps> = () => {
  const { showNotification } = useContext(NotificationContext);

  return (
    <Grommet theme={theme} full>
      <Box align="center" gap="large" background="light">
        <Button
          primary
          label="Error Button"
          onClick={() =>
            showNotification('There is an error with multiple lines let us see how this looks like', 'error')
          }
        />
        <Button
          primary
          label="Success Button"
          onClick={() =>
            showNotification('There is success with multiple lines let us see how this looks like', 'success')
          }
        />
        <Button
          primary
          label="Info Button"
          onClick={() =>
            showNotification('There is an info with multiple lines let us see how this looks like', 'info')
          }
        />
        <Button primary label="Primary Button" onClick={() => {}} />
        <Button color="primary" label="Default blue Button" onClick={() => {}} />
        <Button color="error" label="Default red Button" onClick={() => {}} />
        <Button color="success" label="Default green Button" onClick={() => {}} />
        <Button plain label="Plain Button" onClick={() => alert('Rakatintottal a gombra!')} />
        <NoteComment
          authorName="Mate Papp"
          date="12 minutes ago"
          paragraph={commentParagraph}
          upvoteCounts={16}
          isUpvoted={false}
          onVote={() => alert('Like')}
        />
        <NoteComment
          authorName="Mate Papp"
          onNewCommentChange={console.log}
          onNewCommentCancel={() => alert('Cancel')}
          onNewCommentDone={() => alert('Done')}
        />
        <NoteComment
          authorName="Mate Papp"
          date="12 minutes ago"
          paragraph={commentParagraph}
          upvoteCounts={16}
          isUpvoted={false}
          onDelete={() => alert('Delete')}
          onVote={() => alert('Like')}
        />

        <FormField flex="grow" basis="1" htmlFor="email-input" margin="none">
          <TextInput plain id="email-input" placeholder="iLoveLearning@somuch.com" />
        </FormField>
        <RegistrationCard
          name={registrationCardName}
          email={registrationCardEmail}
          onRegistration={(password: string) => alert(password)}
        />
        <Box gap="small" direction="row" wrap alignContent="around">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
            <NoteCard
              key={number || 0}
              noteNumber={number}
              title={noteCardTitle}
              abstract={noteCardAbstracts[number % noteCardAbstracts.length]}
              dateLabel={new Date().toLocaleString()}
              margin="small"
            />
          ))}
        </Box>
        <Box direction="column" gap="medium">
          <InfoCard title={infoCardTitle} subtitle={infoCardSubtitle} content={infoCardContent} />
          <InfoCard title={infoCardTitle} content={infoCardContent} />
        </Box>
        <Footer />
      </Box>
    </Grommet>
  );
};

export default GrommetComponents;
