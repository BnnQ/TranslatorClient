import {IHttpParameters} from "../../models/abstractions/i-http-parameters";
import {IHttpHeaders} from "../../models/abstractions/i-http-headers";

export default interface IHttpClient {

    get<T>(url: URL, routeParameters?: IHttpParameters,
           queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T>;

    post<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
            queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T>;

    put<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
           queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T>;

    delete<T>(url: URL, routeParameters?: IHttpParameters,
              queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T>
}