<template>
  <q-page>
  <section v-if="user">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h1 style="margin-top: 3px;text-align: center; color: blue;">Admin</h1>
        <p style="margin-top: -90px;">Admin:{{user.email}}</p>
<!--        <button class="ui pink submit button" @click="signout">Signout</button>-->
        <table style="margin-right: auto; margin-top: -10px;" class="ui celled table">
          <thead>
          <tr style="">
            <th>Email</th>
            <th>Role</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user.id">
            <td data-label="Name">{{user.email}}</td>
            <select @change="changeRole(user.id, $event)">
              <option :selected="user.role.driver" value="driver">Driver</option>
              <option :selected="user.role.customer" value="customer">Customer</option>
            </select>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>


    <h2 style="margin-left: 300px; color: deeppink;">Employees</h2>
    <List
      style="padding-top: 20px; margin-left: 100px;"
      v-for="(task, key) in people"
      :key="key"
      :task="task"
      :id="key">
    </List>
    <div style="position: relative; margin-right: 10px;" class="absolute-bottom text-center q-mb-lg">
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
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        users: [],
        user: null,
        showAddTask: false
      };
    },

    created() {
      var self = this;
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
            var user = doc.data();
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
      signout() {
        firebase
          .auth()
          .signOut()
          .then(user => {
            this.$router.push("/login");
          });
      },
      changeRole(uid, event) {
        var addMessage = firebase.functions().httpsCallable("setUserRole");

        var data = { uid: uid, role: { [event.target.value]: true } };

        addMessage(data)
          .then(function(result) {
            console.log(result);
          })
          .catch(function(error) {
            console.log(error)
          });
      }
    },
      computed: {
          ...mapGetters('people', ['people'])
      },
      components: {
          'List' : require('components/Tasks/List.vue').default,
          'add-task' : require('components/AddPerson.vue').default,
      }
  };
</script>
