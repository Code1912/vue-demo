import {getService} from '../common/injectable'
export  class  ServiceBase{
    public static instance<T>():T
    {
        return  <T>getService(this)
    }
}