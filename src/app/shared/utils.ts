// Adapted from https://github.com/chodorowicz/ts-debounce

// tslint:disable-next-line: no-any
export type Procedure = (...args: any[]) => void;

export interface IOptions {
  isImmediate: boolean;
}

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options: IOptions = {
    isImmediate: false
  },
): F {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function(this: ThisParameterType<F>, ...args: unknown[]) {
    const context = this;

    const doLater = () => {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  // TODO: Figure out how to extract arguements array type
  // tslint:disable-next-line: no-any
  } as any;
}
