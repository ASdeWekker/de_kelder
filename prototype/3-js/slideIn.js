function slideIn() {
    var elem = document.getElementsByClassName("item--title")[0].nextSibling
    elem.style.display === "none" ? elem.style.display = "block" : elem.style.display = "none"
}

document.getElementsByClassName("item--title")[0].onclick = slideIn
