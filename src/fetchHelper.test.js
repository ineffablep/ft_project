import "regenerator-runtime/runtime.js";
import fetchMock from "jest-fetch-mock";
import { getData } from './fetchHelper';
fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});

test("With Single Working URL", async () => {
    const expected = JSON.stringify({ rates: { CAD: 1.3297999658 } });
    fetch.mockResponseOnce(expected);

    const rate = await getData("https://api.exchangeratesapi.io/latest?base=USD");
    const actual = JSON.parse(rate.data);
    expect(actual.rates.CAD).toEqual(1.3297999658);
    expect(fetch).toHaveBeenCalledTimes(1);
});

test("With Multiple Working URLs", async () => {
    const expected = JSON.stringify({ rates: { CAD: 1.3297999658 } });
    fetch.mockResponseOnce(expected);

    const urls = [
        "https://api.exchangeratesapi.io/latest?base=USD",
        "https://api.exchangeratesapi.io/latest?base=GBP",
        "https://api.exchangeratesapi.io/latest?base=EUR"
    ];

    await getData(urls);
    expect(fetch).toHaveBeenCalledTimes(3);
});


test("Collect and send exception when failed", async () => {
    
    fetch.mockReject(() => Promise.reject("API is down"));
    try {
        const response= await getData("https://api.exchangeratesapi.io/latest?base=USD");
        expect(response.errors.length).toEqual(1);
        expect(response.errors[0].error).toEqual("API is down");
        expect(response.errors[0].url).toEqual("https://api.exchangeratesapi.io/latest?base=USD");
    } catch (error) {
        expect(error).toMatch("API is down");
    }
});

test("throw exception when failed one with throwErrorIfOneFails", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    try {
        await getData("https://api.exchangeratesapi.io/latest?base=USD", true);
    } catch (error) {
        expect(error).toMatch("API is down");
    }
});


test("throw exception No URL Passed", async () => {
    try {
        await getData();
    } catch (error) {
        expect(error).toMatch("URL List is required");
    }
});