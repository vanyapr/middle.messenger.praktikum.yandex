import Block from '../../utils/Block/Block';
import compile from '../../utils/Compile/compile';
import template from './avatarUploadForm.tpl';
import State from '../../utils/State/State';

const state = new State();

export default class AvatarUploadForm extends Block {
  constructor(props: any) {
    super(props, 'form', 'form');
  }

  componentDidMount() {
    const updater = () => {
      this.setProps(state.get('avatarUploadForm'));
    };

    state.registerComponent('avatarUploadForm', updater);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
