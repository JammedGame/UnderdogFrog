export { Player }

import * as TBX from "toybox-engine";

import { Frog } from "./Frog";
import { Inputs } from "./Inputs";
import { Flipper } from "./Flipper";
import { GameScene } from "../GameScene";
import { SoundManager } from "../../SoundManager";

class Player extends Frog
{
    public static Current;
    private _Dead: boolean;
    private _Pera: number;
    private _Velocity:TBX.Vertex;
    public constructor(Old?:Player)
    {
        super(Old);
        Player.Current = this;
        if(Old)
        {
            //TODO
        }
        else
        {
            this._Pera = 0;
            this.Init();
        }
    }
    protected Init() : void
    {
        super.Init();
        this.Position = new TBX.Vertex(400,400,0.8);
        this.Collision.Scale = new TBX.Vertex(140, 50, 1);
        this.SetSpriteSetByName("Idle");
        this._Velocity = new TBX.Vertex();
    }
    public Die()
    {
        this._Dead = true;
    }
    public Reset() : void
    {
        this.Show();
        this.SetFlip(false);
        this.Position = new TBX.Vertex(400,400,0.8);
        this._Velocity = new TBX.Vertex();
        this._Dead = false;
        this._Scene.Trans.Translation.X = 0;
    }
    public Update() : void
    {
        this._Pera++;
        if(this._Pera % 1 != 0) return;
        TBX.CollisionUtil.Check(this, this._Scene);
        if((Flipper.Current.Up && this.Position.Y > 850 - Flipper.Current.Current) || (!Flipper.Current.Up && this.Position.Y < 850 - Flipper.Current.Current))
        {
            Flipper.Current.SwitchMode();
            this.SetFlip(!Flipper.Current.Up);
            this._Velocity.Y = (Flipper.Current.Up)?10:-10;
        }
        else if(Inputs.SpaceDown && this.Collision.Result.Collision)
        {
            if(Flipper.Current.Up) this._Velocity.Y = 30;
            else if(!Flipper.Current.Up) this._Velocity.Y = -30;
            SoundManager.Play("Move");
        }
        else if(this.Collision.Result.Collision)
        {
            this._Velocity.Y = Flipper.Current.Diff;
        }
        else if(Flipper.Current.Up) this._Velocity.Y -= 1;
        else if(!Flipper.Current.Up) this._Velocity.Y += 1;
        let Speed:number = 10 + (((GameScene.Current.Score - 500) > 0) ? (GameScene.Current.Score - 500) * 0.01 : 0);
        if(Inputs.LeftDown && !this.Collision.Result.Collision) this._Velocity.X = Speed;
        else if(Inputs.RightDown && !this.Collision.Result.Collision) this._Velocity.X = -Speed;
        else this._Velocity.X = 0;
        let YPosition = this.Position.Y + Flipper.Current.Current - ((Flipper.Current.Up) ? 0 : 100);
        if(this.Collision.Result.Collision)
        {
            this.SetSpriteSetByName("Idle");
        }
        else if(YPosition < 820 && YPosition > 780)
        {
            this.SetSpriteSetByName("Idle");
        }
        else if(Math.abs(this._Velocity.Y) < 1 && this.CurrentSpriteSet != 1)
        {
            this.SetSpriteSetByName("MovePeak");
        }
        else if(Flipper.Current.Up && this._Velocity.Y > 0 && this.CurrentSpriteSet != 2)
        {
            this.SetSpriteSetByName("MoveUp");
        }
        else if(!Flipper.Current.Up && this._Velocity.Y < 0 && this.CurrentSpriteSet != 2)
        {
            this.SetSpriteSetByName("MoveUp");
        }
        else if(Flipper.Current.Up && this._Velocity.Y < 0 && this.CurrentSpriteSet != 3)
        {
            this.SetSpriteSetByName("MoveDown");
        }
        else if(!Flipper.Current.Up && this._Velocity.Y > 0 && this.CurrentSpriteSet != 3)
        {
            this.SetSpriteSetByName("MoveDown");
        }
        super.Update();
        if(this._Dead)
        {
            if(this.Active) this.Position.Add(this._Velocity.Copy().Scalar(-0.01));
        }
        else
        {
            this.Position.Add(this._Velocity.Copy().Scalar(-1));
        }
    }
    private GameOver() : void
    {
        TBX.Runner.Current.SwitchScene("GameOver");
    }
}