<template>
    <div id="posts">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <input type="text" class="form-control" v-model="filter" placeholder="Search name">
                </div>
            </div>
        </div>
         <!-- v-for directive - rendering all posts -->
        <!-- v-for directive - rendering all filteredPosts with filter -->
        <div v-for="post in filteredPosts" class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    {{ post.title }}
                    <div class="pull-right">
                        <!-- using of postData function to format created_at field -->
                        {{ postData(post.created_at) }}
                    </div>
                </div>

                <div class="panel-body">
                    {{ post.content }}
                </div>

                <div class="panel-footer">
                    {{ post.user.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                filter : ""
            }
        },
        mounted() {
            console.log(this.posts)
        },
        // props passed from parent
        props : ['posts'],
        // functions for component
        methods : {
            // postData function formatting created_at field
            postData: function(created) {
                let dataTime = created.split(' ');
                return dataTime[1] + ' | ' + dataTime[0];
            }
        },
        computed: {
            filteredPosts: function () {
                let self = this;
                return this.posts.filter(function (all) {
                    return all.title.toLowerCase().indexOf(self.filter.toLowerCase()) >= 0;
                });
            }
        }
    }
</script>
