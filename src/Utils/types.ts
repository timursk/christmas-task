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

export interface startData {
  [key:string]: string | boolean,
  num: string,
  name: string,
  count: string,
  year: string,
  shape: string,
  color: string,
  size: string,
  favorite: boolean,
}

export interface Options {
  [key:string]: string | null | boolean | string[],
  shape?: string[],
  color?: string[],
  size?: string[],
}

export type callbackPage = (data: string) => void;
export type callbackCards = (data: startData[]) => void;
