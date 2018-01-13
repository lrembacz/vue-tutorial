# Vue Tutorial

Poradnik do VueJS.

## Pierwsze kroki

Poniższa instrukcja przedstawia sposób uruchomienia tego projektu na własnej maszynie.

## Wymagania wstępne

Do uruchomienia projektu potrzebny jest podstawowy pakiet PHP oraz MySQL wymagany do uruchomienia projektu napisanego w Laravelu wersji 5.5 wraz z NodeJS.

Więcej informacji dostępnych tutaj: https://laravel.com/docs/5.5/installation

## Instalacja

1 . Pobranie projektu z githuba

```
git clone https://github.com/lrembacz/vue-tutorial.git
```

2 . Utworzenie bazy danych np. `vue-tutorial`.

3 . Konfiguracja pliku .env
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=vue-tutorial
DB_USERNAME=nazwa_użytkownika
DB_PASSWORD=hasło
```
Minimalnym wymaganiem jest odpowiednie ustawienie opcji podanych powyżej.

4 . Composer install w katalogu głównym

```
composer install
```

5 . Utworzenie folderu node_modules

```
npm install
```

6 . Przejście do trybu developerskiego

```
npm run dev
```

## Debugowanie / Produkcja

### Debugowanie

```
npm run dev
```

Wymuszenie pojedyńczej kompilacji plików vue

```
npm run watch
```

Wymuszenie kompilacji plików vue po każdej zmianie

### Produkcja

```
npm run prod
```

Usunięcie z kodu informacji developerskich oraz console logów.

EDIT: Do usunięcia console logów może być wymagana dodatkowa konfiguracja

```
if (mix.inProduction()) {
    mix.options({
        uglify: {
            uglifyOptions: {
                warnings: false,
                comments: false,
                beautify: false,
                compress: {
                    drop_console: true,
                }
            }
        }
    });
}
```
Dodanie w pliku `webpack.mix.js` powyższego fragmentu kodu nadpisze zmianę w laravel-mix.

Więcej na ten temat:
https://github.com/JeffreyWay/laravel-mix/commit/a9d26462f752b7c0db65dfdd485d061d47094aa0
