// *Variables

let allPaymentData = [];
const API_URL = "http://localhost:3000/transactions";
const transactionsListHeader = `

        <li class="transactions__header">
          <p class="num">
            ردیف
          </p>
          <p class="transaction__type">
            نوع تراکنش
          </p>
          <p class="transaction__price">
            مبلغ
          </p>
          <p class="transaction__number">
            شماره پیگیری
          </p>
          <p class="transaction__date">
            تاریخ تراکنش
          </p>
        </li>`;



// *Selectors


const getDataBtn = document.querySelector(".btn__show-transactions");
const transactionsUL = document.querySelector(".transactions");
const searchInput = document.querySelector(".search__input");



// *Functions


const dateFormatter = (date) => {

        const recivedDate = new Date(date);
        const year = recivedDate.getFullYear();
        const month = recivedDate.getMonth() + 1;
        const day = recivedDate.getDay() + 1;
        const fullDate = `${year}/${month}/${day}`;
        return fullDate;
}

const liElementCreator = (data) => {

    data.forEach(element => {

    const fullDate = dateFormatter(element.date);
    const newLi = document.createElement('li');
    newLi.innerHTML = `
    <p class="num">
             ${element.id}
           </p>
           <p class="transaction__type">
            ${element.type}
           </p>
           <p class="transaction__price">
             ${element.price}
           </p>
           <p class="transaction__number">
             ${element.refId}
           </p>
           <p class="transaction__date">
           ${fullDate}
           </p>
    `

    newLi.classList.add('transactions__header', 'transactions__item')
    transactionsUL.appendChild(newLi);

    });
    
}

function getData() {

    transactionsUL.innerHTML = transactionsListHeader;
  axios
    .get(API_URL)
    .then((res) => {
     liElementCreator(res.data)
      });

}

const searchHandler = () => {

  axios
  .get(`${API_URL}?refId_like=${searchInput.value}`)
  .then((res) => searchItemShower(res.data))

}

const searchItemShower = (data) => {

    transactionsUL.innerHTML = transactionsListHeader;
    liElementCreator(data)
}

// *EeventListeners

getDataBtn.addEventListener("click", getData);
searchInput.addEventListener("input", searchHandler);
