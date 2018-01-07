<template>
    <div id="post-edit">
        <!--GetAlertColorByStatus() method called  to dynamically change class depending on status -->
        <div v-if="status != -1" :class="'alert alert-'+getAlertColorByStatus(status)"> {{ message }} </div>

        <form class="form-horizontal">
            <div class="form-group">
                <label for="title">Tytuł</label>
                <!--v-model directive which changes value of string with text from input-->
                <input id="title" type="text" class="form-control" v-model.trim="newPost.title" placeholder="Tytuł">
            </div>
            <div class="form-group">
                <label for="content">Treść</label>
                <!--v-model directive which changes value of string with text from textarea-->
                <textarea id="content" class="form-control" v-model.trim="newPost.content" placeholder="Treść"></textarea>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newPost : {
                    title : "",
                    content : ""
                },
                postGetted : {},
                addingResponse : {},
                status : -1,
                message : ""
            }
        },
        props : ['id'],
        // watcher waiting for making changes on addingResponse via async call
        watch : {
            addingResponse(val) {
                if(val !== {}) {
                    this.message = this.addingResponse.message;
                    this.status = this.addingResponse.status;
                }
            },
            postGetted(val) {
                if(val !== {}) {
                    this.newPost.title = this.postGetted.title;
                    this.newPost.content = this.postGetted.content;
                }
            },
        },
        mounted() {
            if (this.id > 0) {
                this.getPostToEdit(this.id);
            }
        },
        methods: {
            // trySave function which validate data and firing save method
            trySave: function() {
                if (confirm("Czy na pewno chcesz dodać posta?")) {
                    if ((this.newPost.title.length > 0) && (this.newPost.content.length > 0) && (this.id > 0)) {
                        this.save(this.id);
                    } else {
                        this.addingResponse = {
                            status : 0,
                            message : "Oba pola muszą być wypełnione!"
                        }
                    }
                }

            },
            getPostToEdit: function(id) {
                axios.get('/api/posts/'+id).then( post => {
                    this.postGetted = post.data.post;
                }).catch( err => {
                    if(err.response) {
                        alert('Błąd przy pobieraniu posta do edycji')
                    }
                })
            },
            // save method - axios call to update post from data
            save: function(id) {
                axios.put('/api/posts/'+id, this.newPost).then( response => {
                    this.addingResponse = response.data;
                }).catch(err => {
                    if (err.response) {
                        this.addingResponse = {
                            status : 0,
                            message : "Error while adding"
                        };
                    }
                });
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