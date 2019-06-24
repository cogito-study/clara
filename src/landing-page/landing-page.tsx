import React, { FunctionComponent } from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { Provider } from 'rebass';

import { AboutSection } from './about/about-section';
import { ContactSection } from './contact/contact-section';
import { GlobalStyle } from './global-style';
import { HomeSection } from './home/home-section';
import { NavContainer } from './nav/nav-container';
import { PartnersSection } from './partners/partners-section';
import { theme } from './theme';
import { WhySection } from './why/why-section';
import { CookieBanner } from '../ui/components/cookie-banner';
import Cookies from 'js-cookie';

import i18n from '../services/i18n';

const LandingPage: FunctionComponent<WithNamespaces> = () => (
  <Provider className="background" theme={theme}>
    <GlobalStyle />
    <NavContainer />
    <HomeSection />
    <AboutSection />
    <WhySection />
    <PartnersSection />
    <ContactSection />
    {Cookies.get('CogitoCookie') ? (
      undefined
    ) : (
      <CookieBanner
        descriptionText={i18n.t('general.cookie.description')}
        buttonText={i18n.t('general.cookie.button')}
      />
    )}
  </Provider>
);

export default withNamespaces('translations')(LandingPage);
