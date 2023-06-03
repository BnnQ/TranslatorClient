import axios from "axios";
import IHttpClient from "./abstractions/i-http-client";
import {IHttpParameters} from "../models/abstractions/i-http-parameters";
import {UrlParametersMapper} from "../utils/url-parameters-mapper";
import {injectable} from "inversify";
import {IHttpHeaders} from "../models/abstractions/i-http-headers";

@injectable()
export class AxiosHttpClient implements IHttpClient {
    async get<T>(url: URL, routeParameters?: IHttpParameters,
                 queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T> {
        const mappedUrl: string = UrlParametersMapper.mapRouteAndQueryParametersToUrl(url,
                                                                                      routeParameters,
                                                                                      queryParameters);

        const response = await axios.get<T>(mappedUrl, {
            headers: headers
        });

        return response.data;
    }

    async post<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
                  queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T> {
        const mappedUrl : string = UrlParametersMapper.mapRouteAndQueryParametersToUrl(url, routeParameters, queryParameters);

        const response = await axios.post<T>(mappedUrl, body, {
            headers: headers
        });

        return response.data;
    }

    async put<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
                 queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T> {
        const mappedUrl: string = UrlParametersMapper.mapRouteAndQueryParametersToUrl(url,
                                                                                      routeParameters,
                                                                                      queryParameters);

        const response = await axios.put<T>(mappedUrl, body, {
            headers: headers
        });

        return response.data;
    }

    async delete<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
                    queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T> {
        const mappedUrl: string = UrlParametersMapper.mapRouteAndQueryParametersToUrl(url,
                                                                                      routeParameters,
                                                                                      queryParameters);

        const response = await axios.delete<T>(mappedUrl, {
            headers: headers
        });

        return response.data;
    }

}