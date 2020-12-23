import { MatchData } from "../MatchData";
import { Analyzer } from "../Summary";
import { MatchResult } from "../MatchResult";

export class WinsAnalyzer implements Analyzer {
  constructor(public team: string) {}
  run(matches: MatchData[]): string {
    let wins = 0;
    for (let rec of matches) {
      if (rec[1] === this.team && rec[5] === MatchResult.HomeWin) {
        ++wins;
      } else if (rec[2] === this.team && rec[5] === MatchResult.AwayWin) {
        ++wins;
      }
    }
    return `Team '${this.team}' wins ${wins} games.`;
  }
}
