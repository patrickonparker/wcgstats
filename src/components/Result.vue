<template>
	<q-card
		:style="$q.dark.isActive ? 'border: 1px solid rgba(255,255,255,0.05);' : ''"
		style="text-shadow: 2px 2px 2px black;"
	>
		<q-img
			:src="'https://worldcommunitygrid.org' + projects[result.AppName].image"
		>
			<div class="absolute-full column no-wrap justify-end">
				<a
					class="text-subtitle1 text-white"
					style="text-decoration: none;"
					:href="`https://www.worldcommunitygrid.org/research/${result.AppName}/overview.do`"
					target="_blank"
				>
					{{ projects[result.AppName].name }}
				</a>
				<div
					v-if="result.Outcome === 0 && result.ValidateState === 0"
					class="row align-center q-my-xs"
				>
					<q-icon name="cached" color="info" class="q-mr-xs rotate" />
					<b class="text-info" style="line-height: 1;">In Progress</b>
				</div>
				<div
					v-if="result.Outcome === 1 && result.ValidateState === 1"
					class="row align-center q-my-xs"
				>
					<q-icon name="verified" color="positive" class="q-mr-xs" />
					<b class="text-positive" style="line-height: 1;">Validated</b>
					<q-icon
						name="emoji_events"
						color="positive"
						class="q-mr-xs q-ml-md"
					/>
					<b class="text-positive" style="line-height: 1;">
						{{ Math.round(result.ClaimedCredit) }} Points
					</b>
				</div>
				<div
					v-if="result.Outcome === 1 && result.ValidateState === 0"
					class="row align-center q-my-xs"
				>
					<q-icon name="hourglass_bottom" color="warning" class="q-mr-xs" />
					<b class="text-warning" style="line-height: 1;">Pending Validation</b>
				</div>
				<div
					v-if="result.Outcome === 3 || result.ValidateState === 2"
					class="row align-center q-my-xs"
				>
					<q-icon name="notifications" color="negative" class="q-mr-xs" />
					<b class="text-negative" style="line-height: 1;">Error</b>
				</div>
				<div class="flex justify-between text-caption">
					<div v-if="result.Outcome === 0">
						Due Date: {{ formatDate(result.ReportDeadline) }}
					</div>
					<div v-else>Sent: {{ formatDate(result.SentTime) }}</div>
					<div>Device: {{ result.DeviceName }}</div>
				</div>
			</div>
		</q-img>
	</q-card>
</template>

<script>
	import { date } from "quasar";

	export default {
		name: "Result",
		props: {
			result: {
				type: Object,
			},
		},
		data: () => ({
			projects: {
				arp1: {
					name: "Africa Rainfall Project",
					image: "/images/slideshowImages/large/arp1Big.jpg",
				},
				fahb: {
					name: "FightAIDS@Home",
					image: "/images/slideshowImages/large/fahbBig.jpg",
				},
				hst1: {
					name: "Help Stop TB",
					image: "/images/slideshowImages/large/hst1Big.jpg",
				},
				mcm1: {
					name: "Mapping Cancer Markers",
					image: "/images/slideshowImages/large/mcm1Big.jpg",
				},
				mip1: {
					name: "Microbiome Immunity Project",
					image: "/images/slideshowImages/large/mip1Big.jpg",
				},
				opn1: {
					name: "OpenPandemics - COVID 19",
					image: "/images/slideshowImages/large/opn1Big.jpg",
				},
				scc1: {
					name: "Smash Childhood Cancer",
					image: "/images/slideshowImages/large/scc1Big.jpg",
				},
			},
		}),
		computed: {
			dark() {
				return this.$q.dark.isActive;
			},
		},
		methods: {
			formatDate(input) {
				return date.formatDate(input, "MMMM Do");
			},
		},
	};
</script>

<style>
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}

	.rotate {
		animation: rotate 4s infinite linear;
	}
</style>