import { MatchReader } from "./MatchReader";
import { MatchResult } from "./MatchResult";

const reader = new MatchReader("football.csv");
reader.read();
// console.log(matches);
let manUnitedWins = 0;
for (let rec of reader.data) {
  if (rec[1] === "Man United" && rec[5] === MatchResult.HomeWin) {
    ++manUnitedWins;
  } else if (rec[2] === "Man United" && rec[5] === MatchResult.AwayWin) {
    ++manUnitedWins;
  }
}
console.log(`Man United wined ${manUnitedWins} games`);