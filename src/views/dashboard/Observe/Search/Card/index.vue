/**
* @author xiaobo1012
* @Description: card模板
* @date 2023/11/14 09:35:52
*/
<template>
	<div class="card">
		<div class="header clearfix" slot="header">
			<slot name="card-header"></slot>
		</div>
		<div class="main">
			<slot name="card-data"></slot>
			<slot name="card-lineCharts"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'index',
	props: ['title']
}
</script>

<style scoped>
.header{
	margin-bottom: 10px;
}
.main svg {
	margin-right: 20px;
}
.big{
	font-weight: bold;
	font-size: 27px;
	margin-right: 15px;
}
.small{
	font-size: 20px;
	color: #c0bcbc;
	margin-right: 10px;
}
.info {
	/*padding-top: 1px;*/
	/*line-height: 28px;*/
	vertical-align: middle;
	margin-left: 10px;
}

</style>
