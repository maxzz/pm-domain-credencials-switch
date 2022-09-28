export function splitByKey<T>(items: T[], keyFn: (item: T) => string | undefined): Record<string, T[]> {
    const rv: Record<string, T[]> = {};
    items.forEach((item) => {
        const key = keyFn(item);
        key && (rv[key] || (rv[key] = [])).push(item);
    });
    return rv;
}

function shift(ch: string) {
    const code = ch.charCodeAt(0);
    return (ch >= 'a' && ch <= 'x') || (ch >= 'A' && ch <= 'X')
        ? String.fromCharCode((code + 1))
        : ch;
}

function shiftStr(str: string) {
    return str.split('').map(shift).join('');
}

export function makeTestUrl(url: string) {
    const m = url.match(/^(https?:\/\/)([^\/]*)([\s\S]*)$/);
    if (m) {
        const prefix = m[1] || '';
        const domain = m[2] || '';
        const path = m[3] || '';
        const domainParts = domain.split('.').map((part) => part.match(/(com|org)/) ? part : shiftStr(part)).join('.');
        return `${prefix}${domainParts}${shiftStr(path)}`;
    }
    return url;
}
