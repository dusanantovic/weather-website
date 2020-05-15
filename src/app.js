const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000; // Heroku port is in env variable and for local we used port 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs"); // load handlebars - handlebars allow you to use dynamic content for your page
app.set("views", viewsDirectoryPath); // set custom (templates) views path directory
hbs.registerPartials(partialsDirectoryPath); // set path for partials - using to share some file on client for example header.hbs or footer.hbs

// Define partial values
// hbs.registerPartial("header", "header");

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Dusan Antovic"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Dusan Antovic",
        text: "I'm a full-stack developer with expirience in JavaScript and JavaScript frameworks such as React.js, Angular.js, Vue.js and besides of this listed JavaScript frameworks I also work in Node.js, TypeScript, PHP, PHP framework (Codeigniter) and Databases (MySQL, PostgreSQL). "
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Dusan Antovic",
        text: "How can i help you?"
    });
});

app.get("/weather", (req, res) => {
    const { address } = req.query;
    if(!address) {
        return res.send({ error: "You must provide an address!" });
    }
    geocode(address, (error, { lat, lng, location } = {}) => {
        if(error) {
            return res.send({ error });
        }
        forecast(lat, lng, (error, forecast) => {
            if(error) {
                return res.send({ error });
            }
            res.send({
                forecast,
                location,
                address
            });
        });
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        text: "Page not found",
        name: "Dusan Antovic"
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});