/* eslint-disable */
const fetch = require("node-fetch");
exports.handler = async function(event, context) {
  let user = await event.queryStringParameters.user;
  let auth = await event.queryStringParameters.auth;
  let offset = await event.queryStringParameters.offset;
  let url = `https://www.worldcommunitygrid.org/api/members/${user}/results?code=${auth}&limit=250&offset=${offset}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
