import React, { Component } from 'react';
import { Flex, Image, Toolbar, Absolute } from 'rebass';

import { color, Paragraph, Header2, Header1, Header3, gradientText } from '../styles';
import { SubscribeButton, SubscribeInput } from '../subscribe';
import { ContactCard } from './ContactCard';
import { SocialImage } from './SocialImage';
import i18n from '../../services/i18n';

import facebook from '../../assets/images/facebook.svg';
import twitter from '../../assets/images/twitter.svg';
import instagram from '../../assets/images/instagram.svg';
import UniversityIcon from '../../assets/images/university_icon.svg';
import StudentIcon from '../../assets/images/student_icon.svg';

const API_URL = 'https://peaceful-mesa-85182.herokuapp.com/register/';

export class ContactSection extends Component<{}, { subscribed: boolean }> {
  state = { subscribed: false };

  submitEmail = (event) => {
    // prevent redirect
    event.preventDefault();

    // send request
    const data = new FormData(event.target);
    fetch(API_URL, { method: 'POST', body: data }).catch((error) => console.log(`Error occurred: ${error}`));

    // optimistic feedback
    this.setState({ subscribed: true });
  };

  render() {
    return (
      <Flex justifyContent="center" alignItems="center" flexDirection="column" name="Contact">
        <Header1 color={color.CogitoBlue} my={50} fontSize={['32px', '32px', '40px', '48px', '48px']}>
          {i18n.t('contact.title')}
        </Header1>
        <Flex flexDirection={['column', 'column', 'column', 'row', 'row']}>
          <Flex width={['97%', '480px']} mr={['0px', '10px', '10px', '30px']} ml={['0px', '10px', '10px', '0px']}>
            <ContactCard p={0}>
              <Flex
                mt={['20px', '20px', '20px', '40px']}
                mx={['10px', '10px', '10px', '50px']}
                justifyContent="flex-end"
              >
                <Absolute>
                  <Image src={StudentIcon} />
                </Absolute>
              </Flex>
              <Flex alignItems="flex-start" flexDirection="column" mb={30} mx={['10px', '10px', '10px', '50px']}>
                <Header2
                  fontSize={['36px', '48px']}
                  css={[gradientText, 'z-index: 1;']}
                  mt={['20px', '30px', '30px', '0px']}
                  mr={['0px', '0px', '0px', '80px', '80px']}
                  textAlign="left"
                >
                  {i18n.t('contact.students.title')}
                </Header2>

                <Paragraph mt={['20px', '30px', '20px', '15px']} css={'z-index: 1;'}>
                  {i18n.t('contact.students.content')}
                </Paragraph>

                <form onSubmit={this.submitEmail} style={{ width: '100%' }}>
                  <Flex flexDirection="column" alignItems="center" mt={['20px', '20px']}>
                    <Flex width="100%" flexDirection="column">
                      <Header3 fontSize={16} color={color.CogitoBlue} textAlign="left" ml="5px">
                        {i18n.t('contact.subscribe.emailtitle')}
                      </Header3>
                      <SubscribeInput
                        name="email"
                        required
                        fontSize="16px"
                        placeholder={i18n.t('contact.subscribe.email')}
                        boxShadow={0}
                        mb={20}
                      />
                    </Flex>
                    <Flex width="100%" flexDirection="column">
                      <Header3 fontSize={16} color={color.CogitoBlue} textAlign="left" ml="5px">
                        {i18n.t('contact.subscribe.unititle')}
                      </Header3>
                      <SubscribeInput
                        name="university"
                        required
                        fontSize="16px"
                        placeholder={i18n.t('contact.subscribe.university')}
                        boxShadow={0}
                      />
                    </Flex>

                    <SubscribeButton
                      css={['background: linear-gradient(101.81deg, #63B6F6 1%, #4A8CD7 136.47%);']}
                      mt={30}
                      fontSize={[1, 2, 2, '24px', '24px']}
                      bg={'#F5FBFF'}
                      color={color.almostWhite}
                      children={
                        this.state.subscribed
                          ? i18n.t('contact.subscribe.reassure')
                          : i18n.t('contact.subscribe.button')
                      }
                      borderRadius={20}
                    />
                  </Flex>
                </form>
              </Flex>
            </ContactCard>
          </Flex>
          <Flex width={['97%', '480px']} ml={['0px', '10px', '10px', '30px']} mr={['0px', '10px', '10px', '0px']}>
            <ContactCard p={0}>
              <Flex
                mt={['20px', '20px', '20px', '40px']}
                mx={['10px', '10px', '10px', '50px']}
                justifyContent="flex-end"
              >
                <Absolute>
                  <Image src={UniversityIcon} />
                </Absolute>
              </Flex>
              <Flex
                alignItems="flex-start"
                flexDirection="column"
                mb={0}
                mx={['10px', '10px', '10px', '50px']}
                position="relative"
              >
                <Header2
                  mt={['25px', '45px', '50px', '0px']}
                  css={[gradientText, 'z-index: 1;']}
                  fontSize={['36px', '48px']}
                  textAlign="left"
                >
                  {i18n.t('contact.universities.title')}
                </Header2>
                <Paragraph mt={['20px', '30px', '20px', '20px']} css={'z-index: 1;'}>
                  {i18n.t('contact.universities.content')}
                </Paragraph>
              </Flex>
              <Flex alignItems="center" justifyContent="center">
                <a
                  style={{ display: 'flex', width: '200px', justifyContent: 'center' }}
                  href="mailto:contact@cogito.study"
                >
                  <SubscribeButton
                    css={['background: linear-gradient(101.81deg, #63B6F6 1%, #4A8CD7 136.47%);']}
                    children={i18n.t('contact.universities.button')}
                    mt={['30px', '60px']}
                    fontSize={[1, 2, 2, '24px', '24px']}
                  />
                </a>
              </Flex>
            </ContactCard>
          </Flex>
        </Flex>
        <Toolbar
          bg={color.CogitoBlue}
          alignItems="center"
          justifyContent="center"
          mt={['60px', '80px', '100px', '80px']}
          py={10}
          width="100%"
        >
          <Flex
            flexDirection={['column', 'column', 'column', 'row']}
            alignItems="center"
            justifyContent="center"
            width="90%"
          >
            <Flex
              width="100%"
              flexDirection={['column', 'column', 'column', 'row']}
              alignItems="center"
              justifyContent={['center', 'center', 'center', 'flex-start']}
              my="20px"
            >
              <a href="mailto:contact@cogito.study" className="contactemail">
                <Header2 color={color.almostWhite} fontSize="16px">
                  {i18n.t('contact.footer.email')}
                </Header2>
              </a>
              {/*
              <a href="mailto:contact@cogito.study" className="contactemail">
                <Header3 color={color.almostWhite} mx="30px" my="20px" fontSize="16px">
                  {i18n.t('contact.footer.terms')}
                </Header3>
              </a>
              <a href="mailto:contact@cogito.study" className="contactemail">
                <Header3 color={color.almostWhite} fontSize="16px">
                  {i18n.t('contact.footer.privacy')}
                </Header3>
              </a>
              */}
            </Flex>

            <Flex flexDirection="row" my="10px" justifyContent="flex-end" width="260px">
              <Flex width="60px">
                <a href="https://www.facebook.com/cogito.study/">
                  <SocialImage src={facebook} />
                </a>
              </Flex>
              <Flex mx="40px" width="60px">
                <a href="https://www.instagram.com/cogito.study/">
                  <SocialImage src={instagram} />
                </a>
              </Flex>
              <Flex width="60px">
                <a href="https://twitter.com/cogitostudy">
                  <SocialImage src={twitter} />
                </a>
              </Flex>
            </Flex>
          </Flex>
        </Toolbar>
      </Flex>
    );
  }
}
