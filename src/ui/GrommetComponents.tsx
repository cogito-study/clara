import * as React from 'react';
import { Box, Button, TextInput, Grid } from 'grommet';
import { FormField, Footer, NoteCard, InfoCard, RegistrationCard } from './components';

const registrationCardName = 'Körmendy Bertalan';
const registrationCardEmail = 'berci.kormendy@cogito.study';
const noteCardTitle = 'Origin of heart murmurs. Diastolic murmurs.';
const noteCardAbstract =
  'Létfontos szerv: bőr és nyálkahártya nélkül nincs élet (ld. súlyos égést követő állapotok, Lyell szindróma)!';
const noteCardmodifiedDate = 'Frissítve: 2018. 08. 25';
const infoCardTitle = 'Követelmények';
const infoCardSubtitle = 'Ilyen, ha van alcím';
const infoCardContent =
  'Az előadásokon történő részvétel kötelező, a hallgatókat az előadásokon tájékoztatjuk arról, hogy azok anyagait az adott tárgy (Sebészet III.) vizsgáján teszt formájában számon kérjük. Az előadás tematikájára a tanszékvezető javaslatokat tehet. A hallgatók minden előadáson lehetőséget kapnak visszajelzésekre, ill. kérdéseik feltevésére. A gyakorlatokon történő részvétel kötelező, minden gyakorlaton katalógust vezetünk (titkárságon elzárva). Erről a hallgatókat az egyetemi hallgatói tájékoztatóban írásban, ill. a gyakorlatokon szóban tájékoztatjuk. A gyakorlatokon a hallgatókat köpennyel, ill. személyre szóló névtáblával látjuk el, minden csoport kinyomtatott formában megkapja a részletes órarend egy példányát. A vizsgán számon kért anyagokról, illetve az ajánlott irodalmakról (jegyzet, könyv, előadások, gyakorlatok stb.) a hallgatókat az egyetem hallgatói tájékoztatójában és honlapunkon tájékoztatjuk. Irodalom: Acsády Gy. – Nemes A.: Az érsebészet tankönyve. Medicina, Budapest, 2007. Acsády Gy. – Nemes A.: Az érbetegségek klinikai és műtéttani atlasza. Medicina, Budapest, 2005. Gaál Cs.: Sebészet. Medicina, Budapest, 2012.';

export const GrommetComponents = () => {
  return (
    <Box align="center" gap="large" background="#FBFDFF">
      <Button primary label="Main Button" onClick={() => alert('Rakatintottal a gombra!')} />
      <FormField flex="grow" basis="1" htmlFor="email-input" margin="none">
        <TextInput plain id="email-input" placeholder="iLoveLearning@somuch.com" />
      </FormField>
      <RegistrationCard
        name={registrationCardName}
        email={registrationCardEmail}
        onPasswordChange={console.log}
        onPasswordCheckChange={console.log}
      />
      <Grid
        columns={{
          count: 3,
          size: 'auto',
        }}
        gap="medium"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
          <NoteCard
            key={number || 0}
            number={number}
            title={noteCardTitle}
            abstract={noteCardAbstract}
            date={noteCardmodifiedDate}
          />
        ))}
      </Grid>
      <Grid
        columns={{
          count: 1,
          size: 'auto',
        }}
        gap="medium"
      >
        <InfoCard title={infoCardTitle} subtitle={infoCardSubtitle} content={infoCardContent} />
        <InfoCard title={infoCardTitle} content={infoCardContent} />
      </Grid>
      <Footer />
    </Box>
  );
};

export default GrommetComponents;
