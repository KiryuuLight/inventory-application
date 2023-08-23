const compareAndCreate = (arr, arrUser) => {
  return arr.map((value) => {
    // Compares every value from user input with the current value of the arr
    const valueChecked = arrUser.filter(
      (userValue) => userValue._id.toString() === value._id.toString()
    );

    // If we have some value , make a copy and add the property checked
    if (valueChecked.length > 0) {
      return { ...valueChecked[0].toObject(), checked: true };
    }

    // Otherwise return the same value
    return value;
  });
};

module.exports = compareAndCreate;
