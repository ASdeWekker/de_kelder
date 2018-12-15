var instructionsCount = 2

document.getElementsByClassName("button-instructions-add")[0].addEventListener("click", addStepInstructions(instructionsCount))

function addStepInstructions(count) {
    var oldStep = "instructions-" + count
    instructionsCount++
    var newStep = "instructions-" + count
    var sibling = document.getElementsByClassName(oldStep)[0]
    var input = "<div class='form--input-wrap " + newStep + "'>\
        <input class='form--input-wrap--input' placeholder='.' id='" + newStep + "'>\
        <label class='form--input-wrap--label' for='" + newStep + "'>- Stap " + count + "</label>\
    </div>"
    sibling.insertAdjacentHTML("afterend", input)
}

document.getElementsByClassName("button-instructions-delete")[0].onclick = removeStepInstructions

function removeStepInstructions() {
    var instructions = "instructions-" + instructionsCount
    var step = document.getElementsByClassName(instructions)[0]
    if (instructionsCount == 1) {
        alert("Beter niet deze weghalen pik")
    } else {
        step.remove()
        instructionsCount--
    }
}
