const isLoggedIn = false;

if (isLoggedIn) {
    const dynamicBtns = document.getElementById("right-header");
    const homeTitle = document.getElementById("homeTitle");

    if (!homeTitle) {
        dynamicBtns.innerHTML = ```
        <a href="./homepage.html" class="px-4">Post</a>
        ```
    } else {
        dynamicBtns.innerHTML = ```
        <a href="./pages/homepage.html" class="px-4">Post</a>
        ```
    }
}