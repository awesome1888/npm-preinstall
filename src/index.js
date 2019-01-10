import '@babel/polyfill';
import fs from 'fs';
import path from 'path';
import debug from 'debug';
import execute from './execute';
import { areFilesEqual } from 'fs-equal';
import copyFilesSync from 'fs-copy-file-sync';
import copyDir from 'copy-dir';
import glob from 'glob';
import get from 'lodash.get';

const installTo = async (folder) => {
    const file = path.join(folder, 'package.json');
    const fileLock = path.join(folder, 'node_modules/.packagejson.lock');

    if (fs.existsSync(file)) {
        let equal = false;
        try {
            equal = await areFilesEqual(file, fileLock);
        } catch (e) {
        }

        if (!equal) {
            console.log(`>>> Re-installing packages in "${folder}"`);
            await execute('npm', ['install'], {cwd: folder});
            copyFilesSync(file, fileLock);

            const overrides = path.join(folder, '.node_modules_patches');
            const nodeModules = path.join(folder, 'node_modules');

            if (fs.existsSync(overrides)) {
                console.log('>>>>>> Applying node_modules monkey-patch 🙈');

                await new Promise((resolve, reject) => {
                    copyDir(overrides, nodeModules, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            }
        }
    }
};

const getPackages = async (pattern, cwd) => {
    return new Promise((resolve, reject) => {
        glob(pattern, {cwd}, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        })
    });
};

(async () => {
    const d = debug('main');
    const cwd = process.cwd();

    process.argv.shift(); // drop the "node" command
    process.argv.shift(); // drop the file name

    const cmdToRun = process.argv.shift();
    const rootPackageJson = path.join(cwd, 'package.json');

    if (cmdToRun === '--monorepo') {
        if (fs.existsSync(rootPackageJson)) {
            let content = null;
            try {
                content = JSON.parse(fs.readFileSync(rootPackageJson));
            } catch(e) {
            }

            let packageWildCard = null;
            if (content) {
                packageWildCard = get(content, 'workspaces.packages.0');
            }

            if (packageWildCard) {
                const packages = await getPackages(packageWildCard, cwd);
                if (packages && packages.length) {
                    for (let i = 0; i < packages.length; i++) {
                        const pkg = packages[i];
                        await installTo(path.join(cwd, pkg));
                    }
                }
            }
        }
    } else {
        await installTo(cwd);

        d(process.argv.join(' '));

        if (cmdToRun && cmdToRun.length) {
            debug(`Executing ${cmdToRun}`);
            await execute(cmdToRun, process.argv);
        }
    }

    d('Done');
})();
