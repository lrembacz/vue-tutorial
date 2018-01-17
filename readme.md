# Lekcja 4 VueJS - Wyjęcie filtru do osobnego komponentu PostsFilter

Komponent `PostsFilter` stał się osobnym komponentem, aby odzielić go od głównego komponentu.

## Komponent PostsFilter

```
<template>
    <div id="posts-filter">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <input type="text" class="form-control" v-model="filter" placeholder="Search name">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            console.log(this.filter);
        },
        // watcher which waits for change to filter then emiting event to parent with this value
        watch: {
            filter : function(val, oldVal) {
                this.$emit('filter', this.filter);
            }
        },
        // data filter
        data() {
            return {
                filter: "",
            }
        },
    }
</script>
```

Komponent posiada input oraz zbindowaną zmienna `filter`.
W ciele komponentu znajduje się również watcher który nasłuchuje zmiany w filtrze i emituje event do rodzica o nazwie `filter` oraz wartością filtru.

## Komponent Posts.vue

```
            <posts-filter @filter="getFilter"></posts-filter>
```

Komponent Posts nasłuchuje event `filter` z dziecka i wykonuje metodę `getFilter`.

```
            getFilter: function(val) {
                this.filter = val;
            },
``` 

Metoda ta zapisuje wartość emitowanego eventu do zmiennej `filter`.

```
            <posts-list :posts="allposts.posts" :filter="filter"></posts-list>
```

Następnie przekazuje zmienną do komponentu `PostsList` gdzie jest on wykorzystywany do filtrowania wyników.

```
        computed: {
            filteredPosts: function () {
                console.log(this.filter);
                let self = this;
                if(this.posts) {
                    return this.posts.filter(function (all) {
                        return all.title.toLowerCase().indexOf(self.filter.toLowerCase()) >= 0;
                    });
                }

            }
        },
```

Metoda filtrująca znajduje się jak poprzednio w ciele `computed : {}`

## Podsumowanie

Vue wykorzystuje kompunikację między komponentami rodzica oraz dziecka. 

Rodzic -> dziecko = `props`

Dziecko -> rodzic = `emiit events`

Więcej na ten temat: https://vuejs.org/v2/guide/components.html