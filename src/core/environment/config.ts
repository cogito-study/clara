export const config = {
  environment: process.env.REACT_APP_ENVIRONMENT,
  apiURL: process.env.REACT_APP_API_URL,
  wsURL: process.env.REACT_APP_WS_URL,
  googleAnalyticsKey: 'UA-135440672-1',
  sentryDSN: 'https://fb58dd3770e24645ae9023bbd5797c7c@sentry.io/1363186',
};

export const isProduction = config.environment === 'production';
