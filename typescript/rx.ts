class MyObservable<T> {

  private readonly _subscribe: ((subscriber: MySubscriber<T>) => void) | null = null;

  constructor(subscribe: (subscriber: MySubscriber<T>) => void) {
    this._subscribe = subscribe;
  }

  subscribe(observer?: (next: any) => any): MySubscription {
    const subscriber = new MySubscriber(observer);
    if (this._subscribe) {
      this._subscribe(subscriber);
    }
    return subscriber;
  }

  pipe(): this {
    return this;
  }
}

class MySubscription {
  unsubscribe(): void {

  }
}

class MySubscriber<T> extends MySubscription {

  private readonly _observer: ((next: any) => any) | null = null;

  constructor(observer?: (next: any) => any) {
    super();
    if (observer) {
      this._observer = observer;
    }
  }

  next(value: T): void {
    if (this._observer) {
      this._observer(value);
    }
  }

  error(): void {

  }

  complete(): void {

  }
}

interface MyObserver {
  next?: (...args: any) => any;
  error?: (...args: any) => any;
  complete?: (...args: any) => any;
}

export function myof<T>(...args: T[]): MyObservable<T> {
  return new MyObservable<T>((subscriber: MySubscriber<T>) => {
    for (const arg of args) {
      subscriber.next(arg);
    }
    subscriber.complete();
  });
}

export function myInterval<T>(...args: T[]): MyObservable<T> {
  return new MyObservable<T>((subscriber: MySubscriber<T>) => {
    for (let i = 0; i < args.length; i++) {
      setTimeout(() => subscriber.next(args[i]), i * 1000);
    }
    subscriber.complete();
  });
}
