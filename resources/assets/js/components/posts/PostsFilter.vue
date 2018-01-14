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
    import { mapGetters, mapActions } from 'vuex'

    export default {

        computed: {
            ...mapGetters({
                storedFilter: 'post/filter'
            }),
            filter: {
                get () {
                    return this.storedFilter
                },
                set (value) {
                    this.setFilter(value);
                }
            }
        },
        methods: {
            ...mapActions('post',[
                'setFilter'
            ])
        }
    }
</script>