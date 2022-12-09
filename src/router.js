import { createRouter, createWebHistory } from "vue-router";

import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import ContactCouch from "./pages/requests/ContactCouch.vue";
import RequestsReceive from "./pages/requests/RequestsReceive.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import NotFound from "./pages/NotFound.vue";
import store from "./store/index.js";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", redirect: "/coaches" },
		{ path: "/coaches", component: CoachesList },
		{
			path: "/coaches/:id",
			props: true,
			component: CoachDetail,
			children: [{ path: "contact", component: ContactCouch }],
		}, // /coaches/c1/contact
		{
			path: "/register",
			component: CoachRegistration,
			meta: { requiresAuth: true },
		},
		{
			path: "/requests",
			component: RequestsReceive,
			meta: { requiresAuth: true },
		},
		{ path: "/auth", component: UserAuth, meta: { RequiresUnauth: true } },
		{ path: "/:notFound(.*)", component: NotFound },
	],
});

router.beforeEach(function (to, _, next) {
	if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next("/auth");
	} else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
		next("/coaches");
	} else {
		next();
	}
});

export default router;
