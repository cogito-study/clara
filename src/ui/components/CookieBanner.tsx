import { Box, Button, Image, Layer, ResponsiveContext, Text } from 'grommet';
import Cookies from 'js-cookie';
import React, { FunctionComponent, useContext, useState } from 'react';

import cookie from '../../assets/images/cookie.svg';

export interface Props {
  descriptionText: string;
  buttonText: string;
}

export const CookieBanner: FunctionComponent<Props> = ({ descriptionText, buttonText }) => {
  const screenSize = useContext(ResponsiveContext);
  const [isVisible, setIsVisible] = useState(true);

  const hideCookieBanner = () => {
    Cookies.set('CogitoCookie', 'true', { expires: 365 });
    setIsVisible(false);
  };

  return (
    <Layer
      position={isVisible ? 'bottom' : 'hidden'}
      full="horizontal"
      modal={false}
      margin="none"
      responsive={false}
      plain
    >
      <Box
        align="center"
        justify="center"
        elevation="medium"
        pad="medium"
        background={{ color: 'white', opacity: 'strong' }}
      >
        <Box direction="row-responsive" align="center" justify="center" gap={'large'} style={{ maxWidth: '1300px' }}>
          {screenSize === ('small' || 'xsmall') ? undefined : <Image src={cookie} />}
          <Text size="medium">{descriptionText}</Text>
          <Button primary color="primary" label={buttonText} onClick={() => hideCookieBanner()} />
        </Box>
      </Box>
    </Layer>
  );
};
