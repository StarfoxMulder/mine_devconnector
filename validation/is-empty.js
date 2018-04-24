const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;

/***
 * Custom function for checking if a value is undefined, null, an ampty object, or an empty string
 * 
function isEmpty(value) {
  return (
    value === undefined ||
    valie === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

is the old way of creating a function.  Need to get used to arrow function
syntax, which is this:

const isEmpty = (value) => 
  value === undefined ||
  valie === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0)


NOTE:
In arrow functions apparently the return method and curly brackets are unnecessary 
 */
