export interface Routes {
  [key: string]: string,
}

export interface IData {
  cards: Object[],
  options: Object,
  data: Object[],
}

export interface data {
  [key:string]: string,
}

export type callbackPage = (data: string) => void;
