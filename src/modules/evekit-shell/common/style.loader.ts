export  class  StyleLoader  {

    static load(url: string): Promise<boolean> {
        let promise = new Promise<boolean>(function(resolve, reject) {
            if($(`#${url.split("/")[0]}Style`.replace(/\//g,"")).length>0){
                resolve(true);
                return;
            }
            let  linkElement:HTMLLinkElement =  document.createElement("link");
            linkElement.href=url;
            linkElement.id=`${url.split(".")[0]}Style`.replace(/\//g,"");
            linkElement.rel="stylesheet";
            linkElement.onload = ()=>{
                resolve(true)
            };
            linkElement.addEventListener("error",  (ev: ErrorEvent) => {
                resolve(false)
            }, true);
            document.head.appendChild(linkElement);
        });
        promise.catch(res=>{
            console.log(res)
        });
        return promise;
    }
}