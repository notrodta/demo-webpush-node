const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const webpush = require("web-push");
const https = require("https");

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const publicKey =
  "BDeEjWwSClAYzHE15bxl1I0vlnTryaLz8XrfiqpX_nq9sLnmrEL3W-q_y3628MGBjJ10XKFb21LKk1OQGBsrf9Q";
const privateKey = "QhVLSPo2Ja5Dvgtp0qI9RFbEMVL0XTVzRnpOsXoMLgc";
const webPushContact = "mailto: contact@my-site.com";

webpush.setVapidDetails(webPushContact, publicKey, privateKey);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/notifications/subscribe", (req, res) => {
  const subscription = req.body;

  console.log(subscription);

  const payload = JSON.stringify({
    title: "Hello!!!",
    body: "It works 123.",
  });

  webpush
    .sendNotification(subscription, payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

  res.status(200).json({ success: true });
});

// --------------------
// const url = "https://jsonplaceholder.typicode.com/todos/1";

// const stuff = https.request(url, (response) => {
//   let data = "";
//   console.log(response);
//   response.on("data", (chunk) => {
//     data = data + chunk.toString();
//   });

//   response.on("end", () => {
//     const body = JSON.parse(data);
//     console.log(body);
//   });
// });

// stuff.on("error", (error) => {
//   console.log("An error", error);
// });

// stuff.end();

//--------------
// https://stackoverflow.com/questions/36554680/is-there-a-way-to-set-the-source-port-for-a-node-js-https-request
// https://stackoverflow.com/questions/32130471/node-js-https-not-working-behind-corporate-proxy

var options = {
  hostname: "jsonplaceholder.typicode.com",
  port: 443,
  path: "/todos/1",
};

const stuff = https.request(options, (response) => {
  let data = "";
  console.log(response);
  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

stuff.on("error", (error) => {
  console.log("An error", error);
});

stuff.end();

//---------------

// https://stackoverflow.com/questions/53522723/https-request-specifying-hostname-and-specific-ip-address

// https
//   .get(
//     "https://jsonplaceholder.typicode.com/todos/1",
//     {
//       // headers: { host: "jsonplaceholder.typicode.com" },
//       servername: "jsonplaceholder.typicode.com",
//     },
//     (res) => {
//       console.log("okay");
//     }
//   )
//   .on("error", (e) => {
//     console.log("E", e.message);
//   });

//--------------

// /https://stackoverflow.com/questions/16459751/calling-a-https-web-service-in-node-js-behind-proxy
// var http = require("http");

// var username = "username";
// var password = "password";
// var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
// var data = "";
// var options = {
//   hostname: "jsonplaceholder.typicode.com",
//   // baiken9: Proxy Port
//   // port: 443,
//   // baiken9: Add method type in my case works using POST
//   method: "GET",
//   // baiken9: when proxy redirect you request will use https. It is correct as is
//   path: "/todos/1",
//   // headers: {
//   //   // baiken9: I cannot test it my proxy not need authorization
//   //   "Proxy-Authorization": auth,
//   //   // baiken9: required for redirection
//   //   host: "crm.zoho.com",
//   //   // baiken9: length of data to send
//   //   "content-length": 0,
//   // },
// };

// console.log("options- " + JSON.stringify(options) + "\n");

// var req = http.request(options, function (res) {
//   console.log("statusCode- " + res.statusCode);
//   console.log("headers-" + res.headers);

//   res.on("data", function (chunk) {
//     data += chunk;
//   });

//   res.on("end", function (chunk) {
//     console.log("response-" + data);
//   });
// });

// req.end();

// req.on("error", function (e) {
//   console.error(e);
// });

//----------------

app.listen(9000, () =>
  console.log("The server has been started on the port 9000")
);
