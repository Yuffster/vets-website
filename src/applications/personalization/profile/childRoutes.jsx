import PersonalInformation from 'applications/personalization/profile-2/components/PersonalInformation';
import MilitaryInformation from 'applications/personalization/profile-2/components/MilitaryInformation';
import DirectDeposit from 'applications/personalization/profile-2/components/DirectDeposit';
import AccountSecurity from 'applications/personalization/profile-2/components/AccountSecurity';
import ConnectedApplications from 'applications/personalization/profile-2/components/ConnectedApplications';

export const personalInformation = {
  path: 'personal-information',
  component: PersonalInformation,
  key: 'personal-information',
  name: 'Personal and contact Information',
};

export const militaryInformation = {
  path: 'military-information',
  component: MilitaryInformation,
  key: 'military-information',
  name: 'Military information',
};

export const directDeposit = {
  path: 'direct-deposit',
  component: DirectDeposit,
  key: 'direct-deposit',
  name: 'Direct deposit information',
};

export const accountSecurity = {
  path: 'account-security',
  component: AccountSecurity,
  key: 'account-security',
  name: 'Account security',
};

export const connectedApplications = {
  path: 'connected-applications',
  component: ConnectedApplications,
  key: 'connected-applications',
  name: 'Connected applications',
};

export const childRoutes = {
  personalInformation,
  militaryInformation,
  directDeposit,
  accountSecurity,
  connectedApplications,
};
