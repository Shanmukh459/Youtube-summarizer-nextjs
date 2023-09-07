// Below code has been implemented based on the blog
// written by Dmitri Pavlutin at this url:
// https://dmitripavlutin.com/javascript-enum/
// and Mozilla docs at this url:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

// Enum data structure implemented as a Proxy to
// intercept calls to native get, set methods of
// object and exhibit redefined behavior of object
// immutability and also avoid typos by throwing an error
// for access to invalid enum values.
export default function ConvertedEnum(inputObject) {
  const interceptedObjectOpsHandler = {
    get(inputObject, inputObjectKey) {
      if (inputObject.hasOwnProperty(inputObjectKey)) {
        return Reflect.get(...arguments);
      }

      throw new Error(
        `Error: ${inputObjectKey} is not a valid value of the Enum`
      );
    },
    set(inputObject, inputObjectKey, valueToBeSet) {
      throw new Error(
        "Error: Attempt to add new value to Enum which is in violation\
                            of its immutability property"
      );
    },
  };

  return new Proxy(inputObject, interceptedObjectOpsHandler);
}
