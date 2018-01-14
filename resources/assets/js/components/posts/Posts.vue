<template>
    <div id="posts">

        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    Konfiguracja
                </div>
                <div class="panel-body">
                    <button @click="showModalAdd" class="btn btn-primary">Dodaj nowy post</button>
                </div>
            </div>
        </div>

        <div v-if="posts">

            <posts-filter>
            </posts-filter>

            <div v-if="status === 0" class="col-md-12">
                <div class="alert alert-danger"> {{ message }} </div>
            </div>

            <posts-list
                @show-modal-edit="showModalEdit"
            >
            </posts-list>
        </div>

        <modal
            v-if="showAdd"
            @close="closeModalAdd()"
            :component="'post-add'"
        >
            <p slot="modal-header">Dodaj post</p>
        </modal>
        <modal
            v-if="showEdit"
            @close="closeModalEdit()"
            :component="'post-edit'"
            :id="postEditId"
        >
            <p slot="modal-header">Edytuj post</p>
        </modal>
    </div>
</template>

<script>
    // importing components to registration
    import PostsFilter from './PostsFilter.vue';
    import PostsList from './PostsList.vue';
    import Modal from './Modal.vue';
    import { mapGetters, mapActions } from 'vuex'

    import PostsModalFunctions from './mixins/PostsModalFunctions';

    export default {
        created() {
            this.getPosts();
        },
        // local components registration
        components: {
            'posts-filter' : PostsFilter,
            'posts-list' : PostsList,
            'modal' : Modal,
        },
        // mixins of modals methods
        mixins: [PostsModalFunctions],
        computed: {
            ...mapGetters({
                posts: 'post/posts',
                status: 'post/status',
                message : 'post/message',
            })
        },
        // functions for component
        methods : {
            ...mapActions('post',[
                'getPosts'
            ])
        },
    }
</script>
