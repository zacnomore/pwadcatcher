// Adapted from https://github.com/chodorowicz/ts-debounce

// tslint:disable-next-line: no-any
export type Procedure = (...args: any[]) => void;

export interface IOptions {
  isImmediate: boolean;
}

export function debounce<F extends Procedure> (
  func: F,
  waitMilliseconds: number = 50,
  options: IOptions = {
    isImmediate: false
  },
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function(this: ThisParameterType<F>, ...args: Parameters<F>): void {
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


// Adapted from https://gist.github.com/Almenon/f2043143e6e7b4610817cb48c962d4d5#file-throttle-ts-L48

export function throttle<F extends Procedure>(fn: F, wait: number): (...args:Parameters<F>) => void {
  let wasCalled = false;
  const context = this;

  return (...args) => {
    if (!wasCalled) {
      fn.apply(context, args);
      wasCalled = true;
      setTimeout(() => {
        wasCalled = false;
      }, wait);
    }
  };
}