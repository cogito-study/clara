import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { Fixed, Hide } from 'rebass';

import { NavButton } from './NavButton';
import { NavLink } from './NavLink';
import { NavLogo } from './NavLogo';
import { NavToolbar } from './NavToolbar';
import { scrollOptions } from '../../constants';
import { Language, english, hungarian } from '../../types/language';

import i18n from '../../services/i18n';

const { scroller } = Scroll;

export class NavContainer extends Component<{}, { anotherLanguage: Language }> {
  state = {
    anotherLanguage: hungarian,
  };

  componentDidMount() {
    i18n.changeLanguage(english.id);
  }

  changeLanguage = () => {
    const { anotherLanguage } = this.state;
    anotherLanguage === hungarian
      ? (i18n.changeLanguage(hungarian.id), this.setState({ anotherLanguage: english }))
      : (i18n.changeLanguage(english.id), this.setState({ anotherLanguage: hungarian }));
  };

  scrollToSection = (section: string) => {
    scroller.scrollTo(section, scrollOptions);
  };

  render() {
    return (
      <Fixed zIndex={10} top={0} left={0} right={0} p={0}>
        <NavToolbar>
          <Hide xsmall small>
            <NavLogo onClick={() => this.scrollToSection('Home')} />
          </Hide>

          <NavLink onClick={() => this.scrollToSection('About')}>{i18n.t('nav.about')}</NavLink>
          <NavLink onClick={() => this.scrollToSection('Why')}>{i18n.t('nav.why')}</NavLink>
          <NavLink onClick={() => this.scrollToSection('Partners')}>{i18n.t('nav.partners')}</NavLink>
          <NavLink onClick={() => this.scrollToSection('Contact')}>{i18n.t('nav.contact')}</NavLink>

          <NavButton onClick={this.changeLanguage}>{this.state.anotherLanguage.name}</NavButton>
        </NavToolbar>
      </Fixed>
    );
  }
}
