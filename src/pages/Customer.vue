<template>
  <q-page>

    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">

        <q-img
          src="https://149478393.v2.pressablecdn.com/wp-content/uploads/2017/05/digital-tv.jpg"
          style="max-width: 100%; height: 200px;"
        >
          <div style="color: magenta;" class="absolute-bottom text-subtitle1 text-center">
            Employees Of Digital TV
          </div>
        </q-img>
      </div>
    </div>


    <div style="position:relative; width: 55%; margin-left: 100px;" class="row q-mb-lg">
      <search />
    </div>


    <div style="position:relative; width: 50%; margin-left: 90px;" class="row q-mb-lg">
      <sort />
    </div>


    <h6 style="position: relative; left: 180px; color: #dd1d1e;" v-if="search && !Object.keys(peopleTodo).length">No search result</h6>
<!--    <div style="position: relative;  margin-top: 2px; color: magenta;" class="text-h4">-->
<!--      List Of Employees-->
<!--    </div>-->

    <List2
      style="margin-top: 30px; margin-left: 70px;"
      v-for="(task, key) in peopleTodo"
      :key="key"
      :task="task"
      :id="key">
    </List2>


  </q-page>
</template>
<script>
    import firebase from "firebase";
    import { mapGetters, mapState } from 'vuex'
    import Search from "../components/Tasks/Tools/Search";
    export default {
        data() {
            return {

            };
        },
        methods: {

        },
        computed: {
            ...mapGetters('people', ['peopleTodo']),
            ...mapState('people',['search'])
        },
        components: {
            'List2' : require('components/Tasks/List2.vue').default,
            'add-task' : require('components/AddPerson.vue').default,
            'search' : require('components/Tasks/Tools/Search.vue').default,
            'sort' : require('components/Tasks/Tools/Sort.vue').default
        }
    };
</script>
