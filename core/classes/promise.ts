// const p = new Promise((resolve, reject) => {
//   setTimeout(() => resolve(1), 1000);
// });

type Func = (value: any) => any;

export class MyPromise {

  constructor(private executor: (resolve: Func, reject: Func) => any) {}

  private thenRegistered = false;
  private catchRegistered = false;
  private finallyCalled = false;

  private finallyCb = (arg?: any) => {};

  private initResolve(cb: (v: any) => any): void {
    const fn = (v: any) => {
      cb(v);
      if (!this.catchRegistered || !this.finallyCalled) {
        this.finallyCb();
      }
    };
    this.executor((v: any) => fn(v), () => {});
  }

  private initReject(cb: (v: any) => any): void {
    const fn = (v: any) => {
      cb(v);
      if (!this.thenRegistered || !this.finallyCalled) {
        this.finallyCb();
      }
    };
    this.executor(() => {}, (v: any) => fn(v));
  }

  then(cb: (arg: any) => any): this {
    this.thenRegistered = true;
    const t = setTimeout(() => {
      this.initResolve(cb);
      clearTimeout(t);
    });
    return this;
  }

  catch(cb: (arg: any) => any): this {
    this.catchRegistered = true;
    const t = setTimeout(() => {
      this.initReject(cb);
      clearTimeout(t);
    });
    return this;
  }

  finally(cb: (arg: any) => any): this {
    this.finallyCb = (arg: any) => {
      this.finallyCalled = true;
      cb(arg);
    };
    return this;
  }
}

export const p = new MyPromise((resolve, reject) => {
  setTimeout(() => reject(1), 2000);
  resolve(2);
});
