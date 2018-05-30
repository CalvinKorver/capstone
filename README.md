## Overview:
    Shield is a web application for public defenders designed to streamline the case management process. Shield consists of intuitive form entry combined with data visualization and display in order to maximize the value gained when a defender is working on a case. Our app is split up into two basic pieces: the frontend React web site and the backend Django rest framework for serving up our SQL database. 


## Frontend:
    We built our frontend trying to follow as many React principles as possible. We have a number of different ‘components’ each split up into their own files under the “src/” folder.  Index.js renders our application into index.html which then allows us to navigate through the application. We used React styling with Semantic style sheets to maintain a consistent design. We tried to limit API calls to the main dashboard component and then pass that information through ‘props’ to the rest of the application. As a result of our design, forceful browsing to URLs such as ‘clients/4/’ will not work, and instead you should follow the links and buttons present in the application.
For more on React: https://reactjs.org/

## Backend:
    We built our backend from a Django tutorial that included default viewsets and basic user models. We designed an ERD for our SQL schema, then implemented that through our models with foreign key relationships where appropriate. We then wrote custom view handlers for some of the specific routes where a default viewset was not robust enough. Additionally, we wrote a custom view specifically for querying info about all the cases for a specific client dubbed ‘case-info’. 
For more on Django Rest Framework: http://www.django-rest-framework.org/

## Security:
    We implemented secure login and session tracking; however, due to the scope and timeline of our project we were unable to implement perfect security procedures. The site is currently unencrypted in that it operates on http rather than https. Additionally, there is no restriction of the clients to be viewed, so with multiple users every user would be able to view the others’ clients and case information. 

## Deployment:
    For our deployment, we leaned on the tools of AWS. For the backend, we are using an EC2 instance coupled with Docker to serve up the Rest Framework as a web server. For the frontend, we used an S3 bucket with AWS elastic IPs, and Freenom for our domain names. 


### Contact Us
Kyle McNulty: kjmcnult@uw.edu
Calvin Korver: cjkorver@uw.edu

Feel free to reach out if you run into any critical issues!
