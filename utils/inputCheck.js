//utility that will check whether or not an object has the required properties

module.exports = function (obj, ...props) {
  const errors = [];

  props.forEach((prop) => {
    //when property is blank or doesn't exist, it will be added to the errors array
    if (obj[prop] === undefiend || obj[prop] === "") {
      errors.push(`No ${prop} specified.`);
    }
  });
  if (errors.length) {
    return {
      error: errors.join(""),
    };
  }
  return null;
};
