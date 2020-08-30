# Theater API
### Setup 
**Clone**:git clone https://github.com/Piyusinha/Theater-API-HIRING-.git  
**Install All Dependency**:npm install  
**Start Server**: node index.js  
**Base URL:** http://54.237.104.99:443
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
![Screenshot from 2020-08-30 14-24-48](https://user-images.githubusercontent.com/40850657/91655316-51375f00-eacd-11ea-8f99-61d4ffb165bd.png)
**Update Ticket Timing**
![Screenshot from 2020-08-30 14-26-33](https://user-images.githubusercontent.com/40850657/91655370-b723e680-eacd-11ea-91cd-ea9888674f11.png)
**Show Tickets of partiular Time**
![Screenshot from 2020-08-30 14-27-34](https://user-images.githubusercontent.com/40850657/91655391-dae72c80-eacd-11ea-9695-1cf8389be8e6.png)
**Show User Details of Particular Ticketid**
![Screenshot from 2020-08-30 14-28-23](https://user-images.githubusercontent.com/40850657/91655426-079b4400-eace-11ea-867e-0d2d32a0c3c3.png)
**Delete Ticket**
[Screenshot from 2020-08-30 14-28-41](https://user-images.githubusercontent.com/40850657/91655438-213c8b80-eace-11ea-8dec-71fb74c80d24.png)


