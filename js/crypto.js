let coinArray = [];
let depositArray = [];
let cryptoNameArray = [];
let sumDepositAmount = 0;
let coinNames = [];
let sumOfAllCrypto = 0;
let totalCoinOfCryptoArray = [];
let totalCoinsArray = [];
let totalCoinNames = [];
let allCryptoPercentage = [];
let coinBroughtAtArray = [];
let today = new Date().toISOString().slice(0, 10);

let SampleCoinArray = [
  {
    id: 1622220170435,
    name: 'XRP',
    atPrice: 80,
    coin: -10,
    paid: -800,
    type: 'SELL',
    date: '2021-05-24',
  },
  {
    id: 1622220588434,
    name: 'ETH',
    atPrice: 50,
    coin: 1,
    paid: 50,
    type: 'BUY',
    date: '2021-05-22',
  },
  {
    id: 1622220545101,
    name: 'DOGE',
    atPrice: 55,
    coin: -100,
    paid: -5500,
    type: 'SELL',
    date: '2021-05-10',
  },
  {
    id: 1621966249426,
    name: 'XRP',
    atPrice: 111.8,
    coin: 10,
    paid: 1118,
    type: 'BUY',
    date: '2021-05-04',
  },
  {
    id: 1622220491532,
    name: 'DOGE',
    atPrice: 21,
    coin: 100,
    paid: 2100,
    type: 'BUY',
    date: '2021-04-17',
  },
  {
    id: 1622220421789,
    name: 'ETH',
    atPrice: 100,
    coin: 40,
    paid: 4000,
    type: 'BUY',
    date: '2021-04-05',
  },
];
let SampleDepositArray = [
  {
    id: 1621958730658,
    amount: 2000,
    currency: 'inr',
    type: 'DEPOSIT',
    date: '2021-05-24',
  },
  {
    id: 1622220334813,
    amount: 1000,
    currency: 'inr',
    type: 'DEPOSIT',
    date: '2021-04-04',
  },
  {
    id: 1622220321867,
    amount: 1000,
    currency: 'inr',
    type: 'DEPOSIT',
    date: '2021-04-01',
  },
];
let SampleCryptoNameArray = [
  { id: 1621966396952, name: 'Dogecoin', symbol: 'DOGE' },
  { id: 1621960437284, name: 'Ethereum', symbol: 'ETH' },
  { id: 1621966044648, name: 'Ripple', symbol: 'XRP' },
];

function initLocalStorage() {
  if (localStorage.getItem('coinArray') === null) {
    localStorage.setItem('coinArray', JSON.stringify(SampleCoinArray));
    setTimeout(() => location.reload(), 200);
  } else {
    coinArray = JSON.parse(localStorage.getItem('coinArray'));
  }

  if (localStorage.getItem('depositArray') === null) {
    localStorage.setItem('depositArray', JSON.stringify(SampleDepositArray));
  } else {
    depositArray = JSON.parse(localStorage.getItem('depositArray'));
  }

  if (localStorage.getItem('cryptoNameArray') === null) {
    localStorage.setItem(
      'cryptoNameArray',
      JSON.stringify(SampleCryptoNameArray)
    );
  } else {
    cryptoNameArray = JSON.parse(localStorage.getItem('cryptoNameArray'));
  }
}

function sumDepositAmountFunc() {
  sumDepositAmount = 0;
  depositArray.forEach((amount) => {
    sumDepositAmount += amount.amount;
  });
  document.getElementById('sumDepositAmount').innerHTML = sumDepositAmount;
}

function findSumOfAllCrypto() {
  sumOfAllCrypto = 0;
  coinArray.forEach((coin) => {
    sumOfAllCrypto += coin.coin;
  });
}

function findCoinNames() {
  coinNames = [];
  coinArray.forEach((coin) => {
    if (!coinNames.includes(coin.name)) {
      coinNames.push(coin.name);
    }
  });
}

function findTotalCoinsOfEachCrypto() {
  totalCoinOfCryptoArray = [];
  coinNames.forEach((coinName) => {
    let totalCoin = 0;
    let totalPaid = 0;
    coinArray.forEach((coin) => {
      if (coin.name == coinName) {
        totalCoin += coin.coin;
        totalPaid += coin.paid;
      }
    });
    let c = {
      name: coinName,
      coin: totalCoin,
      paid: totalPaid,
    };
    totalCoinOfCryptoArray.push(c);
  });
  findOnlyCryptoNamesAndTotalCoin();
}

function findOnlyCryptoNamesAndTotalCoin() {
  totalCoinsArray = [];
  totalCoinNames = [];
  totalCoinOfCryptoArray.forEach((coin) => {
    totalCoinsArray.push(coin.coin);
    totalCoinNames.push(coin.name);
  });
}

function getCryptoPercentage() {
  allCryptoPercentage = [];
  totalCoinsArray.forEach((coin) => {
    allCryptoPercentage.push(percentage(coin, sumOfAllCrypto));
  });
}

function percentage(coinValue, sumOfAllCrypto) {
  return ((100 * coinValue) / sumOfAllCrypto).toFixed(3);
}

function getCryptoBroughtAtList() {
  coinBroughtAtArray = [];
  coinArray.forEach((coin) => {
    let coinObj = {
      atPrice: coin.atPrice,
      coin: coin.coin,
      paid: coin.paid,
      type: coin.type,
      date: coin.date,
    };

    if (coinBroughtAtArray[coin.name]) {
      // check if that array exists or not in coinBroughtAtArray object
      coinBroughtAtArray[coin.name].push(coinObj); // just push
    } else {
      coinBroughtAtArray[coin.name] = [];
      coinBroughtAtArray[coin.name].push(coinObj); // create a new array and push
    }
  });
}

initLocalStorage();
callAllAmountFunctions();
callAllCryptoFunctions();
// console.log('Investment: ', sumDepositAmount);
// console.log(coinNames);
// console.log(totalCoinOfCryptoArray);
// console.log(totalCoinsArray);
// console.log(allCryptoPercentage);
// console.log(totalCoinNames);
// console.log(coinBroughtAtArray);
// console.log(JSON.stringify(coinArray));

function callAllAmountFunctions() {
  sumDepositAmountFunc();
}

function callAllCryptoFunctions() {
  findSumOfAllCrypto();
  findCoinNames();
  findTotalCoinsOfEachCrypto();
  getCryptoPercentage();
  getCryptoBroughtAtList();
}

window.onload = function () {
  callAllPlotFunctions();

  document
    .getElementById('depositBtn')
    .addEventListener('click', addDepositWithdrawAmount.bind(event, 'DEPOSIT'));
  document
    .getElementById('withdrawBtn')
    .addEventListener(
      'click',
      addDepositWithdrawAmount.bind(event, 'WITHDRAW')
    );
  document.getElementById('addCrypto').addEventListener('click', addCryptoName);
  document
    .getElementById('cryptoBuy')
    .addEventListener('click', addCryptoTransaction.bind(event, 'BUY'));
  document
    .getElementById('cryptoSell')
    .addEventListener('click', addCryptoTransaction.bind(event, 'SELL'));
  document
    .getElementById('downloadData')
    .addEventListener('click', downloadData);
  document.getElementById('clearData').addEventListener('click', clearData);
  document.getElementById('importData').addEventListener('click', importData);
  document.getElementById('date').value = today;
  document.getElementById('buyDate').value = today;

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
};

function callAllPlotFunctions() {
  plotEachCoinBox();
  plotCryptoPercentagePieChart();
  plotCryptoVerticalTable();
  plotDepositWithdrawAmountList();
  plotCryptoNameList();
  plotCryptoNamesDropdown();
  plotCryptoInfoList();
}

// ===== Plot on HTML Functions Start =====

function plotEachCoinBox() {
  let plotEachCoin = document.getElementById('plotEachCoin');
  if (totalCoinOfCryptoArray.length == 0) {
    document.getElementById('plotEachCoinCard').style.display = 'none';
  } else {
    document.getElementById('plotEachCoinCard').style.display = 'block';
  }
  let plotEachCoinHTML = '';
  totalCoinOfCryptoArray.forEach((coin) => {
    let coinPaidTXT = '';
    if (coin.coin > 0 && coin.paid > 0) {
      coinPaidTXT +=
        '<span class="p-2">At Price: <b>' +
        parseFloat(coin.paid.toFixed(3)) +
        '</b></span>';
    } else if (coin.coin == 0 && coin.paid > 0) {
      coinPaidTXT +=
        '<span class="p-2" style="color:#e51c23;">Loss: <b>' +
        parseFloat(coin.paid.toFixed(3)) +
        '</b></span>';
    } else {
      coinPaidTXT +=
        '<span class="p-2" style="color:#4caf50;">Profit: <b>' +
        Math.abs(parseFloat(coin.paid.toFixed(3))) +
        '</b></span>';
    }
    plotEachCoinHTML +=
      '<div class="col-md-2 col-sm-12">' +
      '<div class="p-3 border bg-light">' +
      '<div class="d-flex align-items-center">' +
      '<h3>' +
      parseFloat(coin.coin.toFixed(3)) +
      '</h3> <span class="d-block ms-2">' +
      coin.name +
      '</span>' +
      '</div>' +
      coinPaidTXT +
      '</div>' +
      '</div>';
  });
  plotEachCoin.innerHTML = plotEachCoinHTML;
}

function plotCryptoPercentagePieChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: allCryptoPercentage,
          backgroundColor: [
            '#ff6384',
            '#ff9f40',
            '#ffcd56',
            '#4bc0c0',
            '#36a2eb',
            '#F4FF81',
            '#84FFFF',
            '#EA80FC',
            '#8C9EFF',
            '#D4E157',
            '#9CCC65',
            '#FF8A80',
            '#BCAAA4',
          ],
        },
      ],
      labels: coinNames,
    },
    options: {
      plugins: {
        datalabels: {
          formatter: (value) => {
            return value + '%';
          },
          font: {
            weight: 'bold',
            fontColor: 'blue',
          },
        },
        doughnutlabel: {
          labels: [
            {
              text: parseFloat(sumOfAllCrypto.toFixed()),
              font: {
                size: 20,
                weight: 'bold',
              },
            },
            {
              text: 'total',
            },
          ],
        },
      },
    },
  });
  document.getElementById('sumOfAllCoins').innerHTML =
    '<b> Total Coins: ' + parseFloat(sumOfAllCrypto.toFixed()) + '</b>';
}

function plotCryptoVerticalTable() {
  if (coinArray.length == 0) {
    document.getElementById('cryptoVerticalTable').innerHTML =
      "<div class='centerElem'>Add Coin</div>";
    return 0;
  } else {
    document.getElementById('cryptoVerticalTable').style.display = 'block';
  }

  document.getElementById('cryptoVerticalTable').innerHTML = '';
  let navTabs = '';
  let tabContent = '';
  navTabs += '<ul class="nav nav-tabs" id="myTab" role="tablist">';
  tabContent += '<div class="tab-content" id="myTabContent">';
  totalCoinNames.forEach((coin, i) => {
    if (i == 0) {
      navTabs +=
        '<li class="nav-item" role="presentation">' +
        '<button class="nav-link active" id="' +
        coin +
        '-tab" data-bs-toggle="tab" data-bs-target="#' +
        coin +
        '" type="button"' +
        'role="tab" aria-controls="' +
        coin +
        '" aria-selected="true">' +
        coin +
        '</button>' +
        '</li>';
      tabContent +=
        '<div class="tab-pane fade show active" id="' +
        coin +
        '" role="tabpanel" aria-labelledby="' +
        coin +
        '-tab">';
    } else {
      navTabs +=
        '<li class="nav-item" role="presentation">' +
        '<button class="nav-link" id="' +
        coin +
        '-tab" data-bs-toggle="tab" data-bs-target="#' +
        coin +
        '" type="button"' +
        'role="tab" aria-controls="' +
        coin +
        '" aria-selected="true">' +
        coin +
        '</button>' +
        '</li>';
      tabContent +=
        '<div class="tab-pane fade" id="' +
        coin +
        '" role="tabpanel" aria-labelledby="' +
        coin +
        '-tab">';
    }

    // let coinListHTML = ''
    let totalCoin = 0;
    let totalPAid = 0;
    coinBroughtAtArray[coin].forEach((c) => {
      totalCoin += c.coin;
      totalPAid += c.paid;
    });
    let totalPAidTXT = '';
    if (totalCoin > 0 && totalPAid > 0) {
      totalPAidTXT += '<b>Paid: ' + parseFloat(totalPAid.toFixed(4)) + '</b>';
    } else if (totalCoin == 0 && totalPAid > 0) {
      totalPAidTXT +=
        '<b style="color: #e51c23;">Loss: ' +
        parseFloat(totalPAid.toFixed(4)) +
        '</b>';
    } else {
      totalPAidTXT +=
        '<b style="color: #4caf50;">Profit: ' +
        Math.abs(parseFloat(totalPAid.toFixed(4))) +
        '</b>';
    }
    tabContent +=
      '<div class="tabContentCoinDetails"><b>Coin: ' +
      parseFloat(totalCoin.toFixed(4)) +
      '</b> | ' +
      totalPAidTXT +
      '</div>';

    tabContent +=
      '<div class="table-responsive"><table class="table table-sm">' +
      '<thead>' +
      '<tr>' +
      '<th scope="col">At Price</th>' +
      '<th scope="col">Coin</th>' +
      '<th scope="col">Paid</th>' +
      '<th scope="col">Type</th>' +
      '<th scope="col">Date</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';
    coinBroughtAtArray[coin].forEach((c) => {
      let color = '';
      c.type === 'BUY' ? (color = 'green') : (color = 'red');
      tabContent +=
        '<tr>' +
        '<td>' +
        c.atPrice +
        '</td>' +
        '<td class="' +
        color +
        '">' +
        Math.abs(c.coin) +
        '</td>' +
        '<td>' +
        Math.abs(c.paid) +
        '</td>' +
        '<td class="' +
        color +
        '">' +
        c.type +
        '</td>' +
        '<td>' +
        c.date +
        '</td>' +
        '</tr>';
    });
    tabContent += '</tbody>' + '</table></div>';
    tabContent += '</div>';
  });
  tabContent += '</div>';
  navTabs += '</ul>';
  let cryptoVerticalTable = navTabs + tabContent;
  document.getElementById('cryptoVerticalTable').innerHTML =
    cryptoVerticalTable;
}

function plotDepositWithdrawAmountList() {
  if (depositArray.length == 0) {
    document.getElementById('amountList').style.display = 'none';
  } else {
    document.getElementById('amountList').style.display = 'block';
  }
  let amountList = document.getElementById('amountList');
  amountList.innerHTML = '';
  let amountListHTML = '';
  amountListHTML +=
    '<div class="table-responsive"><table class="table table-sm">' +
    '<thead>' +
    '<tr>' +
    '<th scope="col">Amount</th>' +
    '<th scope="col">Type</th>' +
    '<th scope="col">Date</th>' +
    '<th scope="col">Delete</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';

  for (var i = 0; i < depositArray.length; i++) {
    // let amountOBj = JSON.stringify(depositArray[i]);
    let id = depositArray[i].id;
    let amount = depositArray[i].amount;
    let type = depositArray[i].type;
    let date = depositArray[i].date.split('-').reverse().join('-');
    let color = '';
    depositArray[i].type === 'DEPOSIT' ? (color = 'green') : (color = 'red');

    amountListHTML +=
      '<tr>' +
      '<td>' +
      Math.abs(amount) +
      '</td>' +
      '<td>' +
      type +
      '</td>' +
      '<td>' +
      date +
      '</td>' +
      '<td class="red"><i onclick="deleteAmount(\'' +
      id +
      '\')" class="bi bi-x-lg"></i></td>' +
      '</tr>';
  }
  amountListHTML += '</tbody>' + '</table></div>';
  amountList.innerHTML = amountListHTML;
}

function plotCryptoNameList() {
  if (cryptoNameArray.length == 0) {
    document.getElementById('cryptoNameList').style.display = 'none';
  } else {
    document.getElementById('cryptoNameList').style.display = 'block';
  }
  let cryptoNameList = document.getElementById('cryptoNameList');
  cryptoNameList.innerHTML = '';
  let cryptoNameListHTML = '';

  cryptoNameListHTML +=
    '<div class="table-responsive"><table class="table table-sm">' +
    '<thead>' +
    '<tr>' +
    '<th scope="col">Name</th>' +
    '<th scope="col">Symbol</th>' +
    '<th scope="col">Delete</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';

  let cryptoNameArrayLength = cryptoNameArray.length;
  for (let i = 0; i < cryptoNameArrayLength; i++) {
    let id = cryptoNameArray[i].id;
    cryptoNameListHTML +=
      '<tr>' +
      '<td>' +
      cryptoNameArray[i].name +
      '</td>' +
      '<td>' +
      cryptoNameArray[i].symbol +
      '</td>' +
      '<td class="red"><i onclick="deleteCryptoName(\'' +
      id +
      '\')" class="bi bi-x-lg"></i></td>' +
      '</tr>';
  }
  cryptoNameListHTML += '</tbody>' + '</table></div>';
  cryptoNameList.innerHTML = cryptoNameListHTML;
}

function plotCryptoNamesDropdown() {
  if (cryptoNameArray.length == 0) {
    document.getElementById('cryptoNameList').style.display = 'none';
  } else {
    document.getElementById('CryptoInfoCard').style.display = 'block';
    document.getElementById('cryptoNameList').style.display = 'block';
  }

  if (cryptoNameArray.length == 0 && coinArray.length == 0) {
    document.getElementById('CryptoInfoCard').style.display = 'none';
  } else {
    document.getElementById('CryptoInfoCard').style.display = 'block';
  }

  document.getElementById('cname').innerText = null;
  document.getElementById('cname').add(new Option('Select Crypto', '0'));
  cryptoNameArray.forEach((coin, i) => {
    document
      .getElementById('cname')
      .add(new Option(coin.name + ' (' + coin.symbol + ')', coin.symbol));
  });
}

function plotCryptoInfoList() {
  let coinArrayList = document.getElementById('coinArrayList');
  coinArrayList.innerHTML = '';
  let coinArrayListHTML = '';

  coinArrayListHTML +=
    '<div class="table-responsive"><table class="table table-sm">' +
    '<thead>' +
    '<tr>' +
    '<th scope="col">Name</th>' +
    '<th scope="col">At Price</th>' +
    '<th scope="col">Coin</th>' +
    '<th scope="col">Paid</th>' +
    '<th scope="col">Type</th>' +
    '<th scope="col">Date</th>' +
    '<th scope="col">Delete</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';

  let coinArrayLength = coinArray.length;

  if (coinArrayLength == 0) {
    document.getElementById('coinArrayList').style.display = 'none';
  } else {
    document.getElementById('coinArrayList').style.display = 'block';
  }

  for (var i = 0; i < coinArrayLength; i++) {
    // let coinObjOBj = JSON.stringify(coinArray[i]);
    let id = coinArray[i].id;
    let name = coinArray[i].name;
    let atPrice = coinArray[i].atPrice;
    let coin = coinArray[i].coin;
    let paid = coinArray[i].paid;
    let type = coinArray[i].type;
    let date = coinArray[i].date.split('-').reverse().join('-');
    let color = '';
    coinArray[i].type === 'BUY' ? (color = 'green') : (color = 'red');
    coinArrayListHTML +=
      '<tr>' +
      '<td>' +
      name +
      '</td>' +
      '<td>' +
      atPrice +
      '</td>' +
      '<td class="' +
      color +
      '">' +
      Math.abs(coin) +
      '</td>' +
      '<td>' +
      Math.abs(paid) +
      '</td>' +
      '<td class="' +
      color +
      '">' +
      type +
      '</td>' +
      '<td>' +
      date +
      '</td>' +
      '<td class="red"><i onclick="deleteCoin(\'' +
      id +
      '\')" class="bi bi-x-lg"></i></td>' +
      '</tr>';
  }
  coinArrayListHTML += '</tbody>' + '</table></div>';
  coinArrayList.innerHTML = coinArrayListHTML;
}

// ===== Plot on HTML Functions End =====

// ===== Remove Element form HTML start =====

function deleteAmount(id) {
  let confirm = confirmAction('Are you sure you want to delete?');
  if (!confirm) {
    return 0;
  }
  depositArray.forEach((amount, i) => {
    if (amount.id == id) {
      depositArray.splice(i, 1);
      localStorage.setItem('depositArray', JSON.stringify(depositArray));
    }
  });
  sumDepositAmountFunc();
  plotDepositWithdrawAmountList();
}

function deleteCryptoName(id) {
  let confirm = confirmAction('Are you sure you want to delete?');
  if (!confirm) {
    return 0;
  }
  cryptoNameArray.forEach((crypto, i) => {
    if (crypto.id == id) {
      cryptoNameArray.splice(i, 1);
      localStorage.setItem('cryptoNameArray', JSON.stringify(cryptoNameArray));
    }
  });
  plotCryptoNameList();
  plotCryptoNamesDropdown();
}

function deleteCoin(id) {
  let confirm = confirmAction('Are you sure you want to delete?');
  if (!confirm) {
    return 0;
  }
  coinArray.forEach((coin, i) => {
    if (coin.id == id) {
      coinArray.splice(i, 1);
      localStorage.setItem('coinArray', JSON.stringify(coinArray));
    }
  });

  callAllCryptoFunctions();
  callAllPlotFunctions();
}

// ===== Remove Element form HTML End =====

// ===== Add Data Functions Start =====

function addDepositWithdrawAmount(transactionType, event) {
  let amount = document.getElementById('amount').value;
  let date = document.getElementById('date').value;
  let selectedCurrency = document.querySelector('#currency').value;

  if (!amount || !date) {
    snackBar('Please Enter Amount and Date!');
    return 0;
  }

  if (typeof +amount === 'string') {
    snackBar('Amount should be a number!');
    return 0;
  }

  let amountObj = {
    id: Date.now(),
    amount: transactionType == 'DEPOSIT' ? +amount : -amount,
    currency: selectedCurrency,
    type: transactionType == 'DEPOSIT' ? 'DEPOSIT' : 'WITHDRAW',
    date: date,
  };
  depositArray.push(amountObj);
  depositArray = sortArrayByDate(depositArray);
  localStorage.setItem('depositArray', JSON.stringify(depositArray));
  document.getElementById('amount').value = '';
  document.getElementById('date').value = today;
  sumDepositAmountFunc();
  plotDepositWithdrawAmountList();
}

function addCryptoName() {
  let cryptoName = document.querySelector('#cryptoName').value;
  let cryptoSymbol = document.getElementById('cryptoSymbol').value;

  if (!cryptoName || !cryptoSymbol) {
    snackBar('Please Enter Name and Symbol!');
    return 0;
  }

  let crypto = {
    id: Date.now(),
    name: cryptoName.charAt(0).toUpperCase() + cryptoName.substring(1),
    symbol: cryptoSymbol.toUpperCase(),
  };

  cryptoNameArray.push(crypto);
  cryptoNameArray = sortArrayByName(cryptoNameArray);
  localStorage.setItem('cryptoNameArray', JSON.stringify(cryptoNameArray));
  plotCryptoNameList();
  plotCryptoNamesDropdown();
  document.querySelector('#cryptoName').value = '';
  document.getElementById('cryptoSymbol').value = '';
}

function addCryptoTransaction(transactionType, event) {
  let cname = document.querySelector('#cname').value;
  let atPrice = document.getElementById('atPrice').value;
  let coin = document.getElementById('coin').value;
  let paid = document.getElementById('paid').value;
  let buyDate = document.getElementById('buyDate').value;

  if (!cname || cname == 0 || !atPrice || !coin || !paid || !buyDate) {
    snackBar('Please Enter All Details!');
    return 0;
  }

  let coinObj = {};

  if (transactionType === 'BUY') {
    coinObj = {
      id: Date.now(),
      name: cname,
      atPrice: +atPrice,
      coin: +coin,
      paid: +paid,
      type: transactionType,
      date: buyDate,
    };
  } else if (transactionType === 'SELL') {
    coinObj = {
      id: Date.now(),
      name: cname,
      atPrice: +atPrice,
      coin: -coin,
      paid: -paid,
      type: transactionType,
      date: buyDate,
    };
  } else {
    coinObj = {
      id: Date.now(),
      name: cname,
      atPrice: +atPrice,
      coin: +coin,
      paid: +paid,
      type: transactionType,
      date: buyDate,
    };
  }
  coinArray.push(coinObj);
  coinArray = sortArrayByDate(coinArray);
  localStorage.setItem('coinArray', JSON.stringify(coinArray));

  document.getElementById('cname').value = '0';
  document.getElementById('atPrice').value = '';
  document.getElementById('coin').value = '';
  document.getElementById('paid').value = '';
  document.getElementById('buyDate').value = today;
  plotCryptoInfoList();
  findSumOfAllCrypto();
  findCoinNames();
  findTotalCoinsOfEachCrypto();
  plotEachCoinBox();
  getCryptoPercentage();
  getCryptoBroughtAtList();
  plotCryptoPercentagePieChart();
  plotCryptoVerticalTable();
}

// ===== Add Data Functions End =====

// ===== Import/Download/Clear Data Functions Start =====

function importData() {
  let readFile = document.getElementById('readFile').files[0];

  if (readFile.name.substr(-4) != 'json') {
    snackBar('Please select .json file!');
    return 0;
  }

  let fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    let textFromFileLoaded = JSON.parse(fileLoadedEvent.target.result);
    localStorage.setItem(
      'cryptoNameArray',
      JSON.stringify(textFromFileLoaded.cryptoNameArray)
    );
    localStorage.setItem(
      'depositArray',
      JSON.stringify(textFromFileLoaded.depositArray)
    );
    localStorage.setItem(
      'coinArray',
      JSON.stringify(textFromFileLoaded.coinArray)
    );
  };
  fileReader.readAsText(readFile, 'UTF-8');
  location.reload();
}

function downloadData() {
  let cryptoDataOBJ = {};
  let cryptoNameArray = JSON.parse(localStorage.getItem('cryptoNameArray'));
  let depositArray = JSON.parse(localStorage.getItem('depositArray'));
  let coinArray = JSON.parse(localStorage.getItem('coinArray'));
  cryptoDataOBJ = {
    cryptoNameArray: [...cryptoNameArray],
    depositArray: [...depositArray],
    coinArray: [...coinArray],
  };

  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  var json = JSON.stringify(cryptoDataOBJ),
    blob = new Blob([json], { type: 'octet/stream' }),
    url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = 'crypto_board_data.json';
  a.click();
  window.URL.revokeObjectURL(url);
}

function clearData() {
  let confirm = confirmAction('Are you sure you want Clear Data?');
  if (!confirm) {
    return 0;
  }

  localStorage.setItem('coinArray', JSON.stringify([]));
  localStorage.setItem('depositArray', JSON.stringify([]));
  localStorage.setItem('cryptoNameArray', JSON.stringify([]));

  initLocalStorage();
  callAllAmountFunctions();
  callAllCryptoFunctions();
  callAllPlotFunctions();
}

// ===== Import/Download/Clear Data Functions End =====

// ===== miscellaneous Functions Start =====
function snackBar(msg) {
  var x = document.getElementById('snackbar');
  x.innerHTML = msg;
  x.className = 'show';
  setTimeout(function () {
    x.className = x.className.replace('show', '');
  }, 3000);
}

function confirmAction(txt) {
  let confirmAction = confirm(txt);
  if (confirmAction) {
    return true;
  } else {
    return false;
  }
}

function sortArrayByDate(arr) {
  return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function sortArrayByName(arr) {
  return arr.sort((a, b) => (a.name > b.name ? 1 : -1));
}

// ===== miscellaneous Functions End =====
