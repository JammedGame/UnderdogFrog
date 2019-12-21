export { Inputs }

import { SoundManager } from "../../SoundManager";

class Inputs
{
    private static _SpaceDown:boolean;
    private static _LeftDown:boolean;
    private static _RightDown:boolean;
    public static get SpaceDown():boolean { return this._SpaceDown; }
    public static get LeftDown():boolean { return this._LeftDown; }
    public static get RightDown():boolean { return this._RightDown; }
    public static KeyDown(KeyCode:number) : void
    {
        if(KeyCode == 32)
        {
            this._SpaceDown = true;
        }
        if(KeyCode == 65 || KeyCode == 37)
        {
            this._LeftDown = true;
        }
        if(KeyCode == 68 || KeyCode == 39)
        {
            this._RightDown = true;
        }
    }
    public static KeyUp(KeyCode:number) : void
    {
        if(KeyCode == 32)
        {
            this._SpaceDown = false;
        }
        if(KeyCode == 65 || KeyCode == 37)
        {
            this._LeftDown = false;
        }
        if(KeyCode == 68 || KeyCode == 39)
        {
            this._RightDown = false;
        }
    }
    public static Reset() : void
    {
        this._SpaceDown = false;
        this._LeftDown = false;
        this._RightDown = false;
    }
}