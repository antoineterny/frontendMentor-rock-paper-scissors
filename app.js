let player = ""
let computer = ""
let score = 0
let paper, scissors, rock, allTokens, result

const wins = {
  paper: { rock: "covers", spock: "disproves" },
  rock: { scissors: "crushes", lizard: "crushes" },
  scissors: { paper: "cuts", lizard: "decapitates" },
  lizard: { paper: "eats", spock: "poisons" },
  spock: { scissors: "smashes", rock: "vaporizes" },
}

const playmat = document.querySelector("#playmat")
const scoreDisplay = document.querySelector(".score p")
const rules = document.querySelector(".rules")
const rulesBtn = document.querySelector(".rules-button")
const rulesModal = document.querySelector(".rules__modal")
const closeBtn = document.querySelector(".rules__modal__header img")
rulesBtn.onclick = () => rules.classList.remove("hidden")
closeBtn.onclick = () => rules.classList.add("hidden")
rules.onclick = e => {
  console.log(e.target)
  if (!rulesModal.contains(e.target)) {
    rules.classList.add("hidden")
  }
}

window.onload = () => {
  scoreDisplay.innerHTML = score
  resetPlaymat()
}

const resetPlaymat = () => {
  playmat.innerHTML = `
    <div class="result">
      <h4></h4>
      <p></p>
      <div class="play-again">PLAY AGAIN</div>
    </div>
    <div class="token token--scissors">
      <div class="token__shadow token__shadow--scissors"></div>
      <div class="token__border token__border--scissors"></div>
      <div class="token__center token__center--scissors">
        <img src="./images/icon-scissors.svg" alt="scissors" />
      </div>
    </div>
    <div class="token token--paper">
      <div class="token__shadow token__shadow--paper"></div>
      <div class="token__border token__border--paper"></div>
      <div class="token__center token__center--paper">
        <img src="./images/icon-paper.svg" alt="paper" />
      </div>
    </div>
    <div class="token token--rock">
      <div class="token__shadow token__shadow--rock"></div>
      <div class="token__border token__border--rock"></div>
      <div class="token__center token__center--rock">
        <img src="./images/icon-rock.svg" alt="rock" />
      </div>
    </div>
    <div class="token token--lizard">
      <div class="token__shadow token__shadow--lizard"></div>
      <div class="token__border token__border--lizard"></div>
      <div class="token__center token__center--lizard">
        <img src="./images/icon-lizard.svg" alt="lizard" />
      </div>
    </div>
    <div class="token token--spock">
      <div class="token__shadow token__shadow--spock"></div>
      <div class="token__border token__border--spock"></div>
      <div class="token__center token__center--spock">
        <img src="./images/icon-spock.svg" alt="spock" />
      </div>
    </div>
    <img src="./images/bg-pentagon.svg" alt="" />
    <div class="token-placeholder"><span>3</span></div>
  `
  paper = document.querySelector(".token--paper")
  paper.onclick = () => (player = "paper")
  scissors = document.querySelector(".token--scissors")
  scissors.onclick = () => (player = "scissors")
  rock = document.querySelector(".token--rock")
  rock.onclick = () => (player = "rock")
  lizard = document.querySelector(".token--lizard")
  lizard.onclick = () => (player = "lizard")
  spock = document.querySelector(".token--spock")
  spock.onclick = () => (player = "spock")
  allTokens = document.querySelectorAll(".token")
  result = document.querySelector(".result")

  allTokens.forEach(token => {
    token.addEventListener("click", playGame)
  })
  document.querySelector(".play-again").onclick = resetPlaymat
}

const playGame = () => {
  const token = document.querySelector(`.token--${player}`)
  allTokens.forEach(t => {
    t.classList.add("hidden")
  })
  token.classList.remove("hidden")
  token.classList.add("user-picked")

  // const computerDice = Math.floor(Math.random() * 3)
  const computerDice = Math.floor(Math.random() * 5)
  if (computerDice === 0) computer = "paper"
  else if (computerDice === 1) computer = "scissors"
  else if (computerDice === 2) computer = "rock"
  else if (computerDice === 3) computer = "lizard"
  else if (computerDice === 4) computer = "spock"
  else console.log("ta formule a un pb")

  document.querySelector("#playmat > img").classList.add("hidden")
  document.querySelector(".token-placeholder").classList.add("reveal")

  setTimeout(() => {
    const computerToken = document.createElement("div")
    computerToken.classList.add("token", `token--${computer}`, "computer-picked")
    computerToken.innerHTML = `
      <div class="token__shadow token__shadow--${computer}"></div>
      <div class="token__border token__border--${computer}"></div>
      <div class="token__center token__center--${computer}">
        <img src="./images/icon-${computer}.svg" alt="${computer}" />
      </div>`
    token.removeEventListener("click", playGame)
    document.querySelector(".token-placeholder span").innerText = "2"
    setTimeout(() => {
      document.querySelector(".token-placeholder span").innerText = "1"
      setTimeout(() => {
        document.querySelector(".token-placeholder").classList.remove("reveal")
        playmat.appendChild(computerToken)
        setTimeout(() => {
          document.querySelector(".user-picked").classList.add("aside")
          document.querySelector(".computer-picked").classList.add("aside")
          if (player === computer) {
            result.querySelector("h4").innerHTML = "it's a tie"
          } else if (wins[player][computer]) {
            result.querySelector("h4").innerHTML = "you win"
            result.querySelector("p").innerHTML = `${player} ${wins[player][computer]} ${computer}`
            document.querySelector(".user-picked").classList.add("winner")
            score++
            scoreDisplay.innerHTML = score
          } else {
            result.querySelector("h4").innerHTML = "you lose"
            result.querySelector("p").innerHTML = `${computer} ${wins[computer][player]} ${player}`
            document.querySelector(".computer-picked").classList.add("winner")
            score = score > 0 ? score - 1 : 0
            scoreDisplay.innerHTML = score
          }
          setTimeout(() => {
            result.classList.add("appear")
          }, 200)
        }, 100)
      }, 600)
    }, 600)
  }, 600)
}
