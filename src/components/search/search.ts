import template from './search.tpl';
import Block from '../../utils/Block/Block';
import '../../styles/components/search/search.scss';
import compile from '../../utils/Compile/compile';
import { TProps } from '../../types/types';

export default class Search extends Block {
  constructor(props: TProps) {
    super(props, 'header', 'search');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
