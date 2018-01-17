# Lekcja 2 VueJS - Wywoływanie asynchroniczne (pobranie danych z API), rozłożenie componentu Posts na Post-list + Post

Przekazywanie zawartości otrzymanej z endpointa za pomocą `axios` z komponentu Posts do komponentów Post-list oraz Post.

## Wywołanie w komponencie Posts.vue

```
            getPosts: function() {
                axios.get('/api/posts').then( response => {
                    console.log(response.data);
                    this.allposts = response.data;
                    console.log(this.allposts);
                }).catch(err => {
                    this.allposts = {
                        status : 0,
                        message : "Problem z pobraniem postów"
                    }
                });
            }
```
Metoda wykonuje asynchroniczne zapytanie do endpointa `/api/posts` za pomocą `axios`. 
Odpowiedź zwrotną zapisuje do zmiennej `allposts` zadeklarowanej w ciele `data()`. 
W razie błędu przypisuje do zmiennej informacje o błędzie oraz status.


## Watcher watch : {}

```
        watch: {
            allposts: function (val) {
                if (val !== {}) {
                    this.posts = this.allposts.posts ? this.allposts.posts : [];
                    this.message = this.allposts.message ? this.allposts.message : "";
                    this.status = this.allposts.status;
                }
            }
        },
```

Watcher czeka aż zmienna allposts się zmieni i po tej zmianie przypisuje poszczególne atrybuty do zmiennych komponentu.

## Dyrektywa v-if (warunkowa)

Dyrektywa ta sprawdza czy funkcja logiczna przyjmuje prawde lub fałsz i zależnie od tego wyświetla zawartość elementu HTML.

```
<div v-if="allposts != {}">
```

W tym przypadku sprawdza czy `allposts` jest różna od `{}` (pustego obiektu) i dopiero kiedy nie jest pusta wyświetla dane poniżej.
W przypadku wywołań asynchronicznych i próby wyświetlenia danych w czasie tworzenia obiektu Vue zwróci komunikat `undefined` property.

Dyrektywa `v-if` sprawia, że zawratość jest renderowana. Jeśli chcemy jedynie ukryć element używamy dyrektywy `v-show`. Działa ona podobnie jak styl css `display: hidden;`.


## Podsumowanie

Vue pozwala na budowanie kolejnych komponentów i zagnieżdżanie jednych w drugich, co zwiększa czytelność kodu i poprawia zdolności manipulacji danymi w określonym komponencie.
Więcej informacji pod tym linkiem: https://vuejs.org/v2/guide/components.html
