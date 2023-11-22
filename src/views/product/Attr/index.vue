<template>
	<div>
		<el-card style="margin:20px 20px">
			<!--自定义事件  将子组件中的三个id传给父组件-->
			<categoryselect @getcategoryId="getcategoryId" :isShowTable="isShowTable"></categoryselect>
		</el-card>

		<el-card style="margin:0 20px">
			<div v-show="isShowTable">
				<!--按钮-->
				<el-button
						:disabled="!categoryId.id3"
						icon="el-icon-plus"
						style="margin: 10px 10px"
						type="primary"
						@click="addAttr"
				>
					添加属性
				</el-button>
				<!--  表格组件-->
				<el-table :data="categoryList" border style="width: 100%;margin:0 10px;">
					<el-table-column align="center" label="序号" type="index" width="80" />
					<el-table-column label="属性名称" prop="attrName" width="150" />
					<el-table-column label="属性值列表" prop="">
						<!--<template slot-scope={row,$index}>-->
						<template v-slot={row,$index}>
							<!--  注 row 里面是这一行的所有数据，是一个对象-->
							<el-tag v-for="tag in row.attrValueList" :key="tag.id" type="success" style="margin: 5px 5px">
								{{ tag.valueName }}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" prop="address" width="150">
						<template v-slot={row,$index}>
							<el-button icon="el-icon-edit" size="mini" type="warning" @click="updataAttr(row)"></el-button>
							<el-button icon="el-icon-delete" size="mini" type="danger" @click="deleteAttr(row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<!--添加/修改属性结构-->
			<div v-show="!isShowTable">
				<el-form :inline="true">
					<el-form-item label="属性名">
						<el-input placeholder="请输入属性名" v-model="attrinfo.attrName"></el-input>
					</el-form-item>
				</el-form>
				<el-button
						:disabled="!attrinfo.attrName" type="primary" icon="el-icon-plus" @click="addAttrValue"
				>添加属性值
				</el-button>

				<el-table style="width: 100%;margin: 20px 0" border :data="attrinfo.attrValueList">
					<el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
					<el-table-column prop="name" label="属性值名称" width="width">
						<template v-slot="{row,$index}">
							<el-input
									:ref="$index"
									v-model="row.valueName"
									placeholder="请输入属性值名称"
									size="mini"
									@blur="toLook(row)"
									@keyup.native.enter="toLook(row)"
									v-if="row.flag"
							></el-input>
							<span v-else @click="toEdit(row,$index)" style="display: block;">{{ row.valueName }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="width">
						<template v-slot="{row,$index}">
							<el-popconfirm
									:title="`确定删除${row.valueName}吗？`"
									confirm-button-text="确定"
									cancel-button-text="取消"
									icon="el-icon-info"
									icon-color="red"
									@confirm="deleteAttrValue(row,$index)"
							>
								<el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
				<!-- todo 这里的disabled 需要进行优化，当有新的属性值时才可以保存，如果属性值没变则保存按钮不可操作（我觉得可以通过判断一下length是否变化来决定是否可以保存）-->
				<el-button type="primary" @click="saveAttrInfo" :disabled="attrinfo.attrValueList.length<1">保存</el-button>
				<el-button @click="isShowTable=true">取消</el-button>
			</div>
		</el-card>
	</div>

</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import item from '@/layout/components/Sidebar/Item'

export default {
	name: 'Attr',
	data() {
		return {
			// 保存子组件传过来的id
			categoryId: {},
			categoryList: [],
			// 控制table表格的显示
			isShowTable: true,
			// 用于收集新增属性/修改属性
			attrinfo: {
				attrName: '', // 属性名
				attrValueList: [     // 属性值数组
					// {
					//   attrId: 0,     // 属性的id
					//   valueName: ''    // 属性值
					// }
				],
				categoryId: 0,   // id3
				categoryLevel: 3
			}
		}
	},
	methods: {
		/**
		 * 自定义事件，用于获取id123
		 * @param categoryId
		 */
		getcategoryId(categoryId) {
			// console.log(categoryId)
			this.categoryId = categoryId
			//获取数据
			this.getCategoryList()
		},
		/**
		 * 从服务器获取平台属性
		 * 根据id1 2 3
		 */
		async getCategoryList() {
			//  发送请求，获取页面数据
			let result = await this.$API.attr.getAttrInfo(this.categoryId)
			// console.log(result)
			if (result.code === 200) {
				this.categoryList = result.data
			}
		},
		/**
		 * 添加属性按钮操作
		 */
		addAttr() {
			// 切换table
			this.isShowTable = false
			// 这里需要清空一下attrValueList数组里面的数据
			this.attrinfo.attrName = ''
			this.attrinfo.attrValueList = []
		},
		/**
		 * 修改按钮
		 * 用于去修改某一个属性，进入修改页面
		 */
		updataAttr(row) {
			this.isShowTable = false
			// 将属性值展示到table页面中
			console.log(row)
			// 将选中的属性赋值给attrinfo
			// 由于数据的结构非常复杂，对象里面由数组，数组里面有对象，所以这里需要深拷贝来进行"拷贝赋值操作"，使用lodash的深拷贝方法
			// 这里的深拷贝操作就是为了防止attrList与attrinfo两个对象指向同一个地址
			this.attrinfo = cloneDeep(row)

			// 给所有属性值加上，flag标记
			this.attrinfo.attrValueList.forEach(item => {
				// 注：这里的写法是错误的，后加上去的属性不是响应式的（即数据变化，页面不会发生变化），需要使用$set添加一个响应式的数据
				// item.flag = false
				// 参数1：对象 参数2：要添加的属性名称  参数3：属性的属性值
				this.$set(item, 'flag', false)
			})
		},
		/**
		 * 删除按钮
		 * 删除一行的数据
		 */
		async deleteAttr(row) {
			// console.log(row)
			// try {
			// 	this.$API.attr.deleteAttr(row.id)
			// }
			await this.$API.attr.deleteAttr(row.id).then(() => {
				this.$message({
					type: 'success',
					message: '删除成功'
				})
				//	重新获取页面数据
				this.getCategoryList()
			}).catch(() => {
				this.$message({
					type: 'danger',
					message: '删除失败'
				})
			})
		},
		/**
		 * 添加属性值按钮
		 * 添加属性值,点击一次增加一行的属性值
		 */
		addAttrValue() {
			// 向attrValueList数组里面push元素对象，这个对象不需要自己去赋值，会从table里面双向绑定，然后在将attrinfo发送API请求，这里的id需要服务器自动配置
			// todo 待优化，当属性值为空的时候，不能继续进行添加属性值
			this.attrinfo.attrValueList.push({
				attrId: this.attrinfo.id,
				valueName: '',
				// 添加一个控制input和span属性显示和隐藏的元素，给每个对象添加的好处是可以单独的控制一行的数据
				flag: true
			})
			// todo 这里使用的ref去操作对应的元素，操作的对象是数组的长度-1
			this.$nextTick(() => {
				this.$refs[this.attrinfo.attrValueList.length - 1].focus()
			})
		},
		/**
		 * 失去焦点/按下回车后执行操作
		 */
		toLook(row) {
			// 如果输入的属性值为空，则不能将falg设置为false，需要提示用户进行数据的输入
			if (row.valueName.trim() === '') {
				this.$message('请输入一个正常的属性值')
				row.valueName = ''
				return
			}

			// 如果新增的属性值已经存在，则需要提示错误，并重新赋值
			let isRepeat = this.attrinfo.attrValueList.some(item => {
				if (row != item) {
					return row.valueName == item.valueName
				}
			})
			if (isRepeat) {
				row.valueName = ''
				this.$message('属性值已存在')
				return
			}

			row.flag = false
		},
		/**
		 * 点击span标签后变为编辑模式
		 * 并且实现input框的自动聚焦
		 */
		toEdit(row, index) {
			// 切换为编辑模式input
			row.flag = true
			// 自动聚焦input
			// todo 这里才是我想要的操作ref
			/*
				由于浏览器的重绘重排是会耗费时间的，所以再点击sapn的同时生成一个input是需要时间的，在这个时候我们是无法获取到input上面的属性的
				$nextTick————当节点渲染完毕后会被执行一次
			 */
			this.$nextTick(() => {
				// 获取相应的表单元素，实现聚焦功能
				this.$refs[index].focus()
			})
		},
		/**
		 * 删除选中行的属性值
		 */
		deleteAttrValue(row, index) {
			this.attrinfo.attrValueList.splice(index, 1)
		},
		/**
		 *  table表单的保存按钮
		 *  发送请求，将添加/修改后的属性值发送到服务器中
		 */
		async saveAttrInfo() {
			// todo 这里需要进行优化 ，当所有属性值都被删除的时候，再点击保存按钮则将外面的那个属性行一起删除，然后再去重新渲染页面
			// 发送请求之前整理一下发送的参数、
			// 1、属性值为空的数据不能发送给服务器
			// 2、去掉flag字段
			this.attrinfo.attrValueList = this.attrinfo.attrValueList.filter(item => {
				if (item.valueName != '') {
					// delete 方法，第一次遇见
					delete item.flag
					return true
				}
			})

			// 发送请求
			try {
				await this.$API.attr.reqAddOrUpdateAttr(this.attrinfo)
				this.isShowTable = true
				this.$message({
					type: 'success',
					message: '保存成功'
				})
				//	再次获取页面最新数据
				await this.getCategoryList()
			} catch (err) {
				// this.$message({
				// 	type: 'danger',
				// 	message: err.message
				// })
			}

		}
	}
}
</script>

<style scoped>

</style>
