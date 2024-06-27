![image](https://github.com/PxrpGill/tele2_landing/assets/128057676/26aed65d-51e9-44fa-9d0b-a698143a7b1a)

# Landing Tele2

В рамках летней практики было реализовано приложение типа "Лэндинг" компании Tele2 при помощи HTML, CSS и JavaScript.

Страница на gh-pages: https://pxrpgill.github.io/tele2_landing/

#### Что использовалось в проекте:
- Для пакетного менеджера был использован PNPM.
- Для сборщика был использован Vite.
- В качестве CSS-препроцессора был использован LightningCSS
- Чтобы проводить деплой на удаленный сервер был использован Gh-Pages
- В качестве разбиения элементов страницы на компоненты был использован handlebars from vite-plugin-handlebars

> [!NOTE]
> ### Какие особенности есть у PNPM?
> 1. #### Скорость работы с пакетами. (Hard links)
>
> PNPM использует специальную технологию для установки зависимостей — «hard links». Она позволяет избежать копирования дублирующихся файлов между пакетами. А значит, уменьшает объем занимаемого дискового пространства и ускоряет процесс установки.
>
> PNPM создает на компьютере единый репозиторий npm-пакетов с контентно-адресуемой файловой системой, подобной Git. Каждый файл в этой системе получает хэш от своего содержимого, и файлы с одинаковым содержанием не повторяются. В папке node_modules создаются символические ссылки на эти файлы, вместо того чтобы их каждый раз копировать.
>
> То есть, если у вас есть 50 проектов с одинаковыми зависимостями, PNPM сохранит пакеты на диске только один раз и создаст символические ссылки для остальных 49 проектов. PNPM работает в несколько раз быстрее, чем NPM и YARN, потребляет меньше интернет-трафика.
>
> 2. #### Возможность автозаполнения при работе с зависимостями.
>
> Например, мы можем увидеть список всех зависимостей, которые доступны для удаления. Если хотите узнать про PNPM еще больше, почитайте статью его создателя.
>
> В остальном PNPM имеет все те же функции, что и вышеописанные менеджеры, например: dependency overriding, workspaces и так далее.

> [!NOTE]
> ### Что такое Vite.js и где используется
> Vite.js используется в связке с другими фреймворками, написанными на JavaScript, а также для индивидуальных сред разработки. Он не является отдельным фреймворком, а скорее удобным инструментом для автоматизации рабочих процессов внутри проекта, а также взаимодействия с серверной частью. Лучше всего его функционал будет раскрыт в крупных проектах, где используются разные препроцессоры, фреймворки.
>
> Несмотря на то, что Vite.js изначально создавался для взаимодействия с JavaScript и популярными фреймворками, написанными на нем, он умеет работать и с популярными препроцессорами. Например, с помощью пары команд можно настроить в рамках проекта преобразование Sass-кода в обычный CSS или минимизированный CSS для лучшей оптимизации.
>
> После добавления Vite к текущему проекту вам станет доступен инструмент сборки и сервер разработки. Благодаря этому можно будет незамедлительно начать работу с использованием новых технологий, библиотек, препроцессоров. Примечательно, что это достаточно молодой инструмент, который активно развивается и поддерживается разработчиками. Вокруг него уже возникло сообщество, где каждый желающий может высказать свои пожелания, касательно развития Vite.

> [!NOTE]
> ### Документация LightningCSS
> Главная страница: https://lightningcss.dev/
>
> Страница на GitHub: https://github.com/parcel-bundler/lightningcss

## Установка проекта 
1. Клонируйте репозиторий:
```
git clone https://github.com/PxrpGill/tele2_landing/
```
2. Установите pnpm:
```
npm install -g pnpm
```
3. Удалите папку node_modules
4. Установите все зависимости проекта:
```
pnpm install
```
5. Запустите локальный разработки сервер:
```
pnpm run dev
```
> [!NOTE]
> Если вы хотите пользоваться локальным сервером разработки в рамках локальной сети:
> ```
> pnpm run dev -- --host 0.0.0.0
> ```

## Содержимое проекта
```
├── node_modules
├── public
│   ├── fonts
│   └── images
├── src
│   ├── components
│   ├── scripts
│   ├── styles
│   └── index.html
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```
- #### Директория public:
В этой директории хранятся медиа файлы, которые не подвергаются преобразованиям со стороны Vite. В ней содержаться 2 директории:
1. fonts - директория для хранения сторонних шрифтов.
2. images - директория для хранения .svg и .png картинок.

- #### Директория src:
В этой директории хранятся HTML-handlebars, CSS-стили и JS-скрипты, которые участвуют в построении HTML страницы.
1. scripts - директория для хранения JS-скриптов.
2. styles - директория для хранения CSS-стилей
3. components - директория для хранения HTML-handelbars

## Реализация миксинов при помощи LightningCSS:
Чтобы внедрить использование миксинов в CSS, ( где с коробки это невозможно, так как это считается custom at-rules) было применено следующее:
1. Написан скрипт для преобразования CSS файлов (src/scripts/lightning.js):
```JS
import { transform, bundleAsync } from 'lightningcss';
import path from 'path';
import fs from 'fs';

let mixins = new Map();

const baseUrl = 'src/styles/unformatted';
const mixinsFile = `mixins.css`;

const files = [
    "style.css",
    "header.css",
    "main.css",
    "footer.css",
    "sections/rate.css",
    "sections/slider.css",
    "sections/stocks.css",
    "sections/tariff.css",
    "modal/change_region.css",
    "modal/participate.css"
];

async function processFile(key, collectMixins = false) {
    const filePath = path.join(baseUrl, key);

    const { code: buffer } = await bundleAsync({
        filename: filePath,
        minify: true,
        resolver: {
            read(filePath) {
                return fs.readFileSync(filePath, 'utf8');
            },
            resolve(specifier, from) {
                return path.resolve(path.dirname(from), specifier);
            }
        }
    });

    let res = transform({
        filename: key,
        minify: true,
        code: Buffer.from(buffer),
        customAtRules: {
            mixin: {
                prelude: '<custom-ident>',
                body: 'style-block'
            },
            apply: {
                prelude: '<custom-ident>'
            }
        },
        visitor: {
            Rule: {
                custom: {
                    mixin(rule) {
                        if (collectMixins) {
                            mixins.set(rule.prelude.value, rule.body.value);
                            return [];
                        }
                        return null;
                    },
                    apply(rule) {
                        return mixins.get(rule.prelude.value);
                    }
                }
            }
        }
    });

    if (!collectMixins) {
        fs.writeFileSync(`src/styles/formatted/${key}`, res.code.toString());
    }
}

async function processFiles() {
    await processFile(mixinsFile, true);

    for (let key of files) {
        await processFile(key);
    }
}

processFiles().catch(console.error);
```
Здесь мы указываем CSS файл с миксинами и те CSS файлы, которые нужно подвергнуть трансформации.

2. Для запуска скрипта при dev моде необходимо изменить настройки запуска локального сервера (package.json):
```JS
{
  "name": "tele2_landing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "concurrently \"pnpm run watch-css\" \"vite\"",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "pnpm run build",
    "deploy": "gh-pages -d dist",
    "transform-css": "node src/scripts/lightning.js",
    "watch-css": "chokidar \"src/styles/unformatted/**/*.css\" -c \"pnpm run transform-css\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "browserslist": "^4.23.1",
    "gh-pages": "^6.1.1",
    "octokit": "^4.0.2",
    "vite": "^5.3.0",
    "vite-plugin-handlebars": "^2.0.0"
  },
  "devDependencies": {
    "chokidar-cli": "^3.0.0",
    "concurrently": "^8.2.2",
    "lightningcss": "^1.25.1"
  }
}
```

После этих действий мы просто должны применить отформатированные стили к нашей HTML странице.

> [!NOTE]
> ### CHOKIDAR
> отвечает за автоматизированное преобразование ваших CSS файлах.
> 
> Он отслеживает изменения и запускает команду transform-css.
