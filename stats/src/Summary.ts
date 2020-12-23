import { WinsAnalyzer } from "./analyzers/WinsAnalyzer";
import { MatchData } from "./MatchData";
import { HtmlReport } from "./output-targets/HtmlReport";

export interface Analyzer {
  run(matches: MatchData[]): string;
}

export interface OutputTarget {
  print(report: string): void;
}

export class Summary {
  static winsToHtml(team: string): Summary {
    return new Summary(new WinsAnalyzer(team), new HtmlReport());
  }
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}
  buildAndPrintReport(matches: MatchData[]): void {
    const report = this.analyzer.run(matches);
    this.outputTarget.print(report);
  }
}
