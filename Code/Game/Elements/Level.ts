export { Level }

import * as TBX from "engineer-js";

const LOTUS_WIDTH = 60;
const LOTUS_OFFSET = 250;
import { Flipper } from "./Flipper";

class Level extends TBX.Tile
{
    private static _Collection:TBX.ImageCollection;
    private _Scene:TBX.Scene2D;
    private _Lotuses:TBX.Tile[];
    public constructor(Old?:Level)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.Init();
        }
    }
    private Init() : void
    {
        if(!Level._Collection) Level._Collection = new TBX.ImageCollection(null, ["Resources/Textures/Assets/Lotos1.png", "Resources/Textures/Assets/Lotos2.png"]);
        this.Paint = TBX.Color.FromRGBA(255,255,255,0);
        this._Lotuses = [];
        this._Lotuses.push(this.GenerateLotus(1));
        for(let i = 0, Offset = 2; i < 1000; i++)
        {
            Offset += TBX.Random.Next(1, 3);
            this._Lotuses.push(this.GenerateLotus(Offset));
        }
        Flipper.Current.OnSwitch.push(this.OnSwitchMode.bind(this));
    }
    public Reset() : void
    {
        for(let i = 0; i < this._Lotuses.length; i++)
        {
            this._Scene.Remove(this._Lotuses[i]);
        }
        this.Init();
    }
    private GenerateLotus(Offset:number) : TBX.Tile
    {
        let Lotus:TBX.Tile = new TBX.Tile();
        Lotus.Collection = Level._Collection;
        Lotus.Index = TBX.Random.Next(0, 1);
        Lotus.Position = new TBX.Vertex((1+Offset) * LOTUS_OFFSET * 0.75, 850, 0.5);
        Lotus.Size = new TBX.Vertex(LOTUS_OFFSET,LOTUS_OFFSET * 1.8,1);
        Lotus.Collision.Active = true;
        Lotus.Collision.Scale = new TBX.Vertex(LOTUS_OFFSET * 0.8, LOTUS_WIDTH,1);
        Lotus.Collision.Type = TBX.CollisionType.Vertical;
        return Lotus;
    }
    public OnAttach(Args:any) : void
    {
        this._Scene = Args.Scene;
        for(let i in this._Lotuses)
        {
            this._Scene.Attach(this._Lotuses[i]);
        }
    }
    public OnSwitchMode() : void
    {
        for(let i in this._Lotuses)
        {
            this._Lotuses[i].FlipY = !Flipper.Current.Up;
            this._Lotuses[i].Paint = (Flipper.Current.Up)?TBX.Color.White:TBX.Color.FromString("#AAAAAA");
            this._Lotuses[i].Modified = true;
        }
    }
    public Update(): void
    {
        for(let i in this._Lotuses)
        {
            this._Lotuses[i].Position.Y = 850 - Flipper.Current.Current;
        }
    }
}