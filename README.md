# Theater API
### Setup 
**Clone**:git clone https://github.com/Piyusinha/Theater-API-HIRING-.git  
**Install All Dependency**:npm install  
**Start Server**: node index.js  
**Base URL:** http://54.237.104.99:443  
**Working**
Ticket_id = phone_no+currenttimestampinmillis  
### Endpoints
  
| Methods|            Urls             |                  Actions              |           Body Format         |    Response Format            |             
| ------ | --------------------------  |  -----------------------------------  |  ---------------------------- | ----------------------------- |
| POST   |           /ticket           |          Add New Ticket               |     {"user_name":"Name",      |   {"message":"Message",       |
|        |                             |                                       |   "phone_no":"9999999999",    |    "ticket_id":"233",         | 
|        |                             |                                       | "timing":"dd/mm/yyyy hh:mm"}  |    "status":201 }             | 
| PUT    |           /ticket           | Update timing of particular ticketid  |{"ticketid":"7987262672627828",|  {"message":"Message",        |
|        |                             |                                       | "timing":"dd/mm/yyyy hh:mm"}  |   "status" :"200"}            |     
| GET    |           /ticket           | Find All ticket of particular timing  |{"timing":"dd/mm/yyyy hh:mm"}  |{"Ticket":{                    |
|        |                             |                                       |                               |   "Ticket_id":"1256",         |
|        |                             |                                       |                               |   "user_name":"Piyush",       |
|        |                             |                                       |                               |   "phone_no":"8888888",       |
|        |                             |                                       |                               |   "expired":boolean}          |
|        |                             |                                       |                               |           }                   |
| DELETE |      /ticket/:ticketid      | Delete Ticket of particular Ticket id |                               |{"Message":"Message" }         |
| GET    |/ticket/userdetails/:ticketid| Get user information of particular id |                               |  {"UserDetails"{              | 
|        |                             |                                       |                               |     "Ticket_id":"1256",       |
|        |                             |                                       |                               |   "user_name":"Piyush",       | 
|        |                             |                                       |                               |   "phone_no":"8888888",       |
|        |                             |                                       |                               |   "timing" :"dd/mm/yyyy hh:mm"|  
|        |                             |                                       |                               |   "expired":boolean}          |
|        |                             |                                       |                               |           }                   |
### ScreenShots
**Create New Ticket**
![Screenshot from 2020-08-30 14-41-53](https://user-images.githubusercontent.com/40850657/91655623-85ac1a80-eacf-11ea-8a15-c5fdcb813a7b.png)
**Update Ticket Timing**
![Screenshot from 2020-08-30 14-42-48](https://user-images.githubusercontent.com/40850657/91655632-96f52700-eacf-11ea-8383-6572f46f490c.png)
**Show Tickets of partiular Time**
![Screenshot from 2020-08-30 14-43-26](https://user-images.githubusercontent.com/40850657/91655639-a2485280-eacf-11ea-8068-769daffb3701.png)
**Show User Details of Particular Ticketid**
![Screenshot from 2020-08-30 14-44-05](https://user-images.githubusercontent.com/40850657/91655647-b7bd7c80-eacf-11ea-9d57-dc611fe5e493.png)
**Delete Ticket**
![Screenshot from 2020-08-30 14-44-59](https://user-images.githubusercontent.com/40850657/91655653-c2781180-eacf-11ea-8eae-94b5886465d3.png)


