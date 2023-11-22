<template>
	<div>
		<card></card>
		<Sale></Sale>
		<observe></observe>
	</div>
</template>

<script>
import card from '@/views/dashboard/Card'
import Sale from '@/views/dashboard/Sale/Sale'
import observe from '@/views/dashboard/Observe'

export default {
	name: 'Dashboard',
	components: { card, Sale, observe }
}
</script>

<style lang="scss" scoped>
.dashboard {
	&-container {
		margin: 30px;
	}

	&-text {
		font-size: 30px;
		line-height: 46px;
	}
}
</style>
