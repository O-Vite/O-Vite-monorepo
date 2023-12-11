import {
  Not,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Equal,
  Like,
  ILike,
  Between,
  In,
  Any,
  IsNull,
  Raw,
  ArrayContains,
  ArrayContainedBy,
  ArrayOverlap,
  FindOperator,
} from 'typeorm';

type StringNumberBoolean = string | number | boolean;
export type TObjectValueOperatorWhere<T> =
  | {
      key: keyof T;
      operator: 'LessThan' | 'LessThanOrEqual' | 'MoreThan' | 'MoreThanOrEqual';
      value: StringNumberBoolean;
    }
  | {
      key: keyof T;
      operator: 'Equal' | 'Like' | 'ILike';
      value: StringNumberBoolean;
    }
  | {
      key: keyof T;
      operator: 'Between';
      value: [StringNumberBoolean, StringNumberBoolean];
    }
  | {
      key: keyof T;
      operator: 'In' | 'Any';
      value: Array<StringNumberBoolean>;
    }
  | {
      key: keyof T;
      operator: 'IsNull';
      value: null;
    }
  | {
      key: keyof T;
      operator: 'Raw';
      value: string;
    }
  | {
      key: keyof T;
      operator: 'ArrayContains' | 'ArrayContainedBy' | 'ArrayOverlap';
      value: Array<StringNumberBoolean>;
    }
  | {
      key: keyof T;
      operator: 'Not';
      value: TObjectValueOperatorWhere<T>;
    };

export type TUniqueBuildWhereArray = { readonly __tag: unique symbol };
export const buildWhereArray = <T>(where: TObjectValueOperatorWhere<T>[]) => {
  assertListWhere(where);
  return where.reduce((arr, el) => {
    return { ...arr, [el.key]: buildWhereFunction(el) };
  }, {}) as {
    [K in keyof T]: FindOperator<any>;
  } & TUniqueBuildWhereArray;
};

const buildWhereFunction = <T>(
  where: TObjectValueOperatorWhere<T>,
): FindOperator<any> => {
  switch (where.operator) {
    case 'LessThan':
      return LessThan(where.value);
    case 'LessThanOrEqual':
      return LessThanOrEqual(where.value);
    case 'MoreThan':
      return MoreThan(where.value);
    case 'MoreThanOrEqual':
      return MoreThanOrEqual(where.value);
    case 'Equal':
      return Equal(where.value);
    case 'Like':
      return Like(where.value);
    case 'ILike':
      return ILike(where.value);
    case 'Between':
      return Between(where.value[0], where.value[1]);
    case 'In':
      return In(where.value);
    case 'Any':
      return Any(where.value);
    case 'IsNull':
      return IsNull();
    case 'Raw':
      return Raw(where.value);
    case 'ArrayContains':
      return ArrayContains(where.value);
    case 'ArrayContainedBy':
      return ArrayContainedBy(where.value);
    case 'ArrayOverlap':
      return ArrayOverlap(where.value);
    case 'Not':
      return Not(buildWhereFunction(where.value));
    default:
      throw new Error(`Unknown operator `);
  }
};

const assertKeysExist = <T extends object>(keys: Array<keyof T>, obj: T) => {
  return keys.every((key) => key in obj);
};

export const assertListWhere = <T>(
  where: TObjectValueOperatorWhere<T>[],
): void => {
  if (!where.every((el) => assertKeysExist(['key', 'operator', 'value'], el))) {
    throw new Error(`Key or operator or value is missing`);
  }
  if (!where.every(assertWhere)) {
    throw new Error(`Where is not valid`);
  }
};

const assertWhere = <T>(where: TObjectValueOperatorWhere<T>): boolean => {
  switch (where.operator) {
    case 'LessThan':
    case 'LessThanOrEqual':
    case 'MoreThan':
    case 'MoreThanOrEqual':
    case 'Equal':
    case 'Like':
    case 'ILike':
      return (
        typeof where.value === 'number' ||
        typeof where.value === 'string' ||
        typeof where.value === 'boolean'
      );

    case 'Raw':
      return typeof where.value === 'string';
    case 'Between':
      return Array.isArray(where.value) && where.value.length === 2;
    case 'In':
    case 'Any':
    case 'ArrayContains':
    case 'ArrayContainedBy':
    case 'ArrayOverlap':
      return Array.isArray(where.value);
    case 'IsNull':
      return where.value === null;
    case 'Not':
      return assertWhere(where.value);
    default:
      return false;
  }
};

export type TPagination = {
  skip?: number;
  take?: number;
};
