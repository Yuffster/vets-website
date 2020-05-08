import Profile2 from './components/Profile2';
import PersonalInformation from './components/PersonalInformation';

const personalInformation = {
  path: '/profile/personal-information',
  component: PersonalInformation,
  key: 'personal-information',
  name: 'Personal and contact information',
};

export const childRoutes = {
  personalInformation,
};

const routes = {
  path: '/profile',
  component: Profile2,
  indexRoute: {
    onEnter: replace => {
      replace(personalInformation.path);
    },
  },
  childRoutes: Object.values(childRoutes),
};

export default routes;
