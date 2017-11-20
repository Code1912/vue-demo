
declare module '*.css' {
    const content: any;
    export default content;
}

interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64{
    jQuery: any;
    [key: string]: any;
}
declare  const  window:Window;