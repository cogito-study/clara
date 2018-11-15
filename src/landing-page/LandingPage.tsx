import React, { FunctionComponent } from 'react';
import { Provider } from 'rebass';
import { withNamespaces, WithNamespaces } from 'react-i18next';

import { NavContainer } from './nav/NavContainer';
import { HomeSection } from './home/HomeSection';
import { AboutSection } from './about/AboutSection';
import { WhySection } from './why/WhySection';
import { PartnersSection } from './partners/PartnersSection';
import { ContactSection } from './contact/ContactSection';
import { GlobalStyle } from './GlobalStyle';
import { theme } from './theme';

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
