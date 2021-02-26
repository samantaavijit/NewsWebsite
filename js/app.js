console.log("Avijit Samanta");

const apiKey = "b139f36e0d8844b8a77347a536ac3588";
const sources = "bbc-news";

let newsAccordion = document.getElementById("newsAccordion");

const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  `http://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${apiKey}`,
  true
);

xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    let newsHtml = "";

    articles.forEach(function (element, index) {
      // console.log(index,element);
      let content = element["content"];
      if (content === null) {
        content = element["description"];
      }
      let news = `
                <div class="accordion-item">
                <h2 class="accordion-header" id="heading${index}">
                    <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse${index}"
                    aria-expanded="true"
                    aria-controls="collapse${index}"
                    >
                   <b>Breaking News ${index + 1}:</b>- ${element["title"]
      }
                    </button>
                </h2>
                <div
                    id="collapse${index}"
                    class="accordion-collapse collapse"
                    aria-labelledby="heading${index}"
                    data-bs-parent="#newsAccordion"
                >
                    <div class="accordion-body">
                    ${content}. <a href='${
        element["url"]
      }' target="_blank">Read more</a>
                    </div>
                </div>
                </div>`;
      newsHtml += news;
    });
    newsAccordion.innerHTML = newsHtml;
  } else {
    console.log("Eror: ");
  }
};
xhr.send();
