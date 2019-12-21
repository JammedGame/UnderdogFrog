export { Predator }

import * as TBX from "toybox-engine";

import { Player } from "./Player";
import { GameScene } from "../GameScene";

class Predator extends TBX.Sprite
{
    private _Hunt: boolean;
    protected _Speed: number;
    protected FrogOffset: TBX.Vertex;
    protected StartPosition: TBX.Vertex;
    public constructor(Old?:Predator)
    {
        super(Old);
        if(Old != null)
        {

        }
        else
        {
            this.Active = false;
            this._Hunt = false;
        }
    }
    public Reset() : void
    {
        this.Active = false;
        this._Hunt = false;
    }
    public Hunt() : void
    {
        this.Active = true;
        this.Position = new TBX.Vertex(this.StartPosition.X - GameScene.Current.Trans.Translation.X, Player.Current.Position.Y, 2.2);
        this.SetSpriteSetByName("PreEat");
        this._Hunt = true;
    }
    public Update() : void
    {
        if(!this._Hunt) return;
        this.Position.X -= this._Speed;
        this.Position.Y = Player.Current.Position.Y + this.FrogOffset.Y;
        if(this.CurrentSpriteSet == 0)
        {
            if(this.Position.X - Player.Current.Position.X + this.FrogOffset.X < 10)
            {
                Player.Current.Hide();
                this.SetSpriteSetByName("PostEat");
            }
        }
    }
}