import Block from '../utils/Block/Block';
export type Nullable<T> = T | null;
export type Values<T> = T | any;
// Типы для пропсов блока
type TBlockPropsValues = Block | String | Function | [Block] | number | Record<string, any>
export type TProps = Record<string, TBlockPropsValues>;
