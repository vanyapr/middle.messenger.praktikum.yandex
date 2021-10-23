import Block from '../../utils/Block/Block';
import Render from '../../utils/Render';

// Темплейт
import app from './app.tpl';

export default class App extends Block {
  render() {
    return Render(app, this.props, this.container);
  }
}
