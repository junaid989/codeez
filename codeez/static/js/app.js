
let currentStep = 0;
let lessonSteps = [];

function loadLessons(topic){
    fetch(`/lesson/css/${topic}`)
    .then(res => res.json())
    .then(data => {
        if(data.content){
            let lesson = JSON.parse(data.content);
            lessonSteps = lesson.steps;
            currentStep = 0;
            loadStep();
        }
    });
}

function loadStep(){
    if(lessonSteps.length === 0) return;
    let step = lessonSteps[currentStep];
    let editor = document.getElementById("code");
    editor.value = step.example + "\n<style>\n" + step.css + "\n</style>";
    updatePreview();
    document.getElementById("explanation").innerText = step.explanation + "\nHint: " + step.hint;
}

function nextStep(){
    if(currentStep < lessonSteps.length - 1){
        currentStep++;
        loadStep();
    }
}

function prevStep(){
    if(currentStep > 0){
        currentStep--;
        loadStep();
    }
}

function updatePreview(){
    let code = document.getElementById("code").value;
    document.getElementById("preview").srcdoc = code;
}

document.getElementById("code").addEventListener("input", updatePreview);
