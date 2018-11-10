export { Player }

import * as TBX from "engineer-js";

import { Inputs } from "./Inputs";
import { Flipper } from "./Flipper";

class Player extends TBX.Tile
{
    private _Scene:TBX.Scene2D;
    private _Velocity:TBX.Vertex;
    public constructor(Old?:Player)
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
        this.Size = new TBX.Vertex(200,200,1);
        this.Position = new TBX.Vertex(400,400,0.8);
        this.Collection = new TBX.ImageCollection(null, ["Resources/Textures/Assets/Frog.png"]);
        this.Collision.Scale = new TBX.Vertex(140, 50, 1);
        this.Index = 0;
        this._Velocity = new TBX.Vertex();
    }
    public Reset() : void
    {
        this.Position = new TBX.Vertex(200,400,0.4);
        this._Velocity = new TBX.Vertex();
        this._Scene.Trans.Translation.X = 0;
    }
    public Update() : void
    {
        TBX.CollisionUtil.Check(this, this._Scene);
        if((Flipper.Current.Up && this.Position.Y > 850 - Flipper.Current.Current) || (!Flipper.Current.Up && this.Position.Y < 850 - Flipper.Current.Current))
        {
            Flipper.Current.SwitchMode();
            this.FlipY = !Flipper.Current.Up;
            this._Velocity.Y = (Flipper.Current.Up)?10:-10;
        }
        else if(Inputs.SpaceDown && this.Collision.Result.Collision)
        {
            if(Flipper.Current.Up) this._Velocity.Y = 30;
            else if(!Flipper.Current.Up) this._Velocity.Y = -30;
        }
        else if(this.Collision.Result.Collision)
        {
            this._Velocity.Y = Flipper.Current.Diff;
        }
        else if(Flipper.Current.Up) this._Velocity.Y -= 1;
        else if(!Flipper.Current.Up) this._Velocity.Y += 1;
        if(Inputs.LeftDown && !this.Collision.Result.Collision) this._Velocity.X = 10;
        else if(Inputs.RightDown && !this.Collision.Result.Collision) this._Velocity.X = -10;
        else this._Velocity.X = 0;
        this.Position.Add(this._Velocity.Copy().Scalar(-1));
    }
    public OnAttach(Args) : void
    {
        this._Scene = Args.Scene;
    }
    private GameOver() : void
    {
        TBX.Runner.Current.SwitchScene("GameOver");
    }
}