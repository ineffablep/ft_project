import './styles/main.css';
import "regenerator-runtime/runtime.js";
import { getData } from './fetchHelper';

const urls = [
    "https://api.exchangeratesapi.io/latest?base=USD",
    "https://api.exchangeratesapi.io/latest?base=GBP",
    "https://api.exchangeratesapi.io/latest?base=EUR"
];


const loadStockInfo = async () => {
    try {
        const response = await getData(urls, true);
        const rates = [];
        if (response.errors && response.errors.length > 0) {
            alert('Error while loading data');
        }
        if (response.data) {
            response.data.forEach(item => {
                Object.keys(item.rates).forEach(key => {
                    rates.push({ symbol: `${item.base}${key}`, offer: item.rates[key] });
                });
            });
        }
        createRatesTable(rates);
    } catch (error) {
        console.log(error);
    }
};

const createRatesTable = (rates) => {
    const root = document.getElementById('root');
    const tbl = document.createElement("table");

    const tblHead = document.createElement("thead");
    const tHeadRow = document.createElement("tr");
    tHeadRow.innerHTML = `<th>Symbol</th><th>Offer</th>`;
    tblHead.appendChild(tHeadRow);
    tbl.appendChild(tblHead);

    const tblBody = document.createElement("tbody");
    for (const rate of rates) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${rate.symbol}</td><td>${rate.offer}</td>`;
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    root.appendChild(tbl);
    tbl.setAttribute("class", "table table-striped table-sm")
};

loadStockInfo();
