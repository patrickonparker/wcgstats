<template>
	<q-page style="padding-top: 0; position: relative;">
		<Graph v-if="filtered.length" :results="filtered" />
		<div class="q-layout-padding" style="max-width: 1920px; margin: 0 auto;">
			<div v-if="results.length">
				<h1 class="text-h4">{{ results.length }} Results Available</h1>
				<h2 class="text-h5 q-mb-sm">Devices</h2>
				<div class="row q-col-gutter-md q-mb-lg">
					<div
						v-for="(device, n) in devices"
						:key="n"
						class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
					>
						<q-card
							@click="setFilter(device[0])"
							:class="['device', filter == device[0] ? 'active' : '']"
						>
							<q-card-section class="row justify-between">
								<span>{{ device[0] }} </span>
								<span>{{ device[1] }} ({{ devicePercent(device[1]) }}%)</span>
							</q-card-section>
						</q-card>
					</div>
				</div>
				<div class="row justify-between items-end q-mb-sm">
					<h2 class="text-h5 q-mb-none">Results</h2>
					<q-toggle
						v-model="sort"
						color="secondary"
						label="Sort By Status"
						left-label
						id="status-toggle"
					/>
				</div>
				<div v-if="!sort" class="row q-col-gutter-md">
					<div
						v-for="(result, n) in filtered"
						:key="n"
						class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
					>
						<Result :result="result" />
					</div>
				</div>
				<div v-else>
					<div
						v-for="(set, n) in [
							['In Progress', progress, true],
							['Pending Validation', pending, false],
							['Validated', validated, false],
							['Error', error, false],
						]"
						:key="n"
					>
						<q-expansion-item
							expand-separator
							:label="`${set[0]} (${set[1].length})`"
							:default-opened="set[2]"
							class="result-category"
						>
							<div class="row q-col-gutter-md">
								<div
									v-for="(result, n) in set[1]"
									:key="n"
									class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
								>
									<Result :result="result" />
								</div>
							</div>
						</q-expansion-item>
					</div>
				</div>
			</div>
			<div v-else class="text-center q-mt-xl">
				<h2>Loading Results</h2>
				<q-linear-progress
					stripe
					rounded
					indeterminate
					color="secondary"
					style="max-width: 50%; margin: 0 auto;"
				/>
				<br />
				<br />
				<p>
					If you keep seeing this, check your username and verification code and
					try again.
				</p>
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
			filter: "",
			sort: true,
			available: undefined,
		}),
		methods: {
			fetchStats() {
				let results = [];

				const getResults = async () => {
					let response = await fetch(
							`.netlify/functions/getStats?user=${this.user}&auth=${this.auth}&offset=0`
						),
						data = await response.json();
					data.ResultsStatus.Results.forEach((result) => results.push(result));
					this.available = data.ResultsStatus.ResultsAvailable;
					getMoreResults();
				};
				getResults();

				const getMoreResults = async () => {
					if (this.available > 250) {
						let available = this.available < 1000 ? this.available : 1000;
						let totalRounds = Math.ceil(available / 250);

						for (var i = 1; i < totalRounds; i++) {
							let response = await fetch(
									`.netlify/functions/getStats?user=${this.user}&auth=${this.auth}&offset=${i}`
								),
								data = await response.json();
							data.ResultsStatus.Results.forEach((result) =>
								results.push(result)
							);
						}
					}
				};
				getMoreResults();

				this.results = results;
			},
			devicePercent(input) {
				return Math.round((input / this.results.length) * 100);
			},
			setFilter(filter) {
				this.filter === filter ? (this.filter = "") : (this.filter = filter);
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
			filtered() {
				if (this.filter && String(this.devices).includes(this.filter)) {
					return this.results.filter(
						(result) => result.DeviceName === this.filter
					);
				} else {
					return this.results;
				}
			},
			progress() {
				return this.filtered.filter(
					(result) => result.Outcome === 0 && result.ValidateState === 0
				);
			},
			pending() {
				return this.filtered.filter(
					(result) => result.Outcome === 1 && result.ValidateState === 0
				);
			},
			validated() {
				return this.filtered.filter(
					(result) => result.Outcome === 1 && result.ValidateState === 1
				);
			},
			error() {
				return this.filtered.filter(
					(result) => result.Outcome === 3 && result.ValidateState === 2
				);
			},
		},
	};
</script>

<style>
	.device {
		cursor: pointer;
	}

	.desktop .device:hover {
		background: rgba(0, 100, 157, 0.15);
	}

	.device.active {
		background: rgba(0, 100, 157, 0.3);
	}

	#status-toggle {
		position: relative;
		top: 7px;
		right: -10px;
	}

	.result-category .q-item {
		padding-left: 0;
		padding-right: 0;
		font-size: 1.2rem;
	}
</style>