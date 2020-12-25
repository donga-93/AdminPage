<template>
  <q-select
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    class="col q-ml-sm"
    filled
    label="Sort by"
    stack-label />
</template>

<script>
  import {mapState, mapActions} from 'vuex'
    export default {
        data () {
            return {
                options: [
                    {
                        label: 'Name',
                        value: 'name'
                    },
                    {
                        label: 'Surname',
                        value: 'surname'
                    },
                    {
                        label: 'Position',
                        value: 'position'
                    },
                    {
                        label: 'Status',
                        value: 'status'
                    }
                ],
            }
        },
        computed: {
            ...mapState('people',['sort']),
            sortBy: {
                get() {
                 return this.sort
                },
                set(value) {
                 this.setSort(value)
                }
            }
        },
        methods: {
            ...mapActions('people',['setSort'])
        }
    }
</script>

<style scoped>
  .q-select {
    flex: 0 0 112px;
  }

</style>
