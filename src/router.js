import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/coach", component: null },
		{ path: "/coach/:id", component: null },
	],
});

export default router;
