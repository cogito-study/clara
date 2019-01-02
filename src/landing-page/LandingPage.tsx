import React, { FunctionComponent } from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { Provider } from 'rebass';

import { AboutSection } from './about/AboutSection';
import { ContactSection } from './contact/ContactSection';
import { GlobalStyle } from './GlobalStyle';
import { HomeSection } from './home/HomeSection';
import { NavContainer } from './nav/NavContainer';
import { PartnersSection } from './partners/PartnersSection';
import { theme } from './theme';
import { WhySection } from './why/WhySection';

const LandingPage: FunctionComponent<WithNamespaces> = () => (
  <Provider className="background" theme={theme}>
    <GlobalStyle />
    <NavContainer />
    <HomeSection />
    <AboutSection />
    <WhySection />
    <PartnersSection />
    <ContactSection />
  </Provider>
);

export default withNamespaces('translations')(LandingPage);
