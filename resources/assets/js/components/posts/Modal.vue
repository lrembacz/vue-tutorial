<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="modal-header">

                        </slot>
                    </div>
                    <div class="modal-body">
                        <div :is="component" ref="component" :id="id"></div>
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
    import PostAdd from './PostAdd.vue';
    import PostEdit from './PostEdit.vue';

    export default {
        components : {
            'post-add' : PostAdd,
            'post-edit' : PostEdit
        },
        methods: {
            closeModal: function() {
                this.$emit('close');
            },
            trySave: function() {
                this.$refs.component.trySave();
            }
        },
        props : ['component', 'id'],

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