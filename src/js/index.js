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
const filterRadios = document.querySelectorAll(".filter__radio")
const radioListToFilter = [...filterRadios];

 

// *Functions


const dateFormatter = (date) => {

  const formatter = new Intl.DateTimeFormat('fa-IR', {
    calender:'persian',
    year:'numeric',
    month:'numeric',
    day:'numeric'
  })

      
        const recivedDate = new Date(date);
        const hour = recivedDate.getHours();
        const minutes = recivedDate.getMinutes();
        const persianHour = new Intl.NumberFormat('fa-IR').format(hour);
        const persianMinute = new Intl.NumberFormat('fa-IR').format(minutes);
        const finalDate = formatter.format(recivedDate);
        return (`${finalDate} در ساعت ${persianHour}:${persianMinute}`)
}

const liElementCreator = (data) => {

    data.forEach(element => {

    const refIdString = `${element.refId}`;
    console.log(typeof(refIdString))
    const fullDate = dateFormatter(element.date);
    const newLi = document.createElement('li');
    newLi.innerHTML = `
    <p class="num">
             ${new Intl.NumberFormat('fa-IR').format(element.id)}
           </p>
           <p class="transaction__type">
            ${element.type}
           </p>
           <p class="transaction__price">
             ${new Intl.NumberFormat('fa-IR').format(element.price)}
           </p>
           <p class="transaction__number">
             ${new Intl.NumberFormat('fa-IR').format(refIdString).replace(/,/g, '')}
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
  filterRadios[0].setAttribute('checked', 'checked');
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
    data.forEach(element => {

      const fullDate = dateFormatter(element.date);
      const newLi = document.createElement('li');
      newLi.innerHTML = `
      <p class="num">
               ${data.indexOf(element) + 1}
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

const filterHandler = (event) => {

  const filter = event.target.id;
  
  switch (filter) {

    case "high_to_low":
      axios
      .get(`${API_URL}?sort=price&_order=asc`)
      .then((res)=>console.log(res.data))
      break;


    case "low_to_high":
      console.log("lower");
      break;


    case "newest":
      console.log("new");
      break;


    default:
      console.log("all");
  }
}

// *EeventListeners

getDataBtn.addEventListener("click", getData);
searchInput.addEventListener("input", searchHandler);
radioListToFilter.forEach((item) => {
  item.addEventListener("click", filterHandler)
})
