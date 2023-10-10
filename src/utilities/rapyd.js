import https from 'https';
import crypto from 'crypto';

const secretKey = "rsk_a462c17bf279e91f30be11a6a5f78afac37bb0d02f96c0811863ecc64042994aeda628da1c2d42b5";
const accessKey = "rak_0D97E77ECB660A803AA6";

const log = false;

async function makeRequest(method, urlPath, body = null) {
  try {
    const httpMethod = method; // get|put|post|delete - must be lowercase.
    const httpBaseURL = "sandboxapi.rapyd.net";
    const httpURLPath = urlPath; // Portion after the base URL.
    const salt = generateRandomString(8); // Randomly generated for each request.
    const idempotency = new Date().getTime().toString();
    const timestamp = Math.round(new Date().getTime() / 1000); // Current Unix time (seconds).
    const signature = sign(httpMethod, httpURLPath, salt, timestamp, body);

    const options = {
      hostname: httpBaseURL,
      port: 443,
      path: httpURLPath,
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
        access_key: accessKey,
        salt: salt,
        timestamp: timestamp,
        signature: signature,
        idempotency: idempotency,
      },
    };

    return await httpRequest(options, body, log);
  } catch (error) {
    console.error("Error generating request options");
    throw error;
  }
}

function sign(method, urlPath, salt, timestamp, body) {
  try {
    let bodyString = "";
    if (body) {
      bodyString = JSON.stringify(body); // Stringified JSON without whitespace.
      bodyString = bodyString == "{}" ? "" : bodyString;
    }

    let toSign =
      method.toLowerCase() +
      urlPath +
      salt +
      timestamp +
      accessKey +
      secretKey +
      bodyString;
    log && console.log(`toSign: ${toSign}`);

    let hash = crypto.createHmac('sha256', secretKey);
    hash.update(toSign);
    const signature = Buffer.from(hash.digest("hex")).toString("base64");
    log && console.log(`signature: ${signature}`);

    return signature;
  } catch (error) {
    console.error("Error generating signature");
    throw error;
  }
}

function generateRandomString(size) {
  try {
    return crypto.randomBytes(size).toString('hex');
  } catch (error) {
    console.error("Error generating salt");
    throw error;
  }
}

async function httpRequest(options, body) {
  return new Promise((resolve, reject) => {
    try {
      let bodyString = "";
      if (body) {
        bodyString = JSON.stringify(body);
        bodyString = bodyString == "{}" ? "" : bodyString;
      }

      log && console.log(`httpRequest options: ${JSON.stringify(options)}`);
      const req = https.request(options, (res) => {
        let response = {
          statusCode: res.statusCode,
          headers: res.headers,
          body: '',
        };

        res.on('data', (data) => {
          response.body += data;
        });

        res.on('end', () => {
          response.body = response.body ? JSON.parse(response.body) : {};
          log && console.log(`httpRequest response: ${JSON.stringify(response)}`);

          if (response.statusCode !== 200) {
            return reject(response);
          }

          return resolve(response);
        });
      });

      req.on('error', (error) => {
        return reject(error);
      });

      req.write(bodyString);
      req.end();
    } catch (err) {
      return reject(err);
    }
  });
}

export { makeRequest };
