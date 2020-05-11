import Profile2 from './components/Profile2Wrapper';
import PersonalInformation from './components/PersonalInformation';
import AccountSecurity from './components/AccountSecurity';

const personalInformation = {
  path: '/profile/personal-information',
  component: PersonalInformation,
  key: 'personal-information',
  name: 'Personal and contact information',
};

const accountSecurity = {
  path: '/profile/account-security',
  component: AccountSecurity,
  key: 'account-security',
  name: 'Account security',
};

export const childRoutes = {
  personalInformation,
  accountSecurity,
};

const routes = {
  path: '/profile',
  component: Profile2,
  indexRoute: {
    onEnter: (nextState, replace) => {
      replace(personalInformation.path);
    },
  },
  childRoutes: Object.values(childRoutes),
};

export default routes;
