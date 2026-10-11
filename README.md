## Group Name: 
- A.A Team
 
## Members: 
- Allorin, Mae Kyla 
- Abad, Norynne

# **API DESCRIPTION**

**Meriam Webster API**
    Merriam-Webster's Collegiate® Dictionary with Audio

## **API Product Description**
America's most trusted dictionary, now more comprehensive than ever.

Access Merriam-Webster's flagship dictionary, featuring more than 250,000 authoritative definitions, 
111,000 audio pronunciations, and over 3,500 idioms and phrases. Entries for the top 500 most frequently 
looked-up words (including culture, humility, sycophant) have been enhanced and expanded. Expert usage 
guidance includes 113,000 examples of words used in context, usage labels (for example, slang, 
informal, chiefly British), and 130 usage paragraphs.

Recently added new words and meanings include boba, cold brew, farm-to-table, heat dome, furikake, virtualization.

## Data features available in this reference
- Definitions
- Examples
- Etymologies
- Synonym and Usage paragraphs
- Pronunciation symbols
- Audio pronunciations
- Illustrations
- Spelling suggestions

Link: https://dictionaryapi.com/products/api-collegiate-dictionary 

# **APP FEATURES**
index.html
- Home
- About Us
- Our Team
- Open dictionary button | for accessing the app.html 

app.html 
- Search box | for input search word
- Find Meaning button 

# **MANUAL** 
## **How to run the Dictionary Web Application**

**I. Install Node.js (if not downloaded)**
- node -v (To check if Node.js is installed, open your terminal and run)

**II. Check your .env**
please ensure that this exist 

**API_KEY=your-merriam-webster-key**

1. Replace your-merriam-webster-key with your Merriam-Webster API key.
2. If you do not have an API key, you may use the key provided for this project:

- if .env doesn't exist create
**API_KEY=your-merriam-webster-key**

- or use my key if none
**Key (Dictionary): 4bc54b76-6f88-4764-823d-d5cc0a51fcf7** but this is supposed to be secret but if you do not have api key use this as a back-up

**III. Install the packages**
- Open your terminal.
- Navigate to the folder containing your project files.
- Run the following commands:

    npm init -y
    npm install express dotenv

**IV. Start the server on terminal**
- node server.js

- you would see... 
    Running at http://localhost:3000

It's better to let the server fetch the data so:
1. The API key stays in .env on the server. The browser never sees it.
2. The browser only talks to our own server (/api/define/word) as the server talks to Merriam-Webster for us.

The tradeoff: the app won't load any data if this server is not running.
- that us why always start it with "node server.js" and open http://localhost:3000

- we made it like this so the API key won't be exposed

**V. Stop the server by pressing Ctrl + C in the terminal.**
if you want to run it again try start 

- node server.js

# **Other Infos**
## **Merriam-Webster Collegiate Dictionary API**

**https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.API_KEY}**

- Explanation:
1. https://www.dictionaryapi.com/api/v3/references/collegiate/json/ – The API endpoint for retrieving entries from the Merriam-Webster Collegiate Dictionary in JSON format.
2. ${word} – The word being searched by the user.
3. ?key= – The query parameter used to provide the API key.
4. ${process.env.API_KEY} – Retrieves the API key from the server's environment variables, typically stored in the .env file.

- Example:
If the searched word is love, the request URL follows this pattern:
- https://www.dictionaryapi.com/api/v3/references/collegiate/json/love?key=YOUR_API_KEY

### How It Works 

1. The user enters a word in the dictionary application.
2. The server builds the API request URL using the searched word and API key.
3. The server sends a request to Merriam-Webster.
4. The API returns dictionary data in JSON format.
5. The application processes the response and displays the available definitions and other information.

Security note: Keep process.env.API_KEY on the server. you should not expose the actual API key in JavaScript or commit your .env file to GitHub.

##  **Meriam Audio Pronunciation URL**
The Dictionary Web Application uses the Merriam-Webster audio URL format to retrieve and play word pronunciations.

An audio reference URL should be in the following form:
**https://media.merriam-webster.com/audio/prons/[language_code]/[country_code]/[format]/[subdirectory]/[base filename].[format]**

- on script.js
return `https://media.merriam-webster.com/audio/prons/en/us/mp3/${folder}/${audio}.mp3`;

**Explanation:**

1. https://media.merriam-webster.com/audio/prons/ – The base URL for Merriam-Webster pronunciation audio.
2. en – means English.
3. us – The country code for American English.
4. mp3 – The audio format.
5. ${folder} – The subdirectory where the audio file is located.
6. ${audio} – The base filename of the audio file.
7. .mp3 – The file extension.

## **Merriam-Webster Dictionary Link**

**"https://www.merriam-webster.com/dictionary/${encodeURIComponent(word)}"**

- https://www.merriam-webster.com/dictionary/ – The base URL for the Merriam-Webster online dictionary.
- ${encodeURIComponent(word)} – Encodes the searched word so it can be safely included in a URL, 
including words containing spaces or special characters.

- Example:

If the value of word is love, the generated URL becomes:
- https://www.merriam-webster.com/dictionary/love

This link allows users to open the corresponding Merriam-Webster dictionary page for a word. 
The code creates the URL; it does not automatically open the page.

# Some Functions Used in Our Dictionary Web App

## 1. `clean(text)`

### Code Implementation

```javascript
function clean(text) {
    return String(text || "")
        .replace(/\{bc\}/g, ": ")
        .replace(/\{[^}]*\}/g, "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
```

### Purpose

Cleans the text received from the Merriam-Webster Dictionary API before displaying it in our dictionary web application.

### Explanation

- `String(text || "")` — Converts the value into text. If it is missing or empty, it uses an empty string.
- `.replace(/\{bc\}/g, ": ")` — Replaces `{bc}` with a colon and a space.
- `.replace(/\{[^}]*\}/g, "")` — Removes special codes inside curly brackets.
- `.replace(/&/g, "&amp;")` — Converts ampersands (`&`) into a safe HTML representation.
- `.replace(/</g, "&lt;")` — Converts the less-than symbol (`<`) into a safe HTML representation.
- `.replace(/>/g, "&gt;")` — Converts the greater-than symbol (`>`) into a safe HTML representation.

### Examples

| Original API Text | Cleaned Text |
|---|---|
| `{bc}superior to (as in rank, quality, or degree)` | `: superior to (as in rank, quality, or degree)` |
| `A sergeant is {wi}above{/wi} a corporal.` | `A sergeant is above a corporal.` |
| `{wi}above{/wi} suspicion` | `above suspicion` |
| `not {wi}above{/wi} taking undue credit` | `not above taking undue credit` |

**Result:** The function removes special formatting codes and handles certain HTML characters so the text can be displayed more safely in our dictionary web application.

## 2. `getExamples(entry, limit = 2)`

### Purpose
Gets example sentences from the Merriam-Webster Dictionary API. By default, it returns only the first two examples, even if the API provides more.

### Code Implementation

```javascript
function getExamples(entry, limit = 2) {
    const examples = [];

    try {
        for (const sseq of entry.def || []) {
            for (const sense of sseq.sseq || []) {
                for (const item of sense) {
                    const dt = item[1]?.dt || [];

                    for (const part of dt) {
                        if (part[0] === "vis") {
                            for (const v of part[1]) {
                                examples.push(clean(v.t));
                            }
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
```

### Example from the Merriam-Webster API

The API uses `"vis"` (verbal illustrations) to identify example sentences.

The following are four example sentences returned in the API data:

| No. | Original API example |
|---|---|
| 1 | `A sergeant is {wi}above{/wi} a corporal.` |
| 2 | `{wi}above{/wi} suspicion` |
| 3 | `puts his child's needs {wi}above{/wi} his own needs` |
| 4 | `not {wi}above{/wi} taking undue credit` |

### How It Works

1. The function loops through the API data to find entries marked `"vis"`.
2. `clean(v.t)` removes special formatting codes from each sentence.
3. `examples.push()` adds each cleaned sentence to the list.
4. `examples.slice(0, limit)` returns only the first two examples by default.

### Expected Output

```javascript
[
    "A sergeant is above a corporal.",
    "above suspicion"
]
```

**Result:** Although the API provides four example sentences, the function returns only the first two because `limit` is set to `2`.

## 3. `getAudioUrl(entry)`

### Code Implementation

```javascript
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
```

### Purpose

its purpose is to get the audio URL for the pronunciation of a word from the Merriam-Webster Dictionary API.

### Explanation

- `entry.hwi?.prs?.[0]?.sound?.audio` — Gets the audio filename from the API data.
- `if (!audio) return null` — Returns `null` if no audio filename is available.
- `let folder` — Creates a variable to store the audio folder name.
- `audio.startsWith("bix")` — Checks if the filename starts with `bix`.
- `audio.startsWith("gg")` — Checks if the filename starts with `gg`.
- `/^[0-9_\W]/.test(audio)` — Checks whether the filename starts with a number, underscore, or non-word character.
- `folder = audio[0]` — Uses the first character of the filename as the folder name.
- `return` — Builds and returns the complete audio URL.

### Example

Suppose the API returns this audio filename:

```javascript
audio = "above0001";
```

The filename starts with `a`, so the function selects the `a` folder.

**Generated URL:**

```text
https://media.merriam-webster.com/audio/prons/en/us/mp3/a/above0001.mp3
```

**Result:** The function returns the URL where the pronunciation audio can be accessed.

---

## 4. `playAudio(url)`

### Code Implementation

```javascript
function playAudio(url) {
    new Audio(url).play();
}
```

### Purpose

Plays the pronunciation audio when the user clicks the speaker button in the dictionary web application.

### Explanation

- `function playAudio(url)` — Defines a function that receives the audio URL.
- `new Audio(url)` — Creates an audio object using the provided URL.
- `.play()` — Starts playing the audio.

### Example

```javascript
playAudio("https://example.com/audio/above.mp3");
```

When this function is called with a valid audio URL, the browser attempts to play the pronunciation.

**Result:** Users can listen to how a word is pronounced by clicking the speaker button.

## 5. `searchWord()`

### Code Implementation

```javascript
async function searchWord() {
    const word = document.getElementById("wordInput").value.trim();
    const result = document.getElementById("result");

    if (word === "") {
        result.innerHTML = "<p>Please enter a word, you sent an empty search.</p>";
        return;
    }

    result.innerHTML = "<p>Searching...</p><p>Please wait while we find the definition.</p>";

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
                            <h4>Examples of ${name}</h4>
                            ${examples.map((ex) => `<p>${ex}</p>`).join("")}
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
```

### Purpose

Searches for a word through the dictionary API and displays its definition, pronunciation, example sentences, and other information on the website.

### Explanation

- `async function searchWord()` — Defines an asynchronous function that can wait for data.
- `document.getElementById("wordInput").value.trim()` — Gets the word entered by the user and removes extra spaces at the beginning and end.
- `document.getElementById("result")` — Finds the HTML element where the results will appear.
- `if (word === "")` — Checks whether the user entered a word. If the input is empty, it displays a message.
- `result.innerHTML` — Updates the content displayed on the website.
- `try...catch` — Handles errors that may occur during the search.
- `fetch()` — Sends a request to the server to retrieve dictionary data.
- `await response.json()` — Waits for the response and converts it into JavaScript data.
- `response.ok || data.error` — The condition checks whether the response was unsuccessful or contains an error.
- `data.length === 0` — Checks whether the API returned no results.
- `data.filter()` — Selects dictionary entries that match the searched word and have definitions.
- `getAudioUrl(entry)` — Gets the pronunciation audio URL.
- `getExamples(entry)` — Gets example sentences.
- `entries.map()` — Builds the HTML for each dictionary entry.
- `join("")` — Combines the generated HTML into one string.
- `catch (error)` — Displays a network error message if the request fails.

### Example

Suppose the user searches for:

```text
above
```

The function requests the definition from the server and displays the available information.

**Expected result:**

- **Word:** above
- **Part of speech:** Preposition or another available word class
- **Pronunciation:** Available pronunciation information
- **Definitions:** Meanings of the word
- **Examples:** Example sentences from the API
- **Speaker button:** Plays the pronunciation when audio is available
- **See full entry:** Opens the Merriam-Webster dictionary page

If the user searches without entering a word, the website displays a message asking them to enter one.

If the word cannot be found, the website displays a message and any available spelling suggestions.

### Result

The `searchWord()` function is the main function of our dictionary web application. It handles the search process, retrieves dictionary data, manages errors, and displays the results to the user.