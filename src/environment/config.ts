export const config = {
  environment: process.env.REACT_APP_ENVIRONMENT,
  apiURL: process.env.REACT_APP_API_URL,
  repositoryURL: process.env.REACT_APP_REPOSITORY_URL,
  branch: process.env.REACT_APP_BRANCH,
  pullRequest: process.env.REACT_APP_PULL_REQUEST,
  head: process.env.REACT_APP_HEAD,
  commitRef: process.env.REACT_APP_COMMIT_REF,
  context: process.env.REACT_APP_CONTEXT,
  url: process.env.REACT_APP_URL,
  deployURL: process.env.REACT_APP_DEPLOY_URL,
  deployPrimeURL: process.env.REACT_APP_DEPLOY_PRIME_URL,
};
