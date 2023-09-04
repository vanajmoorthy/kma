<template>
	<div class="container" :class="{ 'is-loaded': loaded }">
		<div id="title-holder">
			<div id="spacer">g</div>
			<div id="control">
				<h1>KM&A</h1>
				<img class="down-arrow" src="@/assets/down.png" alt="down arrow" @click="scrollToNextSection" />
			</div>
			<div id="project-name">
				<transition name="fade">
					<h3 key="projectName">{{ currentProject }} <img class="right-arrow" src="@/assets/forward.png"
							alt="View project" /> </h3>
				</transition>
			</div>
		</div>
		<div class="project1" ref="section1"></div>
		<div class="about" ref="section2">
			<div>
				<p>
					Established in 1990, Kumar Moorthy & Associates is an award
					winning partnership firm of architects and interior
					designers based in Delhi. In the three decades since
					inception we have undertaken and successfully completed a
					wide range of design works in the diverse fields of
					residential design and interiors, institutional and hotel
					design, commercial and office spaces and interiors. The
					clients for the above include notable industrial groups,
					private limited companies, charitable and non government
					organisations, government agencies and public figures other
					than private individuals.

					<br />
					<br />
					<span class="hide2">
						The firm has been honoured to receive awards in various
						categories under the prestigious The I.I.A National Awards for Excellence
						2018, J.K. Architect of the Year
						Awards in 1995 and 1997, and the Indian Institute of
						Interior Designers - MK Award 2004 & 2006, Best Office
						Architecture India - Asia Pacific Property Awards
						Architecture 2018.
					</span>
				</p>
				<p class="hide">
					We have executed projects in the diverse locations of Delhi
					N.C.R including Noida, Gurgaon, Manesar & Bawal as also in
					other diverse locations in India, ranging from Tier-2 cities to hill and rural locales.
					<br /><br />
					Notable projects by the firm span a diverse spectrum
					of concept, philosophy and materials and include an building
					in the Indo Saracenic heritage campus of a 125 year old
					public school in Indore and a low cost building using &
					exemplifying alternative technology for a rehabilitation
					centre in West Delhi for an NGO for disabled persons to an award winning corporate office building
					embodying environmental concerns, a
					factory for a large Indo-Scandanavian lighting brand in
					Bawal, Haryana other than other corporate office buildings &
					interiors in Indore, Gurgaon and NOIDA and a number of
					significant residential projects including farmhouses.
				</p>
			</div>
		</div>
		<div class="project2" ref="section3"></div>
		<div class="project3" ref="section4"></div>
		<div class="project4" ref="section5"></div>
		<div id="spacer2"></div>

		<Footer ref="section6" id="footer"></Footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loaded: false,
			currentSection: 0,
			projectNames: ['Magnolia Home', 'Read more', 'G Residence', 'Farmhouse', 'Creative Office', 'Footer'],
			currentProject: 'Courtyard Home',
			sections: []
		};
	},
	methods: {
		updateSectionOnScroll() {
			for (let i = 0; i < this.sections.length; i++) {
				const section = this.sections[i];
				const rect = section.getBoundingClientRect();

				if (rect.top <= window.innerHeight * 0.25 && rect.bottom > window.innerHeight * 0.75) {
					if (this.currentSection !== i) {
						this.currentSection = i;
						this.currentProject = this.projectNames[i];
					}
					break;
				}
			}
		},


		updateTitleHolderOpacity() {
			const footerComponent = this.$refs.section6;
			const footerElement = footerComponent.$el;  // Get root DOM element of the component
			const rect = footerElement.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
			const distanceFromBottom = viewportHeight - rect.top;

			const fadeStart = 100;
			const fadeEnd = 0;

			let opacity;
			if (distanceFromBottom < fadeStart) {
				opacity = 1;
			} else if (distanceFromBottom > fadeEnd) {
				opacity = 0;
			} else {
				opacity = (fadeEnd - distanceFromBottom) / (fadeEnd - fadeStart);
			}

			document.querySelector("#title-holder").style.opacity = opacity;
			console.log("updated")
		},
		scrollToNextSection() {
			this.currentSection++;

			const sections = ["section1", "section2", "section3", "section4", "section5", "section6"];

			// check if we're at the end of the sections, if so, reset to 0


			// scroll to the section
			this.$refs[sections[this.currentSection]].scrollIntoView({
				behavior: "smooth",
			});
		},
	},
	mounted() {
		document.documentElement.classList.add("index-page");
		this.$nextTick(() => {
			window.addEventListener("scroll", this.updateTitleHolderOpacity);

			// Get references to the sections
			this.sections = ["section1", "section2", "section3", "section4", "section5", "section6"].map(section => {
				return this.$refs[section];
			});

			setTimeout(() => {
				window.scrollTo(0, 0);
				this.loaded = true;
			}, 0);
		});
		window.addEventListener("scroll", this.updateSectionOnScroll); // Add this line
	},
	beforeUnmount() {
		document.documentElement.classList.remove("index-page");
		window.removeEventListener("scroll", this.updateTitleHolderOpacity);
	},
};
</script>

<style>
.index-page {
	scroll-snap-type: y mandatory !important;
}
</style>

<style scoped>
#footer {
	position: relative;
	/* top: -7rem; */
	/* margin-bottom: -7rem; */
}

#title-holder {
	position: sticky;
	display: flex;
	/* height: 0px; */
	justify-content: space-between;
	top: calc(100vh - 6rem);
	z-index: 1;
	transition: 0.2s ease opacity;
	margin-bottom: 2rem;
}

.container {
	opacity: 0;
	transition: 0.2s ease opacity;
	/* overflow-x: hidden; */
}

.is-loaded {
	opacity: 1 !important;
}

#spacer2 {
	position: relative;
	margin-top: -7rem;
}

#control {
	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: center;
}

.down-arrow {
	width: 2.5rem;
	height: 2.5rem;
	margin: 0 auto;
	/* margin-top: 1rem; */
	transition: 0.2s ease all;
}

#control:hover {
	cursor: pointer;
}

#control:hover .down-arrow {
	transform: translateY(6px);

}

#control>h1 {
	color: white;
	font-size: 2rem;
}

@media screen and (max-width: 650px) {
	#control>h1 {
		opacity: 0;
	}
}

#project-name,
#spacer {
	min-width: 200px;
	/* margin: 0 1rem; */
}

.right-arrow {
	padding-right: 1rem;
}

#spacer {
	opacity: 0;
}

#project-name {
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
}

.right-arrow {
	height: 25px;
	width: 30px;
	margin-left: 0.2rem;
}

#project-name>h3 {
	color: white;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	/* padding-right: 2rem; */
	position: relative;
	top: -7.5px;
}

#read-more {
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	height: 4rem;
}

#read-more>a {
	text-decoration: none;
	color: white;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
}

.project1 {
	background: no-repeat url("@/assets/hero1.jpg");
}

.project2 {
	background: no-repeat url("@/assets/m-residence.jpeg");
}

.project3 {
	background: no-repeat url("@/assets/hero3.jpg");
}

.project4 {
	background: no-repeat url("@/assets/hero4.jpg");
}

.project1,
.project2,
.project3,
.project4 {
	position: relative;
	top: -7rem;
	z-index: -1;
	/* background-color: black; */
	/* width: 100vw; */
	height: calc(100vh);
	overflow: hidden;
	/* object-fit: contain; */
	background-size: cover;
	scroll-snap-stop: always;
	scroll-snap-align: start;
}

.about {
	height: 100vh;
	background-color: #b79775;
	color: white;
	position: relative;
	top: -7rem;
	scroll-snap-stop: always;
	scroll-snap-align: start;
	display: flex;
	justify-content: center;
	align-items: center;
	/* padding: 0 10rem; */
}

.about>div {
	display: flex;
	/* max-width: 400px; */
	padding: 1rem;
}

.about>div>p {
	font-size: 1.1rem;
	/* line-height: 2rem; */
	max-width: 450px;
	margin: 2rem;
	text-align: justify;
}

@media screen and (max-width: 898px) {
	.about>div>p {
		font-size: 1rem;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: 0.5s ease opacity;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

@media screen and (max-width:780px) {
	.about>div>p {
		/* margin: 1rem; */
	}

	.about,
	.project1,
	.project2,
	.project3,
	.project4 {
		/* top: -3.65rem */
	}

	#title-holder {
		/* top: calc(100vh - 7rem); */
	}
}

@media screen and (max-width:680px) {
	.about>div>p {
		/* margin: 1rem; */
	}

	.about>div {
		/* padding-left: 0rem;
		padding-right: 0rem; */
	}

	.about,
	.project1,
	.project2,
	.project3,
	.project4 {
		/* top: -3.65rem */
	}

	#title-holder {
		/* top: calc(100vh - 7rem); */
	}

	.about>div {
		flex-direction: column;
		/* margin-bottom: 1rem; */
	}

	.hide {
		display: none;
	}
}

@media screen and (max-width:510px) {

	#spacer,
	#project-name {
		min-width: 0px;
	}

	#spacer,
	#project-name {
		width: 39%;
	}


	#project-name {
		margin: 0;
		margin-top: 1.3rem;
	}

	#project-name>h3 {
		font-size: 1.0rem;
	}

	.hide {
		display: none;
	}

	.right-arrow {
		height: 20px;
		width: 23px;
		margin-left: 0.1rem;
	}


}

@media screen and (max-width:420px) {
	.about>div>p {
		margin: 1rem;
	}

	.hide2 {
		display: none;
	}
}
</style>
