import '@babel/polyfill';
import fs from 'fs';
import execute from './execute';
import { areFilesEqual } from 'fs-equal';
import copyFilesSync from 'fs-copy-file-sync';

(async () => {

    const file = `${process.cwd()}/package.json`;
    const fileLock = `${process.cwd()}/.packagejson.lock`;

    if (fs.existsSync(file)) {
        let equal = false;
        try {
            equal = await areFilesEqual(file, fileLock);
        } catch (e) {
        }

        if (!equal) {
            await execute('npm', ['install']);
            copyFilesSync(file, fileLock);
        }
    }

    process.argv.shift(); // drop the command itself
    process.argv.shift(); // drop the command itself
    const cmdToRun = process.argv.shift();

    if (cmdToRun && cmdToRun.length) {
        await execute(cmdToRun, process.argv);
    }
})();
