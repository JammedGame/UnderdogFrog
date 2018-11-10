export { Environment }

import * as TBX from "engineer-js";

import { Flipper } from "./Flipper";

class Environment extends TBX.Tile
{
    
    private _Scene:TBX.Scene2D;
    private _Water:TBX.Tile;
    private _Surface:TBX.Tile;
    private _Underwater:TBX.Tile;
    private _WaterSurface:TBX.Tile;
    public constructor(Old?:Environment)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitEnvironment();
        }
    }
    private InitEnvironment() : void
    {
        this.Paint = TBX.Color.FromRGBA(255,255,255,0);
        this._Water = new TBX.Tile();
        this._Water.Paint = TBX.Color.FromRGBA(42,193,202,80);
        this._Water.Position = new TBX.Vertex(960, 1285, 1.0);
        this._Water.Size = new TBX.Vertex(1920,830,1);
        this._Water.Fixed = true;
        this._Surface = TBX.SceneObjectUtil.CreateTile("Surface", ["Resources/Textures/Backgrounds/Upper.png"], new TBX.Vertex(960, 425, 0), new TBX.Vertex(1920, 850, 1));
        this._Surface.Fixed = true;
        this._Underwater = TBX.SceneObjectUtil.CreateTile("Underwater", ["Resources/Textures/Backgrounds/Lower.png"], new TBX.Vertex(960, 1275, 0), new TBX.Vertex(1920, 850, 1));
        this._Underwater.Fixed = true;
        this._WaterSurface = TBX.SceneObjectUtil.CreateTile("WaterSurface", ["Resources/Textures/Assets/WaterSurface.png"], new TBX.Vertex(960, 850, 0.1), new TBX.Vertex(1920, 40, 1));
        this._WaterSurface.Fixed = true;
        Flipper.Current.OnSwitch.push(this.OnSwitchMode.bind(this));
    }
    public OnAttach(Args:any) : void
    {
        this._Scene = Args.Scene;
        this._Scene.Attach(this._Water);
        this._Scene.Attach(this._Surface);
        this._Scene.Attach(this._Underwater);
        this._Scene.Attach(this._WaterSurface);
    }
    public OnSwitchMode() : void
    {
        this._WaterSurface.FlipY = !Flipper.Current.Up;
        this._Water.Size.Y = (Flipper.Current.Up)?830:870;
        this._Water.Paint.A = (Flipper.Current.Up)?80:40;
        this._Water.Modified = true;
    }
    public Update(): void
    {
        let WaterPosition:number = (Flipper.Current.Up)?1285:1265;
        this._Water.Position.Y = WaterPosition - Flipper.Current.Current;
        this._Surface.Position.Y = 425 - Flipper.Current.Current;
        this._Underwater.Position.Y = 1275 - Flipper.Current.Current;
        this._WaterSurface.Position.Y = 850 - Flipper.Current.Current;
    }
}