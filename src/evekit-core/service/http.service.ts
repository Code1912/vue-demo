import Axios,{AxiosRequestConfig,AxiosPromise} from 'axios';
import {LoadingService} from "./loading.service";
import {AlertService} from "./alert.service";

export  class HttpService {
    private static _count: number = 0;
    private static  _getRequestOption(options ?: EveRequestOptions): EveRequestOptions {
        if (!options  ) {
            options={
                hideLoading:false
            }
        }
        if (options.headers == null) {
            options.headers = {}
        }
        options.headers['Content-Type']= 'application/json';

        // options.headers.append('Access-Control-Allow-Origin', '*');
        //  options.headers.append("Access-Control-Allow-Headers", "*");
        return options;
    }

    private static _hideLoading(options:EveRequestOptions) {
        if (!(options && options.hideLoading)) {
            this._count--;
        }
        if (this._count <= 0) {
            this._count = 0;
            LoadingService.hide();
        }
    }

    private static _showLoading( options?: EveRequestOptions) {
        if ((options && options.hideLoading)) {
            return;
        }
        this._count++;
        LoadingService.show();
    }
    private static _intercept(req: AxiosPromise<any>, options?: EveRequestOptions):Promise<any> {
        let that = this;

        this._showLoading(options);
        return req.then(res=>{
            that._hideLoading(options);
            return  Promise.resolve(res)
        }).catch(error=>{
            let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';
          // that.alertService.error(errMsg, "Error");
            that._hideLoading(options);
            console.dir(error);
            AlertService.error(error.message);
            return  Promise.reject(error)
        });

    }
    static get(url:string,parmas?:any,options? :EveRequestOptions ):Promise<any> {
        options = this._getRequestOption(options);
        options.params = parmas;
        return this._intercept(Axios.get(url, options));
    }
    static post(url:string,options?:EveRequestOptions ,data?:any):Promise<any>  {
        return  this._intercept(Axios.post(url,data,this._getRequestOption(options)));
    }
    static put(url:string,options?:EveRequestOptions ,data?:any) :Promise<any> {
        return  this._intercept(Axios.put(url,data,this._getRequestOption(options)));
    }

    static delete(url:string,options?:EveRequestOptions ):Promise<any>  {
        return  this._intercept(Axios.delete(url,this._getRequestOption(options)));
    }
}
export interface EveRequestOptions extends  AxiosRequestConfig{
    hideLoading:boolean;
}
