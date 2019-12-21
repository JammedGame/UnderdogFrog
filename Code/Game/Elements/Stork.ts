export { Stork }

import * as TBX from "toybox-engine";

import { Predator } from "./Predator";
import { SoundManager } from "../../SoundManager";

class Stork extends Predator
{
    public static Current: Stork;
    public constructor(Old?:Stork)
    {
        super(Old);
        if(Old != null)
        {

        }
        else
        {
            this.Init();
            Stork.Current = this;
        }
    }
    public Hunt() : void
    {
        // Override
        super.Hunt();
        SoundManager.Play("Stork");
    }
    public Init()
    {
        this._Speed = 15;
        this.Size = new TBX.Vertex(1500, 750, 1);
        let PreEat: TBX.SpriteSet = new TBX.SpriteSet(null, ["Resources/Textures/Assets/Predators/Stork3.png"], "PreEat");
        let Eat: TBX.SpriteSet = new TBX.SpriteSet(null, ["Resources/Textures/Assets/Predators/Stork3.png", "Resources/Textures/Assets/Predators/Stork2.png", "Resources/Textures/Assets/Predators/Stork1.png"], "Eat");
        let PostEat: TBX.SpriteSet = new TBX.SpriteSet(null, ["Resources/Textures/Assets/Predators/Stork0.png"], "PostEat");
        this.Collection = new TBX.SpriteSetCollection(null, [PreEat, Eat, PostEat]);
        this.StartPosition = new TBX.Vertex(3000, 0, 0);
        this.FrogOffset = new TBX.Vertex(-200, -150, 0);
    }
}