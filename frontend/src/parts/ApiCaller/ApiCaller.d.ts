import { AxiosResponse } from 'axios';

export interface IDefaultJsonReturn<T> {
    err: string;
    data: T;
}

export interface IGetScrapedUrlData {
    
}

export interface IGetScrapedUrlDataResponse extends AxiosResponse<IDefaultJsonReturn<IGetScrapedUrlData>> {}