export default {
	requests(state, _, _2, rootGeters) {
		const coachId = rootGeters.userId;
		console.log(state.requests);
		return state.requests.filter((req) => req.coachId === coachId);
	},
	hasRequests(_, getters) {
		return getters.requests && getters.requests.length > 0;
	},
};
