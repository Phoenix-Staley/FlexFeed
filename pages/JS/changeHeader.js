const isLoggedIn = true;

console.log("ChangeHeader.js loading...");

if (isLoggedIn) {
    console.log("Changing...");
    const dynamicBtns = document.getElementById("right-header");
    const homeTitle = document.getElementById("homeTitle");

    if (!homeTitle) {
        dynamicBtns.innerHTML = '<a href="./postForum.html" class="px-4">Post</a>';
    } else {
        dynamicBtns.innerHTML = '<a href="./pages/postForum.html" class="px-4">Post</a>';
    }
} else {
    console.log("Not logged in");
}