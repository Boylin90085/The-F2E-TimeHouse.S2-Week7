(function () {
  const cardSection = document.querySelector('.card-section')
  const newGameBtn = document.querySelector('.new')
  const cardContainer = document.querySelectorAll('.card-container__item')

  newGame()
  newGameBtn.addEventListener('click', newGame)

  // 開啟新遊戲
  function newGame() {
    let tempHTML = ''
    let poker = shuffle(generatePoker())

    cardSection.innerHTML = ''
    cardContainer.forEach((c) => {
      c.innerHTML = ''
    })

    for(let i = 0; i < 8; i++) {
      if (i <= 3) {
        let cardList = ''
        for (let j = 0; j < 7; j++) {
          cardList += `${customCard(poker[j])}`
        }
        poker = poker.slice(7)
        tempHTML +=`
        <div id="card-list-${i+1}" class="card-box">
          ${cardList}
        </div>
        `
      } else {
        let cardList = ''
        for (let j = 0; j < 6; j++) {
          cardList += `${customCard(poker[j])}`
        }
        poker = poker.slice(6)
        tempHTML +=`
        <div id="card-list-${i+1}" class="card-box">
          ${cardList}
        </div>
        `
      }
    }
    cardSection.innerHTML += tempHTML


    for(let i = 1; i <= 8; i++) {
      Sortable.create(document.getElementById(`card-list-${i}`), {
        group: 'cardList',
        animation: 100
      });
    }
    // console.log(cardContainer)
    cardContainer.forEach((c) => {
      Sortable.create(c, {
        group: 'cardList',
        filter: '.bg',
        animation: 100
      });
    })
  }

  // 創造撲克牌的 DOM
  function customCard(cardObj) {
    let cardDom = ''
    let color = ''

    switch(cardObj.suit){
      case 'spades':
        color = 'gray'
        break
      case 'heart':
        color = 'yellow'
        break
      case 'diamonds':
        color = 'green'
        break
      case 'clubs':
        color = 'brown'
        break
    }

    cardDom = `
    <div class="card card--${color}">
      <div class="card__suit-wrapper card--top">
        <span class="card__num">
          ${cardObj.num}
        </span>
        <span class="icon-${cardObj.suit}"></span>
      </div>
      <img src="./image/bird/${cardObj.num}.png" alt="">
      <div class="card__suit-wrapper card--bottom">
        <span class="card__num">
          ${cardObj.num}
        </span>
        <span class="icon-${cardObj.suit}"></span>
      </div>
    </div>
    `

    return cardDom
  }

  // 初始化一副照順序的撲克牌
  function generatePoker() {
    const suits = ["spades", "heart", "diamonds", "clubs"]
    const nums = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    let poker = []
    
    suits.forEach((suit) => {
      nums.forEach((num) => {
        poker.push({
          suit,
          num
        })
      })
    })

    return poker;
  }

  // 打亂撲克牌的順序
  function shuffle(arr) {
    let newArr = arr.slice(0);
    for (let i = newArr.length - 1; i >= 0; i--) {
        // 随机范围[0,1)
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = newArr[randomIndex];
        newArr[randomIndex] = newArr[i];
        newArr[i] = itemAtIndex;
    }

    return newArr;
  }

  // function dealPoker(num) {
  //   if(!num || num>54 || typeof(num)!== 'number') {
  //       throw '错误，传入的数字非法，只能是[1-54]';
  //   }
  //   // 生成扑克牌
  //   var allCards = generatePoker();

  //   // 洗牌-不污染原先的数组
  //   var randomCards = shuffle(allCards);

  //   return randomCards.slice(0, num);
  // }

})()