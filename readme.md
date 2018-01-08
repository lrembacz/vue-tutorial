#Lekcja 1 VueJS Podstawy

Przekazywanie statycznej zawartości z głównej instancji Vue do componentu Posts przez props.

## Instancja Vue w pliku app.js

```
const app = new Vue({
    el: '#app',
    data : {
        posts : [
            {
                title : "Post 1",
                content : "Przykładowy post 1.",
                created_at : "2018-01-04 00:00:00",
                user : {
                    name : "admin"
                }
            },
			...
        ]
    }
});
```

Instancja zawiera tablicę `posts`.

## Komponent Posts.vue

### Dyrektywa `v-bind` lub `:`
```
    <posts :posts="posts"></posts>
```
Przekazuje zmienną / metodę / komponent poprzez props z rodzica (głównej instancji Vue) do dziecka Posts.vue. `v-bind` zastąpiono skrótowym zapisem w postaci `:` (dwukropka).
```
    props : [
        'posts'
    ]
```
Tablica `props` zadeklarowana wewnątrz komponentu pozwala na manipulację przekazanego atrybutu wewnątrz komponentu dziecka.
```
    [1] {{ posts[0].title }}
    [2] let post1 = this.posts[0].title;
```
Można się do niej odwołać wyświetlając zawratość[1] lub odwołując się do niej wewnątrz ciała komponentu za pomocą operatora `this.`[2]

### Dyrektywa `v-model` 
```
<input type="text" class="form-control" v-model="filter" placeholder="Search name">
```
Binduje zmienną `filter` do inputa, który reaktywnie przekazuje wpisywany tekst do zmiennej `filter`.

```
        data() {
            return {
                filter : ""
            }
        },
```

Zmienna `filter` zadeklarowana jest w funkcji `data()` w ciele komponentu.

### Dyrektywa `v-for` 
```
        <div v-for="post in posts" class="col-md-12">
        <div class="panel-heading">
                            {{ post.title }}
        ...
        </div>
```
Iteruje po tablicy `posts` i umożliwia wyświetlenie kolejnych objektów tablicy np. `{{ post.title }}`.

### `computed : {}` - metody manipulujące danymi na bieżąco.
```
        computed: {
            filteredPosts: function () {
                let self = this;
                return this.posts.filter(function (all) {
                    return all.title.toLowerCase().indexOf(self.filter.toLowerCase()) >= 0;
                });
            }
        }
```
Funkcja `filteredPosts` modyfikuje tablicę `posts` przekazaną do komponentu przez props za pomocą zmiennej `filter`.

```
        <div v-for="post in filteredPosts" class="col-md-12">
```

Wywołanie computed funkcji `filteredPosts` w celu wyświetlenia na bieżąco filtrowanych wyników.

### `methods : {}` - metody używan wewnąrz komponentu bądź instancji głównej.
```
        methods : {
            postData: function(created) {
                let dataTime = created.split(' ');
                return dataTime[1] + ' | ' + dataTime[0];
            }
        },
```
Funkcja postData formatuje argument ( `created` ) i zwraca odwróconą datę przedzieloną `|`.

```
    {{ postData(post.created_at) }}
```
Wywołanie metody do wyświetlenia (jako arguemnt przekazano `post.created_at`).
```
    {{ postData(post.created_at) }}
```
Metodę można wywołać również wewnątrz instancji np w `mounted()`
```
    mounted() {
        let formatedData = postData(post.created_at);
    }
```
Wynik metody będzie zawarty w lokalnej dla tej części skryptu zmiennej `formatedData`.