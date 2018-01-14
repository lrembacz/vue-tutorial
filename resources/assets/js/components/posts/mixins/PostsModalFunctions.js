import { mapGetters, mapActions } from 'vuex'

export default {

    computed: {
        ...mapGetters({
            showAdd: 'post/showAdd',
            showEdit: 'post/showEdit',
            postEditId : 'post/postEditId',
        })
    },

    methods: {
        ...mapActions('post',[
            'showModalAdd',
            'closeModalAdd',
            'closeModalEdit',
            'showModalEdit'
        ])
    }

}