export { GameScene };

import * as TBX from "toybox-engine";

import { Stork } from "./Elements/Stork";
import { Snake } from "./Elements/Snake";
import { Flipper } from "./Elements/Flipper";
import { Level } from "./Elements/Level";
import { Player } from "./Elements/Player";
import { Inputs } from "./Elements/Inputs";
import { GameOver } from "./Elements/GameOver";
import { Environment } from "./Elements/Environment";

class GameScene extends TBX.Scene2D
{
    public static Current:GameScene;
    private _Over:boolean;
    private _Flipper:Flipper;
    private _Player:Player;
    private _GameOver:GameOver;
    private _Score:number;
    private _ScoreLabel:TBX.Label;
    private _SwitchTimeLabel:TBX.Label;
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
        this.Attach(new Stork());
        this.Attach(new Snake());
        this.Name = "Game";
        this._Flipper = new Flipper();
        this._Player = new Player();
        this._Level = new Level();
        this._Environment = new Environment();
        this._GameOver = new GameOver();
        this.Attach(this._Player);
        this.Attach(this._Level);
        this.Attach(this._Environment);
        this.Attach(this._Flipper.Splash);
        this.Attach(this._Flipper.SwitchBanner);
        this._GameOver.Init(this);
        this._GameOver.OnRestart.push(this.Reset.bind(this));
        this.Events.KeyDown.push(this.KeyDown.bind(this));
        this.Events.KeyUp.push(this.KeyUp.bind(this));
        this.Events.Update.push(this.Update.bind(this));
        this._Flipper.OnGameOver.push(this.CallPredator.bind(this));
        this._Over = false;
        this._Score = 0;
        this._ScoreLabel = this.CreateLabel("0");
        this._ScoreLabel.ForeColor = TBX.Color.FromRGBA(255,127,80,255);
        this._ScoreLabel.Position = new TBX.Vertex(1800, 100, 0.2);
        this._SwitchTimeLabel = this.CreateLabel("15");
        this._SwitchTimeLabel.TextSize = 120;
        this._SwitchTimeLabel.Size = new TBX.Vertex(300, 150);
    }
    public Reset() : void
    {
        this._Over = false;
        this._ScoreLabel.Active = true;
        this._SwitchTimeLabel.Active = true;
        this._Score = 0;
        this._ScoreLabel.Text = "0";
        this.Trans.Translation.X = 0;
        Inputs.Reset();
        Stork.Current.Reset();
        Snake.Current.Reset();
        this._Flipper.Reset();
        this._Player.Reset();
        this._Level.Reset();
        this._Environment.Reset();
        this._GameOver.Set(false);
    }
    private Update() : void
    {
        this._Flipper.Update();
        this._Player.Update();
        if(!this._Over)
        {
            this._Score = Math.floor((-this.Trans.Translation.X) / 100);
            this._ScoreLabel.Text = this._Score.toString();
            this._ScoreLabel.Update();
            this._SwitchTimeLabel.Text = this._Flipper.SwitchTime.toString();
            this._SwitchTimeLabel.Update();
        }
        Stork.Current.Update();
        Snake.Current.Update();
        this._Level.Update();
        this._Environment.Update();
        this.Trans.Translation.X -= 2 + this._Score * 0.01;
    }
    private KeyDown(G:TBX.Game, Args:any) : void
    {
        if(this._Over) return;
        if(Args.KeyCode == 83)
        {
            this._Flipper.SwitchMode();
        }
        Inputs.KeyDown(Args.KeyCode);
    }
    private KeyUp(G:TBX.Game, Args:any) : void
    {
        if(this._Over) return;
        Inputs.KeyUp(Args.KeyCode);
    }
    private CallPredator() : void
    {
        if(this._Over) return;
        if(this._Flipper.Up)
        {
            Stork.Current.Hunt();
        }
        else
        {
            Snake.Current.Hunt();
        }
        this._Player.Die();
        this._Over = true;
        this._ScoreLabel.Active = false;
        this._SwitchTimeLabel.Active = false;
        this._GameOver.Set(true, this._Score);
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