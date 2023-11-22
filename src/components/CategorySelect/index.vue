<template>
	<!--
	inline  代表一行上可以防止多个表单元素

	-->
	<el-form :inline="true" :model="formInline" class="demo-form-inline">
		<!--这里的model表示将表单的数据收集到哪个地方-->
		<el-form-item :model="categoryId" label="一级分类">
			<!--注：这里的v-model双向绑定的是option的value属性-->
			<el-select v-model="categoryId.id1" placeholder="请选择" @change="getCateGoryList2Data" :disabled="!isShowTable">
				<el-option v-for="item in categoryList.list1" :key="item.id" :label="item.name" :value="item.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="二级分类">
			<el-select v-model="categoryId.id2" placeholder="请选择" @change="getCateGoryList3Data" :disabled="!isShowTable">
				<el-option v-for="item in categoryList.list2" :key="item.id" :label="item.name" :value="item.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="三级分类">
			<el-select v-model="categoryId.id3" placeholder="请选择" @change="sendId" :disabled="!isShowTable">
				<el-option v-for="item in categoryList.list3" :key="item.id" :label="item.name" :value="item.id"></el-option>
			</el-select>
		</el-form-item>
	</el-form>
</template>

<script>

export default {
	name: 'categoryselect',
	data() {
		return {
			formInline: {},
			categoryList: {
				list1: [],
				list2: [],
				list3: []
			},
			categoryId: {
				id1: '',
				id2: '',
				id3: ''
			}
		}
	},
	props: ['isShowTable'],
	mounted() {
		this.getCateGoryList1Data()
	},
	methods: {
		/**
		 * 获取CateGoryList1的数据
		 */
		async getCateGoryList1Data() {
			const result = await this.$API.attr.getCategory1()
			// console.log(result)
			if (result.code === 200) {
				this.categoryList.list1 = result.data
			}
		},
		/**
		 * 当一级分类数据变化后，获取CateGoryList2的数据
		 * @returns {Promise<void>}
		 */
		async getCateGoryList2Data() {
			// 将二级和三级分类清空
			this.categoryId.id2 = ''
			this.categoryId.id3 = ''
			this.categoryList.list2 = []
			this.categoryList.list3 = []

			// 将id1传递给父组件
			// this.$emit('getcategoryId', this.categoryId)

			const result = await this.$API.attr.getCategory2(this.categoryId.id1)
			// console.log(result)
			if (result.code === 200) {
				this.categoryList.list2 = result.data
			}
		},
		/**
		 * 当二级分类数据变化后，获取CateGoryList3的数据
		 * @returns {Promise<void>}
		 */
		async getCateGoryList3Data() {
			// 三级分类清空
			this.categoryId.id3 = ''
			this.categoryList.list3 = []

			// 将id2传递给父组件
			// this.$emit('getcategoryId', this.categoryId)

			const result = await this.$API.attr.getCategory3(this.categoryId.id2)
			// console.log(result)
			if (result.code === 200) {
				this.categoryList.list3 = result.data
			}
		},
		// 将id传递给父组件
		sendId() {
			// 将id3传递给父组件
			this.$emit('getcategoryId', this.categoryId)
		}
		// /**
		//  * 当三级分类确定的时候就要开始展示数据了
		//  */ async showProduct() {
		//   // 获取产品基础属性
		//   // this.$store.dispatch()
		// }

	}
}
</script>

<style scoped>

</style>
