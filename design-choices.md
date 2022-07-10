##### What is an Internet Protocol Multimedia Subsystem (IMS)?

IMS is an architectural framework for delivering multimedia communications services like voice, video, and text over IP networks. IMS enables secure multimedia communication between diverse devices. IMS is a control layer psoitioned between the application layer and transport layer.

##### Who are the users of an IMS?

Who the users are will affect this project. For instance, passwords may be hidden or viewable depending on who the users are. In this case, I believe the users are System Administrators at a telecommunication company. Sysadmins and IT Administrators can (surprisingly) view these passwords.

##### What should I use for a data store? Array, database, local storage?

Array
This is a mock project. This is not a real life business scenario. We only need a simple data store. An array is simple. We don't need persistent data for this project. No need to handle large amounts of data. Purpose of project is to demonstrate design choice as well as ability to work with/traverse objects - using MongoDB would abstract away some of those decisions and hence I would not be able to demonstrate those skills. Note however, that in a real life scenario, arrays will not scale very well.

Database
Better for actual business case (not for this project) because: persistent data, single source of truth, scalability.

Local Storage
Against: In an actual business scenario, we would not store customer data on a browser.

##### Should I store subscriber data in an array or object or map?

Neither, Map is fastest. Map has O(1) for search, add, and delete operations.

##### Should I use routes?

Initially wanted to avoid routes to keep project simple but eventually my codebase got so long that I decided to use routes to organize my code and simplify my life.

##### Can you modify an exported array in CommonJS for the purpose of using the array as a data store?

No. In CommonJS, when you export a variable in moduleA then import it in moduleB, you are creating a copy of the variable to moduleB. You are NOT modifying the reference to the memory address. Therefore, it is not a good idea to use an array in a different module to act as a data store for the application.

##### Is it better to put the parameter in the query string (eg. /ims/subscribers/16041111111) or in the request body?

Parameters should be put in the query string whenever you are trying to filter the results. You only put data in the body when trying to upload/download data to the server. In general, PUT requests do not have a body because all data will be in the query string. In constrast, PUT requests WILL have a body because that is where data should be placed in.

##### Should input validation come from client side or server side?

Validation should be done for both client and server side. Client side validation is needed to handle user input. Catching an error early on the client side (as opposed to the server side) can lead to less wait time for the user to notice invalid inputs. However, server side validation is also important. Users can access endpoints outside a browser (for example with Postman) so validation is needed server side as well. Server side validation is also important for security. A malicious user can inject code into the front end and developers would want to catch that from the backend.

##### Should I sanitize input data on frontend or back end or both?

Sanitizing input data from frontend is good for user experience. Sanitizing input data on backend would ensure that regardless of whether data was submitted from browser or postman that data can always be processed before running against data store. So even if postman users submits "1-888-854-8564," the input data will be sent to the backend, processed to remove the dashes, then checked against the data store.

But in my professional experience querying against external API sources, whenever I needed to add a query parameter to my url the API server NEVER sanitizes my result. If I didn't follow a format correctly, it would just tell be bad request. They completely rely on user entering the precise and correct query string.

##### Should I build my own validator or use the express-validator library?

If I was only validating phone numbers for a GET request, I can write my own validation with simple and readable plain JavaScript. Using express-validator may be difficult to read for Developers not familiar with this library.
I should only use express-validator if I decide to implement the PUT request because at that point, validation can become more complex and the library will help deal with that.

##### Should I use a formatter?

Yes. Nobody loves what a formatter does to their code. But everyone loves what a formatter does to their coworkers' code. It provides consistency for a team.

##### What does express.json() do?

Normally when a request is received by the backend, the program cannot read the body. The body will simply be called "readable stream." Need express.json() middleware to unpack readable stream into an actual JSON object to see/work with it. Express.json() not really needed if you are only implementing GET and DELETE requests since they have no body - hence nothing for express.json() to parse. Express.json() is needed for PUT requests because there will be data in the body.

##### What does express.urlencoded({ extended: true}) do?

Similar to express.json() it allows the backend to understand urlencoded payloads.

##### What does isMobilePhone() validating for?

Input must be 6-12 digits long.
No symbols, including dashes.

##### Why does your app only accept BC phone number format?

Phone numbers are deceptively complex. They have country codes, area codes, and phone number digits. Phone numbers have different length for different countries. Some phone number digits are only available to certain area codes. This can make phone number sanitation very complex. To simplify this project, I chose to only accept BC phone number format. That way, I can enforce phone number format to include country code, area code and 7 digit phone numbers.
