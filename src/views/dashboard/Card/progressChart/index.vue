<template>
	<div class="barChart" ref="barChart"></div>
</template>

<script>
import echarts from 'echarts'

export default {
	name: 'progressChart',
	mounted() {
		let bc = echarts.init(this.$refs.barChart)
		bc.setOption({
			xAxis: {
				show: false,
				// type: 'category'
				//	最大值与最小值
				min: 0,
				max: 100
			},
			yAxis: {
				show: false,
				// 在y轴上均分，树状图就会横着排列
				type: 'category'
			},
			series: {
				type: 'bar',
				data: [78],
				color: '#22ab0b',
				barWidth: 10,
				//	背景颜色设置
				showBackground: true,
				backgroundStyle: {
					color: '#eee'
				},
				// 文本
				label: {
					show: true,
					// 改变文本内容
					formatter: '|',
					position:'right'
				}
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
