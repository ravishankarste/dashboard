import { ProcessedLog } from "./../flux/tranformLog";

const toBlob = (content: string) => {
  return new Blob([content], { type: "text,plain;charset=utf-8" });
};

const serializeLogsToCSV = (logs: ProcessedLog[]): string => {
  const columns =
    "created,formatted timestamp,name,process,level name,message,filename,line number,module,funcname,pathname\n";
  const fileContent = logs.reduce((acc, log) => {
    acc += `${log.created},"${log.formattedTimestamp}",${log.name},${log.process},${log.levelname},"${log.msg}",${log.filename},${log.lineno},${log.module},${log.funcName},${log.pathname}\n`;
    return acc;
  }, columns);
  return fileContent;
};

const serializeLogsToJSON = (logs: ProcessedLog[]): string => {
  const fileContent = logs.reduce((acc, log, i) => {
    acc += JSON.stringify(log) + `${i < logs.length - 1 ? "," : ""}\n`;
    return acc;
  }, "\n");
  return `[${fileContent}]`;
};

const serializeLogsToText = (logs: ProcessedLog[]): string => {
  const fileContent = logs.reduce((acc, log) => {
    acc += `${log.formattedTimestamp} ${log.name}@${log.process} [${log.levelname}]: ${log.msg}\n`;
    return acc;
  }, "");
  return fileContent;
};

export const serializeLogsToCSVBlob = (logs: ProcessedLog[]) =>
  toBlob(serializeLogsToCSV(logs));

export const serializeLogsToJSONBlob = (logs: ProcessedLog[]) =>
  toBlob(serializeLogsToJSON(logs));
export const serializeLogsToTextBlob = (logs: ProcessedLog[]) =>
  toBlob(serializeLogsToText(logs));
