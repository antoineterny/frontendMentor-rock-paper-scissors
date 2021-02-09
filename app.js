let player = "paper"
let computer = "scissors"

const wins = {
  paper: { rock: "covers", spock: "disproves" },
  rock: { scissors: "crushes", lizard: "crushes" },
  scissors: { paper: "cuts", lizard: "decapitates" },
  lizard: { paper: "eats", spock: "poisons" },
  spock: { scissors: "smashes", rock: "vaporizes" },
}

console.log("player plays", player)
console.log("computer plays", computer)

if (player === computer) console.log("tie")
else if (wins[player][computer])
  console.log(`player wins: ${player} ${wins[player][computer]} ${computer}`)
else console.log("computer wins")
