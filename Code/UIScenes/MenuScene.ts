export { MenuScene }

import * as TBX from "engineer-js";

import { UIScene } from "./UIScene";

class MenuScene extends UIScene
{
    public static Current:MenuScene;
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
            this.InitMenuScene();
            MenuScene.Current = this;
        }
    }
    private InitMenuScene() : void
    {
        this.Name = "Menu";
        this.CreateBackground("Cover");
        this._Title.Text = "";
        this._Title.TextSize = 70;
        this._OverColor = TBX.Color.FromRGBA(23,38,49,255);
        this._Play = this.CreateButton("Play", 2);
        this._Play.Events.Click.push(this.PlayClick);
        this._Settings = this.CreateButton("Settings", 4);
        this._Settings.Events.Click.push(this.SettingsClick);
        this._Credits = this.CreateButton("Credits", 0);
        this._Credits.Events.Click.push(this.CreditsClick);
    }
    private PlayClick() : void
    {
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
}