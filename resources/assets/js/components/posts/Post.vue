<template>
    <div v-if="post" class="col-md-12">
        <div class="panel panel-default">
            <div class="panel-heading">
                {{ post.title }}
                <div class="pull-right">
                    <!-- using of postDate computed prop to format created_at field -->
                    {{ postDate }}
                </div>
            </div>

            <div class="panel-body">
                {{ post.content }}
            </div>

            <div class="panel-footer">
                {{ post.user.name }}
                <!--deletePost button with on click event using deletePost() function-->
                <button @click="beforeDeletePost(post.id)" class="btn btn-sm btn-danger pull-right">Usuń</button>
                <!--deletePost button with on click event using deletePost() function-->
                <button @click="showModalEdit(post.id)" class="btn btn-sm btn-success pull-right">Edytuj</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        // post data passing by prop
        props : ['post'],
        computed : {
            // postDate function formatting created_at field
            postDate: function() {
                if (this.post) {
                    let dataTime = this.post.created_at.split(' ');
                    return dataTime[1] + ' | ' + dataTime[0];
                }
            },
        },
        methods: {
            ...mapActions('post',[
                'deletePost',
                'showModalEdit'
            ]),
            // deletePost function via axios delete call
            // using default alerts can be replaced sweetalert etc.
            beforeDeletePost: function(id) {
                if (confirm("Czy na pewno chcesz usunąć ten post?")) {
                    this.deletePost(id);
                }
            },
        }

    }
</script>