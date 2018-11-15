import React, { FunctionComponent } from 'react';
import { Provider } from 'rebass';
// import { injectGlobal } from 'styled-components'; // TODO: Global styles
import { withNamespaces, WithNamespaces } from 'react-i18next';

// import './App.css';

import { NavContainer } from './nav/NavContainer';
import { HomeSection } from './home/HomeSection';
import { AboutSection } from './about/AboutSection';
import { WhySection } from './why/WhySection';
import { PartnersSection } from './partners/PartnersSection';
import { ContactSection } from './contact/ContactSection';
// import { color } from './styles'; // TODO: Global styles
import { theme } from './theme';

const LandingPage: FunctionComponent<WithNamespaces> = () => (
  <Provider className="background" theme={theme}>
    <NavContainer />
    <HomeSection />
    <AboutSection />
    <WhySection />
    <PartnersSection />
    <ContactSection />
  </Provider>
);

export default withNamespaces('translations')(LandingPage);

// injectGlobal`
//   * {
//     box-sizing: border-box;
//   }

//   body,
//   html {
//     text-align: left;
//     margin: 0 auto;
//     height: 100%;
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-between;
//   }

//   span {
//     color: ${color.darkBlue};
//   }

//   .background {
//     background: ${color.almostWhite};
//   }

//   ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
//     color: ${color.placeholderBlue};
//     opacity: 1; /* Firefox */
// }

// @keyframes float {
// 	0% {
// 		transform: translatey(0px);
// 	}
// 	50% {
// 		transform: translatey(-6px);
// 	}
// 	100% {
// 		transform: translatey(0px);
// 	}
// }

// .downButton {
//   transform: translatey(0px);
//   animation: float 2s ease-in-out infinite;
// };

// .contactemail : hover {
//   color: #444;
// }

// .about {
//   overflow: hidden;
// }
// `;
