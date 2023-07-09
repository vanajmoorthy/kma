<template>
	<!-- <nav>
		<ul>
			<li>
				<NuxtLink to="/">Home</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/projects">Projects</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/about">About</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/awards">Awards</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/contact">Contact</NuxtLink>
			</li>
		</ul>
	</nav> -->
	<nav :class="{ navexpand: isMenuOpen }">
		<div id="home">
			<h1>KM&A</h1>
			<div class="hamburger" v-on="{ click: toggleMenu }" :class="{ open: isMenuOpen }">
				<div id="line1"></div>
				<div id="line2"></div>
			</div>
		</div>
		<div id="nav-links" :class="{ expand: isMenuOpen }">
			<NuxtLink class="nav-link link" to="/">Home</NuxtLink>
			<NuxtLink class="nav-link link" to="/projects">Projects</NuxtLink>
			<NuxtLink class="nav-link link" to="/about">About</NuxtLink>
			<NuxtLink class="nav-link link" to="/awards">Awards</NuxtLink>
			<NuxtLink class="nav-link link" to="/contact">Contact</NuxtLink>

		</div>
	</nav>
</template>


<script>
export default {
	data() {
		return {
			isMenuOpen: false,
		};
	},
	methods: {
		toggleMenu: function () {
			this.isMenuOpen = !this.isMenuOpen;
		},
	},

	watch: {
		$route() {
			this.isMenuOpen = false;
		},
	},
};
</script>
<style scoped>
nav {
	position: fixed;
	display: flex;
	width: 100%;
	z-index: 2;
	justify-content: center;
	padding: 2rem 0rem;
	background: linear-gradient(rgba(0, 0, 0, 0.8) 0%,
			rgba(0, 0, 0, 0.7) 10%,
			rgba(0, 0, 0, 0.65) 15%,
			rgba(0, 0, 0, 0.6) 20%,
			rgba(0, 0, 0, 0.55) 25%,

			rgba(0, 0, 0, 0.5) 30%,
			rgba(0, 0, 0, 0.45) 35%,

			rgba(0, 0, 0, 0.4) 40%,
			rgba(0, 0, 0, 0.35) 45%,

			rgba(0, 0, 0, 0.3) 50%,
			rgba(0, 0, 0, 0.25) 55%,
			rgba(0, 0, 0, 0.2) 60%,
			rgba(0, 0, 0, 0.15) 65%,
			rgba(0, 0, 0, 0.09) 72%,

			rgba(0, 0, 0, 0.06) 80%,
			rgba(0, 0, 0, 0) 100%);

	/* backdrop-filter: blur(2px); */
	color: white;
	transition: 0.2s ease background-color;
}

ul {
	list-style-type: none;
	display: flex;
	align-items: center;
}


.navexpand {
	background-color: black;
}

#nav-links>a {
	text-decoration: none;
	margin: 1rem;
	color: white;
	text-transform: uppercase;
	position: relative;
	font-family: "NeueHaas45";
	letter-spacing: 1px;
	text-decoration: none;
	margin-left: 1rem;

}

#nav-links>a::before {
	content: "";
	position: absolute;
	display: block;
	width: 100%;
	height: 1px;
	bottom: 0;
	left: 0;
	background-color: #fff;
	transform: scaleX(0);
	transition: transform 0.15s ease;
}

#nav-links>a:hover::before {
	transform: scaleX(1);
}

#home {
	padding: 2rem 2rem 0 2rem;
	display: none;
}

#gastro {
	color: white;
	background-color: #0050fd;
	padding: 0.4rem 0.5rem;
	border: none;
	border-radius: 5px;
	max-width: min-content;
}

.home-link {
	font-size: 1.3rem;
	font-weight: 600;
}

.nav-link {
	margin-left: 1rem;
}

.nav-link,
.home-link {
	color: white;
	text-decoration: none;
	transition: 0.2s ease all;
}

.hamburger {
	height: 15px;
	width: 30px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	transition: 0.2s ease all;
	display: none;
}

.open #line1 {
	transform: translateY(6.5px) rotate(45deg);
}

.open #line2 {
	transform: translateY(-6.5px) rotate(-45deg);
}

.hamburger:hover {
	cursor: pointer;
	opacity: 0.6;
}

#line1,
#line2 {
	height: 2px;
	width: 100%;
	background-color: white;
	transition: 0.2s ease all;
}

.expand {
	overflow: visible;
	max-height: 300px !important;
	margin-top: 1rem;
	/* background-color: rgb(233 233 233); */
	padding: 0rem 1rem !important;
}

#nav-links {
	transition: 0.6s ease all;
}

.nav-link.router-link-active {
	text-decoration: underline;
}

@media screen and (max-width: 650px) {
	nav {
		padding-top: 1rem;
		/* background-color: black; */
		flex-direction: column;

	}


	#nav-links {
		display: flex;
		flex-direction: column;
		padding: 0rem 1rem !important;

	}

	.home-link {
		margin-left: 0rem;
	}

	.nav-link {
		margin-left: 0rem;
		margin-bottom: 0.5rem;
	}

	#nav-links>a {
		width: min-content;
	}

	#home {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* display: none; */
	}

	.hamburger {
		display: inline-flex;
	}

	#nav-links {
		overflow: hidden;
		max-height: 0px;
		/* margin-top: -3rem; */
	}
}
</style>
