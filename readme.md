# Мессенджер
Проект в рамках учёбы на курсе "Миддл фронт-энд разработчик" от Яндекс-Практикума. Срок сдачи проекта - **8 октября 2021 года**.

[Ссылка на проект в Netlify](https://615ca2aca41d2100072bf6fc--cranky-swanson-2f3c88.netlify.app/)

## Задача
В рамках проектной работы планируется с нуля разработать мессенджер, работающий по протоколу Web Socket. Разработка ведется
в соответствии с заданиями спринта. Параллельно изучается теория.

## Стэк проекта
1) **SCSS** - решил выбрать потому что есть опыт с LESS, но все расхваливают SCSS, вот и посмотрим в чём разница;
2) **Parcel** - бандлер проекта, буду использовать для сборки проекта;
3) **Javascript (ECMA-2021)** - джаваскрипт.

# Структура проекта
Пока мы не знаем, что будет представлять собою проект, будем складывать темплейты и стили отдельно. При необходимости будем 
рефакторить проект.

Почему не складываем стили в компоненты:
1) Как нам присваивать стили для body?
2) Как нам переиспользовать стили для инпутов и кнопок в разных компонентах?

## Проблемы проекта
1) При изменении пропсов некорректно очищается контейнер (если в контейнере рендерится больше одного компонента, второй затирается)
2) На данном этапе эвент листенеры вешаются на onclick, поэтому больше 1 события не повесить, работаю над этим

## Планы по проекту
1) ~~Делаем дипломную работу за 2 дня~~ Не спешим
2) ~~Вёрстка макетов страниц проекта в HTML~~
3) ~~Написание рендер-движка~~
4) ~~Преобразование HTML макетов в компоненты с использованием рендер движка~~
5) ~~Преобразование HTML макетов в компоненты с использованием рендер движка~~
6) ~~Отправка проекта на код-ревью~~
7) ~~Деплой проекта на Netlify~~
7) Рефакторинг рендер-движка (создание дом-нод вместо рендера строки)

## Таймлайн проекта
* 27 сентября - начало спринта. Выполнен дизайн макета в FIGMA. ([Ссылка на макет в FIGMA](https://www.figma.com/file/d1jGyXq8brbb92FTzOIIJI/Messenger-Praktikum?node-id=0%3A1))
* 2 октября - завершен первый спринт, приступил к выполнению проектной работы, сделал первый коммит.
* 5 октября - завершил работы по проектной работе, работа готова к отправке на первое ревью.
* 21 октября - второй спринт, приступил к выполнению проектной работы.

## Запуск проекта
1) Установите зависимости.
2) Для запуска проекта `npm run start`.
3) Для старта сборщика `npm run dev`.
4) Для сборки проекта `npm run build`.
