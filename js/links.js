
const linksURL = "data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data.lessons);
}
getLinks();

function displayLinks(lessons) {
    const linksList = document.querySelector('.my-list');

    lessons.forEach(lesson => {
        const lessonNum = lesson.lesson;
        const links = lesson.links;

        const lessonListNum = document.createElement('li');
        lessonListNum.textContent = lessonNum + ": ";

        const linksSpan = document.createElement('span');

        links.forEach((link, index) => {
            const linkA = document.createElement('a');
            linkA.href = link.url;
            linkA.textContent = link.title;

            linksSpan.appendChild(linkA);

            if (index < links.length - 1) {
                const separator = document.createTextNode(' | ');
                linksSpan.appendChild(separator);
            }
        });

        lessonListNum.appendChild(linksSpan);
        linksList.appendChild(lessonListNum);
    });
}

