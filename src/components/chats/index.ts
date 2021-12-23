import template from './chats.tpl';
import Block from '../../utils/Block/Block';

import '../../styles/components/chats/chats.scss';
import State from '../../utils/State/State';
import compile from '../../utils/Compile/compile';
import ChatsAPI from '../../connectors/ChatsAPI';
import Chat from '../chat';

const chatsAPI = new ChatsAPI();

// Стейт приложения
const state = new State();

export default class Chats extends Block {
  // Здесь будем хранить список экземпляров чато
  private _chatsList: Chat[]

  constructor(props: any) {
    super(props, 'section', 'chats');
  }

  componentDidMount() {
    const updater = () => {
      const chats = state.get('chats');
      this.setProps(chats);
    };

    state.registerComponent('chats', updater);

    // При апдейте надо не перерисовывать все чаты, а лишь добавлять новые в список
    // Подпишем компонент на постоянный апдейт списка чатов
    setInterval(() => {
      chatsAPI.getChats()
        .then((chatsList: XMLHttpRequest) => JSON.parse(chatsList.responseText))
        .then((chatsArray) => {
          // Почему так: при апдейте компонента рендерится новый список чатов, и отваливается currentChat,
          // поэтому я при апдейте списка чатов пересобираю его вручную, после чего просто пишу в стейт новый список чатов
          // Ищем новые чаты
          // Проверяем чтобы ID чата в полученном списке не были в текущем списке чатов
          const newChats = chatsArray.reduce((acc: any, item: Record<string, any>) => {
            // Если ID итема есть в одном из чатов
            const matchFound = this._chatsList.some((someItem) => someItem.getID() === item.id);

            // Не делаем ничего
            // Если ID нет ни в одном из текущих чатов, добавляем в acc
            if (!matchFound) {
              acc.push(item);
            }

            return acc;
          }, []);

          // Ищем удаленные чаты
          const deletedChats = this._chatsList.reduce((acc: any, chat: Chat) => {
            // Если в новом списке чатов нет ID текущего чата, мы считаем его удаленным
            const match = chatsArray.some((someChat: Record<string, any>) => someChat.id === chat.getID());

            if (!match) {
              acc.push(chat);
            }

            return acc;
          }, []);

          const restOfChats = this._chatsList.reduce((acc: any, chat: Chat) => {
            // Если в новом списке чатов есть ID текущего чата, мы считаем его не удаленным
            const match = chatsArray.some((someChat: Record<string, any>) => someChat.id === chat.getID());

            if (match) {
              acc.push(chat);
            }

            return acc;
          }, []);

          if (newChats.length) {
            const newChatsList = this.props.getChatsList(newChats);

            this._chatsList = [...newChatsList, ...restOfChats];

            // Новый чат добавить список чатов
            state.set('chats', { chatsList: chatsArray });
          } else if (deletedChats.length) {
            // Размонтируем сокеты и слушатели удаляемого чата
            deletedChats.forEach((chatToDelete: Chat) => {
              chatToDelete.destroy();
            });

            this._chatsList = [...restOfChats];

            // Новый чат добавить список чатов
            state.set('chats', { chatsList: chatsArray });
          } else {
            console.log('Чаты не обновлены');
          }
        });
    }, 10000);
  }

  render() {
    if (!this._chatsList) {
      // Будем пересобирать список чатов при первом рендере и обновлять далее
      const chatsList = this.props.getChatsList(this.props.list);
      this._chatsList = chatsList;
    }

    return compile(template, { list: this._chatsList });
  }
}
