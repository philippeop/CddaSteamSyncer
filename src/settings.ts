/* Author: Tase#6969 */
import { sf, ManagedFolder, MODE } from './managedFolder'

export const STEAM_FOLDER: string = 'F:/Steam/steamapps/common/Cataclysm Dark Days Ahead'
export const SOURCE_FOLDER: string = 'E:/cdda-catapult/dda/current';

export const KNOWNFOLDERS: ManagedFolder[] = [
    sf('cache', MODE.Delete),
    sf('config', MODE.DontTouch),
    sf('data'),
    sf('doc'),
    sf('font', MODE.DontTouch),
    sf('gfx'),
    sf('graveyard', MODE.DontTouch),
    sf('lang'),
    sf('memorial', MODE.DontTouch),
    sf('save', MODE.DontTouch),
    sf('sound', MODE.DontTouch),
    sf('templates', MODE.DontTouch),
];

export const KNOWNFILES: string[] = [
    'cataclysm-tiles.exe',
    'cataclysm-tiles.pdb',
    'catapult_install_info.json',
    'json_formatter.exe',
    'LICENSE.txt',
    'LICENSE-OFL-Terminus-Font.txt',
    'README.md',
    'VERSION.txt',
]

export const IGNORED_FILES: string[] = [
    'steam_api64.dll'
]