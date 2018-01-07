export default {

    data() {
        return {
            showAdd : false,
            showEdit : false,
            postEditId : 0
        }
    },
    methods: {
        // method to show modal
        showModalAdd: function() {
            this.showAdd = true;
        },
        // method to close
        closeModalAdd: function() {
            this.showAdd = false;
        },
        // method to show modal
        showModalEdit: function(id) {
            console.log('id', id);
            this.postEditId = id;
            this.showEdit = true;
        },
        // method to close
        closeModalEdit: function() {
            this.showEdit = false;
        }
    }
}