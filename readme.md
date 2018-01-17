# Lekcja 5 VueJS - Dodanie edycji postów oraz wyjęcie funkcjonalności manipulacji postami do jednego  Modalu.

Formularze zostały przeniesione do osobnych komponentów oraz dynamicznie renderowane w uniwersalnym Modalu.

## Komponent Modal

```
        <button class="btn btn-success" @click="trySave()">Zapisz</button>
```

Metoda `trySave()` stała się bardziej uniwersalna.

```
        trySave: function() {
            this.$refs.component.trySave();
        }
```

Wykorzystuje ona odwołanie się do komponentu przez refs stworzoną atrybutem HTML w `template`.

```
        <div :is="component" ref="component" :id="id"></div>
```

Atrybut `ref="component"` tworzy referencje do obiektu.
Dodatkowo element korzysta z dyrektywy `:is` która binduje component do elementu HTML i dynamicznie go renderuje.

```
    [1] props : ['component', 'id'],
    [2] <modal v-if="showAdd === true" @close="closeModalAdd()"
            :component="'post-add'"
        ></modal>
```

Komponent ten jest przekazywany przez props.
Nazwa komponentu przekazana przez props `:component="'post-add'"`.

Modal posiada również slot.

```
        <slot name="modal-header">

        </slot>
```

W tym przypadku slot posiada atrybut name="modal-header".

```
        <modal v-if="showEdit === true" @close="closeModalEdit()"
               :component="'post-edit'" :id="postEditId"
        >
            <p slot="modal-header">Edytuj post</p>
        </modal>
```

Slot definiuje się wewnątrz komponentu w tym przypadku w `modal`. 
Aby element HTML znalazł się w slocie należy dodać jemu atrybut slot="modal-header" oraz podać jego nazwę.

## PostsModalFunctions.js - mixins

```
export default {

    data() {
        return {
            showAdd : false,
            showEdit : false,
            postEditId : 0
        }
    },
    methods: {
        // method to show modal
        showModalAdd: function() {
            this.showAdd = true;
        },
        // method to close
        closeModalAdd: function() {
            this.showAdd = false;
        },
        // method to show modal
        showModalEdit: function(id) {
            console.log('id', id);
            this.postEditId = id;
            this.showEdit = true;
        },
        // method to close
        closeModalEdit: function() {
            this.showEdit = false;
        }
    }
}
```

Mixins zawiera skrypt komponentu który można wyjąc na zewnątrz komponentu, a następnie dołączyć do dowolnej liczby komponentów.

```
[1] import PostsModalFunctions from './mixins/PostsModalFunctions';
[2] mixins: [PostsModalFunctions],
		
```

Najpierw należy zimportować `[1]` mixins, a następnie go zadeklarować `[2]` wewnątrz komponentu.

## Lokalna rejestracja komponentu

Poza globalną rejestracją komponentów w głównej instancji. Mamy możliwość również lokalnej rejestracji komponentów w ciele innych komponentów.

```
		[1] import PostsFilter from './PostsFilter.vue';
```

Na początku należy zimportować komponent.

```
    components: {
        'posts-filter' : PostsFilter,
        ...
    }
```
Następnie zarejestrować ten komponent.

## Podsumowanie

Vue udostępnia sposoby warunkowego renderowania komponentów oraz tworzenia slotów w których można umieszczać statyczne elementy.

Umożliwia również sposoby wyjmowania powtarzających się funkcji na zewnątrz za pomocą `mixins`.