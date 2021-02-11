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
    <div class="token token--paper">
      <div class="token__shadow token__shadow--paper"></div>
      <div class="token__border token__border--paper"></div>
      <div class="token__center token__center--paper">
        <img src="./images/icon-paper.svg" alt="paper" />
      </div>
    </div>
    <div class="token token--scissors">
      <div class="token__shadow token__shadow--scissors"></div>
      <div class="token__border token__border--scissors"></div>
      <div class="token__center token__center--scissors">
        <img src="./images/icon-scissors.svg" alt="scissors" />
      </div>
    </div>
    <div class="token token--rock">
      <div class="token__shadow token__shadow--rock"></div>
      <div class="token__border token__border--rock"></div>
      <div class="token__center token__center--rock">
        <img src="./images/icon-rock.svg" alt="rock" />
      </div>
    </div>
    <img src="./images/bg-triangle.svg" alt="" />
    <div class="token-placeholder"><span>3</span></div>
  `
  paper = document.querySelector(".token--paper")
  paper.onclick = () => (player = "paper")
  scissors = document.querySelector(".token--scissors")
  scissors.onclick = () => (player = "scissors")
  rock = document.querySelector(".token--rock")
  rock.onclick = () => (player = "rock")
  allTokens = document.querySelectorAll(".token")
  result = document.querySelector(".result")

  allTokens.forEach(token => {
    token.addEventListener("click", () => selectToken(token))
  })
  document.querySelector(".play-again").onclick = resetPlaymat
}

const selectToken = token => {
  allTokens.forEach(t => {
    t.classList.add("hidden")
  })
  token.classList.remove("hidden")
  token.classList.add("user-picked")

  const computerDice = Math.floor(Math.random() * 3)
  if (computerDice === 0) computer = "paper"
  else if (computerDice === 1) computer = "scissors"
  else if (computerDice === 2) computer = "rock"
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
