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
import argv from 'argv';
import yaml from 'js-yaml';

const installTo = async (folder, opts = {}) => {
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
            await execute(opts.options['use-yarn'] ? 'yarn' : 'npm', ['install'], {cwd: folder});
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

const getWildCard = async () => {

    const cwd = process.cwd();

    const rootPackageJson = path.join(cwd, 'package.json');
    const configFile = path.join(cwd, '.preinstallrc');

    if (fs.existsSync(configFile)) {
        const cfg = yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
        if (cfg && cfg.packages && cfg.packages.wildcard) {
            return cfg.packages.wildcard;
        }
    } else if (fs.existsSync(rootPackageJson)) {
        let content = null;
        try {
            content = JSON.parse(fs.readFileSync(rootPackageJson));
        } catch(e) {
        }

        if (content) {
            return get(content, 'workspaces.packages.0');
        }
    }

    return null;
};

(async () => {
    const d = debug('main');
    const cwd = process.cwd();

    argv.option([
        {
            name: 'cmd',
            type: 'string',
            description: 'Command to run (mandatory)',
        },
        {
            name: 'monorepo',
            type: 'boolean',
            description: 'Check for monorepo package.json in the current working folder (default: false)',
        },
        {
            name: 'use-yarn',
            type: 'boolean',
            description: 'Use yarn instead of npm to install packages (default: false)',
        },
    ]);
    const opts = argv.run();

    if (opts.options.monorepo) {
        const packageWildCard = await getWildCard();
        if (packageWildCard) {
            const packages = await getPackages(packageWildCard, cwd);
            if (packages && packages.length) {
                for (let i = 0; i < packages.length; i++) {
                    const pkg = packages[i];
                    await installTo(path.join(cwd, pkg), opts);
                }
            }
        }
    } else {
        let cmdToRun = opts.options.cmd;
        if (!cmdToRun || !cmdToRun.length) {
            console.log('\nThe --cmd argument is mandatory.');
            argv.help();
            process.exit(1);
        }

        await installTo(cwd, opts);

        d(process.argv.join(' '));

        cmdToRun = cmdToRun.split(' ').map(x => x.trim()).filter(x => !!x);
        if (cmdToRun && cmdToRun.length) {
            debug(`Executing ${cmdToRun}`);
            const command = cmdToRun.shift();
            await execute(command, cmdToRun);
        }
    }

    d('Done');
})();
