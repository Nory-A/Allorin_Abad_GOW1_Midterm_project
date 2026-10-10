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






