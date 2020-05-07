import set from 'platform/utilities/data/set';
import vet360 from 'vet360/reducers';
import { hcaEnrollmentStatus } from 'applications/hca/reducer';

import {
  OPEN_SIDE_NAV,
  CLOSE_SIDE_NAV,
  PIN_MENU_TRIGGER,
  UNPIN_MENU_TRIGGER,
} from 'applications/personalization/profile-2/actions';

import {
  FETCH_HERO_SUCCESS,
  FETCH_PERSONAL_INFORMATION_SUCCESS,
  FETCH_MILITARY_INFORMATION_SUCCESS,
} from '../actions';

import {
  PAYMENT_INFORMATION_FETCH_SUCCEEDED,
  PAYMENT_INFORMATION_FETCH_FAILED,
  PAYMENT_INFORMATION_SAVE_STARTED,
  PAYMENT_INFORMATION_SAVE_SUCCEEDED,
  PAYMENT_INFORMATION_SAVE_FAILED,
  PAYMENT_INFORMATION_EDIT_MODAL_TOGGLED,
} from '../actions/paymentInformation';

const initialState = {
  isSideNavOpen: false,
  isMenuTriggerPinned: false,
  focusTriggerButton: false,
  hero: null,
  personalInformation: null,
  militaryInformation: null,
  paymentInformation: null,
  paymentInformationUiState: {
    isEditing: false,
    isSaving: false,
    responseError: null,
  },
};

function vaProfile(state = initialState, action) {
  switch (action.type) {
    case FETCH_HERO_SUCCESS:
      return set('hero', action.hero, state);

    case FETCH_PERSONAL_INFORMATION_SUCCESS:
      return set('personalInformation', action.personalInformation, state);

    case FETCH_MILITARY_INFORMATION_SUCCESS:
      return set('militaryInformation', action.militaryInformation, state);

    case PAYMENT_INFORMATION_FETCH_SUCCEEDED:
    case PAYMENT_INFORMATION_SAVE_SUCCEEDED: {
      let newState = set('paymentInformation', action.response, state);
      newState = set('paymentInformationUiState.isEditing', false, newState);
      return set('paymentInformationUiState.isSaving', false, newState);
    }

    case PAYMENT_INFORMATION_EDIT_MODAL_TOGGLED: {
      const newState = set(
        'paymentInformationUiState.isEditing',
        !state.paymentInformationUiState.isEditing,
        state,
      );

      return set('paymentInformationUiState.responseError', null, newState);
    }

    case PAYMENT_INFORMATION_SAVE_STARTED:
      return set('paymentInformationUiState.isSaving', true, state);

    case PAYMENT_INFORMATION_FETCH_FAILED: {
      return set(
        'paymentInformation',
        { error: action.response.error || true },
        state,
      );
    }

    case PAYMENT_INFORMATION_SAVE_FAILED: {
      const newState = set('paymentInformationUiState.isSaving', false, state);
      return set(
        'paymentInformationUiState.responseError',
        action.response,
        newState,
      );
    }

    case OPEN_SIDE_NAV:
      return { ...state, isSideNavOpen: true, focusTriggerButton: false };

    case CLOSE_SIDE_NAV:
      return {
        ...state,
        isSideNavOpen: false,
        focusTriggerButton: action.focusTriggerButton,
      };

    case PIN_MENU_TRIGGER:
      return { ...state, isMenuTriggerPinned: true };

    case UNPIN_MENU_TRIGGER:
      return { ...state, isMenuTriggerPinned: false };

    default:
      return state;
  }
}

export default {
  vaProfile,
  vet360,
  hcaEnrollmentStatus,
};
