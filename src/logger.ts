/* Author: Tase#6969 */
'use strict';
const DEBUG = true;
const PERFORMANCE = true;
const QUERY = false;
let perf_measure_starts: number[] = [];

export class Logger {
    static log(...params: any[]): void {
        // tslint:disable-next-line: no-console
        console.log('[LOG]', ...params);
    }

    static debug(...params: any[]): void {
        if (DEBUG) {
            // tslint:disable-next-line: no-console
            console.log('[DEBUG]', ...params);
        }
    }

    static error(...params: any[]): void {
        // tslint:disable-next-line: no-console
        //console.error('[ERROR]', ...params);
        let message = '';
        for (const p of params) {
            message += p + ' ';
        }
        throw new Error(message);
    }

    static warn(...params: any[]): void {
        console.error('[WARN]', ...params);
    }

    static pad(str: string, length: number = 4): string {
        const z = '0';
        str = str + '';
        return str.length >= length ? str : new Array(length - str.length + 1).join(z) + str;
    }

    static query(...params: any[]): void {
        if (QUERY) {
            // tslint:disable-next-line: no-console
            console.log('[QUERY]', ...params);
        }
    }

    static debugParams(paramsObj: any): void {
        const parts: string[] = [];;
        for (const key in paramsObj) {
            const val = paramsObj[key];
            parts.push(key + ' = ' + val);
        }
        this.debug('Params:', parts.join(', '));
    }

    static measureStart(): void {
        perf_measure_starts.push((new Date()).getTime());
    }

    static measureReport(message: string): void {
        const perf_measure_start = perf_measure_starts[perf_measure_starts.length - 1];
        const perf_measure_now = (new Date()).getTime();
        console.log('[PERFM]', message, '[' + (perf_measure_now - perf_measure_start), 'ms]');
    }

    static measureStop(message?: string) {
        const perf_measure_start = perf_measure_starts.pop();
        if (perf_measure_start === undefined) {
            throw new Error('measureStop without measureStart, good luck');
        }
        const perf_measure_stop = (new Date()).getTime();
        if (PERFORMANCE && message) {
            // tslint:disable-next-line: no-console
            console.log('[PERFM]', message, '[' + (perf_measure_stop - perf_measure_start), 'ms]');
        }
    }

    static truncate(str: string): string {
        return (typeof str === 'string' && str.length > 100) ? (str.substring(0, 100) + '...') : str;
    }
}
