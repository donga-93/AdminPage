<template>
  <q-page>
    <div v-if="user" style="margin-left: 100px; " class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Georgia Region</div>
              <div class="text-h5 q-mt-sm q-mb-xs">Admin:{{user.email}}</div>
              <div class="text-caption text-grey">
                Sales and Marketing Executive | Graduate and past committee | Keynote speaker on Selling and Recruiting
                Topics
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://www.cyberstrategies.co.uk/admin/resources/shutterstock110198630.jpg"
              />
            </q-card-section>
          </q-card-section>
          <q-separator/>
        </q-card>
      </div>
    </div>


    <div style="position:relative; width: 55%; margin-left: 155px;" class="row q-mb-lg">
      <search />
    </div>


    <div style="position:relative; width: 50%; margin-left: 145px;" class="row q-mb-lg">
      <sort />
    </div>


    <h6 style="position: relative; left: 155px; color: #dd1d1e;" v-if="search && !Object.keys(peopleTodo).length">No search result</h6>
    <div style="position: relative; margin-left: 155px; margin-top: 2px; color: magenta;" class="text-h4">
       Employees Of Digital TV
    </div>

    <List
      style="margin-top: 30px; margin-left: 70px;"
      v-for="(task, key) in peopleTodo"
      :key="key"
      :task="task"
      :id="key">
    </List>

    <div style="position: relative; margin-top: 60px; margin-right: 10px;" class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTask = true"
        round
        color="green"
        size="24px"
        icon="add"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>

  </q-page>
</template>
<script>
  import firebase from "firebase";
  import { mapGetters, mapState } from 'vuex'
  import Search from "../components/Tasks/Tools/Search";
  export default {
      props: ['Admin'],
    data() {
      return {
        users: [],
        user: null,
        showAddTask: false
      };
    },

    created() {
      let self = this;
      firebase.auth().onAuthStateChanged(function(user) {
        self.user = user;
      });

      this.users = [];
      firebase
        .firestore()
        .collection("roles")
        .get()
        .then(snap => {
          snap.forEach(doc => {
            let user = doc.data();
            console.log('admin.vue user:', user);
            user.id = doc.id;
            console.log(doc.data());
            if (!user.role.admin) {
              this.users.push(user);
            }
          });
        });
    },
    methods: {
      // signout() {
      //   firebase
      //     .auth()
      //     .signOut()
      //     .then(user => {
      //       this.$router.push("/login");
      //     });
      // },
      // changeRole(uid, event) {
      //   let addMessage = firebase.functions().httpsCallable("setUserRole");
      //
      //     let data = { uid: uid, role: { [event.target.value]: true } };
      //
      //   addMessage(data)
      //     .then(function(result) {
      //       console.log(result);
      //     })
      //     .catch(function(error) {
      //       console.log(error)
      //     });
      // }
    },
      computed: {
          ...mapGetters('people', ['peopleTodo']),
              ...mapState('people',['search'])
      },
      components: {
          Search,
          'List' : require('components/Tasks/List.vue').default,
          'add-task' : require('components/AddPerson.vue').default,
          'search' : require('components/Tasks/Tools/Search.vue').default,
          'sort' : require('components/Tasks/Tools/Sort.vue').default
      }
  };
</script>
