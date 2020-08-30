# Theater API
### Setup 
**Clone**:git clone https://github.com/Piyusinha/Theater-API-HIRING-.git  
**Install All Dependency**:npm install  
**Start Server**: node index.js  
**Base URL:** http://54.237.104.99:443
### Endpoints
  
| Methods|            Urls             |                  Actions              |           Body Format         |    Response Format     |             
| ------ | --------------------------  |  -----------------------------------  |  ---------------------------- | -----------------------|
| POST   |           /ticket           |          Add New Ticket               |     {"user_name":"Name",      |   {"message":"Message",|
|        |                             |                                       |   "phone_no":"9999999999",    |    "ticket_id":"233",  | 
|        |                             |                                       | "timing":"dd/mm/yyyy hh:mm"}  |    "status:201         | 
| PUT    |           /ticket           | Update timing of particular ticketid  |{"ticketid":"7987262672627828",|
|        |                             |                                       | "timing":"dd/mm/yyyy hh:mm"}  |
| GET    |           /ticket           | Find All ticket of particular timing  |{"timing":"dd/mm/yyyy hh:mm"}  |
| DELETE |      /ticket/:ticketid      | Delete Ticket of particular Ticket id |                               |
| GET    |/ticket/userdetails/:ticketid| Get user information of particular id |                               |
