/**
* @author xiaobo1012
* @Description:  这里是card中每一个小框中的数据
* @date 2023/11/08 15:05:25
*/
<template>
	<div>
		<el-card class="box-card distance">
			<div class="card-header">
				<span>{{ title }}</span>
				<svg
						t="1699428039393"
						class="icon"
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="4020"
						width="20"
						height="20"
				>
					<path
							d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m36.571429 268.190476v292.571428h-73.142858V438.857143h73.142858z m0-121.904762v73.142857h-73.142858v-73.142857h73.142858z"
							p-id="4021"
							fill="#bfbfbf"
					></path>
				</svg>
			</div>
			<div class="card-content">{{ count }}</div>
			<div class="card-charts">
				<!--todo 具名插槽-->
				<slot name="charts"></slot>
			</div>
			<div class="card-footer">
				<slot name="footer"></slot>
			</div>
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'detail',
	// 父组件传递数据
	props: ['title', 'count']
}
</script>

<style scoped>
.distance {
	margin: 7px;
}

.card-header {
	display: flex;
	justify-content: space-between;
	color: #b4aeae;
}

.card-content {
	padding: 10px 0;
	font-size: 30px;
}

.card-charts {
	height: 50px;
}

.card-footer {
	padding-top: 15px;
	border-top: 1px solid #e3dfdf;
}

</style>
