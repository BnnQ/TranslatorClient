export abstract class ThrowHelper {
    static throw(message : string) : never {
        throw new Error(message);
    }

    static throwIfNull(value : any, message : string) : void {
        if (value === undefined || value === null) {
            throw new Error(message);
        }
    }
}