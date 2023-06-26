<template>
	<nav>
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
	</nav>
</template>

<script></script>

<style scoped>
nav {
	position: fixed;
	display: flex;
	width: 100%;
	z-index: 2;
	justify-content: center;
	padding: 2rem;
	background-image: linear-gradient(to bottom,
			rgba(0, 0, 0, 0.6),
			rgba(0, 0, 0, 0.55),
			rgba(0, 0, 0, 0.5),
			rgba(0, 0, 0, 0.45),
			rgba(0, 0, 0, 0.4),
			rgba(0, 0, 0, 0.35),
			rgba(0, 0, 0, 0.3),
			rgba(0, 0, 0, 0.25),
			rgba(0, 0, 0, 0.2),
			rgba(0, 0, 0, 0.15),
			rgba(0, 0, 0, 0.1),
			rgba(0, 0, 0, 0.09),
			rgba(0, 0, 0, 0.08),
			rgba(0, 0, 0, 0.07),
			rgba(0, 0, 0, 0.06),
			rgba(0, 0, 0, 0.05),
			rgba(0, 0, 0, 0.04),
			rgba(0, 0, 0, 0.03),
			rgba(0, 0, 0, 0.02),
			rgba(0, 0, 0, 0.01),
			rgba(0, 0, 0, 0));
	/* backdrop-filter: blur(2px); */
	color: white;
}

ul {
	list-style-type: none;
	display: flex;
	align-items: center;
}

ul>li>a {
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

ul>li>a::before {
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

ul>li>a:hover::before {
	transform: scaleX(1);
}
</style>
