declare  const  toastr:{
    options:any;
    error:(msg)=>void;
    warning:(msg)=>void;
    info:(msg)=>void;
    success:(msg)=>void;
};
toastr.options = {
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
const  defaultTimeOut:number=5000;
export  class  Alert{
     error(msg:string,showSeconds?:number){
         toastr.options.timeOut=showSeconds||defaultTimeOut;
         toastr.error(msg)
     }
    warning(msg:string,showSeconds?:number){
        toastr.options.timeOut=showSeconds||defaultTimeOut;
        toastr.warning(msg)
    }
    info(msg:string,showSeconds?:number){
        toastr.options.timeOut=showSeconds||defaultTimeOut;
        toastr.info(msg)
    }
    success(msg:string,showSeconds?:number){
        toastr.options.timeOut=showSeconds||defaultTimeOut;
        toastr.success(msg)
    }
}
export  const  AlertService=new Alert();