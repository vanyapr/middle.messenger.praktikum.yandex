import template from './signUpForm.tpl';
import Block from '../../utils/Block/Block';

import '../../styles/components/form/form.scss';
import '../../styles/components/button/button.scss';
import '../../styles/components/label/label.scss';
import '../../styles/components/input/input.scss';

import State from '../../utils/State/State';
import compile from '../../utils/Compile/compile';
import Renderer from '../../utils/Render/Render';

const state = new State();

export default class SignUpForm extends Block {
  constructor(props: any) {
    super(props, 'form', 'form');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('signUpForm'));
    };

    state.registerComponent('signUpForm', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }

  // Добавляем на страницу компоненты
  display() {
    const renderer = new Renderer('#root');
    renderer.render(this.getContent());
  }
}
