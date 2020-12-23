<script>
    import { Pie } from 'vue-chartjs'

    export default {
        extends: Pie,
        data () {
            return {
                chartData: {
                    labels: ["Digital Tv", "Magticom", "Silknet", "Netflix","Hbo","Ntv","BBC",],
                    datasets: [{
                        borderWidth: 1,
                        borderColor: [
                            'rgb(221,29,30)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgb(235,95,87)',
                            'rgb(255,165,214)',
                            'rgb(24,29,192)'
                        ],
                        backgroundColor: [
                            'rgba(232,17,17,0.91)',
                            'rgba(60,158,233,0.54)',
                            'rgba(255,206,86,0.57)',
                            'rgba(25,192,24,0.72)',
                            'rgba(235,32,29,0.29)',
                            'rgba(255,88,199,0.23)',
                            'rgba(27,34,255,0.35)'
                        ],
                        data: [1000,	500,	1500,	1000,535,	200,	400]
                    }]
                },
                options: {
                    legend: {
                        display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        mounted () {
            this.renderChart(this.chartData, this.options)
        }
    }
</script>
