<template>
  <q-item
    clickable
    v-ripple>
    <q-item>
      <q-item-section side>
        <q-item-label overline style="color: chartreuse">Name</q-item-label>
        <q-item-label>{{ task.name }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section side>
        <q-item-label overline style="color: chartreuse">Surname</q-item-label>
        <q-item-label>{{ task.surname }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section side>
        <q-item-label overline style="color: chartreuse">MobileNumber</q-item-label>
        <q-item-label>{{ task.mobileNumber }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section side>
        <q-item-label overline style="color: chartreuse">Position</q-item-label>
        <q-item-label>{{ task.position }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section side>
        <q-item-label overline style="color: chartreuse">Status</q-item-label>
        <q-item-label>{{ task.status }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section side>
        <q-item-label overline style="color: chartreuse">Password</q-item-label>
        <q-item-label>{{ task.password }}</q-item-label>
      </q-item-section>
    </q-item>


    <q-dialog v-model="showEditTask">
      <edit-task
        @close="showEditTask = false"
        :task="task"
        :id="id" />
    </q-dialog>

  </q-item>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        props: ['task', 'id'],
        data() {
            return {
                showEditTask: false
            }
        },
        methods: {
            ...mapActions('people', ['updateTask', 'deleteTask']),
            promptToDelete(id) {
                this.$q.dialog({
                    title: 'Confirm',
                    message: 'Really delete?',
                    ok: {
                        push: true
                    },
                    cancel: {
                        color: 'negative'
                    },
                    persistent: true
                }).onOk(() => {
                    this.$q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'warning',
                        message: 'Person Deleted!   '
                    })
                    this.deleteTask(id)
                })
            }
        },
        components: {
            'edit-task': require('components/EditPerson.vue').default
        }
    }
</script>

<style>

</style>
