<template>
	<div class="graph">
		<div v-for="(day, n) in days.last5" :key="n" class="value">
			<div class="bar" :style="`height: ${(day[1].count / days.max) * 100}%`" />
			<div
				class="bar valid"
				:style="`height: ${(day[1].valid / days.max) * 100}%`"
			/>
			<div class="lt-md">
				<div class="text-subtitle-1">
					<b>{{ day[1].count }}</b>
				</div>
				<div class="text-caption" style="line-height: 1;">
					{{ shortDate(day[0]) }}
				</div>
			</div>
			<div class="gt-sm subtitle-1">
				{{ formatDate(day[0]) }}: <b>{{ day[1].count }}</b>
			</div>
		</div>
	</div>
</template>

<script>
	import { date } from "quasar";

	export default {
		name: "Graph",
		props: {
			results: {
				type: Array,
			},
		},
		computed: {
			days() {
				let days = {};
				this.results.forEach((result) => {
					let day = result.SentTime.split("T")[0];
					days[`${day}`] = {};
					days[`${day}`].count = 0;
					days[`${day}`].valid = 0;
				});
				this.results.forEach((result) => {
					let day = result.SentTime.split("T")[0];
					days[`${day}`].count++;
					if (result.ValidateState === 1) days[`${day}`].valid++;
				});
				days = Object.entries(days).reverse();
				days = days.slice(1).slice(-7);
				let maxVals = [];
				days.forEach((val) => {
					maxVals.push(val[1].count);
				});
				console.log(maxVals);
				let max = Math.max(...maxVals);
				console.log(max);
				return {
					last5: days,
					max: max,
				};
			},
		},
		methods: {
			formatDate(input) {
				return date.formatDate(input, "MMM Do");
			},
			shortDate(input) {
				return date.formatDate(input, "M/D");
			},
		},
	};
</script>

<style>
	.graph {
		background: rgba(0, 100, 157, 0.3);
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		overflow: hidden;
		display: flex;
		text-shadow: 1px 1px 1px black;
		text-align: center;
	}

	.value {
		flex-grow: 1;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		position: relative;
		padding: 0.5rem 0;
	}

	.value:not(:last-of-type) {
		border-right: 1px solid rgba(255, 255, 255, 0.05);
	}

	.value div {
		position: relative;
	}

	.value .bar {
		position: absolute;
		bottom: 0;
		width: 100%;
		background: var(--q-color-secondary);
		opacity: 0.66;
	}

	.value .bar.valid {
		background: var(--q-color-positive);
		opacity: 0.5;
	}
</style>