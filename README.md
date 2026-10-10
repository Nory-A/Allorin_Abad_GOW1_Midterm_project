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
**How to run the Dictionary Web Application**

**I. Install Node.js (if not downloaded)**
- node -v (To check if Node.js is installed, open your terminal and run)

**II. Check your .env**
please ensure that this exist 

**API_KEY=your-merriam-webster-key**

- Replace your-merriam-webster-key with your Merriam-Webster API key.
- If you do not have an API key, you may use the key provided for this project:

- if .env doesn't exist create
**API_KEY=your-merriam-webster-key**

or use my key if none
**Key (Dictionary): 4bc54b76-6f88-4764-823d-d5cc0a51fcf7**

**III. Install the packages**
- Open your terminal.
- Navigate to the folder containing your project files.
- Run the following commands:

    npm init -y
    npm install express dotenv

**IV. Start the server on terminal**
    node server.js

    you would see... Running at http://localhost:3000

It's better to let the server fetch the data so:
1. The API key stays in .env on the server. The browser never sees it.
2. The browser only talks to our own server (/api/define/word) as the server talks to Merriam-Webster for us.

- The tradeoff: the app won't load any data if this server is not running.
- that us why always start it with "node server.js" and open http://localhost:3000

- we made it like this so the API key won't be exposed

**V. Stop the server by pressing Ctrl + C in the terminal.**




