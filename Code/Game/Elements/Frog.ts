export { Frog }

import * as TBX from "toybox-engine";

import { SpriteSet } from "toybox-engine";

const MOVE_SEED = 6;
const SPRITE_LENGTH = 19;

class Frog extends TBX.Sprite
{
    protected _Scene: TBX.Scene2D;
    private _Flip: boolean;
    private _LeftLeg: TBX.Sprite;
    private _RightLeg: TBX.Sprite;
    public constructor(Old?:Frog)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this._Flip = false;
        }
    }
    protected Init() : void
    {
        this.Size = new TBX.Vertex(200,200,1);
        this._LeftLeg = new TBX.Sprite();
        this._LeftLeg.Size = new TBX.Vertex(200,400,1);
        this._RightLeg = new TBX.Sprite();
        this._RightLeg.Size = new TBX.Vertex(200,400,1);
        let IdleSprite: TBX.SpriteSet = new SpriteSet(null, ["Resources/Textures/Assets/Frog/FrogCore0.png"], "Idle");
        this.Collection.SpriteSets.push(IdleSprite);
        let MovePeakSprite: TBX.SpriteSet = new SpriteSet(null, ["Resources/Textures/Assets/Frog/FrogCore9.png"], "MovePeak");
        this.Collection.SpriteSets.push(MovePeakSprite);
        let MoveUpSprite: TBX.SpriteSet = new SpriteSet(null, [], "MoveUp");
        MoveUpSprite.Seed = MOVE_SEED;
        for(let i = 0; i < SPRITE_LENGTH / 2; i++)
        {
            MoveUpSprite.Images.push("Resources/Textures/Assets/Frog/FrogCore" + i + ".png");
        }
        this.Collection.SpriteSets.push(MoveUpSprite);
        let MoveDownSprite: TBX.SpriteSet = new SpriteSet(null, [], "MoveDown");
        MoveDownSprite.Seed = MOVE_SEED;
        for(let i = Math.floor(SPRITE_LENGTH / 2); i < SPRITE_LENGTH; i++)
        {
            MoveDownSprite.Images.push("Resources/Textures/Assets/Frog/FrogCore" + i + ".png");
        }
        this.Collection.SpriteSets.push(MoveDownSprite);
        let LeftIdleSprite: TBX.SpriteSet = new SpriteSet(null, ["Resources/Textures/Assets/Frog/LeftLeg0.png"], "Idle");
        this._LeftLeg.Collection.SpriteSets.push(LeftIdleSprite);
        let LeftMovePeakSprite: TBX.SpriteSet = new SpriteSet(null, ["Resources/Textures/Assets/Frog/LeftLeg9.png"], "MovePeak");
        this._LeftLeg.Collection.SpriteSets.push(LeftMovePeakSprite);
        let LeftMoveUpSprite: TBX.SpriteSet = new SpriteSet(null, [], "MoveUp");
        LeftMoveUpSprite.Seed = MOVE_SEED;
        for(let i = 0; i < SPRITE_LENGTH / 2; i++)
        {
            LeftMoveUpSprite.Images.push("Resources/Textures/Assets/Frog/LeftLeg" + i + ".png");
        }
        this._LeftLeg.Collection.SpriteSets.push(LeftMoveUpSprite);
        let LeftMoveDownSprite: TBX.SpriteSet = new SpriteSet(null, [], "MoveDown");
        LeftMoveDownSprite.Seed = MOVE_SEED;
        for(let i = Math.floor(SPRITE_LENGTH / 2); i < SPRITE_LENGTH; i++)
        {
            LeftMoveDownSprite.Images.push("Resources/Textures/Assets/Frog/LeftLeg" + i + ".png");
        }
        this._LeftLeg.Collection.SpriteSets.push(LeftMoveDownSprite);
        let RightIdleSprite: TBX.SpriteSet = new SpriteSet(null, ["Resources/Textures/Assets/Frog/RightLeg0.png"], "Idle");
        this._RightLeg.Collection.SpriteSets.push(RightIdleSprite);
        let RightMovePeakSprite: TBX.SpriteSet = new SpriteSet(null, ["Resources/Textures/Assets/Frog/RightLeg9.png"], "MovePeak");
        this._RightLeg.Collection.SpriteSets.push(RightMovePeakSprite);
        let RightMoveUpSprite: TBX.SpriteSet = new SpriteSet(null, [], "MoveUp");
        RightMoveUpSprite.Seed = MOVE_SEED;
        for(let i = 0; i < SPRITE_LENGTH / 2; i++)
        {
            RightMoveUpSprite.Images.push("Resources/Textures/Assets/Frog/RightLeg" + i + ".png");
        }
        this._RightLeg.Collection.SpriteSets.push(RightMoveUpSprite);
        let RightMoveDownSprite: TBX.SpriteSet = new SpriteSet(null, [], "MoveDown");
        RightMoveDownSprite.Seed = MOVE_SEED;
        for(let i = Math.floor(SPRITE_LENGTH / 2); i < SPRITE_LENGTH; i++)
        {
            RightMoveDownSprite.Images.push("Resources/Textures/Assets/Frog/RightLeg" + i + ".png");
        }
        this._RightLeg.Collection.SpriteSets.push(RightMoveDownSprite);
    }
    public Update() : void
    {
        this._LeftLeg.Position = this.Position.Copy().Add(new TBX.Vertex(35, (this._Flip) ? -30 : 30, -0.1));
        this._RightLeg.Position = this.Position.Copy().Add(new TBX.Vertex(-30, (this._Flip) ? -30 : 30, 0));
    }
    public Hide() : void
    {
        this.Active = false;
        this._LeftLeg.Active = false;
        this._RightLeg.Active = false;
    }
    public Show() : void
    {
        this.Active = true;
        this._LeftLeg.Active = true;
        this._RightLeg.Active = true;
    }
    public SetFlip(Flip: boolean)
    {
        this._Flip = Flip;
        this.FlipY = Flip;
        this._LeftLeg.FlipY = Flip;
        this._RightLeg.FlipY = Flip;
    }
    public SetSpriteSetByName(Name: string) : void
    {
        // Override
        super.SetSpriteSetByName(Name);
        this._LeftLeg.SetSpriteSetByName(Name);
        this._RightLeg.SetSpriteSetByName(Name);
    }
    public OnAttach(Args) : void
    {
        // Override
        this._Scene = Args.Scene;
        this._Scene.Attach(this._LeftLeg);
        super.OnAttach(Args);
        this._Scene.Attach(this._RightLeg);
    }
}