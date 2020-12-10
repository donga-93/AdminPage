<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Person</div>
      <q-space />
      <q-btn
        v-close-popup
        flat
        round
        dense
        icon="close" />
    </q-card-section>
    <form
      style="width: 300px;"
      @submit.prevent="submitForm"
    >
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input
            style="width: 300px;"
            outlined
            v-model="taskToSubmit.name"
            :rules="[val => !!val || 'Name Field is required']"
            autofocus
            ref="name"
            label="Name"
            class="col">
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.name"
                @click="taskToSubmit.name = ''"
                name="close"
                class="cursor-pointer" />
            </template>
          </q-input>
        </div>

        <div class="row q-mb-sm">
          <q-input
            style="width: 300px;"
            outlined
            ref="surname"
            label="Surname"
            v-model="taskToSubmit.surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type your Surname']"
          >
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.surname"
                @click="taskToSubmit.surname = ''"
                name="close"
                class="cursor-pointer" />
            </template>
          </q-input>
        </div>

        <div class="row q-mb-sm">
          <q-input
            style="width: 300px;"
            outlined
            ref="password"
            label="Password"
            v-model="taskToSubmit.password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type your password']"
          >
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.password"
                @click="taskToSubmit.password = ''"
                name="close"
                class="cursor-pointer" />
            </template>
          </q-input>
        </div>

        <div class="row q-mb-sm">
          <q-input
            style="width: 300px;"
            type="number"
            outlined
            ref="mobileNumber"
            label="MobileNumber"
            v-model="taskToSubmit.mobileNumber"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type your mobileNumber']"
          >
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.mobileNumber"
                @click="taskToSubmit.mobileNumber = ''"
                name="close"
                class="cursor-pointer" />
            </template>
          </q-input>
        </div>

        <div class="row q-mb-sm">
          <q-select
            style="width: 300px;"
            outlined
            ref="position"
            label="Position"
            v-model="taskToSubmit.position"
            :options="taskToSubmit.options"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type your position']"
          >
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.position"
                @click="taskToSubmit.position = ''"
                name="close"
                class="cursor-pointer" />
            </template>
          </q-select>
        </div>

        <div class="row q-mb-sm">
          <q-checkbox
            v-model="taskToSubmit.status"
            color="secondary"
            label="Status"
            true-value="Active"
            false-value="Passive"
          />
        </div>

        <div class="q-px-sm">
          Choose your Status: <strong>'{{ taskToSubmit.status }}'</strong>
        </div>

        <modal-buttons></modal-buttons>
      </q-card-section>
    </form>

  </q-card>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        props: ['task', 'id'],
        data() {
            return {
                taskToSubmit: {
                    options: [
                        'Director', 'HR', 'IT', 'Installer', 'Drive'
                    ],
                }
            }
        },
        methods: {
            ...mapActions('people', ['updateTask']),
            submitForm() {
                this.$refs.name.validate()
                this.$refs.surname.validate()
                this.$refs.password.validate()
                this.$refs.mobileNumber.validate()
                this.$refs.position.validate()
                this.$q.notify({
                    color: 'primary-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: 'Person Updated!'
                })
                if (!this.$refs.name.hasError && !this.$refs.surname.hasError && !this.$refs.password.hasError && !this.$refs.mobileNumber.hasError && !this.$refs.position.hasError) {
                    this.submitTask()
                }
            },
            submitTask() {
                this.updateTask({
                    id: this.id,
                    updates: this.taskToSubmit
                })
                this.$emit('close')
            },
        },
        components: {
            // 'modal-task-name': require('components/Tasks/Modals/Shared/ModalTaskName.vue').default,
            'modal-buttons': require('components/Tasks/Modals/Shared/ModalButtons.vue').default,
        },
        mounted() {
            this.taskToSubmit = Object.assign({}, this.task)
        }
    }
</script>
