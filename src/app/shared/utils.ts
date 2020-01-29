// Adapted from https://github.com/chodorowicz/ts-debounce

// tslint:disable-next-line: no-any
export type Procedure<P> = (...args: any[]) => void;

export interface IOptions {
  isImmediate: boolean;
}

export function debounce<F extends Procedure<Parameters<F>>>(
  func: F,
  waitMilliseconds = 50,
  options: IOptions = {
    isImmediate: false
  },
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function(this: ThisParameterType<F>, ...args: Parameters<F>) {
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
  };
}
