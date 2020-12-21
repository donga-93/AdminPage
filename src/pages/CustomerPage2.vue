<template>
  <q-card class="q-mt-lg">
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Team Progress
      </div>
    </q-card-section>
    <q-separator color="white"/>
    <q-card-section class="q-pa-none">
      <q-table class="" :data="data3" :columns="column4" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props" style="max-width: 100px">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="props.row.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ props.row.name }}</q-item-label>
                <q-item-label caption class="">{{ props.row.des }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Task="props">
          <q-td :props="props">
            <q-item>
              <q-item-section>
                <q-item-label>
                    <span class="text-blue">
                      <q-icon name="bug_report" color="blue" size="20px" v-if="props.row.type=='error'"></q-icon>
                      <q-icon name="settings" color="blue" size="20px" v-if="props.row.type=='info'"></q-icon>
                      <q-icon name="flag" color="blue" size="20px" v-if="props.row.type=='success'"></q-icon>
                      <q-icon name="fireplace" color="blue" size="20px" v-if="props.row.type=='warning'"></q-icon>
                      {{ props.row.issue }}
                    </span>
                  <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="positive"
                          v-if="props.row.type=='success'"></q-chip>
                  <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="info"
                          v-if="props.row.type=='info'"></q-chip>
                  <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="warning"
                          v-if="props.row.type=='warning'"></q-chip>
                  <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="negative"
                          v-if="props.row.type=='error'"></q-chip>
                </q-item-label>
                <q-item-label caption class="">
                  <q-linear-progress dark :color="getColor(props.row.Progress)" :value="props.row.Progress/100"
                  />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
<script>
    export default {
        name: "Tables",
        data() {
            return {
                column4: [
                    {name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left'},
                    {name: 'Task', label: 'Task', field: 'task', sortable: true, align: 'left'},
                ],
                data3: [
                    {
                        name: 'Kote Janjgava',
                        des: 'Developer',
                        Progress: 70,
                        type: 'info',
                        issue: '#125',
                        avatar: 'https://scontent.ftbs5-2.fna.fbcdn.net/v/t1.0-9/122448939_10214144119957334_9211251977261296247_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeFc1LpD_QIL53zG4OPQo6xF_K0ZNjcy2xH8rRk2NzLbEY84AjCZZlCG8qEgKkKESSc&_nc_ohc=LguhQfBlOwsAX9TEqn4&_nc_ht=scontent.ftbs5-2.fna&oh=6bd8514cf724f5fe6b3dd2cb1db6eda9&oe=6007A9F6',

                    },
                    {
                        name: 'Zaza Dongadze',
                        des: 'Developer',
                        Progress: 60,
                        type: 'success',
                        issue: '#1425',
                        avatar: 'https://scontent.ftbs5-2.fna.fbcdn.net/v/t1.0-9/121650537_3567169566660937_4430947927019886405_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGzuiCyvZeG5KWs-sbcCxEUpINDER9ClV2kg0MRH0KVXTduAbVknN65qpwsERvQkfQ&_nc_ohc=dpzqn9fjjvwAX-yoF03&_nc_ht=scontent.ftbs5-2.fna&oh=59baf2d52ea482955797f61ceb8f3f2c&oe=600630FA',
                    },
                    {
                        name: 'Elon Musk',
                        des: 'Engineer',
                        Progress: 30,
                        type: 'warning',
                        issue: '#1475',
                        avatar: 'https://www.gstatic.com/tv/thumb/persons/487130/487130_v9_bb.jpg',
                    },
                    {
                        name: 'Jeff Galbraith',
                        des: 'Developer',
                        Progress: 20,
                        type: 'warning',
                        issue: '#34',
                        avatar: 'https://s3.amazonaws.com/37assets/svn/1024-original.1e9af38097008ef9573f03b03ef6f363219532f9.jpg',
                    },
                    {
                        name: 'Jeff Black',
                        des: 'Developer',
                        Progress: 100,
                        type: 'success',
                        issue: '#23',
                        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ_u-gnmeOdsfZMOpBTzqqcnBZwo8dWu38-Q&usqp=CAU',
                    },
                    {
                        name: 'Elen Galbraith',
                        des: 'Hr',
                        Progress: 100,
                        type: 'success',
                        issue: '#134',
                        avatar: 'https://media.nngroup.com/media/people/photos/Kathryn_1.jpg.600x600_q75_autocrop_crop-smart_upscale.jpg',
                    }
                ]
            }
        },
        methods: {
            getColor(val) {
                if (val > 70 && val <= 100) {
                    return 'green'
                } else if (val > 50 && val <= 70) {
                    return 'blue'
                }
                return 'red'
            }
        }
    }
</script>
<style>

</style>
