<template>
  <q-page>

    <h1 style="margin-top: 3px;text-align: center;">Customer Page</h1>

    <List2
      style="padding-top: 20px; margin-left: 100px;"
      v-for="(task, key) in people"
      :key="key"
      :task="task"
      :id="key">
    </List2>


  </q-page>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {

            };
        },
        methods: {

        },
        computed: {
            ...mapGetters('people', ['people'])
        },
        components: {
            'List2' : require('components/Tasks/List2.vue').default,
            'add-task' : require('components/AddPerson.vue').default,
        }
    };
</script>
