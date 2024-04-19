import { v4 as uuidv4 } from "uuid";
import { readFile, writeFile, } from "fs/promises";
import path from "path";
import { getExpiryDate } from "./utils";
import { EventEmitter } from "events";

const DB_LOCATION = path.join(process.cwd(), "data", "db.json");

const DEFAULT_EXPIRY_MINUTES = 5;

export interface SharedText {
    code: string;
    text: string;
    expiry: number;
}

export interface Record {
    [key: string]: SharedText | undefined
}

export class JsonTextRepository extends EventEmitter {

    constructor() {
        super();
        this.on("CLEAR_AFTER", this.startTextRemovalJob.bind(this));
    }

    private async flush(data: Record) {
        return writeFile(DB_LOCATION, JSON.stringify(data), { encoding: "utf8" });
    }

    private async load(): Promise<Record> {
        const text = await readFile(DB_LOCATION, { encoding: "utf8" }) || "{}";
        return JSON.parse(text);
    }

    public async findTextByCode(code: string) {
        const data = await this.load();
        return data[code];
    }

    public async insertText(text: string): Promise<string> {
        const code = uuidv4();
        const newSharedText: SharedText = {
            code,
            text,
            expiry: getExpiryDate(DEFAULT_EXPIRY_MINUTES)
        };
        const data = await this.load();

        data[code] = newSharedText;
        await this.flush(data);
        this.emit("CLEAR_AFTER", newSharedText);
        return code;
    }

    public async removeByCode(code: string) {
        const data = await this.load();
        delete data[code];
        await this.flush(data);
    }

    private startTextRemovalJob(arg: SharedText) {
        const { code, expiry } = arg;
        console.log(`text assosiated with ${code} set to be removed by ${new Date(expiry).toISOString()}`);
        setTimeout(() => {
            this.removeByCode(code).then(() => {
                console.log(`removed text assosiated with code: ${code}`);
            }).catch(e => {
                console.log(`couldn't remove text for code ${code}: ${e}`);
            });
        }, DEFAULT_EXPIRY_MINUTES * 60 * 1000);
    }

}

export const jsonRepository = new JsonTextRepository();




