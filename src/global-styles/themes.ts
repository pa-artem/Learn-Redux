const theme = {
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

type KeysOfUnion<T> = T extends T ? keyof T : never;

export type MnemonicValue = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

type ColorType = keyof typeof theme;
type ColorVariableDescription = { value: string; variable: string; name: string };

const themeVariables: Record<ColorType, Record<MnemonicValue, ColorVariableDescription>> = <any>{};

(Object.keys(theme) as ColorType[]).forEach((colorType) => {
  type ColorMnemonic = KeysOfUnion<typeof theme[typeof colorType]>;

  themeVariables[colorType] = <Record<MnemonicValue, ColorVariableDescription>>{};
  (Object.keys(theme[colorType]) as unknown as ColorMnemonic[]).forEach((mnemonic) => {
    const name = `--color-${colorType}-${mnemonic}`;

    themeVariables[colorType][mnemonic] = {
      value: (theme[colorType] as Record<MnemonicValue, string>)[mnemonic],
      name,
      variable: `var(${name})`,
    };
  });
});

const themeVariablesCSS = (Object.keys(themeVariables) as ColorType[])
  .flatMap((type) =>
    (Object.keys(themeVariables[type]) as MnemonicValue[]).map(
      (weight) => `${themeVariables[type][weight].name}: ${themeVariables[type][weight].value};`,
    ),
  )
  .join('');

export { themeVariablesCSS };

export default themeVariables as {
  [ColorType in keyof typeof theme]: Record<
    keyof typeof theme[ColorType],
    ColorVariableDescription
  >;
};
