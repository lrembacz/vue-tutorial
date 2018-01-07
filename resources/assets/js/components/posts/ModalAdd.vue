<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        Dodaj nowy post
                    </div>

                    <div class="modal-body">
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

                    <div class="modal-footer">
                        <!--trySave function called when user clicks on button-->
                        <button class="btn btn-success" @click="trySave()">Zapisz</button>
                        <!--closeModal function called when user clicks on button-->
                        <button class="btn btn-danger" @click="closeModal()">Zamknij</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                newPost : {
                    user_id : 1,
                    title : "",
                    content : ""
                },
                addingResponse : {},
                status : -1,
                message : ""
            }
        },
        // watcher waiting for making changes on addingResponse via async call
        watch : {
            addingResponse(val) {
                if(val !== {}) {
                    this.message = this.addingResponse.message;
                    this.status = this.addingResponse.status;
                }
            }
        },
        methods: {
            // trySave function which validate data and firing save method
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
            // save method - axios call to create new post from data
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
            closeModal: function() {
                this.$emit('close');
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
            clearForm: function() {
                this.newPost = {
                    user_id : 1,
                        title : "",
                        content : ""
                };
            }
        }
    }
</script>

<style>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 600px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>