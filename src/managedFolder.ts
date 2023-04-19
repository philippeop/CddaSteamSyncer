
export const enum MODE {
    Delete = "DELETE",
    Override = "OVERRIDE",
    DontTouch = "DONTTOUCH"
}

export class ManagedFolder {
    name: string
    mode: MODE
    /**
     *
     */
    constructor(name: string, mode: MODE = MODE.Override) {
        this.name = name;
        this.mode = mode;
    }
}

export const sf = (a: string, b: MODE= MODE.Override) : ManagedFolder => new ManagedFolder(a,b)