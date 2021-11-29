import search from './search.tpl';
import Block from '../../utils/Block/Block';
import Render from '../../utils/Templater';

import '../../styles/components/search/search.scss';

export default class Search extends Block {
  render() {
    return Render(search, this.props, this.container);
  }
}
