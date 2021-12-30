import '../../styles/components/settings/settings.scss';
import '../../styles/components/button/button.scss';
import Block from '../../utils/Block/Block';
import template from './fileText.tpl';
import State from '../../utils/State/State';
import compile from '../../utils/Compile/compile';
import { TProps } from '../../types/types';

const state = new State();

export default class FileText extends Block {
  constructor(props: TProps) {
    super(props, 'div');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('fileText'));
    };

    state.registerComponent('fileText', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
