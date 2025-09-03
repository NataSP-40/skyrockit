const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here

module.exports = router;

// As a user, I want to be able to add new job applications that I'm thinking about 
// applying to or have already applied to. For each job, I should be able to note down important 
// stuff like the company's name, the job title, what stage the application is at, and if I want, 
// some personal notes and the link to the job posting. NEW ROUTE ---> CREATE


// As a user, I want to see all the jobs I've applied for in one place. 
// This page should just show the job title and the company name for each job to keep it simple and 
// easy to look at. INDEX

// As a user, I need to be able to click on any job in my list and see all the details about
//  it on a new page. This includes everything I've recorded about that job application. INDEX ----> SHOW

// As a user, when I'm looking at all the details of a job application, 
// I want to be able to change any of the information. 
// There should be an easy-to-find link that takes me to a different page where 
// I can make these changes and then save them. SHOW -----> EDIT ---> UPDATE


// As a user, if I'm looking at the details of a job application, 
// I want a simple way to delete it completely, like clicking a 'Delete' button.
// SHOW ----> DELETE
