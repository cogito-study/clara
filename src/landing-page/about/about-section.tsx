import React from 'react';
import { Flex, Image } from 'rebass';

import { color, gradientText, Header1, Paragraph } from '../styles';

import NotesViewEN from '../../assets/images/NotesView(EN).png';
import NotesViewHun from '../../assets/images/NotesView(HUN).png';
import SubjectNewsEn from '../../assets/images/SubjectNews(EN).png';
import SubjectNewsHun from '../../assets/images/SubjectNews(HUN).png';
import i18n from '../../services/i18n';

export const AboutSection = () => (
  <Flex flexDirection="column" name="About">
    <Flex flexDirection="row" alignItems="flex-start" justifyContent="flex-end" className="LearnFrom">
      <Flex alignItems="flex-end" mt={['60px', '60px', '60px', '80px', '200px']} justifyContent="flex-end">
        <Flex
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="flex-end"
          width={['100%', '100%', '100%', '97%', '95%']}
          className="dotted"
          pr={[0, 0, 0, 0, 0]}
        >
          <Flex
            flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'row']}
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              width={['95%', '85%', '65%', '100%']}
              flexDirection="column"
              justifyContent="center"
              ml={['0px', '0px', '0px', '40px', '6%']}
              mr={['0px', '0px', '0px', '0px', '0%']}
              css={{
                maxWidth: '600px',
              }}
            >
              <Header1
                fontSize={['32px', '32px', '40px', '40px', '48px']}
                mt={['40px', '50px', '60px', '0px']}
                css={gradientText}
              >
                {i18n.t('about.section1.title')}
              </Header1>
              <Paragraph
                mt={['20px', '20px', '30px', '48px', '48px']}
                mb={['40px', '40px', '40px', '48px', '48px']}
                mr={['0px', '0px', '0px', '48px', '100px']}
                fontSize={['16px']}
                color={color.CogitoBlue}
              >
                {i18n.t('about.section1.content')}
              </Paragraph>
            </Flex>
            <Flex justifyContent="flex-end" alignItems="center" ml={['0px', '0px', '0px', '50px', '7%']}>
              <Image
                mt={['40px', '20px', '50px', '50px', '-50px']}
                mb={['0px', '0px', '0px', '50px', '-50px']}
                css={['border-radius:10px 0px 0px 10px;', 'box-shadow: 0px 5px 10px rgba(71, 135, 211, 0.4);']}
                width={['90%', '80%', '75%', '1400px', '1400px']}
                src={i18n.language === 'hu' ? NotesViewHun : NotesViewEN}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>

    <Flex flexDirection="row" className="ConnectWith">
      <Flex justifyContent="flex-start" />
      <Flex justifyContent="flex-start" mt={['20px', '50px', '80px', '150px', '250px']}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          width={['100%', '100%', '100%', '95%', '95%']}
          className="dotted"
          pl={[0, 0, 0, 0, 0]}
        >
          <Flex
            flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'row-reverse']}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Flex
              width={['95%', '85%', '65%', '100%']}
              flexDirection="column"
              justifyContent="center"
              mt={['40px', '50px', '60px', '0px']}
              ml={['0px', '0px', '0px', '20px', '0%']}
              mr={['0px', '0px', '0px', '20px', '60px']}
              css={{
                maxWidth: '600px',
              }}
            >
              <Header1 fontSize={['32px', '32px', '40px', '40px', '48px']} css={gradientText}>
                {i18n.t('about.section2.title')}
              </Header1>
              <Paragraph
                mt={['20px', '20px', '30px', '48px', '48px']}
                mb={['40px', '40px', '30px', '48px', '48px']}
                fontSize={['16px']}
                color={color.darkBlue}
              >
                {i18n.t('about.section2.content')}
              </Paragraph>
            </Flex>
            <Flex justifyContent="flex-start" alignItems="center" mr={['0px', '0px', '0px', '50px', '7%']}>
              <Image
                mt={['40px', '20px', '50px', '50px', '-50px']}
                mb={['0px', '0px', '0px', '50px', '-50px']}
                css={['border-radius:0px 10px 10px 0px;', 'box-shadow: 0px 5px 10px rgba(71, 135, 211, 0.4);']}
                width={['90%', '80%', '75%', '1300px', '1300px']}
                src={i18n.language === 'hu' ? SubjectNewsHun : SubjectNewsEn}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);
