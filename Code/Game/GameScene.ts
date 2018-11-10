export { GameScene };

import * as TBX from "engineer-js";

import { Flipper } from "./Elements/Flipper";
import { Level } from "./Elements/Level";
import { Player } from "./Elements/Player";
import { Inputs } from "./Elements/Inputs";
import { Environment } from "./Elements/Environment";

class GameScene extends TBX.Scene2D
{
    public static Current:GameScene;
    private _Flipper:Flipper;
    private _Player:Player;
    private _Score:number;
    private _ScoreLabel:TBX.Label;
    private _Level:Level;
    private _Environment:Environment;
    public get Score():number { return this._Score; }
    public constructor(Old?:GameScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitGameScene();
            GameScene.Current = this;
        }
    }
    private InitGameScene() : void
    {
        this.Name = "Game";
        this._Flipper = new Flipper();
        this._Player = new Player();
        this._Level = new Level();
        this._Environment = new Environment();
        this.Attach(this._Player);
        this.Attach(this._Level);
        this.Attach(this._Environment);
        this.Events.KeyDown.push(this.KeyDown.bind(this));
        this.Events.KeyUp.push(this.KeyUp.bind(this));
        this.Events.Update.push(this.Update.bind(this));
        this._Score = 0;
        this._ScoreLabel = this.CreateLabel("0");
    }
    public Reset() : void
    {
        this._ScoreLabel.Text = "0";
        this._Player.Reset();
    }
    private Update() : void
    {
        this._Flipper.Update();
        this._Player.Update();
        this._Score = Math.floor((-this.Trans.Translation.X) / 400);
        this._ScoreLabel.Text = this._Score.toString();
        this._ScoreLabel.Update();
        this._Level.Update();
        this._Environment.Update();
        this.Trans.Translation.X -= 2;
    }
    private KeyDown(G:TBX.Game, Args:any) : void
    {
        if(Args.KeyCode == 83)
        {
            this._Flipper.SwitchMode();
        }
        Inputs.KeyDown(Args.KeyCode);
    }
    private KeyUp(G:TBX.Game, Args:any) : void
    {
        Inputs.KeyUp(Args.KeyCode);
    }
    protected CreateLabel(Text:string) : TBX.Label
    {
        let Label:TBX.Label = new TBX.Label(null, Text);
        Label.Size = new TBX.Vertex(800, 80);
        Label.TextSize = 60;
        Label.Position = new TBX.Vertex(960, 100, 0.2);
        Label.ForeColor = TBX.Color.FromRGBA(244,208,63,255);
        Label.Border.Width = 0;
        this.Attach(Label);
        return Label;
    }
}