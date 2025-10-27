# Projects

## Phone Book

[![View Source](https://img.shields.io/badge/Live_View-orange)](https://phonebook-5ny2.onrender.com/info) [![View Source](https://img.shields.io/badge/Frontend-GitHub-blue)](https://github.com/Tongxin-Sun/fullStackOpen/tree/main/part2/phonebook) [![View Source](https://img.shields.io/badge/Backend-GitHub-blue)](https://github.com/Tongxin-Sun/fullStackOpen/tree/main/part3/phonebookBackend)



### APIs:
1. Get all contacts: `http://localhost:3001/api/persons`

2. Get info about the time that the request was received and how many entries are in the phonebook at the time of processing the request: `http://localhost:3001/info` that shows 

3. Get a **single** person: `http://localhost:3001/api/persons/5`. If an entry for the given id is not found, the server has to respond with the appropriate status code.

4. Delete a single person by making an http delete request to the specified person's URL, for example, `http://localhost:3001/api/persons/1`.

5. Add a new person: `/api/persons`. The following conditions will raise an error:
   - The name or number is missing
   - The name alreasy exists in the phonebook 

6. Add the **[morgan](https://github.com/expressjs/morgan) middleware** for logging using both format string of predefined tokens and a customized token called `body`. For any `POST` request with a body, the logger will log the content of the body to the console. 
> *Note that logging data even in the console can be dangerous since it can contain sensitive data and may violate local privacy law (e.g., GDPR in EU) or business-standard. This is just for practicing purposes.*