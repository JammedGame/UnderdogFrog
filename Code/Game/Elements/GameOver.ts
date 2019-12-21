export { GameOver }

import * as TBX from "toybox-engine";

class GameOver extends TBX.SceneObject
{
    private _Banner: TBX.Tile;
    private _Restart: TBX.Button;
    private _Quit: TBX.Button;
    private _Score: TBX.Label;
    private _OnRestart: Function[];
    public get OnRestart():Function[] { return this._OnRestart; }
    public constructor(Old?:GameOver)
    {
        super(Old);
        if(Old != null)
        {

        }
        else
        {
            this._Banner = TBX.SceneObjectUtil.CreateTile("Banner", ["Resources/Textures/Assets/GameOver.png"], new TBX.Vertex(960, 400, 2.0), new TBX.Vertex(1200, 700, 1));
            this._Banner.Active = false;
            this._Banner.Fixed = true;
            this._Restart = this.CreateButton("Restart", new TBX.Vertex(700, 900, 2.0));
            this._Restart.Events.Click.push(() => this._OnRestart.forEach(Entry => Entry()));
            this._Restart.Active = false;
            this._Quit = this.CreateButton("Quit", new TBX.Vertex(1220, 900, 2.0));
            this._Quit.Events.Click.push(() => TBX.Runner.Current.SwitchScene("Menu"));
            this._Quit.Active = false;
            this._Score = this.CreateLabel("Your Score is ");
            this._Score.Active = false;
            this._OnRestart = [];
        }
    }
    public Init(Scene: TBX.Scene) : void
    {
        Scene.Attach(this._Banner);
        Scene.Attach(this._Restart);
        Scene.Attach(this._Quit);
        Scene.Attach(this._Score);
    }
    public Set(Shown: boolean, Score?:number)
    {
        this._Banner.Active = Shown;
        this._Restart.Active = Shown;
        this._Quit.Active = Shown;
        this._Score.Text = "Your Score is " + Score;
        this._Score.Active = Shown;
    }
    private CreateLabel(Text:string) : TBX.Label
    {
        let Label:TBX.Label = new TBX.Label(null, Text);
        Label.Name = Text;
        Label.Size = new TBX.Vertex(800, 80);
        Label.TextSize = 70;
        Label.Position = new TBX.Vertex(960, 760, 0.2);
        Label.ForeColor = TBX.Color.FromRGBA(255,127,80,255);
        Label.Border.Width = 0;
        return Label;
    }
    private CreateButton(Text:string, Position:TBX.Vertex) : TBX.Button
    {
        let Button:TBX.Button = new TBX.Button(null, Text);
        Button.Name = Text;
        Button.TextSize = 60;
        Button.Size = new TBX.Vertex(360,120);
        Button.Position = Position;
        Button.Padding = 20;
        Button.ForeColor = TBX.Color.FromRGBA(244,208,63,255);
        Button.BackColor = TBX.Color.FromString("#1A1A1A");
        Button.Border.Width = 5;
        Button.Border.Radius = 55;
        Button.Border.Color = TBX.Color.FromRGBA(255,127,80,255);
        return Button;
    }
}