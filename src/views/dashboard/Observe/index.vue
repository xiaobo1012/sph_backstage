<template>
	<div>
		<el-row :gutter="30">
			<el-col :span="12">
				<search></search>
			</el-col>
			<el-col :span="12">
				<category></category>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import category from '@/views/dashboard/Observe/Category'
import search from '@/views/dashboard/Observe/Search'

export default {
	name: 'observe',
	components: {
		category,
		search
	}
}
</script>

<style scoped>

</style>
