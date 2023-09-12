<template>
	<main>
		<div class="contact-us">
			<div>
				<h2>Contact Us</h2>
				<h3>Address</h3>
				<p>Kumar Moorthy & Associates
					C 9/9250, <br>Vasant Kunj
					New Delhi 110070, India</p>

				<h3>Telephone</h3>
				<div class="telephone">
					<a target="_blank" rel="noopener noreferrer" href="+91 (11) 41767501">+91 (11) 41767501</a>
					<a target="_blank" rel="noopener noreferrer" href="+91 (11) 40044887">+91 (11) 40044887"</a>
					<a target="_blank" rel="noopener noreferrer" href="+91 (11) 40044888">+91 (11) 40044888</a>
				</div>

				<h3>Email Address</h3>
				<a target="_blank" rel="noopener noreferrer"
					href="mailto:office@kumarmoorthy.com">office@kumarmoorthy.com</a>
			</div>
			<div class="follow-us">
				<h2>Follow Us</h2>

				<a target="_blank" rel="noopener noreferrer"
					href="https://www.instagram.com/kumar.moorthy.architects/">Instagram</a>
				<a target="_blank" rel="noopener noreferrer"
					href="https://www.facebook.com/kumarmoorthyassociates">Facebook</a>
			</div>
		</div>



		<div class="find-us">
			<h2>Find Us</h2>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65284310.40083278!2d-49.62903793001729!3d2.9199994830325933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1c33c65d9c4f%3A0x24ee13ab8bdd67ea!2sKumar%20Moorthy%20%26%20Associates!5e0!3m2!1sen!2suk!4v1694441189630!5m2!1sen!2suk"
				width="450" height="300" style="border:0;" allowfullscreen="" loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"></iframe>
		</div>
	</main>
</template>

<script>
export default {};
</script>

<style scoped>
main {
	background-color: #f1eae2;
	min-height: calc(100vh - 8rem);
	padding-top: 8rem;
	display: flex;
	align-items: center;
	justify-content: center;
}

main>div {
	width: max-content;
	height: 400px;
	display: flex;
	flex-direction: column;
	margin: 1rem;
}

.telephone {
	display: flex;
	flex-direction: column;
}

.contact-us {
	display: flex;
}

.follow-us {
	display: flex;
	margin-top: 1rem;
	flex-direction: column;
}

.follow-us>a {
	color: black;
	text-decoration: none;
}

h2 {
	font-family: "NeueHaas45Bold";
	margin-bottom: 0.5rem;
}

h3 {
	font-family: "NeueHaas45Bold";
	margin-top: 0.5rem;
}

a {
	transition: 0.2s ease all;
	color: black;
	text-decoration: none;
}

a:hover {
	opacity: 0.7;

}

@media screen and (max-width: 790px) {
	main {
		flex-direction: column;
		align-items: flex-start;
	}

	.contact-us {
		display: flex;
		/* flex-direction: row-reverse; */

	}

	iframe {
		width: 93vw;
		height: 400px;
	}

	main>div {
		height: min-content;
	}
}
</style>
