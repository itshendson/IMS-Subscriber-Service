# IMS Home Phone Subscriber Service - CRUD

## How to Deploy

1. Download project from https://github.com/itshendson/IMS-Subscriber-Service.git
2. Open project
3. Open terminal
4. Execute "npm install"
5. Execute "npm run start"
6. Interface with web application here: http://localhost:5000
7. Or interface with Postman with the endpoints:  
   GET /ims/subscriber/{phoneNumber}  
   DELETE /ims/subscriber/{phoneNumber}  
   PUT /ims/subscriber/{phoneNumber}  
   Example for the body of the PUT request:
   ```
   {
       "username": "Todd",
       "password": "mushroom123",
       "domain": "ims.mnc660.mcc302.3gppnetwork.org",
       "status": "ACTIVE",
       "features": {
           "satelliteCall": {
               "provisioned": true
           }
       }
   }
   
   
- Note: Two phone numbers already exist as an example: 18675181010 and 17781234567
