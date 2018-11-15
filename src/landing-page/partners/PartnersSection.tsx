import React from 'react';
import { Flex, Image, Link } from 'rebass';

import { color, Header1 } from '../styles';
import startitkhwhite from '../img/startitkhwhite.svg';
import designterminal from '../img/designterminal.svg';
import inputprogram from '../img/inputprogram.png';
import i18n from '../../services/localization/i18n';

export const PartnersSection = () => (
  <Flex
    name="Partners"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    mt={['0px', '0px', '0px', '100px', '100px']}
    css={['background: linear-gradient(309.89deg, #4787D3 10.57%, #67BCFB 105.29%);']}
  >
    <Header1 fontSize={['32px', '32px', '40px', '48px', '48px']} color={color.white} mt="100px" textAlign="center">
      {i18n.t('partners.title')}
    </Header1>

    <Flex flexDirection={['column', 'column', 'column', 'row']} alignItems="center" mb="100px">
      <Link href="https://startitkh.hu" target="_blank">
        <Image mx={['50px']} width={['240px']} src={startitkhwhite} mt="60px" />
      </Link>
      <Link href="http://designterminal.org/" target="_blank">
        <Image mx={['50px']} width={['240px']} src={designterminal} mt="60px" />
      </Link>
      <Link href="https://inputprogram.com/" target="_blank">
        <Image mx={['50px']} width={['140px']} src={inputprogram} mt="60px" />
      </Link>
    </Flex>
  </Flex>
);
