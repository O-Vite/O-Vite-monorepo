declare module 'typia/lib/misc' {
  export declare function literals(): never;
  export declare function literals<
    T extends boolean | number | string | bigint | null,
  >(): T[];
}
