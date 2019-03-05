import React, { FunctionComponent } from 'react';
import { Parallax } from 'react-parallax';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import Scroll from 'react-scroll';
import { Banner, Button, Flex, Hide, Image, Input } from 'rebass';
import styled from 'styled-components';
import downArrow from '../../assets/images/down.svg';
import { scrollOptions } from '../../constants';
import { routeBuilder } from '../../route/routeBuilder';
import i18n from '../../services/i18n';
import { color, Header1, Header3 } from '../styles';
import { SubscribeButton } from '../subscribe';

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

const Home: FunctionComponent<RouteComponentProps> = ({ history }) => {
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
              mt={['100px', '100px', '100px', '30px', '60px']}
              className="home"
              css={{
                maxWidth: '1024px',
              }}
            >
              <Flex
                width={['300px', '340px', '434px', i18n.t('home.motto.width'), i18n.t('home.motto.width')]}
                mb={['50px', '50px', '50px', '0px']}
                css={{
                  maxWidth: '600px',
                }}
              >
                <Flex flexDirection="column" alignItems={['center']} justifyContent="center">
                  <Header1 textAlign="center" fontSize={['26px', '30px', '36px', '48px']} color="#FFF">
                    {i18n.t('home.motto.part1')}
                    <span>{i18n.t('home.motto.span')}</span>
                    {i18n.t('home.motto.part2')}
                  </Header1>
                  <Header3 textAlign="center" fontSize={['16px', '16px', '18px', '18px']} color="#FFF" mt={30}>
                    {i18n.t('home.subtitle')}
                  </Header3>
                  <SubscribeButton
                    css={['background: linear-gradient(101.81deg, #FFFFFF 1%, #FFFFFF 136.47%);']}
                    mt={60}
                    onClick={() => history.push(routeBuilder.login())}
                    maxWidth={200}
                    fontSize={20}
                    color={color.darkBlue}
                    borderRadius={10}
                  >
                    {i18n.t('home.buttontitle')}
                  </SubscribeButton>
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
