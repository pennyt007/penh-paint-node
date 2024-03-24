import moment from "moment";

export function isValidDateFormat( dateString: string, dateFormat: string): boolean {
  // check if provided dateString matches the specified format
  return moment(dateString, dateFormat, true).isValid();
}

  