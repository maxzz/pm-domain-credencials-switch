//import { createColors } from "picocolors";
let tty = require("tty");

let isColorSupported =
    !("NO_COLOR" in process.env || process.argv.includes("--no-color")) &&
    ("FORCE_COLOR" in process.env ||
        process.argv.includes("--color") ||
        process.platform === "win32" ||
        (tty.isatty(1) && process.env.TERM !== "dumb") ||
        "CI" in process.env);

let replaceClose = (str: string, close: string, replace: string, index: number): string => {
    let start = str.substring(0, index) + replace;
    let end = str.substring(index + close.length);
    let nextIndex = end.indexOf(close);
    return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end;
};

let formatter = (open: string, close: string, replace = open) => (input: string) => {
    let str = "" + input;
    let index = str.indexOf(close, open.length);
    return ~index
        ? open + replaceClose(str, close, replace, index) + close
        : open + str + close;
};

export let createColors = (enabled = isColorSupported) => ({
    isColorSupported: enabled,

    reset: enabled ? (s: string) => `\x1b[0m${s}\x1b[0m` : String,
    bold: enabled ? formatter("\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m") : String,
    dim: enabled ? formatter("\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m") : String,
    italic: enabled ? formatter("\x1b[3m", "\x1b[23m") : String,
    underline: enabled ? formatter("\x1b[4m", "\x1b[24m") : String,
    inverse: enabled ? formatter("\x1b[7m", "\x1b[27m") : String,
    hidden: enabled ? formatter("\x1b[8m", "\x1b[28m") : String,
    strikethrough: enabled ? formatter("\x1b[9m", "\x1b[29m") : String,

    black: enabled ? formatter("\x1b[30m", "\x1b[39m") : String,
    red: enabled ? formatter("\x1b[31m", "\x1b[39m") : String,
    green: enabled ? formatter("\x1b[32m", "\x1b[39m") : String,
    yellow: enabled ? formatter("\x1b[33m", "\x1b[39m") : String,
    blue: enabled ? formatter("\x1b[34m", "\x1b[39m") : String,
    magenta: enabled ? formatter("\x1b[35m", "\x1b[39m") : String,
    cyan: enabled ? formatter("\x1b[36m", "\x1b[39m") : String,
    white: enabled ? formatter("\x1b[37m", "\x1b[39m") : String,

    gray: enabled ? formatter("\x1b[90m", "\x1b[39m") : String,

    blackBright: enabled ? formatter("\x1b[90m", "\x1b[39m") : String,
    redBright: enabled ? formatter("\x1b[91m", "\x1b[39m") : String,
    greenBright: enabled ? formatter("\x1b[92m", "\x1b[39m") : String,
    yellowBright: enabled ? formatter("\x1b[93m", "\x1b[39m") : String,
    blueBright: enabled ? formatter("\x1b[94m", "\x1b[39m") : String,
    magentaBright: enabled ? formatter("\x1b[95m", "\x1b[39m") : String,
    cyanBright: enabled ? formatter("\x1b[96m", "\x1b[39m") : String,
    whiteBright: enabled ? formatter("\x1b[97m", "\x1b[39m") : String,

    bgBlack: enabled ? formatter("\x1b[40m", "\x1b[49m") : String,
    bgRed: enabled ? formatter("\x1b[41m", "\x1b[49m") : String,
    bgGreen: enabled ? formatter("\x1b[42m", "\x1b[49m") : String,
    bgYellow: enabled ? formatter("\x1b[43m", "\x1b[49m") : String,
    bgBlue: enabled ? formatter("\x1b[44m", "\x1b[49m") : String,
    bgMagenta: enabled ? formatter("\x1b[45m", "\x1b[49m") : String,
    bgCyan: enabled ? formatter("\x1b[46m", "\x1b[49m") : String,
    bgWhite: enabled ? formatter("\x1b[47m", "\x1b[49m") : String,
});
