/**
 * Returns a port number by parsing string but if arg is not valid numeric string 
 * it returns default port passed as second argument.
 * @param arg string to parse as port number
 * @param def default port number
 */
export function parsePort(arg: string | undefined, def: number): number {
    if (!arg) {
        return def;
    }

    if (!(def > 0 && def <= 65535)) {
        throw new Error("Valid port range is between 0-65535")
    }

    const parsedArg = parseInt(arg);
    const validPort = !isNaN(parsedArg) && (parsedArg > 0) && (parsedArg <= 65535)
    return validPort ? parsedArg : def;
}

type Minutes = number;

/**
 * Returns expiry datetime epoh by adding given number of minutes to current time.
 * @param expiringIn number of minutes from now
 */
export function getExpiryDate(expiringIn: Minutes): number {
    return new Date().getTime() + (expiringIn * 60000)
}
