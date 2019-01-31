import { Box, Button, Grommet, TextInput, FormField } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  Footer,
  InfoCard,
  InfoCardTop,
  NoteCard,
  NoteComment,
  RegistrationCard,
  TeacherInfo,
  TeacherInfoProps,
} from './components';

import { NotificationContext } from '../contexts/notification/NotificationContext';
import { theme } from '../ui/theme';
import { ForgotPasswordCard } from './components/ForgotPassword/ForgetPasswordCard';
import { FeedbackCard } from './components/ForgotPassword/FeedbackCard';

import { LoginCard } from './components/Login/LoginCard';
import { PopUpCard } from './components/PopUpCard';

import mail from '../assets/images/Mail.svg';
import alertCircle from '../assets/images/alertCircle.svg';
import checkCircle from '../assets/images/checkCircle.svg';

const registrationCardName = 'Körmendy Bertalan';
const registrationCardEmail = 'berci.kormendy@cogito.study';
const noteCardTitle = 'Origin of heart murmurs. Diastolic murmurs.';
const noteCardAbstracts = [
  'Létfontos szerv: bőr és nyálkahártya nélkül nincs élet (ld. súlyos égést követő állapotok, Lyell szindróma)!',
  'Létfontos szerv: bőr és nyálkahártya nélkül nincs élet (ld. súlyos égést követő állapotok',
  'Létfontos szerv: bőr és nyálkahártya nélkül nincs élet (ld. súlyos égést követő állapotok Létfontos szerv: bőr és nyálkahártya nélkül nincs élet (ld. súlyos égést követő állapotok',
  'Létfontos szerv: bőr és nyálkahártya nélkül nincs',
];

const teacherInfoName = 'Jason Evans';
const teacherInfoRole = 'lecturer';
const teacherInfoPhoneNumber = '+36 10 355 4432';
const teacherInfoEmail = 'jasonevans@gmail.com';

const infoCardTeacherInfo: TeacherInfoProps = {
  name: teacherInfoName,
  role: teacherInfoRole,
  phoneNumber: teacherInfoPhoneNumber,
  email: teacherInfoEmail,
};

const infoCardTopInstitute = 'Institute of this subject';
const infoCardTopNeptun = 'ERSEB123';
const infoCardTopDescription =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

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

        <FormField htmlFor="email-input">
          <TextInput plain id="email-input" placeholder="iLoveLearning@somuch.com" />
        </FormField>
        <Box>
          <PopUpCard
            question={'Lorem ipsum dolor sit amet, consectetur adipisicing elit?'}
            details={
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et'
            }
            cancelButton={'cancel'}
            acceptButton={'accept'}
            onAccept={() => alert('Accept')}
            onCancel={() => alert('Cancel')}
          />
        </Box>
        <Box width="400px" align="center" gap="medium">
          <RegistrationCard
            name={registrationCardName}
            email={registrationCardEmail}
            onRegistration={(password: string) => alert(password)}
          />
          <ForgotPasswordCard onForgotPassword={(password: string) => alert(password)} />
          <FeedbackCard
            title="E-mail elküldve"
            icon={mail}
            paragraph="Üzenetet küldtünk e-mailben a jelszó alaphelyzetbe állítására vonatkozó utasításokkal"
            ButtonHidden={true}
          />
          <FeedbackCard
            title="A link elavult 😕"
            icon={alertCircle}
            paragraph="Amennyiben még mindig vissza szeretnéd állítani jelszavad, kattints a gombra."
            ButtonHidden={false}
            ButtonLabel="Jelszó visszaállítás"
          />
          <FeedbackCard
            title="Kész"
            icon={checkCircle}
            paragraph="A jelszavad visszaállítottuk. Most már be tudsz lépni az új jelszóval."
            ButtonHidden={false}
            ButtonLabel="Belépés"
          />
          <LoginCard onLogin={(password: string) => alert(password)} />
        </Box>
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
          <TeacherInfo
            name={teacherInfoName}
            role={teacherInfoRole}
            phoneNumber={teacherInfoPhoneNumber}
            email={teacherInfoEmail}
          />
          <InfoCardTop
            institute={infoCardTopInstitute}
            neptun={infoCardTopNeptun}
            description={infoCardTopDescription}
            teacherInfos={[infoCardTeacherInfo, infoCardTeacherInfo, infoCardTeacherInfo]}
          />
          <InfoCard title={infoCardTitle} subtitle={infoCardSubtitle} content={infoCardContent} />
          <InfoCard title={infoCardTitle} content={infoCardContent} />
        </Box>
        <Footer />
      </Box>
    </Grommet>
  );
};

export default GrommetComponents;
