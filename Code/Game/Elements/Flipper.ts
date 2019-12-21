export { Flipper }

import * as TBX from "toybox-engine";
import { Splash } from "./Splash";
import { SoundManager } from "../../SoundManager";

class Flipper
{
    public static Current:Flipper;
    private _Over:boolean;
    private _Up:boolean;
    private _Diff:number;
    private _Target:number;
    private _Current:number;
    private _Counter:number;
    private _SwitchTime:number;
    private _SwitchBanner:TBX.Tile;
    private _Splash:Splash;
    private _OnSwitch:Function[];
    private _OnGameOver: Function[];
    public get Up():boolean { return this._Up; }
    public get Diff():number { return this._Diff; }
    public get Current():number { return this._Current; }
    public get SwitchTime():number { return this._SwitchTime; }
    public get SwitchBanner():TBX.Tile { return this._SwitchBanner; }
    public get Splash():Splash { return this._Splash; }
    public get OnSwitch():Function[] { return this._OnSwitch; }
    public get OnGameOver():Function[] { return this._OnGameOver; }
    public constructor(Old?:Flipper)
    {
        if(Old)
        {

        }
        else
        {
            this.Init();
            Flipper.Current = this;
        }
    }
    private Init() : void
    {
        this.Reset();
        this._OnSwitch = [];
        this._OnGameOver = [];
        this._Splash = new Splash();
        this._SwitchBanner = new TBX.Tile();
        this._SwitchBanner.Fixed = true;
        this._SwitchBanner.Active = false;
        this._SwitchBanner.Collection = new TBX.ImageCollection(null, ["Resources/Textures/Assets/Flipper/JumpIn.png", "Resources/Textures/Assets/Flipper/JumpOut.png"])
        this._SwitchBanner.Index = 0;
        this._SwitchBanner.Size = new TBX.Vertex(700, 300, 1);
        this._SwitchBanner.Position = new TBX.Vertex(960, 400, 0.2);
    }
    public Reset() : void
    {
        this._Over = false;
        this._Up = true;
        this._Diff = 0;
        this._Target = 0;
        this._Current = 0;
        this._Counter = 0;
        this._SwitchTime = 15;
        if(this._SwitchBanner)
        {
            this._SwitchBanner.Index = 0;
            this._SwitchBanner.Position.Y = 400;
        }
    }
    public SwitchMode() : void
    {
        SoundManager.Play("Splash");
        this._Up = !this._Up;
        this._Splash.Show();
        if(this._SwitchTime > 3)
        {
            this.GameOver();
        }
        this._SwitchBanner.Active = false;
        this._SwitchTime = TBX.Random.Next(8, 12);
        if (this._Up)
        {
            this._Target = 0;
            this._SwitchBanner.Index = 0;
            this._SwitchBanner.Position.Y = 400;
        }
        else
        {
            this._Target = 620;
            this._SwitchBanner.Index = 1;
            this._SwitchBanner.Position.Y = 700;
        }
        this._OnSwitch.forEach(Entry => Entry());
    }
    public Update(): void
    {
        this._Counter++;
        if(this._Counter % 60 == 0) this._SwitchTime -= 1;
        if(!this._Over)
        {
            this._SwitchBanner.Active = this._SwitchTime <= 3;
        }
        if(this._SwitchTime <= 0)
        {
            this.GameOver();
        }
        if(this._Target != this._Current)
        {
            if(Math.abs(this._Current - this._Target) < 1)
            {
                this._Diff = 0;
                this._Current = this._Target;
            }
            else if(this._Target < this._Current)
            {
                this._Diff = -(this._Current - this._Target) * 0.08;
                this._Current -= (this._Current - this._Target) * 0.08;
            }
            else if(this._Target > this._Current)
            {
                this._Diff = (this._Current - this._Target) * 0.08;
                this._Current += (this._Target - this._Current) * 0.08;
            }
        }
        else this._Diff = 0;
        this._Splash.Update();
    }
    public GameOver() : void
    {
        this._Over = true;
        this._SwitchBanner.Active = false;
        this._OnGameOver.forEach(Entry => Entry());
    }
}