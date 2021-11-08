# Мессенджер
Проект в рамках учёбы на курсе "Миддл фронт-энд разработчик" от Яндекс-Практикума. Срок сдачи проекта - **8 октября 2021 года**.

[Ссылка на проект в Netlify](https://cranky-swanson-2f3c88.netlify.app/)

## Задача
В рамках проектной работы планируется с нуля разработать мессенджер, работающий по протоколу Web Socket. Разработка ведется
в соответствии с заданиями спринта. Параллельно изучается теория.

## Стэк проекта
1) **SCSS** - решил выбрать потому что есть опыт с LESS, но все расхваливают SCSS, вот и посмотрим в чём разница;
2) **Parcel** - бандлер проекта, буду использовать для сборки проекта;
3) **Javascript (ECMA-2021)** - джаваскрипт.
4) **TypeScript** - тайпскрипт.
4) **EsLint** - линтер разметки JS.
4) **StyleLint** - линтер разметки SCSS.

# Структура проекта
Пока мы не знаем, что будет представлять собою проект, будем складывать темплейты и стили отдельно. При необходимости будем 
рефакторить проект.

## Проблемы проекта
1) При изменении пропсов компонента некорректно очищается контейнер (если в контейнере рендерится больше одного компонента, второй затирается)
2) ~~На данном этапе эвент листенеры вешаются на onEVENTNAME, поэтому больше 1 события не повесить, работаю над этим~~
3) Если передавать в компонент события с тем же именем что и контейнер (onsubmit='{{ onsubmit }}}'), процесс попадёт в рекурсию.
4) Нет механизма удаления эвент листенеров с элементов при повторном рендере страницы
5) ~~Событияс одинаковыми именами не вешаются на разные части компонента (неизвестно почему)???~~

## Планы по проекту
1) ~~Делаем дипломную работу за 2 дня~~ Не спешим
2) ~~Вёрстка макетов страниц проекта в HTML~~
3) ~~Написание рендер-движка~~
4) ~~Преобразование HTML макетов в компоненты с использованием рендер движка~~
5) ~~Преобразование HTML макетов в компоненты с использованием рендер движка~~
6) ~~Отправка проекта на код-ревью~~
7) ~~Деплой проекта на Netlify~~
8) ~~Добавление событий на элементы~~
9) ~~Валидация полей~~
10) ~~Валидация форм~~
11) ~~Переработка рендера~~
12) Удаление событий с элементов при повторном рендере
13) Cоздание дом-нод вместо рендера строки
13) Реализация роутера

## Таймлайн проекта
* 27 сентября - начало спринта. Выполнен дизайн макета в FIGMA. ([Ссылка на макет в FIGMA](https://www.figma.com/file/d1jGyXq8brbb92FTzOIIJI/Messenger-Praktikum?node-id=0%3A1))
* 2 октября - завершен первый спринт, приступил к выполнению проектной работы, сделал первый коммит.
* 5 октября - завершил работы по проектной работе, работа готова к отправке на первое ревью.
* 6 октября - работа принята.
* 6 октября - начат второй спринт по проектной работе.
* 21 октября - второй спринт, приступил к выполнению проектной работы.
* 25 октября - работу приняли, но, поскольку Яндекс не тестирует собственные приложения, я не могу отправить её на повторное ревью.
* 27 октября - яндекс считает что всё починил, но ничего не починил.
* 29 октября - пытаюсь испрвить косяки яндкса самостоятельно, всё еще жду принятия работы.
* 30 октября - яндекс принял проектную работу.
* 8 ноября - закончил теорию по 3 спринту, реализовал новый движок рендера.
* 9 ноября - приступил к реализации проектной работы по 3 спринту.

## Запуск проекта
1) Установите зависимости.
2) Для запуска проекта `npm run start`.
3) Для старта сборщика `npm run dev`.
4) Для сборки проекта `npm run build`.
