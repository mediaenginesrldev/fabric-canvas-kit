export function hasPositioning(obj: any): obj is { left: number; top: number } {
  if (
    obj.left == undefined ||
    obj.left === null ||
    !obj.left ||
    obj.top == undefined ||
    obj.top == null ||
    !obj.top
  ) {
    return false;
  } else {
    return true;
  }
}

export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}
