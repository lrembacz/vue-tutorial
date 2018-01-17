# Lekcja 6 VueJS - Wysyłanie formularza do widoku Laravela

Formularz usuwania postu zostaje wysyłany w sposób tradycyjny dla PHP. 

## Komponent Post.vue

```
    <form :id="'delete-form'+post.id" :action="action" method="POST" style="display: none;">
        <input type="hidden" name="_method" value="DELETE">
        <input type="hidden" name="_token" :value="csrf">
    </form>
```

Template formularza zawierają ukryte pola `_method` symulujący metodę `DELETE` oraz 
pole `_token` zawierające token-csrf.

```
       csrf : document.head.querySelector('meta[name="csrf-token"]').content,
```

Token pobierany jest z meta tagu. Domyślnie znajdującego się w view Laravela.

```
    deletePost: function(id) {
        this.beforeDeletePost(id);
        console.log(this.action);
        Vue.nextTick( () =>{
            if (confirm("Czy na pewno chcesz usunąć ten post?")) {
                $("#delete-form" + id).submit();
            }
        })
    },
    beforeDeletePost: function(id) {
        this.action = "/posts/" + id;
    },
``` 

Metoda usuwająca post wywołuje metode `beforeDeletePost`, 
która generuje atrybut `action` bindowany do formularza.

Następnie wykonywane jest przeładowanie DOM za pomocą `Vue.nextTick()` 
celem upewnienia się, że zmiany zostały zapisane.

Ostatecznie formularz zostaje przesłany za pomocą selektora jQuery.

```
    $("#delete-form" + id).submit();
```
