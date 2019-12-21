export { Snake }

import * as TBX from "toybox-engine";

import { Predator } from "./Predator";
import { SoundManager } from "../../SoundManager";

class Snake extends Predator
{
    public static Current: Snake;
    public constructor(Old?:Snake)
    {
        super(Old);
        if(Old != null)
        {

        }
        else
        {
            this.Init();
            Snake.Current = this;
        }
    }
    public Hunt() : void
    {
        // Override
        super.Hunt();
        SoundManager.Play("Snake");
    }
    public Init() : void
    {
        this.FlipX = true;
        this._Speed = 25;
        this.Size = new TBX.Vertex(2000, 400, 1);
        let PreEat: TBX.SpriteSet = new TBX.SpriteSet(null, ["Resources/Textures/Assets/Predators/Snake0.png","Resources/Textures/Assets/Predators/Snake1.png", "Resources/Textures/Assets/Predators/Snake2.png"], "PreEat");
        let Eat: TBX.SpriteSet = new TBX.SpriteSet(null, ["Resources/Textures/Assets/Predators/Snake3.png","Resources/Textures/Assets/Predators/Snake4.png", "Resources/Textures/Assets/Predators/Snake5.png"], "Eat");
        let PostEat: TBX.SpriteSet = new TBX.SpriteSet(null, ["Resources/Textures/Assets/Predators/Snake6.png","Resources/Textures/Assets/Predators/Snake7.png", "Resources/Textures/Assets/Predators/Snake8.png"], "PostEat");
        this.Collection = new TBX.SpriteSetCollection(null, [PreEat, Eat, PostEat]);
        this.StartPosition = new TBX.Vertex(3000, 1080, 0);
        this.FrogOffset = new TBX.Vertex(-900, -50, 0);
    }
}