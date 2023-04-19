/* Author: Tase#6969 */
import fs from 'node:fs/promises'
import fse from 'fs-extra'
import path from 'path'
import { SOURCE_FOLDER, STEAM_FOLDER, KNOWNFOLDERS, KNOWNFILES, IGNORED_FILES } from './settings'
import { ManagedFolder, MODE } from './managedFolder'
import { Logger } from './logger'

async function run() {
    // check knownfolders integrity
    await check();
    // copy files
    await copyFiles(SOURCE_FOLDER, STEAM_FOLDER, KNOWNFILES);
    // delete and re-create folders as configured
    await syncFolders(SOURCE_FOLDER, STEAM_FOLDER, KNOWNFOLDERS);
}

async function check() {
    const sourceFiles = await fs.readdir(SOURCE_FOLDER);
    for (const f of KNOWNFOLDERS) {
        if (!sourceFiles.includes(f.name) && f.mode == MODE.Override) Logger.error(`Check: Known folder has gone missing: '${f.name}'`);
    }
    for (const f of KNOWNFILES) {
        if (!sourceFiles.includes(f)) Logger.error(`Check: Known file has gone missing: '${f}'`);
    }
    for (const f of sourceFiles) {
        if (!KNOWNFILES.includes(f) && !KNOWNFOLDERS.some(kf => kf.name == f) && !IGNORED_FILES.includes(f)) Logger.error(`Check: Unknown folder or file has appeared in the source folder: '${f}'`);
    }

    const steamFiles = await fs.readdir(STEAM_FOLDER);
    for (const f of steamFiles) {
        if (!KNOWNFILES.includes(f) && !KNOWNFOLDERS.some(kf => kf.name == f) && !IGNORED_FILES.includes(f)) Logger.error(`Check: Unknown folder or file has appeared in the Steam folder: '${f}'`);
    }
}

async function copyFiles(source: string, dest: string, filenames: string[]) {
    if(!path.isAbsolute(source)) Logger.error('Copy Files: Expected source as an absolute path, got', source)
    if(!path.isAbsolute(dest)) Logger.error('Copy Files: Expected dest as an absolute path, got', dest)
    for (const filename of filenames) {
        const fileSrc = path.join(source, filename)
        const fileDst = path.join(dest, filename)
        const fromTo = (`${fileSrc} To ${fileDst}`);
        try {
            await fs.copyFile(fileSrc, fileDst);
            Logger.debug('Copy Files: File copied', fromTo)
        }
        catch (e) {
            Logger.error('Copy Files: Failed with error', e)
        }
    }
}

async function syncFolders(source: string, dest: string, folders: ManagedFolder[]) {
    if(!path.isAbsolute(source)) Logger.error('Sync Folders: Expected source as an absolute path, got', source)
    if(!path.isAbsolute(dest)) Logger.error('Sync Folders: Expected dest as an absolute path, got', dest)

    for (const folder of folders) {
        const fileSrc = path.join(source, folder.name)
        const fileDst = path.join(dest, folder.name)    
        try {
            if (folder.mode == MODE.DontTouch) {
            }
            if (folder.mode == MODE.Delete) {
                await fs.rm(fileDst, { force: true, recursive: true });
            }
            if (folder.mode == MODE.Override) {
                await fs.rm(fileDst, { force: true, recursive: true });
                await fse.copy(fileSrc, fileDst);
            }
            Logger.debug('Sync Folders: Processed folder', folder.name, 'with mode', folder.mode);
        }
        catch (e) {
            Logger.error('Sync Folders: Failed folder', folder.name, e);
        }
    }
}

run().then(() => {}).catch((e) => Logger.error(e))

