export type TClass<T = unknown> = new (...args: any[]) => T;

export type TFn = (...args: any[]) => any;

export type ClassWithStatic<T = unknown> = TClass<T> & {
  [key: string]: any;
};

export type TOmit<T, Keys extends keyof T> = (
  obj: T,
  ...keys: Keys[]
) => Omit<T, Keys>;
