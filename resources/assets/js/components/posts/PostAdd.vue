<template>
    <div id="post-add">
        <!--GetAlertColorByStatus() method called  to dynamically change class depending on status -->
        <div v-if="status != -1" :class="'alert alert-'+getAlertColorByStatus(status)"> {{ message }} </div>

        <form class="form-horizontal">
            <div class="form-group">
                <label for="title">Tytuł</label>
                <!--v-model directive which changes value of string with text from input-->
                <input id="title" type="text" class="form-control" v-model="postTitle" placeholder="Tytuł">
            </div>
            <div class="form-group">
                <label for="content">Treść</label>
                <!--v-model directive which changes value of string with text from textarea-->
                <textarea id="content" class="form-control" v-model="postContent" placeholder="Treść"></textarea>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                newPostTitle: 'post/newPostTitle',
                newPostContent: 'post/newPostContent',
                newPost: 'post/newPost',
                status: 'post/postAdd_status',
                message: 'post/postAdd_message'
            }),
            postTitle: {
                get () {
                    return this.newPostTitle
                },
                set (value) {
                    this.setNewPostTitle(value);
                }
            },
            postContent: {
                get () {
                    return this.newPostContent
                },
                set (value) {
                    this.setNewPostContent(value);
                }
            }
        },
        methods: {
            ...mapActions('post',[
                'setNewPostTitle',
                'setNewPostContent',
                'beforeNewPost',
                'addNewPost'
            ]),
            // trySave function which validate data and firing beforeNewPost method from store
            trySave: function() {
                if (confirm("Czy na pewno chcesz dodać posta?")) {
                    this.beforeNewPost();
                }

            },
            getAlertColorByStatus: function(status) {
                if (status === 0 ) {
                    return 'danger';
                } else if (status === 1 ) {
                    return 'success';
                } else {
                    return '';
                }
            },
        }
    }
</script>