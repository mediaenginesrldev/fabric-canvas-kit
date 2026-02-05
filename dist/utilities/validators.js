export function hasPositioning(obj) {
    if (obj.left == undefined ||
        obj.left === null ||
        !obj.left ||
        obj.top == undefined ||
        obj.top == null ||
        !obj.top) {
        return false;
    }
    else {
        return true;
    }
}
export function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
//# sourceMappingURL=validators.js.map