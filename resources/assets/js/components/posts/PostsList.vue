<template>
    <div id="posts-list">
         <!-- v-for directive - rendering all posts -->
        <!-- v-for directive - rendering all filteredPosts with filter -->
        <div v-if="filteredPosts">
            <post
                v-for="post in filteredPosts"
                :key="post.id"
                :post="post"
                @show-modal-edit="showModalEdit"
            >
            </post>
        </div>
    </div>
</template>

<script>
    // importing components to registration
    import Post from './Post.vue';
    import { mapGetters, mapActions } from 'vuex'

    export default {
        // local components registration
        components : {
            'post' : Post
        },

        //computed prop for filteredPosts via filter var string
        computed: {
            ...mapGetters({
                filter: 'post/filter',
                filteredPosts: 'post/filteredPosts',
            }),

        },
        methods: {
            showModalEdit: function(id) {
                this.$emit('show-modal-edit', id);
            }
        }
    }
</script>
