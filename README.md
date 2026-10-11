## Group Name: 
- A.A Team
 
## Members: 
- Allorin, Mae Kyla 
- Abad, Norynne

# API DESCRIPTION

## Merriam-Webster API

**Merriam-Webster's Collegiate® Dictionary with Audio**

### API Product Description

America's most trusted dictionary, now more comprehensive than ever.

The Merriam-Webster Collegiate Dictionary API provides access to more than 250,000 authoritative definitions, 111,000 audio pronunciations, and over 3,500 idioms and phrases. It also includes enhanced entries for frequently searched words, examples of words used in context, usage labels, and usage paragraphs.

Recently added words and meanings include *boba, cold brew, farm-to-table, heat dome, furikake,* and *virtualization*.

### Data Features Available

- Definitions
- Examples
- Etymologies
- Synonyms and usage paragraphs
- Pronunciation symbols
- Audio pronunciations
- Illustrations
- Spelling suggestions

**Official API Documentation:**  
https://dictionaryapi.com/products/api-collegiate-dictionary

---

# APP FEATURES

## 1. `index.html` — Main Website

The main page introduces the Dictionary Web Application and provides information about the project.

- **Home** — Displays the main landing page.
- **About Us** — Provides information about the application.
- **Our Team** — Introduces the team members behind the project.
- **Open Dictionary Button** — Navigates to `app.html`, where users can access the dictionary application.

## 2. `app.html` — Dictionary Application

The dictionary page allows users to search for words and view their meanings.

- **Search Box** — Allows users to enter the word they want to search for.
- **Find Meaning Button** — Sends the search request and displays the available dictionary information for the entered word.

# MANUAL

## How to Run the Dictionary Web Application

### I. Install Node.js

If Node.js is not installed on your computer, download it from the official website:

https://nodejs.org/

To check if Node.js is already installed, open your terminal and run:

```bash
node -v
```

If a version number appears, Node.js is installed.

### II. Configure the `.env` File

Make sure that a `.env` file exists in the root folder of your project, alongside `server.js`.

Add the following line to the `.env` file:

```env
API_KEY=your-merriam-webster-key
```

Replace `your-merriam-webster-key` with your own Merriam-Webster Collegiate Dictionary API key.

If you do not have an API key, obtain one from Merriam-Webster's API website:

https://dictionaryapi.com/

**Important:** Do not share your actual API key or upload your `.env` file to GitHub. Make sure `.env` is included in your `.gitignore` file.

### III. Install the Required Packages

1. Open your terminal.
2. Navigate to the folder containing your project files.
3. Run the following commands:

```bash
npm init -y
npm install express dotenv
```

If your project already has a `package.json` file, you can skip `npm init -y` and run:

```bash
npm install
```

### IV. Start the Server

In your terminal, run:

```bash
node server.js
```

If the server starts successfully, you should see a message similar to:

```text
Running at http://localhost:3000
```

Open the following address in your browser to use the Dictionary Web Application:

http://localhost:3000

**Why does the server need to be running?**

The application uses a backend server to communicate with the Merriam-Webster API.

1. The API key is stored in the server's `.env` file.
2. The browser sends requests to the application's own endpoint, `/api/define/word`.
3. The server uses the API key to request dictionary data from Merriam-Webster.
4. The server returns the data to the browser, where the application displays the results.

This setup helps protect the API key from being exposed in frontend JavaScript. However, the server must be running for dictionary searches to work.

### V. Stop or Restart the Server

To stop the server, press:

```text
Ctrl + C
```

To run the application again, navigate to the project folder and execute:

```bash
node server.js
```

Then open http://localhost:3000 in your browser.

---

# Other Information

## 1. Merriam-Webster Collegiate Dictionary API

The application uses the Merriam-Webster Collegiate Dictionary API to retrieve word definitions and related information.

**API endpoint format:**

```text
https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.API_KEY}
```

### Explanation

1. `https://www.dictionaryapi.com/api/v3/references/collegiate/json/` – The API endpoint for retrieving dictionary entries in JSON format.
2. `${word}` – The word searched for by the user.
3. `?key=` – The query parameter used to provide the API key.
4. `${process.env.API_KEY}` – Retrieves the API key from the server's environment variables, usually stored in the `.env` file.

**Example:**

If the user searches for `love`, the request follows this pattern:

```text
https://www.dictionaryapi.com/api/v3/references/collegiate/json/love?key=YOUR_API_KEY
```

Replace `YOUR_API_KEY` with a valid API key when making a real request.

### How It Works

1. The user enters a word in the dictionary application.
2. The server builds the API request URL using the searched word and API key.
3. The server sends a request to Merriam-Webster.
4. The API returns dictionary data in JSON format.
5. The application processes the response and displays the available definitions and other information.

**Security note:** Keep `process.env.API_KEY` on the server. Never expose the actual API key in frontend JavaScript or commit your `.env` file to GitHub.

## 2. Merriam-Webster Audio Pronunciation URL

The application uses Merriam-Webster's audio URL format to retrieve and play word pronunciations.

**Audio URL format:**

```text
https://media.merriam-webster.com/audio/prons/en/us/mp3/${folder}/${audio}.mp3
```

In `script.js`, the URL is generated using:

```javascript
return `https://media.merriam-webster.com/audio/prons/en/us/mp3/${folder}/${audio}.mp3`;
```

### Explanation

1. `https://media.merriam-webster.com/audio/prons/` – The base URL for pronunciation audio files.
2. `en` – The language code for English.
3. `us` – The country code for American English.
4. `mp3` – The audio format.
5. `${folder}` – The subdirectory containing the audio file.
6. `${audio}` – The audio filename provided by the API.
7. `.mp3` – The file extension.

The application uses the audio information returned by the API to construct the pronunciation URL. If an audio file is available, the user can click the speaker button to hear the pronunciation.

## 3. Merriam-Webster Dictionary Link

The application also provides a link to the full Merriam-Webster dictionary entry for a searched word.

**URL format:**

```javascript
`https://www.merriam-webster.com/dictionary/${encodeURIComponent(word)}`
```

### Explanation

1. `https://www.merriam-webster.com/dictionary/` – The base URL for the Merriam-Webster online dictionary.
2. `${encodeURIComponent(word)}` – Encodes the searched word so it can be safely included in the URL, including words containing spaces or special characters.

**Example:**

If the value of `word` is `love`, the generated URL becomes:

https://www.merriam-webster.com/dictionary/love

This link allows users to open the corresponding Merriam-Webster dictionary page. The code generates the URL; it does not automatically open the page.

---

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