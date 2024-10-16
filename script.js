// Check if the browser supports speech synthesis
if (!"speechSynthesis" in window) {
    $("#msg").html(
        "Sorry. Your browser <strong>does not support</strong> speech synthesis."
    );
}

//Translations

const operationName = {
    "+": {
        "en": "plus",       // 英語
        "de": "plus",       // ドイツ語
        "es": "más",        // スペイン語
        "fr": "plus",       // フランス語
        "hi": "जोड़",       // ヒンディー語
        "id": "tambah",     // インドネシア語
        "it": "più",        // イタリア語
        "ja": "たす",       // 日本語
        "ko": "더하기",     // 韓国語
        "nl": "plus",       // オランダ語
        "pl": "plus",       // ポーランド語
        "pt": "mais",       // ポルトガル語
        "ru": "плюс",       // ロシア語
        "zh": "加"          // 中国語
    },
    "-": {
        "en": "minus",
        "de": "minus",
        "es": "menos",
        "fr": "moins",
        "hi": "घटाना",
        "id": "kurang",
        "it": "meno",
        "ja": "ひく",
        "ko": "빼기",
        "nl": "min",
        "pl": "minus",
        "pt": "menos",
        "ru": "минус",
        "zh": "减"
        },
        "*": {
            "en": "times",
            "de": "mal",
            "es": "por",
            "fr": "fois",
            "hi": "गुणा",
            "id": "kali",
            "it": "moltiplicato",
            "ja": "かける",
            "ko": "곱하기",
            "nl": "keer",
            "pl": "razy",
            "pt": "vezes",
            "ru": "умножить",
            "zh": "乘以"
        },
        "/": {
            "en": "divided by",
            "de": "geteilt durch",
            "es": "dividido por",
            "fr": "divisé par",
            "hi": "विभाजित",
            "id": "dibagi",
            "it": "diviso per",
            "ja": "わる",
            "ko": "나누기",
            "nl": "gedeeld door",
            "pl": "podzielone przez",
            "pt": "dividido por",
            "ru": "делить на",
            "zh": "除以"
        },
        "**": {
            "en": "to the power of",
            "de": "hoch",
            "es": "a la potencia de",
            "fr": "à la puissance de",
            "hi": "घात",
            "id": "pangkat",
            "it": "alla potenza di",
            "ja": "累乗",
            "ko": "제곱",
            "nl": "tot de macht van",
            "pl": "do potęgi",
            "pt": "elevado a",
            "ru": "в степени",
            "zh": "次方"
        },
        "=": {
            "en": "equals",
            "de": "gleich",
            "es": "es igual a",
            "fr": "égal",
            "hi": "बराबर",
            "id": "sama dengan",
            "it": "uguale",
            "ja": "イコール",
            "ko": "같다",
            "nl": "gelijk aan",
            "pl": "równa się",
            "pt": "igual a",
            "ru": "равно",
            "zh": "等于"
        },
        "√": {
            "en": "square root",
            "de": "Quadratwurzel",
            "es": "raíz cuadrada",
            "fr": "racine carrée",
            "hi": "वर्गमूल",
            "id": "akar kuadrat",
            "it": "radice quadrata",
            "ja": "平方根",
            "ko": "제곱근",
            "nl": "vierkantswortel",
            "pl": "pierwiastek kwadratowy",
            "pt": "raiz quadrada",
            "ru": "квадратный корень",
            "zh": "平方根"
        },
        "³√": {
            "en": "cube root",
            "de": "Kubikwurzel",
            "es": "raíz cúbica",
            "fr": "racine cubique",
            "hi": "घनमूल",
            "id": "akar kubik",
            "it": "radice cubica",
            "ja": "立方根",
            "ko": "세제곱근",
            "nl": "derdemachtswortel",
            "pl": "pierwiastek sześcienny",
            "pt": "raiz cúbica",
            "ru": "кубический корень",
            "zh": "立方根"
        },
        "C": {
        "en": "clear",
        "de": "löschen",
        "es": "borrar",
        "fr": "effacer",
        "hi": "साफ",
        "id": "hapus",
        "it": "cancella",
        "ja": "クリア",
        "ko": "지우기",
        "nl": "wissen",
        "pl": "wyczyść",
        "pt": "limpar",
        "ru": "очистить",
        "zh": "归零"
    },
    "Error": {
        "en": "Error",
        "de": "Fehler",
        "es": "Error",
        "fr": "Erreur",
        "hi": "त्रुटि",
        "id": "Kesalahan",
        "it": "Errore",
        "ja": "エラー",
        "ko": "오류",
        "nl": "Fout",
        "pl": "Błąd",
        "pt": "Erro",
        "ru": "Ошибка",
        "zh": "错误"
    }
}
    //もっと良い方法はなかったのだろうか
    //コードが長くなってるのはおれのせいじゃねーぞ!
    //ちなみにこうやって日本語でコメント残すとたまに文字化けする
    //<(｀^´)>

        let currentLang = "en";
        let error = 0;

// 音声リストの表示を更新する（音声のロード）
function loadVoices() {
    const voiceSelect = document.getElementById("voice-names");
    voiceSelect.innerHTML = '';  // リストをクリア

    const voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
        const option = document.createElement("option");
        option.value = voice.name;
        option.id = SpeechSynthesisVoice.lang;
        option.text = `${voice.name} (${voice.lang})`;  // 名前と言語コードを表示
        voiceSelect.appendChild(option);
    });
}

function getSelectedVoiceLang() {
    const selectedVoiceName = document.getElementById("voice-names").value;  // 選択された音声の名前
    const voices = speechSynthesis.getVoices();  // 音声リストを取得

    // 選択された音声を検索し、その音声の言語コード (lang) を取得
    const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);

    if (selectedVoice) {
        return selectedVoice.lang;  // 言語コードを返す
sz      } else {
        return null;  // 選択された音声が見つからない場合
    }
}

function changeLanguage() {
    currentLang = getSelectedVoiceLang().substring(0,2);
    currentLang = currentLang.toString();
}


    function speak(text) {
        changeLanguage();
        const uttr = new SpeechSynthesisUtterance(text);
            uttr.lang = getSelectedVoiceLang();
            console.log(currentLang);

        const selectedVoice = document.getElementById("voice-names").value;
        if (selectedVoice) {
            uttr.voice = speechSynthesis.getVoices().filter(voice => voice.name == selectedVoice)[0];
        }
        
        uttr.rate = document.getElementById("rate").value; // スピードの調整
        speechSynthesis.speak(uttr);
    }
    
    
    
    // 表示に値を追加し、演算子もその言語で読み上げる
    function addToDisplay(value) {
        changeLanguage();
        if (error == 1){
            document.calculator.display.value = '';
            error = 0;
        }
        if (operationName[value]) {
            // 演算子の場合は、言語に応じた読み上げを行う
            speak(operationName[value][currentLang]);
        } else {
            // 通常の数字や記号はそのまま読み上げ
            speak(value);
        }
        document.calculator.display.value += value;
    }

// クリア機能と読み上げ
function clearDisplay() {
    speechSynthesis.cancel();
    document.calculator.display.value = '';
    speak(operationName["C"][currentLang], currentLang); // クリアの読み上げ
}

function gotError() {
    error = '1';
    document.calculator.display.value = operationName["Error"][currentLang], currentLang;
    changeLanguage();
    speak(operationName["Error"][currentLang], currentLang);
}

// 計算結果を表示し、読み上げる
function calculate() {
    speak(operationName["="][currentLang], currentLang);
    try {
        const result = eval(document.calculator.display.value);
        document.calculator.display.value = result;
        speak(result, currentLang);  // 計算結果を読み上げる
    } catch (error) {
        gotError();
    }
}

// 平方根の計算
function sqrtcal() {
    const value = document.calculator.display.value;
    if (value) {
        const result = Math.sqrt(value);
        document.calculator.display.value = result;
        speak(operationName["√"][currentLang] + " is " + result, currentLang);  // 平方根の結果を読み上げ
    } else {
        gotError();
    }
}

// 立方根の計算
function cbrtcal() {
    const value = document.calculator.display.value;
    if (value) {
        const result = Math.cbrt(value);
        document.calculator.display.value = result;
        speak(operationName["³√"][currentLang] + " is " + result, currentLang);  // 立方根の結果を読み上げ
    } else {
        gotError();
    }
}



// ページロード時に音声リストを読み込む
window.speechSynthesis.onvoiceschanged = loadVoices;

//たかが電卓だなんておもってた自分が間違いでした。( ;∀;)
//電卓作るのにまさか8時間もかかるとは
//もうねむいよ... でもまだデバッグおわらねー あーくそ @10/16/2024 11:23PM
//おわったぞーー！！！ よくがんばったぞおれ！ えらいえらい！ おやすみ。 @10/17/2024 12:16AM