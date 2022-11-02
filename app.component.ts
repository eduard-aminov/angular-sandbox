import { Component } from '@angular/core';

export const isPresent = <T>(value: T): boolean => {
  return value !== undefined && value !== null;
};

type Fn<T> = (arg: T) => unknown;

class Case<T, P = any> {
  constructor(
    private value: T,
    private result: unknown | null = null,
  ) {}

  case<U>(compareValue: T, result: Fn<U & T> | U): Case<T, P>;
  case(compareValue: any, result: any): Case<any> {
    if (isPresent(this.result)) {
      return this;
    } else if (compareValue === this.value) {
      return handleResultAndGetCase(this.value, result);
    }
    return new Case(this.value);
  }

  default<D>(defaultValue?: D): any {
    if (isPresent(this.result)) {
      return this.result;
    }
    return defaultValue;
  }
}

function handleResultAndGetCase<T>(value: T, result: any): Case<T> {
  if (result instanceof Function) {
    return new Case(value, result(value));
  }
  return new Case(value, result);
}

export function match<T>(value: T): Case<T, T>;
export function match<T>(value: any): Case<any> {
  return new Case<any, T>(value);
}

enum Code {
  A,
  B,
  C,
}


enum Code2 {
  D,
  E,
  F,
}

enum Code3 {
  G,
  I,
  K,
}

const code = Code.A;
const code2 = Code2.D;
const code3 = Code3.G;

const result =
  match(code)
    .case(Code.A, () => match(code2)
      .case(Code2.D, [Code2.D, Code2.E])
      .case(Code2.E, () => match(code3)
        .case(Code3.G, [Code3.G, Code3.I])
        .case(Code3.I, [Code3.I, Code3.K])
        .case(Code3.K, [Code3.K, Code3.G])
        .default(null))
      .case(Code2.F, [Code2.F, Code2.F])
      .default(null))
    .case(Code.B, [Code.A, Code.B])
    .case(Code.C, [Code.C, Code.A])
    .default(null);

console.log(result);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-sandbox';
}
