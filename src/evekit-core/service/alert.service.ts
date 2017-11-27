 declare const toastr: {
    options: any;
    error: (msg) => void;
    warning: (msg) => void;
    info: (msg, ...args) => void;
    success: (msg, ...args) => void;
    confirm: (msg: string, okFunc?: Function, cancelFunc?: Function) => void;
    clear: (...args) => void;
    remove: (...args) => void;
};
const defaultOptions = {
    "closeButton": true,
    "debug": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": 5000,
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
const defaultTimeOut: number = 5000;
 import {Injectable} from "../common/injectable";
 @Injectable()
export  class AlertService {
     error(msg: string, showSeconds?: number) {
        this._setOptions(showSeconds);
        toastr.error(msg)
    }

      warning(msg: string, showSeconds?: number) {
        this._setOptions(showSeconds);
        toastr.warning(msg)
    }

     info(msg: string, showSeconds?: number) {
        this._setOptions(showSeconds);
        toastr.info(msg)
    }

      success(msg: string, showSeconds?: number) {
        this._setOptions(showSeconds);
        toastr.success(msg)
    }

      confirm(msg: string, okFunc?: Function, cancelFunc?: Function) {
        $('#defaultMask').show();
        toastr.clear();
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": 0,
            "extendedTimeOut": 0,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "tapToDismiss": false
        };
        //console.dir(toastr.options);
        let html = `<div>
                             <span>${msg}</span>
                             <div> 
                                <button type='button' class='btn btn-outline pull-right' style="margin-left: 10px">取消</button>
                                <button type='button' class='btn btn-outline pull-right'>确认</button>  
                              </div>
                        </div>`;
        toastr.info('', html,
            {
                allowHtml: true,
                onShown: function () {
                    let that = this;
                    $(this).find("button")[0].onclick = () => {
                        toastr.remove(that);
                        $('#defaultMask').hide();
                        (cancelFunc || Function.prototype)();
                    };
                    $(this).find("button")[1].onclick = () => {
                        toastr.remove(that);
                        $('#defaultMask').hide();
                        (okFunc || Function.prototype)();
                    }
                },
                onHidden: function () {
                    $('#defaultMask').hide();
                }
            });
    }

    private  _setOptions(showSeconds?: number) {
        toastr.options = Object.assign({}, defaultOptions, {timeOut: showSeconds || defaultTimeOut})
    }


}
