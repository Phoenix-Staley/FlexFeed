fetch("/api/user/session").then((res) => {
    res.json().then((session) => {
        const dynamicBtns = document.getElementById("right-header");
        const homeTitle = document.getElementById("homeTitle");

        if (session.logged_in) {
            if (!homeTitle) {
                dynamicBtns.innerHTML = '<a href="./postForum.html" class="px-4">Post</a>';
            } else {
                dynamicBtns.innerHTML = '<a href="./pages/postForum.html" class="px-4">Post</a>';
            }
        }
        else {
            dynamicBtns.innerHTML = '<a class="button is-info mr-2" href="/pages/postForum.html" style="margin-top: -5px;">Post</a><button class="button is-danger" style="margin-top: -5px;">Logout</button>'
        }
    });
});
