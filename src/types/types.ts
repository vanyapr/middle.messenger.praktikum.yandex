import Block from '../utils/Block/Block';

export type Nullable<T> = T | null;

export type Values<T> = T | any;

// Типы для пропсов блока
export type TBlockPropsValues = Block | String | Function | [Block] | number | Record<string, any>
export type TProps = Record<string, TBlockPropsValues>;

export type TMessage = {
    user: {
      // eslint-disable-next-line camelcase
      first_name: string,
      // eslint-disable-next-line camelcase
      second_name: string,
      // eslint-disable-next-line camelcase
      display_name: string | null,
      login: string,
      avatar: string | null,
      email: string,
      phone: string,
    },
    time: string,
    content: string,
    id: number,
  }
