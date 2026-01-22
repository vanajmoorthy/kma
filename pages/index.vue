  <template>
	<div class="container" :class="{ 'is-loaded': loaded }">
		<h1 class="seo-only">Kumar Moorthy & Associates - Award Winning Architects and Interior Designers in Delhi</h1>
		<div id="title-holder">
			<div id="spacer">g</div>
			<div id="control">
				<h1>K M & A</h1>
				<img class="down-arrow" src="@/assets/down.png" alt="down arrow" @click="scrollToNextSection" />
			</div>
			<div id="project-name">
				<transition name="fade">
					<NuxtLink class="page-link" :to="currentLink">
						<h3 key="projectName">{{ currentProject }}</h3>
						<img class="right-arrow" src="@/assets/forward.png" alt="View project" />
					</NuxtLink>
				</transition>
			</div>
		</div>
		<div class="project1" ref="section1"></div>
		<div class="about" ref="section2">
			<h1>Kumar Moorthy and Associates</h1>
			<h2>Architects and Interior Designers</h2>
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

    <div class="project-aravali" ref="aravaliSection"></div>
		<div class="project2" ref="section3"></div>
		<div class="project3" ref="section4"></div>
		<div class="project4" ref="section5"></div>
		<div id="spacer2"></div>

		<Footer ref="section6" id="footer"></Footer>
	</div>
</template>

<script setup>
const config = useRuntimeConfig()

useSeoMeta({
	title: 'Kumar Moorthy & Associates | Award Winning Architects & Interior Designers in Delhi',
	ogTitle: 'Kumar Moorthy & Associates | Award Winning Architects & Interior Designers in Delhi',
	description: 'Kumar Moorthy & Associates (also known as Kumar Moorthy and Associates or KM&A) is an award winning partnership firm of architects and interior designers based in Delhi. Established in 1990, specializing in residential design, commercial spaces, institutional and hotel design.',
	ogDescription: 'Kumar Moorthy & Associates (also known as Kumar Moorthy and Associates or KM&A) is an award winning partnership firm of architects and interior designers based in Delhi. Established in 1990, specializing in residential design, commercial spaces, institutional and hotel design.',
	ogImage: `${config.public.siteUrl}/assets/logo.png`,
	ogUrl: config.public.siteUrl,
	ogType: 'website',
	ogSiteName: 'Kumar Moorthy & Associates',
	twitterCard: 'summary_large_image',
	twitterTitle: 'Kumar Moorthy & Associates | Award Winning Architects & Interior Designers in Delhi',
	twitterDescription: 'Award winning partnership firm of architects and interior designers based in Delhi. Established in 1990.',
	twitterImage: `${config.public.siteUrl}/assets/logo.png`,
	keywords: 'Kumar Moorthy & Associates, Kumar Moorthy and Associates, KM&A, architects Delhi, interior designers Delhi, architecture firm Delhi, award winning architects, residential architects, commercial architects, architectural design India, Delhi NCR architects',
})

useHead({
	link: [
		{ rel: 'canonical', href: config.public.siteUrl },
	],
})
</script>


<script>
export default {
	data() {
		return {
			loaded: false,
			currentSection: 0,
			projectNames: ['Corporate Office - Creative Travels', 'Read more', 'Aravali Expanse', 'House of Courtyards', 'House of Frames', 'Atrium Home', 'Footer'],
			currentProject: 'Corporate Office - Creative Travels',
			currentLink: 'creative',
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
						if (this.currentProject == "Corporate Office - Creative Travels") {
							this.currentLink = "creative";
						} else if (this.currentProject == "Read more") {
							this.currentLink = "about";

            } else if (this.currentProject == "Aravali Expanse") {
              this.currentLink = "aravali-expanse"
            }else if (this.currentProject == "House of Courtyards") {
							this.currentLink = "gfarmhousee";
						} else if (this.currentProject == "House of Frames") {
							this.currentLink = "m-residence-2-gurgaon";
						} else if (this.currentProject == "Atrium Home") {
							this.currentLink = "k-residence-2";
						}
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
		},

    scrollToNextSection() {
        this.currentSection++;

        const sectionRefNames = ["section1", "section2", "aravaliSection", "section3", "section4", "section5", "section6"];

        // Check if we're at the end of the sections, if so, reset to 0 (cycling behavior)
        if (this.currentSection >= sectionRefNames.length) {
            this.currentSection = 0;
        }

        // Update currentProject and currentLink immediately when arrow is clicked
        this.currentProject = this.projectNames[this.currentSection];
        if (this.currentProject == "Corporate Office - Creative Travels") {
            this.currentLink = "creative";
        } else if (this.currentProject == "Read more") {
            this.currentLink = "about";
        } else if (this.currentProject == "Aravali Expanse") {
            this.currentLink = "aravali-expanse";
        } else if (this.currentProject == "House of Courtyards") {
            this.currentLink = "gfarmhousee";
        } else if (this.currentProject == "House of Frames") {
            this.currentLink = "m-residence-2-gurgaon";
        } else if (this.currentProject == "Atrium Home") {
            this.currentLink = "k-residence-2";
        } else if (this.currentProject == "Footer") {
            // Handle link for Footer. For example, set to a non-navigable value or a specific anchor/route.
            // If NuxtLink's :to is undefined or null, it might render as a span.
            // If you want it to go nowhere, you might set this.currentLink = "#" or similar.
            // For now, let's clear it or set to a placeholder to avoid linking to previous project.
            this.currentLink = ""; // Or handle as appropriate for your application
        }

        const targetRefName = sectionRefNames[this.currentSection];
        const refValue = this.$refs[targetRefName];

        if (refValue) {
            // Ensure we're calling scrollIntoView on a DOM element
            const elementToScroll = refValue.$el || refValue;
            elementToScroll.scrollIntoView({
                behavior: "smooth",
            });
        } else {
            console.error(`Ref "${targetRefName}" not found for scrolling.`);
        }
    },
	},
  mounted() {
    document.documentElement.classList.add("index-page");
    this.$nextTick(() => {
        window.addEventListener("scroll", this.updateTitleHolderOpacity);

        // Get references to the sections
        const sectionRefKeys = ["section1", "section2", "aravaliSection", "section3", "section4", "section5", "section6"];
        this.sections = sectionRefKeys.map(key => {
            const refItem = this.$refs[key];
            if (refItem) {
                // If refItem is a component instance (e.g., Footer), refItem.$el is its root DOM element.
                // If refItem is already a DOM element, refItem.$el will be undefined, so we use refItem itself.
                return refItem.$el || refItem;
            } else {
                // This case should ideally not happen if all refs are correctly defined in the template
                // and are not conditionally rendered out.
                console.warn(`Section with ref key "${key}" was not found. This might lead to errors.`);
                return null; // Or handle this more robustly
            }
        }).filter(Boolean); // Filter out any nulls if refs were missing, though this might change array length and affect indexing if not all refs are found.
                           // Assuming all refs are present, .filter(Boolean) won't change the array if all are found.

        // Optional: Add a check if the number of sections matches projectNames to avoid indexing issues.
        if (this.sections.length !== this.projectNames.length) {
            console.warn('Mismatch between the number of resolved section elements and project names. This may cause issues.');
        }

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
.seo-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;
}

#footer {
	position: relative;
	z-index: 5;
	/* top: -7rem; */
	/* margin-bottom: -7rem; */
}

.about>h1 {
	font-family: "NeueHaas45Bold";
	margin-bottom: 0.5rem;
	text-align: center;

}

.about>h2 {
	font-style: italic;
	font-family: "NeueHaas45";
	font-size: 1.2rem;
	/* font-weight: 100; */
	text-align: center;

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

@media screen and (max-width: 560px) {
	.page-link>h3 {
		font-size: 1.2rem !important;
	}
}

@media screen and (max-width: 480px) {
	#title-holder {
		top: calc(100vh - 9rem);
	}
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

	.project1 {
		background: no-repeat url("@/assets/creative-mobile.png") !important;
		background-size: cover !important;
	}

	.project2 {
		background: no-repeat url("@/assets/courtyards-mobile.png") !important;
		background-size: cover !important;
	}

	.project3 {
		background: no-repeat url("@/assets/frames-mobile.png") !important;
		background-size: cover !important;
	}

	.project4 {
		background: no-repeat url("@/assets/atrium-mobile.png") !important;
		background-size: cover !important;
	}

	.project-aravali {
		background: no-repeat url("@/assets/aravali-expanse-mobile.jpg") !important;
		background-size: cover !important;
	}
}

#project-name,
#spacer {
	min-width: 241px;
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
	width: 241px;
	transition: 0.2s ease all;
}

.right-arrow {
	transition: 0.2s ease all;
}

#project-name:hover .right-arrow {
	transform: translateX(5px);
}

#project-name:hover {
	opacity: 0.8;
}

.page-link {
	text-decoration: none;
	color: white;
	display: flex;
	align-items: center;
}

.page-link>h3 {
	display: flex;
	align-items: center;
	font-size: 1.5rem;
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
	background: no-repeat url("@/assets/creative.jpg");
}

.project2 {
	background: no-repeat url("@/assets/courtyards.jpg");
}

.project3 {
	background: no-repeat url("@/assets/frames.jpg");
}

.project4 {
	background: no-repeat url("@/assets/atrium.jpg");
}

.project-aravali {
	background: no-repeat url("@/assets/aravali-expanse.jpg"); /* Add your image */
}

.project1,
.project2,
.project3,
.project4,
.project-aravali {
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
	flex-direction: column;
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
	margin: 1rem 2rem 2rem 2rem;
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
	.project4,
  .project-aravali {
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

	.page-link>h3 {
		width: min-content;
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
 
