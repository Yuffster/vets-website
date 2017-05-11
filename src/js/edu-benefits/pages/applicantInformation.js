import _ from 'lodash/fp';

import currentOrPastDateUI from '../../common/schemaform/definitions/currentOrPastDate';
import fullNameUI from '../../common/schemaform/definitions/fullName';
import ssnUI from '../../common/schemaform/definitions/ssn';

import { relationshipLabels, genderLabels } from '../utils/labels';


const defaults = (prefix) => {
  return {
    fields: [
      `${prefix}FullName`,
      `${prefix}SocialSecurityNumber`,
      'view:noSSN',
      `${prefix}DateOfBirth`,
      'gender',
      'relationship'
    ],
    required: [
      `${prefix}FullName`,
      `${prefix}DateOfBirth`,
      'relationship'
    ],
    labels: {},
    isVeteran: false
  };
};


/**
 * Returns an applicantInformation page based on the options passed.
 *
 * @param {Object} schema   The full schema for the form
 * @param {Object} options  Options to override the defaults above
 */
export default function applicantInformation(schema, options) {
  // Use the defaults as necessary, but override with the options given
  const prefix = (options && options.isVeteran) ? 'veteran' : 'relative';
  const mergedOptions = _.assign(defaults(prefix), options);
  const { fields, required, labels } = mergedOptions;
  const fileNumberProp = prefix === 'relative' ? 'relativeVaFileNumber' : 'vaFileNumber';

  const possibleProperties = _.assign(schema.properties, {
    'view:noSSN': {
      type: 'boolean'
    }
  });

  return {
    path: 'applicant/information',
    title: 'Applicant information',
    initialData: {},
    uiSchema: {
      'ui:order': fields,
      [`${prefix}FullName`]: fullNameUI,
      [`${prefix}SocialSecurityNumber`]: _.assign(ssnUI, {
        'ui:required': (formData) => !_.get('view:noSSN', formData)
      }),
      'view:noSSN': {
        'ui:title': 'I don’t have a Social Security number',
      },
      [fileNumberProp]: {
        'ui:required': (formData) => !!_.get('view:noSSN', formData),
        'ui:title': 'File number',
        'ui:errorMessages': {
          pattern: 'File number must be 8 digits'
        },
        'ui:options': {
          expandUnder: 'view:noSSN'
        }
      },
      [`${prefix}DateOfBirth`]: _.assign(currentOrPastDateUI('Date of birth'),
        {
          'ui:errorMessages': {
            pattern: 'Please provide a valid date',
            futureDate: 'Please provide a valid date'
          }
        }
      ),
      gender: {
        'ui:widget': 'radio',
        'ui:title': 'Gender',
        'ui:options': {
          labels: labels.gender || genderLabels
        }
      },
      relationship: {
        'ui:widget': 'radio',
        'ui:title': 'What\'s your relationship to the Servicemember whose benefit is being transferred to you?',
        'ui:options': {
          labels: labels.relationship || relationshipLabels
        }
      }
    },
    schema: {
      type: 'object',
      definitions: _.pick([
        'fullName',
        'relationship',
        'ssn',
        'gender',
        'date',
        'vaFileNumber'
      ], schema.definitions),
      required,
      properties: _.pick(fields, possibleProperties)
    }
  };
}
