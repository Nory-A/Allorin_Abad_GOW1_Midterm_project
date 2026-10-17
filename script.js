document.addEventListener("DOMContentLoaded", () => {
    const wordInput = document.getElementById("wordInput");
    const searchButton = document.getElementById("searchButton");
    const result = document.getElementById("result");

    function updateSearchButtonState() {
        const hasText = (wordInput.value.trim().length > 0);
        searchButton.style.opacity = hasText ? "1" : "0.6";
        searchButton.style.cursor = hasText ? "pointer" : "not-allowed";
    }

    wordInput.addEventListener("input", updateSearchButtonState);

    searchButton.addEventListener("click", () => {
        if (!wordInput.value.trim()) {
            result.innerHTML = "<p>Please enter a word before searching.</p>";
            return;
        }
        searchWord();
    });

    wordInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && wordInput.value.trim()) {
            searchWord();
        }
    });

    updateSearchButtonState();
});

function clean(text) {
    return String(text || "")
        .replace(/\{bc\}/g, ": ")
        .replace(/\{[^}]*\}/g, "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function getExamples(entry, limit = 3) {
    const examples = [];
    try {
        for (const sseq of entry.def || []) {
            for (const sense of sseq.sseq || []) {
                for (const item of sense) {
                    const dt = item[1]?.dt || [];
                    for (const part of dt) {
                        if (part[0] === "vis") {
                            for (const v of part[1]) examples.push(clean(v.t));
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.warn("Could not parse examples", e);
    }
    return examples.slice(0, limit);
}

function getAudioUrl(entry) {
    const audio = entry.hwi?.prs?.[0]?.sound?.audio;
    if (!audio) return null;

    let folder;
    if (audio.startsWith("bix")) folder = "bix";
    else if (audio.startsWith("gg")) folder = "gg";
    else if (/^[0-9_\W]/.test(audio)) folder = "number";
    else folder = audio[0];

    return `https://media.merriam-webster.com/audio/prons/en/us/mp3/${folder}/${audio}.mp3`;
}

function playAudio(url) {
    new Audio(url).play();
}

async function searchWord() {
    const word = document.getElementById("wordInput").value.trim();
    const result = document.getElementById("result");

    if (word === "") {
        result.innerHTML = "<p>Please enter a word, you sent an empty search.</p>";
        return;
    }

    result.innerHTML = "<p>Searching...</br>Please wait while we find the definition.</p>";

    try {
        const response = await fetch(`/api/define/${encodeURIComponent(word)}`);
        const data = await response.json();

        if (!response.ok || data.error) {
            result.innerHTML = `<p>Error (${response.status}): ${clean(data.error || "unknown")}</p>`;
            return;
        }

        if (data.length === 0 || typeof data[0] === "string") {
            result.innerHTML = `
                <h3>Word not found. Try searching a different word.</h3>
                ${data.length ? `<p class="suggestions">Suggestions: ${data.map(clean).join(", ")}</p>` : ""}
            `;
            return;
        }

        let entries = data.filter(
            (e) => e.shortdef?.length &&
                   e.meta?.id?.split(":")[0].toLowerCase() === word.toLowerCase()
        );
        if (entries.length === 0) entries = data.filter((e) => e.shortdef?.length);

        const html = entries.map((entry, i) => {
            const name = clean((entry.hwi?.hw || word).replace(/\*/g, ""));
            const pos = clean(entry.fl || "");
            const pron = clean(entry.hwi?.prs?.[0]?.mw || "");
            const audioUrl = getAudioUrl(entry);
            const examples = getExamples(entry);

            return `
                <div class="entry">
                    ${entries.length > 1 ? `<div class="entry-count">${i + 1} of ${entries.length}</div>` : ""}
                    <div class="entry-head">
                        <h2>${name}</h2>
                        ${pos ? `<span class="pos">${pos}</span>` : ""}
                    </div>
                    ${pron ? `
                        <div class="pron">
                            ${audioUrl ? `<button class="audio-btn" onclick="playAudio('${audioUrl}')"><i class="bi bi-volume-up"></i></button>` : ""}
                            <span>\\${pron}\\</span>
                        </div>` : ""}
                    <ol class="defs">
                        ${entry.shortdef.map((d) => `<li>${clean(d)}</li>`).join("")}
                    </ol>
                    ${examples.length ? `
                        <div class="examples">
                            <h4>Examples of ${name}:</h4>
                            ${examples.map((ex, i) => `<p>${i + 1}. ${ex}</p>`).join("")}
                        </div>` : ""}
                    <a class="more" target="_blank" href="https://www.merriam-webster.com/dictionary/${encodeURIComponent(word)}">
                        See full entry
                    </a>
                </div>
            `;
        }).join("");

        result.innerHTML = html;
    } catch (error) {
        console.error(error);
        result.innerHTML = `<p>Network error: ${clean(error.message)}</p>`;
    }
}