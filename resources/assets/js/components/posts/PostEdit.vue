<template>
    <div id="post-edit">
        <!--GetAlertColorByStatus() method called  to dynamically change class depending on status -->
        <div v-if="status != -1" :class="'alert alert-'+getAlertColorByStatus(status)"> {{ message }} </div>

        <form class="form-horizontal">
            <div class="form-group">
                <label for="title">Tytuł</label>
                <!--v-model directive which changes value of string with text from input-->
                <input id="title" type="text" class="form-control" v-model.trim="postTitle" placeholder="Tytuł">
            </div>
            <div class="form-group">
                <label for="content">Treść</label>
                <!--v-model directive which changes value of string with text from textarea-->
                <textarea id="content" class="form-control" v-model.trim="postContent" placeholder="Treść"></textarea>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                editPostTitle: 'post/editPostTitle',
                editPostContent: 'post/editPostContent',
                editPost: 'post/editPost',
                status: 'post/postEdit_status',
                message: 'post/postEdit_message'
            }),
            postTitle: {
                get () {
                    return this.editPostTitle
                },
                set (value) {
                    this.setEditPostTitle(value);
                }
            },
            postContent: {
                get () {
                    return this.editPostContent
                },
                set (value) {
                    this.setEditPostContent(value);
                }
            }
        },
        props : ['id'],
        mounted() {
            if (this.id > 0) {
                this.getPostToEdit(this.id);
            }
        },
        methods: {
            ...mapActions('post',[
                'getPostToEdit',
                'setEditPostTitle',
                'setEditPostContent',
                'beforeEditPost',
            ]),
            // trySave function which validate data and firing save method
            trySave: function() {
                if (confirm("Czy na pewno chcesz dodać posta?")) {
                    this.beforeEditPost(this.id);
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