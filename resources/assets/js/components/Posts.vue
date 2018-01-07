<template>
    <div id="posts">
         <!-- v-for directive - rendering all posts -->
        <!-- v-for directive - rendering all filteredPosts with filter -->
        <div v-if="allposts != {}">

            <div v-if="status === 0" class="col-md-12">
                <div class="alert alert-danger"> {{ message }} </div>
            </div>

            <posts-list :posts="allposts.posts"></posts-list>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            this.getPosts();
        },
        // posts data
        // allposts from async call
        // posts taken from allposts via watcher
        // status taken from allposts via watcher
        // message taken from allposts via watcher
        data() {
            return {
                allposts : {},
                posts : [],
                status : -1,
                message : ""

            }
        },
        // watcher waiting for async changes
        watch: {
            allposts: function (val) {
                if (val !== {}) {
                    this.posts = this.allposts.posts ? this.allposts.posts : [];
                    this.message = this.allposts.message ? this.allposts.message : "";
                    this.status = this.allposts.status;
                }
            }
        },
        // functions for component
        methods : {
            getPosts: function() {
                axios.get('/api/posts').then( response => {
                    console.log(response.data);
                    this.allposts = response.data;
                    console.log(this.allposts);
                }).catch(err => {
                    this.allposts = {
                        status : 0,
                        message : "Problem z pobraniem postów"
                    }
                });
            }
        },
    }
</script>
