/**
 * Created by liboyuan on 2016/10/16.
 */

export function isAuthError(errorCode) {
    return errorCode >= 100000 && errorCode < 101000;
}