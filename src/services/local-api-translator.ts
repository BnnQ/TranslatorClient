import {ITranslator} from "./abstractions/i-translator";
import {injectable} from "inversify";
import IHttpClient from "./abstractions/i-http-client";

interface IResponse {
    translatedText : string;
}

@injectable()
export class LocalApiTranslator implements ITranslator {
    constructor(private httpClient : IHttpClient, private endpoint: string) {
    }

    async translate(fromLanguage: string, toLanguage: string, text: string): Promise<string> {
        const response = await this.httpClient.post<IResponse>(
            new URL(this.endpoint + '/api/translate'), {Text: text}, undefined,{
                fromLanguage: fromLanguage, toLanguage: toLanguage
            }, {
                'Content-Type': 'application/json'
            });

        if (response === undefined) {
            throw new Error('Local API translator service did not return a successful response.');
        }

        return response.translatedText;
    }

}