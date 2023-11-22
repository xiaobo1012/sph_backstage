<template>
	<div class="main">
		<el-card class="box-card " style="margin-left: 8px">
			<!--<div class="box-header">-->
			<div class="search-header box-header">
				<span>线上热门搜索</span>
				<el-dropdown>
					<span class="el-dropdown-link">
					 <i class="el-icon-more"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>黄金糕</el-dropdown-item>
						<el-dropdown-item>狮子头</el-dropdown-item>
						<el-dropdown-item>螺蛳粉</el-dropdown-item>
						<el-dropdown-item disabled>双皮奶</el-dropdown-item>
						<el-dropdown-item divided>蚵仔煎</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="search-main">
				<el-row :gutter="50">
					<el-col :span="12">
						<!--<line-charts></line-charts>-->
						<card>
							<template v-slot:card-header>
								<span>搜索用户数</span>
								<svg
										t="1699608676220"
										class="icon info"
										viewBox="0 0 1024 1024"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										p-id="4021"
										width="25"
										height="25"
								>
									<path
											d="M853.333333 512C853.333333 323.48672 700.513195 170.666667 512 170.666667 323.486805 170.666667 170.666667 323.48672 170.666667 512 170.666667 700.51328 323.486805 853.333333 512 853.333333 700.513195 853.333333 853.333333 700.51328 853.333333 512ZM213.333333 512C213.333333 347.051093 347.050965 213.333333 512 213.333333 676.949035 213.333333 810.666667 347.051093 810.666667 512 810.666667 676.948907 676.949035 810.666667 512 810.666667 347.050965 810.666667 213.333333 676.948907 213.333333 512ZM494.933333 362.0224C494.933333 373.8048 504.484608 383.355733 516.266667 383.355733 528.048725 383.355733 537.6 373.8048 537.6 362.0224L537.6 320.644267C537.6 308.861867 528.048725 299.310933 516.266667 299.310933 504.484608 299.310933 494.933333 308.861867 494.933333 320.644267L494.933333 362.0224ZM494.933333 704C494.933333 715.781973 504.484608 725.333333 516.266667 725.333333 528.048725 725.333333 537.6 715.781973 537.6 704L537.6 448C537.6 436.218027 528.048725 426.666667 516.266667 426.666667 504.484608 426.666667 494.933333 436.218027 494.933333 448L494.933333 704Z"
											fill="#A5A9AA"
											p-id="4022"
									></path>
								</svg>
							</template>
							<template v-slot:card-data>
								<span class="big">1654561</span>
								<span class="small">123</span>
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
							</template>
							<template v-slot:card-lineCharts>
								<line-charts></line-charts>
							</template>
						</card>
					</el-col>
					<el-col :span="12">
						<card>
							<template v-slot:card-header>
								<span>搜索用户数</span>
								<svg
										t="1699608676220"
										class="icon info"
										viewBox="0 0 1024 1024"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										p-id="4021"
										width="25"
										height="25"
								>
									<path
											d="M853.333333 512C853.333333 323.48672 700.513195 170.666667 512 170.666667 323.486805 170.666667 170.666667 323.48672 170.666667 512 170.666667 700.51328 323.486805 853.333333 512 853.333333 700.513195 853.333333 853.333333 700.51328 853.333333 512ZM213.333333 512C213.333333 347.051093 347.050965 213.333333 512 213.333333 676.949035 213.333333 810.666667 347.051093 810.666667 512 810.666667 676.948907 676.949035 810.666667 512 810.666667 347.050965 810.666667 213.333333 676.948907 213.333333 512ZM494.933333 362.0224C494.933333 373.8048 504.484608 383.355733 516.266667 383.355733 528.048725 383.355733 537.6 373.8048 537.6 362.0224L537.6 320.644267C537.6 308.861867 528.048725 299.310933 516.266667 299.310933 504.484608 299.310933 494.933333 308.861867 494.933333 320.644267L494.933333 362.0224ZM494.933333 704C494.933333 715.781973 504.484608 725.333333 516.266667 725.333333 528.048725 725.333333 537.6 715.781973 537.6 704L537.6 448C537.6 436.218027 528.048725 426.666667 516.266667 426.666667 504.484608 426.666667 494.933333 436.218027 494.933333 448L494.933333 704Z"
											fill="#A5A9AA"
											p-id="4022"
									></path>
								</svg>
							</template>
							<template v-slot:card-data>
								<span class="big">1654561</span>
								<span class="small">123</span>
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
							<template v-slot:card-lineCharts>
								<line-charts></line-charts>
							</template>
						</card>
					</el-col>
				</el-row>
			</div>
			<div class="footer">
				<el-table
						border
						:data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }]"
						style="width: 100%;margin-top: 20px"
				>
					<el-table-column type="index" label="排名" align="center" width="80"></el-table-column>
					<el-table-column prop="keyWords" label="搜索关键词"></el-table-column>
					<el-table-column prop="number" label="用户数" sortable></el-table-column>
					<el-table-column prop="weekIncrease" label="周涨幅" sortable></el-table-column>
				</el-table>
				<el-pagination layout="prev, pager, next" :total="50" style="text-align: center"></el-pagination>
			</div>
			<!--</div>-->
		</el-card>
	</div>
</template>

<script>

import card from '@/views/dashboard/Observe/Search/Card'
import lineCharts from '@/views/dashboard/Observe/Search/lineCharts'

export default {
	name: 'index',
	components: {
		card,
		lineCharts
	}
}
</script>

<style scoped>
.main {
	width: 100%;
	height: 500px;
}

.box-header {
	border-bottom: 1px solid #eee;
	padding-bottom: 10px;
	margin-bottom: 10px;
	cursor: pointer;
}

.search-header {
	display: flex;
	justify-content: space-between;
	/*padding-bottom: 15px;*/
	/*border-bottom: 1px solid black;*/
}
</style>
