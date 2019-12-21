export { CreditsScene }

import * as TBX from "toybox-engine";

import { UIScene } from "./UIScene"; 

class CreditsScene extends UIScene
{
    public static Current:CreditsScene;
    private _Back:TBX.Button;
    public constructor(Old?:CreditsScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitCreditsScene();
            CreditsScene.Current = this;
        }
    }
    private InitCreditsScene() : void
    {
        this.Name = "Credits";
        this._Title.Text = "Credits";
        this.CreateBackground("Upper");
        this._OverColor = TBX.Color.Black;
        this.CreateLabel("Marko Bibuljica", 0);
        this.CreateLabel("Miloš Manojlović", 1);
        this.CreateLabel("Mihailo Tatić", 2);
        this.CreateLabel("Nikola Đorđević", 3);
        this._Back = this.CreateButton("Back", 2);
        this._Back.Events.Click.push(this.BackClick);
    }
    private BackClick() : void
    {
        TBX.Runner.Current.SwitchScene("Menu");
    }
}