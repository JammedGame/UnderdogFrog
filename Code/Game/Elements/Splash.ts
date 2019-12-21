export { Splash }

import * as TBX from "toybox-engine";
import { Player } from "./Player";
import { Flipper } from "./Flipper";

class Splash extends TBX.Sprite
{
    public constructor(Old?:Splash)
    {
        super(Old);
        if(Old != null)
        {

        }
        else
        {
            this.Active = false;
            this.Size = new TBX.Vertex(400, 300, 1);
            let Set:TBX.SpriteSet = new TBX.SpriteSet(null, [], "Default");
            for(let i = 1; i < 14; i++) Set.Images.push("Resources/Textures/Assets/Splash/splash" + i +".png");
            this.Collection = new TBX.SpriteSetCollection(null, [Set]);
            this.SetSpriteSet(0);
            this.Events.SetComplete.push(this.OnHide.bind(this));
        }
    }
    public Show() : void
    {
        this.Position = new TBX.Vertex(Player.Current.Position.X, 800 - Flipper.Current.Current, 0.7);
        this.Active = true;
        this.SetSpriteSet(0);
    }
    public Update() : void
    {
        console.log(Flipper.Current.Current);
        this.Position.Y = 800 - Flipper.Current.Current;
    }
    public OnHide() : void
    {
        this.Active = false;
    }
}