/**
* @author xiaobo1012
* @Description:  这里使用具名插槽，将父组件中需要的html格式传给子组件
* @date 2023/11/08 15:12:17
*/

<template>
	<div>
		<el-row>
			<el-col :span="6">
				<detail :title="title[0]" :count="count[0]">
					<!--todo 作用域插槽的使用方式-->
					<template v-slot:charts>
						<span>周同比&nbsp;&nbsp;56.67%</span>
						<svg
								t="1699431668381"
								class="icon"
								viewBox="0 0 1024 1024"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								p-id="5361"
								width="16"
								height="16"
						>
							<path
									d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
									fill="#1afa29"
									p-id="5362"
							></path>
						</svg>
						<span>日同比&nbsp;&nbsp;19.16%</span>
						<svg
								t="1699431819610"
								class="icon"
								viewBox="0 0 1024 1024"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								p-id="6471"
								width="16"
								height="16"
						>
							<path
									d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
									fill="#d81e06"
									p-id="6472"
							></path>
						</svg>
					</template>
					<template v-slot:footer>
						<span>日销售额 ￥ 165456161</span>
					</template>
				</detail>
			</el-col>
			<el-col :span="6">
				<detail :title="title[1]" :count="count[1]">
					<template v-slot:charts>
						<line-chart/>
					</template>
					<template v-slot:footer>
						<span>日访问量 1263465</span>
					</template>
				</detail>
			</el-col>
			<el-col :span="6">
				<detail :title="title[2]" :count="count[2]">
					<template v-slot:charts>
						<bar-chart/>
					</template>
					<template v-slot:footer>
						<span>转化率 64%</span>
					</template>
				</detail>
			</el-col>
			<el-col :span="6">
				<detail :title="title[3]" :count="count[3]">
					<template v-slot:charts>
						<progress-chart/>
					</template>
					<template v-slot:footer>
						<span>周同比&nbsp;&nbsp;12.67%</span>
						<svg
								t="1699431668381"
								class="icon"
								viewBox="0 0 1024 1024"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								p-id="5361"
								width="16"
								height="16"
						>
							<path
									d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
									fill="#1afa29"
									p-id="5362"
							></path>
						</svg>
						<span>日同比&nbsp;&nbsp;11.16%</span>
						<svg
								t="1699431819610"
								class="icon"
								viewBox="0 0 1024 1024"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								p-id="6471"
								width="16"
								height="16"
						>
							<path
									d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
									fill="#d81e06"
									p-id="6472"
							></path>
						</svg>
					</template>
				</detail>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import detail from '@/views/dashboard/Card/Detail'
import lineChart from '@/views/dashboard/Card/lineChart'
import barChart from '@/views/dashboard/Card/barChart/barChart'
import progressChart from '@/views/dashboard/Card/progressChart'

export default {
	name: 'card',
	data() {
		return {
			title: ['总销售额', '访问量', '支付笔数', '运营活动效果'],
			count: ['￥ 12156415', 88460, 55585, '78%']
		}
	},
	components: {
		detail,
		lineChart,
		barChart,
		progressChart
	}
}
</script>

<style scoped>
span {
	margin: 0 10px;
}
</style>
