const _id = function (id) {
    return document.getElementById(id);
};
let date = new Date();
const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
};
_id("exchange-today").innerHTML = date.toLocaleDateString("uk-UA", options);
const buyUSD = _id("exchange-usd");
const buyEUR = _id("exchange-eur");
const buyRUR = _id("exchange-rur");
const saleUSD = _id("exchange-sale-usd");
const saleEUR = _id("exchange-sale-eur");
const saleRUR = _id("exchange-sale-rur");
function view(obj) {
    let [{ "buy": euBuy, "sale": euSale },
        { "buy": ruBuy, "sale": ruSale },
        { "buy": usBuy, "sale": usSale }] = obj;

    buyUSD.innerHTML = parseFloat(usBuy).toFixed(2);
    buyEUR.innerHTML = parseFloat(euBuy).toFixed(2);
    buyRUR.innerHTML = parseFloat(ruBuy).toFixed(2);
    saleUSD.innerHTML = parseFloat(usSale).toFixed(2);
    saleEUR.innerHTML = parseFloat(euSale).toFixed(2);
    saleRUR.innerHTML = parseFloat(ruSale).toFixed(2);
};
const urlPrivat = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

fetch(urlPrivat, { metod: "get" })
    .then((response) => {
        let json = response.json();
        if (response.status >= 200 && response.status < 300) {
            return json;
        }
        else {
            return error;
        }
    }).then((json) => {
        let obj = "";
        view(json);
    })
    .catch(function (error) {
    });


const from_currencyEl = document.getElementById('from_currency');
const from_ammountEl = document.getElementById('from_ammount');
const to_currencyEl = document.getElementById('to_currency');
const to_ammountEl = document.getElementById('to_ammount');
const rateEl = document.getElementById('rate');
const exchange = document.getElementById('exchange');

from_currencyEl.addEventListener('change', calculate);
from_ammountEl.addEventListener('input', calculate);
to_currencyEl.addEventListener('change', calculate);
to_ammountEl.addEventListener('input', calculate);

exchange.addEventListener('click', () => {
    const temp = from_currencyEl.value;
    from_currencyEl.value = to_currencyEl.value;
    to_currencyEl.value = temp;
    calculate();
});

function calculate() {
    const from_currency = from_currencyEl.value;
    const to_currency = to_currencyEl.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency}`)
        .then(res => res.json())
        .then(res => {
            const rate = res.rates[to_currency];
            rateEl.innerText = `1 ${from_currency} = ${rate} ${to_currency}`
            to_ammountEl.value = (from_ammountEl.value * rate).toFixed(2);
        })
}

calculate();

