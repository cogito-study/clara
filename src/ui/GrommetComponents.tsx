import React, { FunctionComponent } from 'react';
import { Box, Button, TextInput } from 'grommet';
import { FormField, Footer, NoteCard, InfoCard, RegistrationCard, NoteCommentBox, Notification } from './components';
import { RouteComponentProps } from 'react-router';

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
  return (
    <Box align="center" gap="large" background="#FBFDFF">
      <Notification type="error" message="There is an error" />
      <Notification type="ok" message="It's a success" />
      <Button primary label="Main Button" onClick={() => alert('Rakatintottal a gombra!')} />
      <Button label="Main Button" onClick={() => alert('Rakatintottal a gombra!')} />

      <NoteCommentBox
        author="Mate Papp"
        date="12 minutes ago"
        paragraph={commentParagraph}
        upvoteCounts={16}
        onUpvote={() => alert('Like')}
      />

      <FormField flex="grow" basis="1" htmlFor="email-input" margin="none">
        <TextInput plain id="email-input" placeholder="iLoveLearning@somuch.com" />
      </FormField>
      <RegistrationCard
        name={registrationCardName}
        email={registrationCardEmail}
        isRegistrationDisabled={false}
        isLoading={false}
        onPasswordChange={console.log}
        onPasswordCheckChange={console.log}
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
  );
};

export default GrommetComponents;
