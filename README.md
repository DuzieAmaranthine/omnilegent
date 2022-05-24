<style>
  doc-desc {
    display: flex; 
    justify-content: left;
    color: #838383;
    font-style: italic;
    font-size: 12px;
    margin-bottom: 6px;
    margin-top: -12px;
    padding-left: 42px;
    padding-right: 42px;
  }
</style>

# omnilegent
---
## Description

omnilegent is a virtual book shelf web application where a user can search for and track books, store a completed library and a to-be-read library, and create a chatroom for specific topics (this will eventually be turned into a book club environment). It uses the public Google Books API for the searching implementation.

The application uses NestJS for the server side, Postgres for the database, and React for the frontend. It is deployed on heroku at [omnilegent.herokuapp.com](https://omnilegent.herokuapp.com/).

The base of the application is a NestStartApp provided by dittonjs. Please read through the [PROJECT_SETUP](/docs/PROJECT_SETUP.md) to ensure all of the tools are installed. 

## Documentation
1. [WSL Setup](/docs/WSL_SETUP.md)

<span>
  <doc-desc>
    Guide to installing WSL on Windows machines
  </doc-desc>
<span>

2. [ASDF Version Management Tool](/docs/ASDFVM_SETUP.md)

<span>
  <doc-desc>
    Guide to setting up ASDF on Mac, Linux, and WSL
  </doc-desc>
<span>

3. [VS Code](/docs/VSCODE.md)

<span>
  <doc-desc>
    Some extensions for VS Code that were used
  </doc-desc>
<span>

4. [Project Setup](/docs/PROJECT_SETUP.md)

<span>
  <doc-desc>
    A detailed description of setting up the project. It does refer to the NestStarterApp to clone, but the set up should work with this project
  </doc-desc>
<span>

5. [Data Documentation](/docs/DATA_DOCS.md)

<span>
  <doc-desc>
    Documentation of the different types of data the application uses and the requests that is sent between the server and the client
  </doc-desc>
<span>

