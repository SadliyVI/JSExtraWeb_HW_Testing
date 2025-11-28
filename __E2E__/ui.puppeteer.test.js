/* eslint-disable no-undef */
import puppeteer from "puppeteer";
import { fork } from "child_process";
import path from "path";
import os from "os";

jest.setTimeout(60000);

let browser;
let page;
let server;
const baseUrl = "http://localhost:9000";

beforeAll(async () => {
    server = fork(path.join(__dirname, "e2e.server.js"));

    await new Promise((resolve, reject) => {
        server.on("error", reject);
        server.on("message", (msg) => {
            if (msg === "ok") resolve();
        });
    });

    const userDataDir = path.join(os.tmpdir(), "pptr_profile_" + Date.now());

    const executable = puppeteer.executablePath();

    browser = await puppeteer.launch({
        headless: true,
        executablePath: executable,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            `--user-data-dir=${userDataDir}`
        ]
    });

    page = await browser.newPage();
    await page.goto(baseUrl);

    await page.waitForSelector("#cc-input");
});

afterAll(async () => {
    if (browser) await browser.close();
    if (server) server.kill();
});

describe("Credit Card Validator form", () => {
    test("Ввод валидного номера карты должен показать успешный результат", async () => {
        await page.type("#cc-input", "4539578763621486"); // валидная Visa
        await page.click("#cc-check");

        await page.waitForFunction(() => {
            const el = document.querySelector("#result");
            return el && el.textContent.includes("Номер валиден");
        });

        const result = await page.$eval("#result", el => el.textContent.trim());
        expect(result).toMatch(/Номер валиден/i);
    });

    test("Ввод невалидного номера карты должен показать ошибку", async () => {
        await page.type("#cc-input", "1234567890123456");
        await page.click("#cc-check");

        await page.waitForFunction(() => {
            const el = document.querySelector("#result");
            return el && el.textContent.includes("Неверный номер");
        });

        const result = await page.$eval("#result", el => el.textContent.trim());
        expect(result).toMatch(/Неверный номер/i);
    });
});

