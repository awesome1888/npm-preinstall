import { spawn } from 'child_process';

const execute = (cmd, args = [], params = {}) => {
    args = args || [];

    const stdoutTo = params.stdoutTo || process.stdout;
    const stderrTo = params.stderrTo || process.stderr;
    const cwd = params.cwd || process.cwd;

    return new Promise((resolve) => {
        const handle = spawn(cmd, args, {
            cwd,
            stdio: 'inherit',
            shell: true,
        });

        if (stdoutTo && handle.stdout) {
            handle.stdout.pipe(stdoutTo);
        }
        if (stderrTo && handle.stderr) {
            handle.stderr.pipe(stderrTo);
        }

        handle.on('error', () => {
            resolve(1);
        });
        handle.on('close', (code) => {
            resolve(code);
        });
        handle.on('exit', (code) => {
            resolve(code);
        });
    });
};

export default execute;
