/**
 * This file must be executed using Node.js in the root of your project!  "node replaceDOC.js"
 * replaceDOC file must be needed to replace all the DOC comments to use a function to inject HTML
 * it will parse your karma.conf.js file to get all the test files
 * then it will find all the DOC comments (used in JSTD to inject HTML) and replace them with injectHTML function.
 * injectHTML exist in jstd-adapter
 **/
var fs = require('fs'),
  path = require('path'),
  sPath;

// Get the path of the project.
sPath = path.resolve(__dirname);

// Helper functions to modify the content in files.
function fixQuotesAndRemoveLineBreaks(match, p1) {
  var data1 = p1.replace(/\"/g,'\\\"').replace(/\'/g, "\\'");
  return "injectHTML('" + trim(data1.replace(/\r?\n|\r/gim, ' ')) + "');";
}
function trim(html) {
  return html.replace(/(^\s*)|(\s*$)/g,'');
}

// This lines parse the karma config file to get all the test files (is in this file where the replacement will be done)
fs.readFile(sPath + '/karma.conf.js', 'utf8', function(err, data) {
  if(err){
    throw err;
  }
  var matches, escapedFiles, files, testFiles = [], indexFile, filesLength, filePath;

  // Get the files content
  matches = /(?:files[ ]{0,1}=[ ]{0,1}\[)([\s\S]*?)(?:\];)/gim.exec(data);

  // Set the content to be one string
  escapedFiles = matches[1].replace(/\r?\n|\r/gim, "").replace(/\"/g, "").replace(/\'/g, "").replace(/\s*/g, "");
  // Get an array with all the files
  files = escapedFiles.split(',');
  // Remove the adapter files.
  files = files.slice(2);
  // Loop over all the files but only the urls that start with test will be added.
  indexFile = files.length -1;
  while(indexFile)
  {
    if(files[indexFile].indexOf('test') === 0)
    {
      testFiles.push(files[indexFile]);
    }
    indexFile--;
  }
  // Loop over all the test files and replace the DOC comments by injectHTML function.
  filesLength = testFiles.length;
  for(indexFile = 0; indexFile < filesLength; indexFile++) {
    (function(sFilePath){
      // Read the file.
      fs.readFile(sFilePath, 'utf8', function(err, data) {
        if (err){
          throw err;
        }
        // Replace the DOC comments by injectHTML function. (Added some special checks for extra or less spaces than really needed to work even in mismatching typing)
        var data1 = data.replace(/(?:\/\*\:DOC\s*?\+(?:\s*?)=)([\s\S]*?)(?:\*\/)/gim, "injectHTML('$1');")
          .replace(/(?:injectHTML\(\')([\s\S]*?)(?:\'\);)/gim, fixQuotesAndRemoveLineBreaks);
        // After reading the content of the file we do a simple copy in versions directory.
        fs.writeFile(sFilePath, data1, 'utf8', function(err){
          if(err){
            throw err;
          }
        });
      });
    })(sPath + "/" + testFiles[indexFile]);
  }
});