const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here

// router.get('/', (req, res) => {
//   res.send('Hello applications index route!');
// });

// As a user, I want to be able to add new job applications that I'm thinking about 
// applying to or have already applied to. For each job, I should be able to note down important 
// stuff like the company's name, the job title, what stage the application is at, and if I want, 
// some personal notes and the link to the job posting. NEW & CREATE

router.get('/new', async (req, res) => {
  res.render('applications/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // applications array of the current user
    currentUser.applications.push(req.body); // push the data user entered
    // Save changes to the user
    await currentUser.save(); // document method that saves the data changed
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

// As a user, I want to see all the jobs I've applied for in one place. 
// This page should just show the job title and the company name for each job to keep it simple and 
// easy to look at. INDEX

router.get('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Render index.ejs, passing in all of the current user's
    // applications as data in the context object.
    res.render('applications/index.ejs', {
      applications: currentUser.applications,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  };
});

// As a user, I need to be able to click on any job in my 
// list and see all the details about it on a new page. 
// This includes everything I've recorded about that job application. SHOW

router.get('/:applicationId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the application by the applicationId supplied from req.params
    const application = currentUser.applications.id(req.params.applicationId);
    // Render the show view, passing the application data in the context object
    res.render('applications/show.ejs', {
      application: application,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});



// As a user, when I'm looking at all the details of a job application, 
// I want to be able to change any of the information. 
// There should be an easy-to-find link that takes me to a different page where 
// I can make these changes and then save them. SHOW -----> EDIT ---> UPDATE

router.put('/:applicationId', async (req, res) => {
  try {
    // Find the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the current application from the id supplied by req.params
    const application = currentUser.applications.id(req.params.applicationId);
    // Use the Mongoose .set() method
    // this method updates the current application to reflect the new form
    // data on `req.body`
    application.set(req.body);
    // Save the current user
    await currentUser.save();
    // Redirect back to the show view of the current application
    res.redirect(
      `/users/${currentUser._id}/applications/${req.params.applicationId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:applicationId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);
    res.render('applications/edit.ejs', {
      application: application,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


// As a user, if I'm looking at the details of a job application, 
// I want a simple way to delete it completely, like clicking a 'Delete' button.
// SHOW ----> DELETE

router.delete('/:applicationId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // an application using the id supplied from req.params
    currentUser.applications.id(req.params.applicationId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;