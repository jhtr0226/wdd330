export function templates(templateId, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(templateId).innerHTML = data;
        })

}

export function initTemplate() {
    document.addEventListener("DOMContentLoaded", () => {
        templates("header", "../templates/header.html");
        templates("footer", "../templates/footer.html");
    })
}