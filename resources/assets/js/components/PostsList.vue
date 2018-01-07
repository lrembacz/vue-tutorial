<template>
    <div id="posts-list">
         <!-- v-for directive - rendering all posts -->
        <!-- v-for directive - rendering all filteredPosts with filter -->
        <div v-if="posts != []">
            <post v-for="post in filteredPosts" :key="post.id" :post="post"></post>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            console.log(this.posts);
        },
        // passing props posts to post-list
        props : ['posts', 'filter'],

        //computed prop for filteredPosts via filter var string
        computed: {
            filteredPosts: function () {
                console.log(this.filter);
                let self = this;
                if(this.posts) {
                    return this.posts.filter(function (all) {
                        return all.title.toLowerCase().indexOf(self.filter.toLowerCase()) >= 0;
                    });
                }

            }
        },
    }
</script>
