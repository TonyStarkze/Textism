import { v4 as uuidv4 } from "uuid";
import { getExpiryDate } from "./utils";
import { SetOptions } from "redis";

const DEFAULT_EXPIRY_MINUTES = +process.env.EXPIRY_IN_MINUTES!;

export interface SharedText {
  code: string;
  text: string;
  expiry: number;
}

export interface ICache {
  set: (key: string, value: string, options?: SetOptions) => Promise<void>;
  get: (key: string) => Promise<string | null>;
}

export class Repository {
  constructor(private readonly cache: ICache) {}

  async insertText(text: string) {
    const id = uuidv4();

    const sharedText: SharedText = {
      code: id,
      text,
      expiry: getExpiryDate(DEFAULT_EXPIRY_MINUTES),
    };

    await this.cache.set(id, JSON.stringify(sharedText), {
      EX: DEFAULT_EXPIRY_MINUTES * 60,
    });

    return id;
  }

  async getText(code: string) {
    const str = await this.cache.get(code);
    return str ? JSON.parse(str) : null;
  }
}
