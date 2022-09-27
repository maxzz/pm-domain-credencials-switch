import chalk from 'chalk';
let config = require('../../package.json');

export const programName = config.name.split('/')[0].substring(1);
export const programVersion = config.version;

export function help() {
    
    let msg = `
The ${chalk.cyan(`${programName}`)} utility converts PM manifests with domain credentials to
manifests with credentials that apply only to a specific URL.

Usage:

${chalk.cyan(`${programName} [folder] | [<file(s)>]`)}

where:
    folder  - folder with the manifest files to process
    file(s) - manifest filenames to process

${chalk.gray(`Run this utility from the folder where the manifest files are
located. Alternatively, you can specify the folder where the
manifest files are located or filenames separated by space
character. Specify the folder name or file names, but not both.`)}

Version ${programVersion}`;

    console.log(msg);
}

//TODO: options: replace files i.e. don't create backup folder (unique backup name w/ date)
//TODO: options: interactive mode
