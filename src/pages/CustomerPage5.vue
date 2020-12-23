<template>
  <q-page class="flex flex-start">
    <div class="screen flex">
      <span id="operation">
      <ul id="results">
        <li v-for="result in results">{{result}}</li>
      </ul>
        <span>{{operation}}</span>
      </span>
    </div>
    <div class="flex btn-wrap">
      <q-btn v-for="n in numbersBtn" :key="n" @click="handleInput(n)">{{n}}</q-btn>
      <q-btn v-for="op in opBtn" :key="op" @click="handleInput(op)">{{op}}</q-btn>
    </div>
  </q-page>
</template>

<script>
    export default {
        name: 'PageIndex',
        data() {
            return {
                prev_result: 0,
                numbersBtn: Array.from({length: 10}, (i, v) => v),
                opBtn: ['+', '-', '/', '=', 'c'],
                operation: '',
                results: []
            }
        },
        methods: {
            handleInput(n) {
                if (n === '=') {
                    try {
                        let result = eval(this.operation)
                        this.results.push(result)
                        this.operation = result
                    } catch (e) {
                        this.operation = 'Err'
                    }
                } else if (n === 'c') {
                    this.operation = ''
                } else {
                    this.operation += String(n);
                }
            }
        }
    }
</script>
<style lang="scss">
  .screen {
    width: 100%;
    min-height: 150px;
    background: #1D1D1D;
    font-family: digital-7, serif;
  }
  .btn-wrap {
    max-height: 50px;
    align-items: center;
    justify-content: flex-start;
    font-family: digital-7, serif;
  button {
    width: 120px;
    height: 75px;
    font-size: 25px;
    background: #1976d2;
    border-radius: 0;
    border: 1px solid #1d1d1d;
    color: #fff;
  }
  }
  #operation {
    font-size: 70px;
    color: #fff;
    margin-left: 5px;
    margin-top: auto;
  }
  #results {
    color: #fff;
    font-size: 50px;
    list-style: none;
    padding-left: 10px;
    margin: 0;
  }
  main .q-page {
    min-height: auto;
  }
</style>
