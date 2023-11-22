<template>
	<div>
		<el-card class="box-card" style="margin-right: 8px">
			<div class="category-header">
				<span>销售额类别占比</span>
				<el-radio-group v-model="tabPosition">
					<el-radio-button label="all">全部渠道</el-radio-button>
					<el-radio-button label="online">线上</el-radio-button>
					<el-radio-button label="store">门店</el-radio-button>
				</el-radio-group>
			</div>
			<div class="category-body">
				<div ref="barCharts" class="barCharts"></div>
			</div>
		</el-card>
	</div>
</template>

<script>
import echarts from 'echarts'

export default {
	name: 'index',
	data() {
		return {
			tabPosition: 'all'
		}
	},
	mounted() {
		let bc = echarts.init(this.$refs.barCharts)
		bc.setOption({
			tooltip: {
				trigger: 'item'
			},
			// legend: {
			// 	top: '5%',
			// 	left: 'center'
			// },
			series: [
				{
					name: '销售额类别占比',
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					label: {
						show: true
						// position: 'center'
					},
					// emphasis: {
					// 	label: {
					// 		show: true,
					// 		fontSize: 30,
					// 		fontWeight: 'bold'
					// 	}
					// },
					labelLine: {
						show: true
					},
					data: [
						{ value: 300, name: '视频广告' },
						{ value: 1048, name: '搜索引擎' },
						{ value: 735, name: '直接访问' },
						{ value: 580, name: '邮件营销' },
						{ value: 484, name: '联盟广告' }
					],
					grid: {
						left: 10
					}
				}
			]
		})
		//	鼠标移出事件
		bc.on('mouseout', (params) => {
			//	获取鼠标移上去的那条数据
			const { name, value } = params.data
			// 重新设置标题
			bc.setOption({
				title: {
					text: '',
					subtext: '',
					left: 'center',
					top: 'center'
				}
			})
		})
		//	鼠标移入事件
		bc.on('mouseover', (params) => {
			//	获取鼠标移上去的那条数据
			const { name, value } = params.data
			// 重新设置标题
			bc.setOption({
				title: {
					text: name,
					subtext: value,
					left: 'center',
					top: 'center'
				}
			})
		})
	}
}
</script>
<style scoped>
.category-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #eee;
	padding-bottom: 10px;
}

.barCharts {
	width: 100%;
	height: 365px;
}

</style>
