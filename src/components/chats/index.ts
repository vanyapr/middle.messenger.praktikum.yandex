import template from './chats.tpl';
import Block from '../../utils/Block/Block';

import '../../styles/components/chats/chats.scss';
import State from '../../utils/State/State';
import compile from '../../utils/Compile/compile';
import ChatsAPI from '../../connectors/ChatsAPI';
import Chat from '../chat';
import { TProps } from '../../types/types';

const chatsAPI = new ChatsAPI();

// Стейт приложения
const state = new State();

export default class Chats extends Block {
  // Здесь будем хранить список экземпляров чато
  private _chatsList: Chat[]

  // Здесь будем хранить таймаут рефреша списка чатов
  private _refreshInterval: any

  constructor(props: TProps) {
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
    this._refreshInterval = setInterval(() => {
      // Проверяем, что юзер вообще авторизован
      if (state.get('settings')) {
      // Получаем список чатов
        chatsAPI.getChats()
          .then((chatsList: XMLHttpRequest) => JSON.parse(chatsList.responseText))
          .then((chatsArray) => {
          // Почему так: при апдейте компонента рендерится новый список чатов, и отваливается currentChat,
          // поэтому я при апдейте списка чатов пересобираю его (список чатов) вручную,
          // после чего просто пишу в стейт новый список чатов
          // Ищем новые чаты
            const newChats = chatsArray.reduce((acc: any, item: Record<string, any>) => {
            // Проверяем чтобы ID чата в полученном списке не были в текущем списке чатов
              const matchFound = this._chatsList.some((someItem: Chat) => someItem.getID() === item.id);

              // Если ID итема есть в одном из чатов не делаем ничего
              // Если ID нет ни в одном из текущих чатов, добавляем в acc
              if (!matchFound) {
                acc.push(item);
              }

              return acc;
            }, []);

            const [restOfChats, deletedChats] = this._chatsList.reduce((acc: any, chat: Chat) => {
              const match = chatsArray.some((someChat: Record<string, any>) => someChat.id === chat.getID());

              if (match) {
              // Если в новом списке чатов есть ID текущего чата, мы считаем его не удаленным
                acc[0].push(chat);
              } else {
              // Если в новом списке чатов нет ID текущего чата, мы считаем его удаленным
                acc[1].push(chat);
              }

              return acc;
            }, [[], []]);

            // Если есть новые чаты (даже если удалены старые)
            if (newChats.length) {
              console.log('Добавлен новый чат');
              // @ts-ignore
              const newChatsList = this.props.getChatsList(newChats);

              this._chatsList = [...newChatsList, ...restOfChats];

              // Обновить список чатов
              state.set('chats', { chatsList: chatsArray });
            } else if (deletedChats.length) {
            // Если чат был удален, скрипт всегда попадет сюда (рано или поздно)
              console.log('Удалён чат');
              // Размонтируем сокеты и слушатели удаляемого чата
              deletedChats.forEach((chatToDelete: Chat) => {
                chatToDelete.destroy();
              });

              this._chatsList = [...restOfChats];

              // Обновить список чатов
              state.set('chats', { chatsList: chatsArray });

              // Очистить список сообщений
              state.set('messages', { messagesList: [] });
            } else {
              console.log('Чаты не обновлены');
            }
          }).catch((error) => {
          // Если произошел логаут (или дисконнект), убираем чаты
            if (!state.get('chats')) {
              console.log('ЧЕТО ЧАТОВ ТО НЕТ');
              this._chatsList.forEach((chat: Chat) => {
                chat.destroy();
              });

              clearInterval(this._refreshInterval);
              return;
            }
            console.log(error);
          });
      } else {
        console.log('Юзер не авторизован, чаты не обновляем!');
      }
    }, 2000);
  }

  render() {
    if (!this._chatsList) {
      // Будем пересобирать список чатов при первом рендере и обновлять далее в компоненте
      const getChatsList: Function = this.props.getChatsList as Function;
      this._chatsList = getChatsList(this.props.list);
    }

    return compile(template, { list: this._chatsList });
  }
}
