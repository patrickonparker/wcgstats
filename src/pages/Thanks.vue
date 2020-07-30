<template>
	<q-page padding class="text-center">
		<div style="max-width: 600px; margin: 0 auto;">
			<h1 class="text-h4">
				Thanks, I got your message and will try to respond shortly. Taking you
				back to your results in...
			</h1>
			<div class="text-h1">{{ timeout > 0 ? timeout : "0" }}</div>
			<q-img src="~/assets/envelope.svg" />
		</div>
	</q-page>
</template>

<script>
	export default {
		name: "Thanks",
		data: () => ({ timeout: 5 }),
		mounted() {
			setInterval(() => {
				// if (this.timeout === 0) this.$router.push("/");
				this.timeout--;
			}, 1000);
		},
	};
</script>