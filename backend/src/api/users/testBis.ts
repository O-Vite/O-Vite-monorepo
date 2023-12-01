interface User {
  id: number;
}

type KeysUserInArray = (keyof User)[];
type CheckIfLengthOfArrayIsAllKeysOfUser<T extends any[]> =
  T['length'] extends KeysUserInArray['length'] ? true : false;

const nb: CheckIfLengthOfArrayIsAllKeysOfUser<['id', 'password']> = true;
