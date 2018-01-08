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
                <button @click="deletePost(post.id)" class="btn btn-sm btn-danger pull-right">Usuń</button>
                <!--deletePost button with on click event using deletePost() function-->
                <button @click="showModalEdit(post.id)" class="btn btn-sm btn-success pull-right">Edytuj</button>
                <form :id="'delete-form'+post.id" :action="action" method="POST" style="display: none;">
                    <input type="hidden" name="_method" value="DELETE">
                    <input type="hidden" name="_token" :value="csrf">
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                csrf : document.head.querySelector('meta[name="csrf-token"]').content,
                action : ""
            }
        },
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
            // deletePost function via axios delete call
            // using default alerts can be replaced sweetalert etc.
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
            showModalEdit: function(id) {
                this.$emit('show-modal-edit', id);
            }
        }

    }
</script>