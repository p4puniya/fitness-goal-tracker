const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose'); // Import Mongoose

const progressUpdateRouter = require('./src/progressUpdate');

const PORT = 3000;

// Import the fitnessGoalSchema from the models file
const fitnessGoalSchema = require('./models/fitnessGoal');

// Create the FitnessGoal model using the fitnessGoalSchema
const FitnessGoal = mongoose.model('FitnessGoal', fitnessGoalSchema);


// Enable JSON body parsing
app.use(bodyParser.json());
app.use('/api', progressUpdateRouter);
// Set up middleware for session management
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key', // Replace 'your-secret-key' with your own secure secret key
  resave: false,
  saveUninitialized: false,
}));

// Serve static files (including registration.html)
app.use(express.static(path.join(__dirname, 'public')));

// Handle root URL request
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to the server!" });
});

// Simulated user data for demonstration purposes
const users = [
  { username: 'john', password: 'password123' },
  { username: 'jane', password: 'pass456' }
];

// Login route to verify user credentials and create a session
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate the user's credentials against your database (simulated here)
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    // Set the session data (in this case, just the username)
    req.session.username = user.username;
    // Redirect the user to the home page or a dashboard
    res.redirect('/home');
  } else {
    // Handle invalid credentials
    res.send('Invalid username or password');
  }
});

// Middleware to check if the user is authenticated on protected routes
function requireAuth(req, res, next) {
  if (req.session && req.session.username) {
    // User is authenticated, proceed to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect to the login page
    res.redirect('/login');
  }
}

// Protected route: Home page or dashboard
app.get('/home', requireAuth, (req, res) => {
  // The user is authenticated, so you can provide access to the home page here
  res.send(`Welcome to your home page, ${req.session.username}!`);
});

// Handle user registration form (GET request)
app.get('/register', (req, res) => {
  // Serve the registration.html file
  res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

// Handle retrieving all fitness goals (GET request) and regular GET request for /fitness-goals
app.route('/fitness-goals').get(async (req, res) => {
  try {
    const fitnessGoals = await FitnessGoal.find({});
    res.status(200).json(fitnessGoals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving fitness goals" });
  }
}).post(async (req, res) => {
  const { goalType, targetMetrics } = req.body;

  try {
    // Save the fitness goal data to the database
    const newFitnessGoal = new FitnessGoal({ goalType, targetMetrics });
    await newFitnessGoal.save();

    res.status(200).json({ message: "Fitness goal created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating fitness goal" });
  }
});

// Handle user registration form submission
app.post('/register', async (req, res) => {
  const { username, email, password, fitnessGoal } = req.body;

  // Perform server-side validation and store user data in the database
  // Here, you can use a database library like Mongoose to interact with MongoDB

  try {
    // Save the fitness goal data to the database
    const newFitnessGoal = new FitnessGoal(fitnessGoal);
    await newFitnessGoal.save();

    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Handle logout and destroy the session
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    // Redirect the user to the login page or any other appropriate page
    res.redirect('/login');
  });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/fitness-goals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
