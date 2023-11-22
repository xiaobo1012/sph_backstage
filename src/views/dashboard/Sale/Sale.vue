<template>
	<div>
		<el-card class="box-card" style="margin: 8px">
			<!--v-model="activeName" @tab-click="handleClick"-->
			<div class="header">
				<!--头部左侧内容-->
				<el-tabs class="tab" v-model="tabName">
					<el-tab-pane label="销售额" name="sale"></el-tab-pane>
					<el-tab-pane label="访问量" name="visit"></el-tab-pane>
				</el-tabs>
				<!--	头部右侧内容-->
				<div class="right">
					<span @click="setDate(0)">今日</span>
					<span @click="setDate(1)">本周</span>
					<span @click="setDate(2)">本月</span>
					<span @click="setDate(3)">本年</span>

					<!--日历-->
					<el-date-picker
							v-model="date"
							class="date"
							type="daterange"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format="yyyy-MM-dd"
							size="small"
							:default-time="['00:00:00', '23:59:59']"
					>
					</el-date-picker>
				</div>
			</div>
			<!--下面的柱状图和排名-->
			<div class="main">
				<el-row :gutter="10">
					<el-col :span="18">
						<div class="barCharts" ref="barCharts"></div>
					</el-col>
					<el-col :span="6">
						<div>
							<h3>门店{{ title }}排名</h3>
							<el-table
									:data="mock"
									style="width: 100%"
									:show-header="false"
									:cell-style="setCellStyle"
									class="eltable"
							>
								<el-table-column type="index" width="80" align="center"></el-table-column>
								<el-table-column prop="name" width="width"></el-table-column>
								<el-table-column prop="sale"></el-table-column>
							</el-table>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
	</div>
</template>

<script>
import echarts from 'echarts'
import dayjs from 'dayjs'

export default {
	name: 'Sale',
	data() {
		return {
			tabName: 'sale',
			mock: [
				{
					name: '1',
					sale: 132
				},
				{
					name: '2',
					sale: 22342
				},
				{
					name: '3',
					sale: 334534
				},
				{
					name: '4',
					sale: 46456
				},
				{
					name: '5',
					sale: 55675
				},
				{
					name: '6',
					sale: 66786
				},
				{
					name: '7',
					sale: 78979
				}
			],
			bc: null,
			date: []
		}
	},
	watch: {
		tabName: {
			handler() {
				this.bc.setOption({
					title: {
						text: this.title + '趋势'
					}
				})
			}
		}
	},
	computed: {
		// todo 不知道这里为啥没有调用这个函数也能改变data中的数据
		sortMock() {
			this.mock.sort((a, b) => {
				return b.sale - a.sale
			})
		},
		title() {
			return this.tabName === 'sale' ? '销售额' : '访问量'
		}
	},
	mounted() {
		this.bc = echarts.init(this.$refs.barCharts)
		let option = {
			title: {
				text: this.title + '趋势'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			// yAxis:{},
			series: [
				{
					name: 'Direct',
					type: 'bar',
					barWidth: '60%',
					data: [10, 52, 200, 334, 390, 330, 220, 151, 456, 658, 48, 895],
					color: 'yellowgreen'
				}
			]
		}
		this.bc.setOption(option)
		/* 	bc.setOption({
				xAxis: {
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					type: 'category'
				},
				yAxis: {
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
			}) */
	},
	methods: {
		/**
		 * table样式
		 */
		setCellStyle({ rowIndex, columnIndex }) {
			if (rowIndex < 3 && columnIndex === 0) {
				return 'font-size:30px;font-weight:bold;color:red'
			}
		},
		/**
		 * 设置date日期时间
		 * type 是点击事件对象的编号 0-今日 1-本周 2-本月 3-本年
		 */
		setDate(type) {
			console.log(type)
			switch (type) {
				case 0:
					const date = dayjs().format('YYYY-MM-DD')
					this.date = [date, date]
					break
				case 1:
					let start1 = dayjs().day(1).format("YYYY-MM-DD")
					let end1 = dayjs().day(7).format("YYYY-MM-DD")
					this.date = [start1, end1]
					break
				case 2:
					let start2 = dayjs().startOf('month').format("YYYY-MM-DD")
					let end2 = dayjs().endOf('month').format("YYYY-MM-DD")
					this.date = [start2, end2]
					break
				case 3:
					let start3 = dayjs().startOf('year').format("YYYY-MM-DD")
					let end3 = dayjs().endOf('year').format("YYYY-MM-DD")
					this.date = [start3, end3]
					break
			}
		}
	}
}
</script>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	position: relative;
}

.tab {
	width: 100%;
}

.right {
	position: absolute;
	right: 0;
}

.right span {
	margin: 0 20px;
	cursor: pointer;
}

.date {
	margin: 0 10px;
	width: 250px
}

.barCharts {
	width: 100%;
	height: 400px;
}

h3 {
	padding: 0;
	margin: 0 0 10px 0;
}

>>> .eltable .el-table__row:nth-child(-n+3) {
	font-size: 20px;
	font-weight: bold;
	/*color: #20a0ff;*/
	/*text-shadow:*/
}
</style>
