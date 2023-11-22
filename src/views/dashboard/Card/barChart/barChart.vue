<template>
	<div class="barChart" ref="barChart"></div>
</template>

<script>
import echarts from 'echarts'

export default {
	name: 'barChart',
	mounted() {
		let bc = echarts.init(this.$refs.barChart)
		bc.setOption({
			xAxis: {
				show: false,
				type: 'category'
			},
			yAxis: {
				show: false
			},
			series: {
				type: 'bar',
				data: [60, 55, 12, 36, 88, 45.89, 36, 46, 123, 85, 11],
				color: '#245fc2'
			},
			grid: {
				left: 0,
				top: 0,
				right: 0,
				bottom: 0
			},
			tooltip: {}
		})
	}
}
</script>

<style scoped>
.barChart {
	width: 100%;
	height: 100%;
}
</style>
