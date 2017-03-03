import * as vscode from 'vscode';

interface LineInfo {
  column?: number,
  position?: number,
  message?: string
}

export let getLines = (output): string[] => {
  if (!output) {
    return [];
  }
  return output.split('\n');
}

export let getLineInfo = (line): LineInfo => {
  if (!line) {
    return;
  }

  let info: any = {},
      sections: string[] = line.split(':'),
      positionSection = sections[1],
      columnSection = sections[2];

  if (positionSection) {
    info.position = +/\d+/.exec(positionSection)[0];
  }

  if (columnSection) {
    info.column = +/\d+/.exec(columnSection)[0];
  }
  if (positionSection && columnSection) {
    info.message = columnSection.slice(columnSection.indexOf(' ')).trim();
  }

  return info;
}

export let getDiagnosticInfo = (lineInfo): any => {
  if (!lineInfo) {
    return;
  }

  let isNotAnumber = isNaN(parseInt(lineInfo.position)) || isNaN(parseInt(lineInfo.column)),
      isLessThanOrEqualToZero = lineInfo.position <= 0 || lineInfo.column <= 0

  if (isNotAnumber || isLessThanOrEqualToZero) {
    return;
  }

  return {
    startLine: lineInfo.position,
    endLine: lineInfo.position,
    startColumn: lineInfo.column,
    endColumn: lineInfo.column,
  }
}