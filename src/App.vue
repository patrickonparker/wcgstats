<template>
	<div id="q-app" :class="$q.platform.is.desktop ? 'desktop' : 'mobile'">
		<router-view />
	</div>
</template>
<script>
	export default {
		name: "App",
	};
</script>
