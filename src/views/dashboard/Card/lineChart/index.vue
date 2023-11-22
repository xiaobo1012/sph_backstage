<template>
	<div class="lineChart" ref="lineChart"></div>
</template>

<script>
import echarts from 'echarts'

export default {
	name: 'lineChart',
	mounted() {
		let lc = echarts.init(this.$refs.lineChart)
		lc.setOption({
			xAxis: {
				show: false,
				// 均分x轴
				type: 'category'
			},
			yAxis: {
				show: false
			},
			series: [
				{
					type: 'line',
					data: [60, 55, 12, 36, 88, 45.89, 36, 46],
					// 将折线图变得圆滑（曲线图）
					smooth: true,
					//	拐点样式设置
					itemStyle: {
						opacity: 0
					},
					//	线条样式设置
					lineStyle: {
						color: 'purple'
					},
					// 填充颜色的设置
					areaStyle: {
						color: {
							//	渐变颜色
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: 'purple'	// 0% 处的颜色
								},
								{
									offset: 1,
									color: '#fff'	// 100% 处的颜色
								}
							],
							global: false	// 缺省为false
						}
					}
				}
			],
			grid: {
				left: 0,
				top: 0,
				right: 0,
				bottom: 0
			}
		})
	}
}
</script>

<style scoped>
.lineChart {
	width: 100%;
	height: 100%;
}
</style>
