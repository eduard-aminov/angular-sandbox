type ValuesWithKeys<T, K extends keyof T> = T[K];
type Values<T> = ValuesWithKeys<T, keyof T>;

interface User {
  name: string;
  age: number;
}

type UserValuesWithKeys = Values<User>;
