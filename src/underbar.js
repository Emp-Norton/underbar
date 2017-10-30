(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    switch (true){
      case (n === 0):
        return []
        break;
      case (n === undefined):
        return array[array.length - 1]
        break;
      case (n > array.length - 1): 
        return array
        break;
      default: 
        return array.slice(array.length - n, array.length)
        break;
  }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)){
      for (var idx = 0; idx <= collection.length - 1; idx++){
        iterator(collection[idx], idx, collection);
      }
    } else {
      for (var objKey in collection){
        iterator(collection[objKey], objKey, collection)
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var results = [];
    for (var idx = 0; idx <= collection.length - 1; idx++){
      if (test(collection[idx])) results.push(collection[idx])
    }
    return results
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    var results = [];
    for (var idx = 0; idx <= collection.length - 1; idx++){
      if (!test(collection[idx])) results.push(collection[idx])
    }
    return results
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var sortedUniqs = [];

    var findUniqs = function(arr){
      var uniqElements = [];
      for (var idx = 0; idx <= arr.length - 1; idx++){
        if (iterator) {
          if (!uniqElements.includes(iterator(arr[idx]))) uniqElements.push(iterator(arr[idx]))
        } else {
          if (!uniqElements.includes(arr[idx])) uniqElements.push(arr[idx])
        }

      }
      return uniqElements
    }
    // if sorted, assign 1 for true return from iterator, 0 for false.
    if (isSorted){ 
      var results = array.map(function(elem){
        return iterator(elem) ? 1 : 0
      });
      // check uniqueness of true or false values
      var uniqKeys = findUniqs(results);
      // pull indicies of uniq booleans, copy values at indicies from original array, and return results
      uniqKeys.forEach((key, idx) => sortedUniqs.push(array[idx]))
    } else { // if unsorted, use simple findUniqs() method
      return findUniqs(array)
    }
    return sortedUniqs
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var results = []; 
    for (var idx = 0; idx <= collection.length - 1; idx++){
      results.push(iterator(collection[idx]))
    }
    return results
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    if (Array.isArray(collection)){
      var result;
      var startIdx;

      if (accumulator || arguments.length === 3){
        startIdx = 0;
      } else {
        accumulator = collection[0];
        startIdx = 1;
      }

      for (var idx = startIdx; idx <= collection.length - 1; idx++){
        accumulator = iterator(accumulator, collection[idx])
        result = accumulator;
      }
      return result
    } else { 
        for (var key in collection){
          accumulator = iterator(accumulator, collection[key])
        }
        return accumulator
      }
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
        return _.reduce(collection, function(wasFound, item) {
        if (wasFound) {
          return true;
        }
        return item === target
      }, false);
    };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // if every other test passes, try to reuse reduce here
    for (var keyIdx = 0; keyIdx < collection.length; keyIdx++){
      if (iterator){
        if (!iterator(collection[keyIdx])) return false 
      } else {
        for (var keyIdx = 0; keyIdx < collection.length; keyIdx++){
          if (collection[keyIdx] === false ) return false 
        }
      }
    }
    return true 
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    var iterator = iterator || function(item){
      return item
    }
    var hasTruthy = false;
    for (var idx = 0; idx < collection.length; idx++){
      if (iterator(collection[idx])) hasTruthy = true;
    }
    return hasTruthy
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var keysAndVals = [];
    var args = Array.from(arguments);
    for (var argIdx = 0; argIdx < args.length; argIdx++){
      for (var keyIdx = 0; keyIdx <= Object.keys(arguments[argIdx]).length - 1; keyIdx++){
        keysAndVals.push([Object.keys(arguments[argIdx])[keyIdx], Object.values(arguments[argIdx])[keyIdx]])
      }
    }
    for (var keyValIdx = 0; keyValIdx < keysAndVals.length; keyValIdx++){
      obj[keysAndVals[keyValIdx][0]] = keysAndVals[keyValIdx][1]
    }
    return obj
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var newObj = {};
    var keysAndVals = [];
    var args = Array.from(arguments);
    for (var argIdx = 0; argIdx < args.length; argIdx++){
      for (var keyIdx = 0; keyIdx <= Object.keys(arguments[argIdx]).length - 1; keyIdx++){
        keysAndVals.push([Object.keys(arguments[argIdx])[keyIdx], Object.values(arguments[argIdx])[keyIdx]])
      }
    }

    for (var keyValIdx = 0; keyValIdx < keysAndVals.length; keyValIdx++){
      if (!obj.hasOwnProperty(keysAndVals[keyValIdx])){
        newObj[keysAndVals[keyValIdx]] = newObj[keysAndVals[keyValIdx+1]]
      }
    }
    console.log("Obj: " + JSON.stringify(obj) + ", KV: " + keysAndVals)
    console.log(newObj)
    return newObj
  };




  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    
    var stopWatch = function(target, func){
      var startTime = Date.now();
     
      var getDelay = function() {
        var elapsedTime = Date.now() - startTime;
        return elapsedTime
      }
    
      while (target > getDelay()){
        getDelay()    
      }
    }
  
    var dothething = function(){
      console.log("function executed")
    }

  // stopWatch(1200, func)
  };

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
    // rewrite to mimic fisher-yates algorithm -- current approach will be slow with large (10^>3) arrays because the randInd selecting an undefined (deleted) position increases every time.
  _.shuffle = function(array) {
    var dupArray = array.slice();
    var shiftedArray = [];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    while (shiftedArray.length < dupArray.length){
      var randomIndex = getRandomInt(0, dupArray.length - 1)
      if (dupArray[randomIndex]){
        shiftedArray.push(dupArray[randomIndex])
        delete (dupArray[randomIndex])
      }
    }
    return shiftedArray
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var argsArray = Array.from(arguments)
    var zipped = [];

    var findLengthOfLongestArg = function(args){
      var bestLength = 0;
      for (var arg in args){
        if (args[arg].length > bestLength) bestLength = args[arg].length
      }
      return bestLength
    }

    var maxLength = findLengthOfLongestArg(argsArray);
    var objectToPush = []
    for (var idx = 0; idx < maxLength; idx++){
      for (var argIdx = 0; argIdx <= argsArray.length - 1; argIdx++){
        objectToPush.push(argsArray[argIdx][idx])
      }
      zipped.push(objectToPush)
      objectToPush = [];
    }
    return zipped
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var result = [];
    for (var idx = 0; idx < nestedArray.length; idx++){
      if (Array.isArray(nestedArray[idx])){
        for (var nestedIdx = 0; nestedIdx < nestedArray[idx].length; nestedIdx++){
          result.push(nestedArray[idx][nestedIdx])
        }
      } else {
        result.push(nestedArray[idx])
      }
    }
    return result
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
