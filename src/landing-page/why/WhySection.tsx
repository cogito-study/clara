import React from 'react';
import { Flex, Image } from 'rebass';

import { color, Paragraph, Header1 } from '../styles';
import { ContactCard } from '../contact/ContactCard';
import i18n from '../../services/localization/i18n';
import iphoneMockupEn from '../img/iphoneMockup(EN).png';
import iphoneMockupHun from '../img/iphoneMockup(HUN).png';

export const WhySection = () => (
  <Flex justifyContent="center" alignItems="center" pt={['20px', '40px', '60px', '140px', '150px']} name="Why">
    <Flex
      width={['100%', '100%', '100%', '85%', '70%']}
      justifyContent="center"
      css={{
        maxWidth: '1024px',
      }}
    >
      <ContactCard p={0}>
        <Flex alignItems="center" justifyContent="center" flexDirection={['column', 'column', 'column', 'row']}>
          <Flex flexDirection="column" px={['4%', '10%', '20%', '10%']} width={['100%', '100%', '100%', '60%']}>
            <Header1
              color={color.CogitoBlue}
              fontSize={['32px', '32px', '40px', '48px', '48px']}
              textAlign={['center', 'center', 'center', 'left']}
              mt={['40px', '45px', '50px', '0px']}
            >
              {i18n.t('why.title')}
            </Header1>

            <Paragraph
              width={400}
              color={'#666'}
              my={['30px', '35px', '35px', '45px']}
              textAlign={['center', 'center', 'center', 'left']}
            >
              {i18n.t('why.content')}
            </Paragraph>
          </Flex>
          <Image
            width={['85%', '70%', '40%', '40%', '36%']}
            src={i18n.language === 'hu' ? iphoneMockupHun : iphoneMockupEn}
            mt={['20px', '30px', '35px', '10%']}
          />
        </Flex>
      </ContactCard>
    </Flex>
  </Flex>
);
