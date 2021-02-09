let player = "paper"
let computer = "rock"

const wins = {
  paper: ["rock", "spock"],
  rock: ["scissors", "lizard"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["scissors", "rock"],
}

console.log("player plays", player)
console.log("computer plays", computer)

if (player === computer) console.log("tie")
else if (wins[player].includes(computer)) console.log("player wins")
else console.log("computer wins")
