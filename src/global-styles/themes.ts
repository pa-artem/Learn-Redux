import { ValueMnemonic } from './breakpoints';

const defaultTheme = {
  neutral: {
    100: '#f0eff4',
  },
  primary: {
    200: '#8ecde6',
    300: '#66a1ff',
    400: '#6b61ff',
  },
  secondary: {
    400: '#fadda2',
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const defaultThemeVariables: any = {};
Object.keys(defaultTheme).forEach((colorType) => {
  defaultThemeVariables[colorType] = {};
  Object.keys((defaultTheme as any)[colorType]).forEach((mnemonic) => {
    const name = `--color-${colorType}-${mnemonic}`;

    defaultThemeVariables[colorType][mnemonic] = {
      value: (defaultTheme as any)[colorType][mnemonic],
      name,
      variable: `var(${name})`,
    };
  });
});
/* eslint-enable @typescript-eslint/no-explicit-any */

const themeVariables = Object.keys(defaultThemeVariables)
  .flatMap((type) =>
    Object.keys(defaultThemeVariables[type]).map(
      (weight) =>
        `${defaultThemeVariables[type][weight].name}: ${defaultThemeVariables[type][weight].value};`,
    ),
  )
  .join('');

console.log(themeVariables);

export { themeVariables };

export default defaultThemeVariables as Record<
  keyof typeof defaultTheme,
  Record<ValueMnemonic, { value: string; variable: string; name: string }>
>;
