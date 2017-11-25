export  class  ServiceBase {
    private  static _instance:any;

    public static get Instance():any
    {
        return this._instance || (this._instance = new this());
    }
}