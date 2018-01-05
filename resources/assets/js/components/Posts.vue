<template>
    <div id="posts">
        // v-for directive - rendering all posts
        <div v-for="post in posts" class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    {{ post.title }}
                    <div class="pull-right">
                        // using of postData function to format created_at field
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
        }
    }
</script>
