const apiProtocol = 'https://';
const socketProtocol = 'wss://';
const apiRoute = 'ya-praktikum.tech/api/v2';
const wsRoute = 'ya-praktikum.tech/ws';
export const wsPingPongInterval = 30000; // Интервал пинга сокета
export const apiURL = `${apiProtocol}${apiRoute}`;
export const socketURL = `${socketProtocol}${wsRoute}`;

// Авторизация и работа с пользователем
export const signUp = '/auth/signup';
export const signIn = '/auth/signin';
export const getUser = '/auth/user';
export const logOut = '/auth/logout';

// Настройки пользователей
export const saveProFile = '/user/profile';
export const savePassword = '/user/password';
export const saveAvatar = '/user/profile/avatar';
export const getUserById = '/user/';
export const findUser = '/user/search';

// Чаты
export const chats = '/chats';
export const chatsArchive = '/chats/archive';
export const chatsUsers = '/chats/users';
export const chatsTokens = '/chats/token';
export const chatsMessages = '/chats/new';
