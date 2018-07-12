# Node GeoMatch

## Filter a JSON dataset to return only records located within a given radius from a given point.

### What does it do?
It loads a list of JSON records containing geographical coordinates (`{"latitude" : "X", "longitude" : "Y", ...}`) from a given file.

Then checks whether every record in this list is included within a given radius from a given point.

It assumes that the earth is a sphere of radius 6370km.

It eventually outputs in the console a list containing the records matched (included in the specified area), ordered by an `ID` property (`user_id`) in a ascending fashion.

### Usage:
- run it: `node program.js`
- run tests: `node geolocation.test.js`
    - the file `empty.json` is for test purposes only

### Requirements:
 - NodeJS