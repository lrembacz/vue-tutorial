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
            </div>
        </div>
    </div>
</template>

<script>
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
            // deletePost function via axios delete call
            // using default alerts can be replaced sweetalert etc.
            deletePost: function(id) {
                if (confirm("Czy na pewno chcesz usunąć ten post?")) {
                    axios.delete('/api/posts/'+id).then( response => {
                        alert('Usunięto post o id ' + id);
                    }).catch( err => {
                        if(err.response) {
                            alert('Błąd przy usuwaniu')
                        }
                    })
                }
            }
        }

    }
</script>