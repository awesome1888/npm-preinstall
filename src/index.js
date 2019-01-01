import '@babel/polyfill';
import fs from 'fs';
import debug from 'debug';
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

    debug(process.argv.join(' '));

    process.argv.shift(); // drop the "node" command
    process.argv.shift(); // drop the file name
    const cmdToRun = process.argv.shift();

    if (cmdToRun && cmdToRun.length) {
        debug(`Executing ${cmdToRun}`);
        await execute(cmdToRun, process.argv);
    }

    debug('Done');
})();
