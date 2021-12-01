import Block from '../../utils/Block/Block';
import '../../styles/components/controls/controls.scss';
import '../../styles/components/button/button.scss';
import template from './controls.tpl';
import compile from '../../utils/Compile/compile';
import State from '../../utils/State/State';

// Стейт приложения
const state = new State();

export default class Controls extends Block {
  constructor(props: any) {
    super(props, 'footer', 'controls');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('controls'));
    };

    state.registerComponent('controls', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
