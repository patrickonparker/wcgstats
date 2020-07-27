<template>
	<q-page style="padding-top: 0; position: relative;">
		<Graph v-if="results.length" :results="results" />
		<div class="q-layout-padding" style="max-width: 1920px; margin: 0 auto;">
			<div v-if="results.length">
				<h1 class="text-h4">Results Available: {{ results.length }}</h1>
				<h2 class="text-h5 q-mb-sm">Devices:</h2>
				<div class="row q-col-gutter-md q-mb-lg">
					<div
						v-for="(device, n) in devices"
						:key="n"
						class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
					>
						<q-card style="background: rgba(0, 100, 157, 0.3);">
							<q-card-section class="row justify-between">
								<span>{{ device[0] }}: </span><span>{{ device[1] }}</span>
							</q-card-section>
						</q-card>
					</div>
				</div>
				<h2 class="text-h5 q-mb-sm">Results:</h2>
				<div class="row q-col-gutter-md">
					<div
						v-for="(result, n) in results"
						:key="n"
						class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
					>
						<Result :result="result" />
					</div>
				</div>
			</div>
			<div v-else class="text-center q-mt-xl">
				<div class="text-h4">No results were found.</div>
				<p>Please check your username and verification code and try again.</p>
			</div>
		</div>
	</q-page>
</template>

<script>
	import Result from "components/Result.vue";
	import Graph from "components/Graph.vue";

	export default {
		name: "PageIndex",
		components: { Result, Graph },
		data: () => ({
			user: "",
			auth: "",
			results: {},
		}),
		methods: {
			async fetchStats() {
				let response = await fetch(
						`.netlify/functions/getStats?user=${this.user}&auth=${this.auth}`
					),
					data = await response.json();
				this.results = data.ResultsStatus.Results;
			},
		},
		mounted() {
			if (localStorage.user && localStorage.auth) {
				this.user = localStorage.user;
				this.auth = localStorage.auth;
				this.fetchStats();
			} else {
				this.$router.push("account");
			}
		},
		computed: {
			devices() {
				let devices = {};

				this.results.forEach((result) => {
					devices[`${result.DeviceName}`] = 0;
				});

				Object.keys(devices).forEach((device) => {
					devices[device] = this.results.filter(
						(result) => result.DeviceName === device
					).length;
				});

				return Object.entries(devices).sort();
			},
		},
	};
</script>
