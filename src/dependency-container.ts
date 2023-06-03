import {Container} from "inversify";
import IHttpClient from "./services/abstractions/i-http-client";
import {AxiosHttpClient} from "./services/axios-http-client";
import {SERVICE_KEYS} from "./service-keys";
import {ITranslator} from "./services/abstractions/i-translator";
import {LocalApiTranslator} from "./services/local-api-translator";
import {ThrowHelper} from "./utils/throw-helper";

export const container = new Container();
container.bind<IHttpClient>(SERVICE_KEYS.IHttpClient).to(AxiosHttpClient);

const localApiEndpointEnvKey : string = "REACT_APP_AZURE_LOCAL_API_ENDPOINT";
const localApiEndpoint : string = process.env[localApiEndpointEnvKey] ?? ThrowHelper.throw(`'${localApiEndpointEnvKey}' environment value is not provided.`);

container.bind<ITranslator>(SERVICE_KEYS.ITranslator).toDynamicValue((context) => {
    const httpClient = context.container.get<IHttpClient>(SERVICE_KEYS.IHttpClient);
   return new LocalApiTranslator(httpClient, localApiEndpoint);
});