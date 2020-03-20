<template>
	<div class="navigation">
		<div>home</div>
		<div>fag</div>
		<div>about</div>
		<div>contact</div>
	</div>
</template>

<script>

export default {

}
</script>
<style lang="scss" scoped>
.navigation {
	height: 45px;
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	border-bottom: 1px solid #d71514;

	> div {
		margin: 0 1rem;
		height: 100%;
		padding: 0 3rem;
		display: flex;
		align-items: center;
		font-size: 1.2rem;
		font-weight: bold;
		color: #d71514;

		&:hover {
			color: white;
			background-color: #d71514;
		}
	}
}
</style>
