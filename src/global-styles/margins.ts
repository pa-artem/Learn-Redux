import { ValuesMap, fillValuesMap, customPropertiesNames } from './breakpoints';

const marginsValues: ValuesMap = {
  smallest: {
    400: '1rem',
    500: '1.25rem',
    700: '2rem',
    900: '3rem',
  },
  small: {
    400: '1.25rem',
    500: '1.75rem',
    700: '2.5rem',
    900: '3.25rem',
  },
  medium: {
    400: '1.5rem',
    500: '2.25rem',
    700: '3.25rem',
    900: '4.25rem',
  },
  large: {
    400: '1.75rem',
    500: '3rem',
    700: '4rem',
    900: '5.5rem',
  },
};

const marginsFilledValues = fillValuesMap(marginsValues, '1rem');
export { marginsFilledValues as marginsValues };

export default customPropertiesNames('font-size');
