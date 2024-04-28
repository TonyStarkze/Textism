import { getExpiryDate } from "./utils";
import { SetOptions } from "redis";

// Function to generate a 4-character alphanumeric UUIDv4
function generateShortUUID(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let shortUUID = '';

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        shortUUID += characters[randomIndex];
    }

    return shortUUID;
}

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
    const id = generateShortUUID(); // Generate the 4-digit alphanumeric UUIDv4

    const sharedText: SharedText = {
      code: id,
      text,
      expiry: getExpiryDate(DEFAULT_EXPIRY_MINUTES),
    };

    await this.cache.set(id, JSON.stringify(sharedText), {
      EX: 3600,
    });

    return id;
  }

  async getText(code: string) {
    const str = await this.cache.get(code);
    return str ? JSON.parse(str) : null;
  }
}
