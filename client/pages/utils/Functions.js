import crypto from "crypto";

export class Functions {

    static encrypt512(text) {
        return crypto.createHash("sha512").update(text).digest("hex");
    }
}
