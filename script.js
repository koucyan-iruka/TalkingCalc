if (!"speechSynthesis" in window) {
    $("#msg").html(
    "Sorry. Your browser <strong>does not support</strong> speech synthesis."
    );
}

  // Fetch the list of voices and populate the voice options.
function loadVoices() {
        // Fetch the available voices in English US.
        let voices = speechSynthesis.getVoices();
        $("#voice-names").empty();
        voices.forEach(function(voice, i) {
            const $option = $("<option>");
            $option.val(voice.name);
            $option.text(voice.name + " (" + voice.lang + ")");
            $option.prop("selected", voice.name === "Google US English");
            $("#voice-names").append($option);
        }); 
    }

loadVoices();

    window.speechSynthesis.onvoiceschanged = function(e) {
    loadVoices();
    };
    
    const uttr = new SpeechSynthesisUtterance();

    //ここよくわかんない もうねむい ねる よくがんばったおれ！(｀・ω・´) おやすみ
    if ($("#voice-names").val()) {
        uttr.voice = speechSynthesis
            .getVoices()
            .filter(voice => voice.name == $("#voice-names").val())[0];
        }
        speechSynthesis.speak(uttr);
        uttr.onend = function() {
        // hoge
    };

// Calculation scripts
function addToDisplay(value) {
        document.calculator.display.value += value;
        const uttr = new SpeechSynthesisUtterance(value)
        speechSynthesis.speak(uttr)
    }

function clearDisplay() {
        document.calculator.display.value = '';
        const uttr = new SpeechSynthesisUtterance("Clear")
        speechSynthesis.speak(uttr)
    }

function calculate() {
    try {
            document.calculator.display.value = eval(document.calculator.display.value);
            const uttr = new SpeechSynthesisUtterance(document.calculator.display.value)
            speechSynthesis.speak(uttr)
        } 
    catch (error) {
        document.calculator.display.value = 'Error';
        const uttr = new SpeechSynthesisUtterance("Error")
        speechSynthesis.speak(uttr)
    }
}
    
function sqrtcal() {
    display.value = Math.sqrt(display.value);
    const uttr = new SpeechSynthesisUtterance("Clear")
    speechSynthesis.speak(uttr)
} 
    
function cbrtcal(){
    display.value = Math.cbrt(display.value);
}