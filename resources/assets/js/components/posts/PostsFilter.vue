<template>
    <div id="posts-filter">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <input type="text" class="form-control" v-model="filter" placeholder="Search name">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            console.log(this.filter);
        },
        // data filter
        data() {
            return {
                filter: "",
            }
        },
    }
</script>