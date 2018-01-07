<template>
    <div id="posts-list">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <input type="text" class="form-control" v-model="filter" placeholder="Search name">
                </div>
            </div>
        </div>
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
        // data filter
        data() {
            return {
                filter : "",
            }
        },
        // passing props posts to post-list
        props : ['posts'],

        //computed prop for filteredPosts via filter var string
        computed: {
            filteredPosts: function () {
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
