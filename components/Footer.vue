<template>
    <footer id="footer">
        <div class="col1">
            <p id="copyright">© Kumar Moorthy & Associates 2026</p>
            <a target="_blank" rel="noopener noreferrer"
                href="https://www.instagram.com/kumar.moorthy.architects/">Instagram</a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/kumarmoorthyassociates">Facebook</a>
            <a target="_blank" rel="noopener noreferrer" href="mailto:office@kumarmoorthy.com">Email</a>

        </div>
        <div class="col2">
            <p>C-9, 9250,</p>
            <p>Vasant Kunj,</p>
            <p>New Delhi,</p>
            <p>India.</p>

        </div>

    </footer>
</template>

<script></script>

<style scoped>
#copyright {
    font-family: "NeueHaas45Bold";
    margin-bottom: 1rem;
}

.col1 {
    display: flex;
    flex-direction: column;
}

a {
    text-decoration: none;
    color: white;
    display: inline-block;
    min-height: 44px;
    min-width: 44px;
    padding: 0.5rem 0;
}

footer {
    background-color: #383838;
    /* height: 500px; */
    scroll-snap-stop: always;
    scroll-snap-align: start;
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    color: white;
    font-size: 1rem;
    align-items: center;
}
</style>
