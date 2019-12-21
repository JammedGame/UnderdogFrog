export { MenuScene }

import * as TBX from "toybox-engine";

import { UIScene } from "./UIScene";
import { Level } from "../Game/Elements/Level";
import { Environment } from "../Game/Elements/Environment";
import { GameScene } from "../Game/GameScene";

class MenuScene extends UIScene
{
    public static Current:MenuScene;
    private _CoverDelta:number;
    private _CoverLevel:Level;
    private _Cover:TBX.Tile;
    private _Play:TBX.Button;
    private _Settings:TBX.Button;
    private _Credits:TBX.Button;
    public constructor(Old?:MenuScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this._CoverDelta = 0.06;
            this.InitMenuScene();
            MenuScene.Current = this;
        }
    }
    private InitMenuScene() : void
    {
        this.Name = "Menu";
        this._CoverLevel = new Level()
        this.Attach(this._CoverLevel);
        this.Attach(new Environment());
        this._Cover = TBX.SceneObjectUtil.CreateTile("Title", ["Resources/Textures/Backgrounds/Title2.png"], new TBX.Vertex(945, 350, 0.5), new TBX.Vertex(1000, 562, 1));
        this.Attach(this._Cover);
        this._Title.Text = "";
        this._Title.TextSize = 70;
        this._OverColor = TBX.Color.FromRGBA(23,38,49,255);
        this._Play = this.CreateButton("Play", 2);
        this._Play.Events.Click.push(this.PlayClick);
        this._Settings = this.CreateButton("Settings", 4);
        this._Settings.Events.Click.push(this.SettingsClick);
        this._Credits = this.CreateButton("Credits", 0);
        this._Credits.Events.Click.push(this.CreditsClick);
        this.Events.Update.push(this.Update.bind(this));
    }
    private PlayClick() : void
    {
        GameScene.Current.Reset();
        TBX.Runner.Current.SwitchScene("Game");
    }
    private SettingsClick() : void
    {
        TBX.Runner.Current.SwitchScene("Settings");
    }
    private CreditsClick() : void
    {
        TBX.Runner.Current.SwitchScene("Credits");
    }
    private Update() : void
    {
        this._Cover.Position.Y += this._CoverDelta;
        if(this._Cover.Position.Y > 400 || this._Cover.Position.Y < 300) this._CoverDelta *= -1;
        this._CoverLevel.Move();
    }
}