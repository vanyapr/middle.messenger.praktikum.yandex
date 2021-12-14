import '../../styles/components/settings/settings.scss';
import '../../styles/components/button/button.scss';
import Block from '../../utils/Block/Block';
import template from './fileInput.tpl';
import State from '../../utils/State/State';
import compile from '../../utils/Compile/compile';

const state = new State();

export default class FileInput extends Block {
  constructor(props: any) {
    super(props, 'label', 'form__file-label');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('fileInput'));
    };

    state.registerComponent('fileInput', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
