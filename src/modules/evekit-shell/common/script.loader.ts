
export  class  ScriptLoader  {

    static load(url: string): Promise<boolean> {
        let promise = new Promise<boolean>(function(resolve, reject) {
            if($(`#${url.split("/")[0]}JS`.replace(/\//g,"")).length>0){
                resolve(true);
                return;
            }
            let  scriptElement:HTMLScriptElement =  document.createElement("script");

            scriptElement.src=url;
            scriptElement.id=`${url.split(".")[0]}JS`.replace(/\//g,"");
            scriptElement.type="text/javascript";
            scriptElement.async=true;
            scriptElement.onload = ()=>{
                resolve(true)
            };
            scriptElement.addEventListener("error",  (ev: ErrorEvent) => {
                console.error(ev);
                reject(false)
            }, true);
            document.body.appendChild(scriptElement);
        });
        promise.catch(res=>{
            console.log(res);
        });
        return promise;
    }
}