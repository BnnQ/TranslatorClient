export interface ITranslator {
    translate(fromLanguage : string, toLanguage: string, text : string) : Promise<string>;
}