// require `request` and the Node `fs` (filesystem) module
var request = require('request');
var fs = require('fs');

request.get('https://sytantris.github.io/http-examples')               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream('./downloaded.html'));               // Note 4

// Notes:
// 1. `request.get` is equivalent to `request()`
// 2. `request.on('error', callback)` handles any error
// 3. `request.on('response, callback)` handles the response
// 4. What is happening here?





/*Now, let's examine that line where .pipe comes in.
Pipes are an interface for converting between
readable and writable streams.

Piping allows us to do all sorts of useful things.
 In this case, the last line:
  .pipe(fs.createWriteStream('./downloaded.html'));
  - when chained to a stream as shown above,
   handles the incoming readable data stream,
   transforming it into a writable data stream,
   which in this case is the function fs.createWriteStream.

This function creates a file,
 downloaded.html,
 if it doesn't already exist,
 in the current working directory (./)
 and streams the data into it
 - so the HTTP GET response body
 (which in this case is the body of a website,
 'https://sytantris.github.io/http-examples/')
 is now saved locally in the downloaded.html file.
  request handles the .on('data')
  and .on('end') events and automatically pipes
   the data into whatever we tell it to
   - it could be a file, it could be an archive,
   it could pipe to another HTTP(S) method even.*/