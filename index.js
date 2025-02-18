class Post {
    constructor(title, imageSrc, body) {
        this.title = title;
        this.imageSrc = "./assets/landscape-placeholder.svg";
        this.body = body;
    }
}

let posts = [];

for (let i = 0; i < 10; i++) {
    posts.push(new Post("Example Title", "", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ipsum dolor, bibendum porttitor sem quis, viverra laoreet ipsum. Cras eu lacus ac eros consectetur dapibus. Morbi aliquam maximus augue vitae imperdiet. Suspendisse efficitur egestas ipsum, quis tristique magna iaculis ut. Quisque viverra condimentum felis consequat lobortis."));
}

