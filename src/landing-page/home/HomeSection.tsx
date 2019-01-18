import React from 'react';
import { Parallax } from 'react-parallax';
import { withRouter } from 'react-router';
import Scroll from 'react-scroll';
import { Banner, Button, Flex, Hide, Image, Input } from 'rebass';
import styled from 'styled-components';

import downArrow from '../../assets/images/down.svg';
import { scrollOptions } from '../../constants';
import i18n from '../../services/i18n';
import { color, Header1, Header3 } from '../styles';

const { scroller } = Scroll;

export const LoginInput = styled(Input)`
  color: ${color.darkBlue};
  height: 50px;
  border: 1px solid ${color.CogitoBlue};
  background-color: ${color.almostWhite};
  box-shadow: 0;
  font-weight: medium;
  padding-left: 15px;
  border-radius: 15px;
`;

const Home = () => {
  return (
    <Flex flexDirection="column">
      <Flex
        flexDirection="column"
        className="Home"
        css={['background: linear-gradient(309.89deg, #4787D3 10.57%, #67BCFB 105.29%);']}
      >
        <Parallax blur={0} bgImage={require('../../assets/images/homeBackground.svg')} strength={800}>
          <Banner p={0} width="100%" bg="transparent">
            <Flex
              width={['100%', '100%', '100%', '75%', '65%']}
              flexDirection={['column', 'column', 'column', 'row']}
              justifyContent="center"
              alignItems="center"
              mt={['100px', '150px', '200px', '30px', '60px']}
              className="home"
              css={{
                maxWidth: '1024px',
              }}
            >
              <Flex
                width={['273px', '340px', '434px', i18n.t('home.motto.width'), i18n.t('home.motto.width')]}
                mr={['10px', '40px']}
                mb={['50px', '50px', '50px', '0px']}
                css={{
                  maxWidth: '600px',
                }}
              >
                <Flex flexDirection="column" alignItems={['flex-start']} justifyContent="center">
                  <Header1 fontSize={['32px', '32px', '40px', '40px', '48px']} color="#FFF">
                    {i18n.t('home.motto.part1')}
                    <span>{i18n.t('home.motto.span')}</span>
                    {i18n.t('home.motto.part2')}
                  </Header1>
                  <Header3 fontSize={['18px', '18px', '18px', '18px', '22px']} color="#FFF" mt={30}>
                    {i18n.t('home.subtitle')}
                  </Header3>
                </Flex>
              </Flex>
            </Flex>
          </Banner>
        </Parallax>
      </Flex>
      <Hide xsmall small medium>
        <Flex flexDirection="column" alignItems="center">
          <Button
            onClick={() => scroller.scrollTo('About', scrollOptions)}
            bg="transparent"
            mt="-50px"
            css={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transition: 'all 0.2s ease-in-out',
                transform: 'translatey(10px)',
              },
            }}
          >
            <Image src={downArrow} className="downButton" />
          </Button>
        </Flex>
      </Hide>
    </Flex>
  );
};

export const HomeSection = withRouter(Home);
