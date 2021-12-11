import { between } from 'polished';

export type Breakpoint = 'smallest' | 'small' | 'medium' | 'large';
export type ValueMnemonic = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

type BreakpointsMap = Record<Breakpoint, { value: string; next?: Breakpoint }>;
export type ValuesMap = Record<Breakpoint, Partial<Record<ValueMnemonic, string>>>;

export const breakpoints: BreakpointsMap = {
  smallest: { value: '17.5rem', next: 'small' },
  small: { value: '40rem', next: 'medium' },
  medium: { value: '75rem', next: 'large' },
  large: { value: '100rem' },
};

type BodyCallback = (breakpoint: Breakpoint, nextBreakpoint: Breakpoint | undefined) => string;

/**
 * Calls the given callback for each of the breakpoint. Also passes the next breakpoint to the
 * callback. The result is a string containing media queries for each of the breakpoint.
 */
export function forEachBreakpoint(bodyCallback: BodyCallback): string {
  return (Object.keys(breakpoints) as Breakpoint[])
    .map((breakpoint) => {
      const body = bodyCallback(breakpoint, breakpoints[breakpoint].next);
      return breakpoint == 'smallest'
        ? `:root { ${body} }`
        : `@media(min-width: ${breakpoints[breakpoint].value}) { :root { ${body} } }`;
    })
    .join('');
}

/**
 * Generates custom properties with media queries interpolated by polished.between.
 */
export function customPropertiesBetween(name: string, valuesMap: ValuesMap): string {
  return forEachBreakpoint((breakpoint, nextBreakpoint) =>
    valuesMap[breakpoint]
      ? (Object.keys(valuesMap[breakpoint]) as ValueMnemonic[])
        .map((size) => {
          const fromSize = valuesMap[breakpoint][size];

          if (!fromSize) {
            return '';
          }
          if (!nextBreakpoint) {
            return `--${name}-${size}: ${fromSize};`;
          }

          const toSize = valuesMap[nextBreakpoint][size];
          if (!toSize) {
            return '';
          }

          const fromScreenSize = breakpoints[breakpoint].value;
          const toScreenSize = breakpoints[nextBreakpoint].value;

          return `--${name}-${size}: ${between(fromSize, toSize, fromScreenSize, toScreenSize)};`;
        })
        .join('')
      : '',
  );
}

function* valueMnemonics(): Generator<string> {
  for (let i = 0; i < 9; i += 1) {
    yield String((i + 1) * 100);
  }
}

/**
 * Takes a table of values and fills any missing values.
 */
export function fillValuesMap(valuesMap: ValuesMap, defaultValue: string): ValuesMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filledValuesMap: any = {};

  (Object.keys(breakpoints) as Breakpoint[]).forEach((breakpoint) => {
    filledValuesMap[breakpoint] = {};
    const presentSizes = Object.keys(valuesMap[breakpoint]) as ValueMnemonic[];
    if (presentSizes.length == 0) {
      for (const mnemonic of valueMnemonics()) {
        filledValuesMap[breakpoint][mnemonic] = defaultValue;
      }
    } else {
      for (const mnemonic of valueMnemonics()) {
        let candidate = presentSizes[0];

        for (const presentSize of presentSizes) {
          const presentSizeNumber = Number.parseInt(presentSize, 10);
          const mnemonicSizeNumber = Number.parseInt(mnemonic, 10);
          const candidateSizeNumber = Number.parseInt(candidate, 10);

          if (
            Math.abs(presentSizeNumber - mnemonicSizeNumber) <
            Math.abs(candidateSizeNumber - mnemonicSizeNumber)
          ) {
            candidate = presentSize;
          }
        }
        filledValuesMap[breakpoint][mnemonic] = valuesMap[breakpoint][candidate];
      }
    }
  });

  return filledValuesMap as ValuesMap;
}

export function customPropertiesNames(name: string): Record<ValueMnemonic, string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fontSizeRaw: any = {};

  for (let i = 0; i < 9; i += 1) {
    fontSizeRaw[String((i + 1) * 100)] = `var(--${name}-${(i + 1) * 100})`;
  }

  return fontSizeRaw as Record<ValueMnemonic, string>;
}
