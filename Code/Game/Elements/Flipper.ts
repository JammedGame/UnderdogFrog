export { Flipper }

class Flipper
{
    public static Current:Flipper;
    private _Up:boolean;
    private _Diff:number;
    private _Target:number;
    private _Current:number;
    public _OnSwitch:Function[];
    public get Up():boolean { return this._Up; }
    public get Diff():number { return this._Diff; }
    public get Current():number { return this._Current; }
    public get OnSwitch():Function[] { return this._OnSwitch; }
    public constructor(Old?:Flipper)
    {
        if(Old)
        {

        }
        else
        {
            this.Init();
            Flipper.Current = this;
        }
    }
    private Init() : void
    {
        this._Up = true;
        this._Diff = 0;
        this._Target = 0;
        this._Current = 0;
        this._OnSwitch = [];
    }
    public SwitchMode() : void
    {
        this._Up = !this._Up;
        if(this._Up)
        {
            this._Target = 0;
        }
        else
        {
            this._Target = 620;
        }
        for(let i in this._OnSwitch)
        {
            this._OnSwitch[i]();
        }
        
    }
    public Update(): void
    {
        if(this._Target != this._Current)
        {
            if(Math.abs(this._Current - this._Target) < 1)
            {
                this._Diff = 0;
                this._Current = this._Target;
            }
            else if(this._Target < this._Current)
            {
                this._Diff = -(this._Current - this._Target) * 0.08;
                this._Current -= (this._Current - this._Target) * 0.08;
            }
            else if(this._Target > this._Current)
            {
                this._Diff = (this._Current - this._Target) * 0.08;
                this._Current += (this._Target - this._Current) * 0.08;
            }
        }
        else this._Diff = 0;
    }
}