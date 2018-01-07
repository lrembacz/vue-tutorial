<template>
    <div v-if="post" class="col-md-12">
        <div class="panel panel-default">
            <div class="panel-heading">
                {{ post.title }}
                <div class="pull-right">
                    <!-- using of postDate computed prop to format created_at field -->
                    {{ postDate }}
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
</template>

<script>
    export default {
        props : ['post'],
        computed : {
            // postDate function formatting created_at field
            postDate: function() {
                if (this.post) {
                    let dataTime = this.post.created_at.split(' ');
                    return dataTime[1] + ' | ' + dataTime[0];
                }
            },
        }

    }
</script>