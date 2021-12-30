export interface Routes {
  [key: string]: string,
}

export enum SortOrder {
  alphAsc = 'az',
  alphDesc = 'za',
  quantMin = 'min',
  quantMax = 'max'
}

export type SortOrderKey = keyof typeof SortOrder;

export enum Shapes {
  ball = 'шар',
  bell = 'колокольчик',
  cone = 'шишка',
  snowflake = 'снежинка',
  figurine = 'фигурка'
}

export type ShapesKey = keyof typeof Shapes;

export enum Colors {
  white = 'белый',
  yellow = 'жёлтый',
  red = 'красный',
  blue = 'синий',
  green = 'зелёный'
}

export type ColorsKey = keyof typeof Colors;

export enum Sizes {
  small = 'малый',
  medium = 'средний',
  big = 'большой'
}

export type SizeKey = keyof typeof Sizes;

export interface SortModel {
  search?: string,
  sort?: SortOrder,
  shapes?: Array<Shapes>,
  colors?: Array<Colors>,
  sizes?: Array<Sizes>,
  favorite?: boolean,
  minQuantity?: number | string,
  maxQuantity?: number | string,
  minYear?: number | string,
  maxYear?: number | string,
}

export interface Data {
  num: string,
  name: string,
  count: string,
  year: string,
  shape: string,
  color: string,
  size: string,
  favorite: boolean,
}

export interface DragEvent<T = Element> extends MouseEvent{
  dataTransfer: DataTransfer;
}