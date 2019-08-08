const gulp = require('gulp');
const watch = require('gulp-watch')
const electron = require('electron');
const path = require('path')
const { spawn } = require('child_process')
const chalk = require('chalk')
let electronProcess = null;
let manualRestart = false;

gulp.task('watch:electron', function () {
    startElectron();
    watch(['./public/**/*.js'], function (data) {
        if (electronProcess && electronProcess.kill) {
            manualRestart = true
            process.kill(electronProcess.pid)
            electronProcess = null
            startElectron()

            setTimeout(() => {
                manualRestart = false
            }, 5000)
        }
    });
});

function startElectron() {
    var args = [
        '--inspect=5858',
        path.join(__dirname, './public/electron.dev.js')
    ]

    // detect yarn or npm and process commandline args accordingly
    // if (process.env.npm_execpath.endsWith('yarn.js')) {
    //     args = args.concat(process.argv.slice(3))
    // } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
    //     args = args.concat(process.argv.slice(2))
    // }

    electronProcess = spawn(electron, args)
    electronProcess.stdout.on('data', data => {
        electronLog(data, 'blue')
    })
    electronProcess.stderr.on('data', data => {
        electronLog(data, 'red')
    })

    electronProcess.on('close', () => {
        if (!manualRestart) process.exit()
    })
}
function electronLog(data, color) {
    let log = ''
    data = data.toString().split(/\r?\n/)
    data.forEach(line => {
        log += `  ${line}\n`
    })
    if (/[0-9A-z]+/.test(log)) {
        console.log(
            chalk[color].bold('┏ Electron -------------------') +
            '\n\n' +
            log +
            chalk[color].bold('┗ ----------------------------') +
            '\n'
        )
    }
}