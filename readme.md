# Lekcja 3 VueJS - Dodanie komponentu ModalAdd, tworzenie oraz usuwanie postów za pośrednictwem API oraz axios.

Komponent ModalAdd tworzący Modal oraz umożliwiający doddanie nowego posta. 
Usuwanie obecnego posta z listy za pomocą buttona.

## :class - bindowanie klasy, tworzenie dynamicznego css

```
    <div v-if="status != -1" :class="'alert alert-'+getAlertColorByStatus(status)"> {{ message }} </div>
```
Funkcja getAlertColorByStatus(status) wywołana wewnątrz `:class` dynamicznie podbinduje wynik i przypisze go do class elementu HTML.

```
    getAlertColorByStatus: function(status) {
        if (status === 0 ) {
            return 'danger';
        } else if (status === 1 ) {
            return 'success';
        } else {
            return '';
        }
    },
```
Argument przekazany do funkcji zdeterminuje o wyniku.

## Dyrektywa `v-model` - bindowanie dwukierunkowe

```
    <input id="title" type="text" class="form-control" v-model="newPost.title" placeholder="Tytuł">
```

Sprawia, iż wpisywany tekst do elementu input będzie przekazywany do zmiennej atrybutu `title` w obiekcie newPost.


## `v-on` lub `@` skrócony zapis - event handler

```
    <button class="btn btn-success" @click="trySave()">Zapisz</button>
```

`@click` sprawia, iż podczas kliknięcia w button wyzwolona zostaje metoda trySave().

```
    trySave: function() {
        if (confirm("Czy na pewno chcesz dodać posta?")) {
            if ((this.newPost.title.length > 0) && (this.newPost.content.length > 0)) {
                this.save();
            } else {
                this.addingResponse = {
                    status : 0,
                    message : "Oba pola muszą być wypełnione!"
                }
            }
        }
    },
```

Metoda ta pokazuje alert potwierdzający oraz waliduje czy pola są zapełnione następnie wywołuje metodę `save()`.

```
    save: function() {
        axios.post('/api/posts', this.newPost).then( response => {
            this.addingResponse = response.data;
            this.clearForm();
        }).catch(err => {
            if (err.response) {
                this.addingResponse = {
                    status : 0,
                    message : "Error while adding"
                };
            }
        });
    },
```
Ta ostatnia wywołuje api za pomocą `axios` i dodaje nowy post oraz zapisuje informacje zwrotną która jest później renderowana dla użytkownika.

```
    <button @click="deletePost(post.id)" class="btn btn-sm btn-danger pull-right">Usuń</button>
```

Analogicznie wywoływana jest metoda `deletePost()` z tym, że jako argument przyjmuje ona jeszcz id posta.
Znajduje się ona w komponencie `Post.vue`.

```
    closeModal: function() {
        this.$emit('close');
    },
```

Metoda closeModal sprawia iż wyzwolony zostaje event (emituje event) o nazwie `close`. Po przecinku można przekazywać rónież wartość.

```
    closeModal: function() {
        this.$emit('close', id);
    },
```

Event ten zostaje następnie nasłuchiwany przez listener w ciele komponentu Posts.

```
    <modal-add v-if="showAdd === true" @close="closeModalAdd()"></modal-add>
```

Kiedy event się pojawi to wywoływana jest metoda znajdująca się w komponencie o nazwie `closeModalAdd()`.

```
    closeModalAdd: function() {
        this.showAdd = false;
    }
```

Zmienia ona wartość zmiennej `showAdd` na `false`.

## Komponent Posts.vue

```
    <button @click="showModalAdd()" class="btn btn-primary">Dodaj nowy post</button>
```

Po kliknięciu w przycisk wyzwolona jest metoda `showModalAdd()`,

```
    showModalAdd: function() {
        this.showAdd = true;
    },
```

która zmienia wartość zmiennej `showAdd` na `true`.

```
    <modal-add v-if="showAdd === true" @close="closeModalAdd()"></modal-add>
```

Modal jest renderowany kiedy `showAdd` ma wartość true czyli jest zależny od tej zmiennej.
Do tworzenia innych komponnetów dynamicznych jak aplet, alert czy inny dialog można używać takiej prostej metody.
Na przykład

```
    <div v-if="status === 0" class="col-md-12">
        <div class="alert alert-danger"> {{ message }} </div>
    </div>
```

## Podsumowanie

Vue pozwala na proste tworzenie dynamicznych styli oraz popupów, modali, alertów i innych przydatnych komponentów.
Pozwala również na proste walidacje danych oraz wywoływanie API za pomocą `axios`.
