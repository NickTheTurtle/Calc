function calc(s, options) {
  //remove spaces, line breaks, and tabs
  s = s.replace(/ |\n|\t/g, "");
  //check for not allowed symbols
  if (!/^[a-zA-Z\d\.\+\-\*\/\%\^\(\)\,]*$/.test(s)) {
    throw new Error("Not allowed symbols: " + s.replace(/[a-zA-Z\d\.\+\-\*\/\%\^\(\)\,]*/g, "").split("").join(", "));
  }
  //return if already a number
  if (!isNaN(Number(s))) {
    return Number(s);
  }
  var constants = {},
    functions = {},
    options = options || {};
  options.includeDefaults = options.includeDefaults || {
    constants: true,
    functions: true
  };
  if (options.includeDefaults.constants === undefined) {
    options.includeDefaults.constants = true;
  }
  if (options.includeDefaults.functions === undefined) {
    options.includeDefaults.functions = true;
  }
  if (options.includeDefaults.constants) {
    //define default constants
    constants = {
      e: Math.E,
      pi: Math.PI
    };
  }
  if (options.includeDefaults.functions) {
    //define default functions
    functions = {
      //absolute value
      abs: function(num) {
        if (num === undefined) {
          return 0;
        }
        return Math.abs(num);
      },
      //statistics functions
      sum: function() {
        var sum = 0;
        for (var i = 0; i < arguments.length; i++) {
          sum += arguments[i];
        }
        return sum;
      },
      count: function() {
        return arguments.length;
      },
      average: function() {
        if (arguments.length === 0) {
          throw new Error("Average function requires at least one argument");
        }
        var sum = 0;
        for (var i = 0; i < arguments.length; i++) {
          sum += arguments[i];
        }
        return sum / arguments.length;
      },
      max: function() {
        return Math.max.apply(Math, arguments);
      },
      min: function() {
        return Math.min.apply(Math, arguments);
      },
      //rounding functions
      round: function(num, dec) {
        if (num === undefined) {
          throw new Error("Round function requires the num argument");
        }
        dec = dec || 0;
        return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
      },
      floor: function(num, dec) {
        if (num === undefined && dec === undefined) {
          throw new Error("Floor function requires the num argument");
        }
        dec = dec || 0;
        return Math.floor(num * Math.pow(10, dec)) / Math.pow(10, dec);
      },
      ceil: function(num, dec) {
        if (num === undefined) {
          throw new Error("Ceil function requires the num argument");
        }
        dec = dec || 0;
        return Math.ceil(num * Math.pow(10, dec)) / Math.pow(10, dec);
      },
      //logarithmic functions
      ln: function(num) {
        if (num === undefined) {
          throw new Error("Ln function requires at the num argument");
        }
        if (num < 0) {
          throw new Error("Ln function requires the num argument to be greater than or equal to 0");
        }
        return Math.log(num);
      },
      log: function(num, base) {
        if (num === undefined) {
          throw new Error("Log function requires the num argument");
        }
        if (num < 0) {
          throw new Error("Log function requires the num argument to be greater than or equal to 0");
        }
        if (base <= 0) {
          throw new Error("Log function requires the base argument to be greater than 0");
        }
        //default base 10
        base = base || 10;
        return Math.log(num) / Math.log(base);
      },
      log2: function(num) {
        if (num === undefined) {
          throw new Error("Log2 function requires the num argument");
        }
        if (num < 0) {
          throw new Error("Log2 function requires the num argument to be greater than or equal to 0");
        }
        return Math.log2 ? Math.log2(num) : Math.log(num) / Math.LN2;
      },
      log10: function(num) {
        if (num === undefined) {
          throw new Error("Log10 function requires the num argument");
        }
        if (num < 0) {
          throw new Error("Log10 function requires the num argument to be greater than or equal to 0");
        }
        return Math.log10 ? Math.log10(num) : Math.log(num) / Math.LN10;
      },
      //trigonometric functions
      sin: function(num) {
        if (num === undefined) {
          throw new Error("Sin function requires the num argument");
        }
        return Math.sin(num);
      },
      sind: function(num) {
        if (num === undefined) {
          throw new Error("Sind function requires the num argument");
        }
        return Math.sin(num * Math.PI / 180);
      },
      asin: function(num) {
        if (num === undefined) {
          throw new Error("Asin function requires the num argument");
        }
        if (Math.abs(num) > 1) {
          throw new Error("Asin function requires the num argument to be between -1 and 1 (inclusive)");
        }
        return Math.asin(num);
      },
      asind: function(num) {
        if (num === undefined) {
          throw new Error("Sind function requires the num argument");
        }
        if (Math.abs(num) > 1) {
          throw new Error("Asind function requires the num argument to be between -1 and 1 (inclusive)");
        }
        return Math.asin(num) * 180 / Math.PI;
      },
      sinh: function(num) {
        if (num === undefined) {
          throw new Error("Sinh function requires the num argument");
        }
        return Math.sinh ? Math.sinh(num) : (Math.exp(num) - Math.exp(-num)) / 2;
      },
      asinh: function(num) {
        if (num === undefined) {
          throw new Error("Asinh function requires the num argument");
        }
        return Math.asinh ? Math.asinh(num) : (num === -Infinity ? num : Math.log(num + Math.sqrt(num * num + 1)));
      },
      cos: function(num) {
        if (num === undefined) {
          throw new Error("Cos function requires the num argument");
        }
        return Math.cos(num);
      },
      cosd: function(num) {
        if (num === undefined) {
          throw new Error("Cosd function requires the num argument");
        }
        return Math.cos(num * Math.PI / 180);
      },
      acos: function(num) {
        if (num === undefined) {
          throw new Error("Acos function requires the num argument");
        }
        if (Math.abs(num) > 1) {
          throw new Error("Acos function requires the num argument to be between -1 and 1 (inclusive)");
        }
        return Math.acos(num);
      },
      acosd: function(num) {
        if (num === undefined) {
          throw new Error("Acosd function requires the num argument");
        }
        if (Math.abs(num) > 1) {
          throw new Error("Acosd function requires the num argument to be between -1 and 1 (inclusive)");
        }
        return Math.acos(num) * 180 / Math.PI;
      },
      cosh: function(num) {
        if (num === undefined) {
          throw new Error("Cosh function requires the num argument");
        }
        return Math.cosh ? Math.cosh(num) : (Math.exp(num) + Math.exp(-num)) / 2;
      },
      acosh: function(num) {
        if (num === undefined) {
          throw new Error("Acosh function requires the num argument");
        }
        if (num < 1) {
          throw new Error("Acosh function requires the num argument to be greater than or equal to 1");
        }
        return Math.acosh ? Math.acosh(num) : Math.log(num + Math.sqrt(num * num - 1));;
      },
      tan: function(num) {
        if (num === undefined) {
          throw new Error("Tan function requires the num argument");
        }
        return Math.tan(num);
      },
      tand: function(num) {
        if (num === undefined) {
          throw new Error("Tand function requires the num argument");
        }
        return Math.tan(num * Math.PI / 180);
      },
      atan: function(num) {
        if (num === undefined) {
          throw new Error("Atan function requires the num argument");
        }
        return Math.atan(num);
      },
      atan2: function(num1, num2) {
        if (num1 === undefined) {
          throw new Error("Atan2 function requires at least one argument");
        }
        num2 = num2 || 1;
        return Math.atan2(num1, num2);
      },
      atand: function(num) {
        if (num === undefined) {
          throw new Error("Atand function requires the num argument");
        }
        return Math.atan(num) * 180 / Math.PI;
      },
      atand2: function(num1, num2) {
        if (num1 === undefined) {
          throw new Error("Atand2 function requires at least one argument");
        }
        num2 = num2 || 1;
        return Math.atan2(num1, num2) * 180 / Math.PI;
      },
      tanh: function(num) {
        if (num === undefined) {
          throw new Error("Tanh function requires the num argument");
        }
        return Math.tanh ? Math.tanh(num) : (num === Infinity ? 1 : (num === -Infinity ? -1 : (Math.exp(num) - Math.exp(-num)) / (Math.exp(num) + Math.exp(-num))));
      },
      atanh: function(num) {
        if (num === undefined) {
          throw new Error("Atanh function requires the num argument");
        }
        if (Math.abs(num) > 1) {
          throw new Error("Atanh function requires argument to be between -1 and 1 (inclusive)");
        }
        return Math.atanh ? Math.atanh(num) : Math.log((1 + num) / (1 - num)) / 2;
      },
      //random
      rand: function(num1, num2) {
        if (num2 === undefined) {
          if (num1 === undefined) {
            num1 = 0;
            num2 = 1;
          } else {
            num2 = num1;
            num1 = 0;
          }
        }
        return Math.random() * (num2 - num1) + num1;
      },
      randInt: function(num1, num2) {
        if (num2 === undefined) {
          if (num1 === undefined) {
            num1 = 0;
            num2 = 1;
          } else {
            num2 = num1;
            num1 = 0;
          }
        }
        return Math.floor(Math.random() * (num2 - num1 + 1) + num1);
      }
    }
  }
  if (options.constants) {
    for (var i in options.constants) {
      if (Object.prototype.hasOwnProperty.call(options.constants, i)) {
        if (/^[a-zA-Z\.]+[\d\.]*$/.test(i)) {
          if (!isNaN(Number(options.constants[i]))) {
            constants[i] = options.constants[i];
          } else {
            throw new Error("Custom constant \"" + i + "\" value not allowed");
          }
        } else {
          throw new Error("Custom constant name \"" + i + "\" not allowed");
        }
      }
    }
  }
  if (options.functions) {
    for (var i in options.functions) {
      if (Object.prototype.hasOwnProperty.call(options.functions, i)) {
        if (/^[a-zA-Z\.]+[\d\.]*$/.test(i)) {
          if (typeof(options.functions[i]) === "function") {
            functions[i] = options.functions[i];
          } else {
            throw new Error("Custom function \"" + i + "\" is not a JavaScript function");
          }
        } else {
          throw new Error("Custom function name \"" + i + "\" not allowed");
        }
      }
    }
  }
  //return if a constant
  if (!isNaN(constants[s])) {
    return constants[s];
  }
  if (s[0] === "+" && !isNaN(constants[s.slice(1)])) {
    return constants[s.slice(1)];
  }
  if (s[0] === "-" && !isNaN(constants[s.slice(1)])) {
    return -constants[s.slice(1)];
  }
  var balancedParen = 0;
  var addSubtractSigns = [];
  var multiplyDivideModulusSigns = [];
  var exponentsSign = [];
  //loop through script and break expression by operators that are not grouped by parentheses
  //also check for balanced parentheses
  for (var i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      balancedParen++;
    } else if (s[i] === ")") {
      balancedParen--;
    } else if (balancedParen === 0) {
      if (s[i] === "+" && (i < 2 || !/^[\d\.][eE]$/.test(s.slice(i - 2, i))) && i !== 0 && !/^[\+\-\*\/\%\^\(]$/.test(s[i - 1])) {
        addSubtractSigns.push({
          index: i,
          sign: "+"
        });
      } else if (s[i] === "-" && (i < 2 || !/^[\d\.][eE]$/.test(s.slice(i - 2, i))) && i !== 0 && !/^[\+\-\*\/\%\^\(]$/.test(s[i - 1])) {
        addSubtractSigns.push({
          index: i,
          sign: "-"
        });
      } else if (addSubtractSigns.length === 0) {
        if (s[i] === "*") {
          multiplyDivideModulusSigns.push({
            index: i,
            sign: "*"
          });
        } else if (s[i] === "/") {
          multiplyDivideModulusSigns.push({
            index: i,
            sign: "/"
          });
        } else if (s[i] === "%") {
          multiplyDivideModulusSigns.push({
            index: i,
            sign: "%"
          });
        } else if (s[i] === "^" && multiplyDivideModulusSigns.length === 0) {
          exponentsSign.push(i);
        }
      }
    }
    if (balancedParen < 0) {
      throw new Error("Unbalanced parentheses");
    }
  }
  if (balancedParen !== 0) {
    throw new Error("Unbalanced parentheses");
  }
  //add or subtract all the components together
  if (addSubtractSigns.length > 0) {
    addSubtractSigns.push({
      index: s.length
    });
    var res = calc(s.slice(0, addSubtractSigns[0].index), options);
    for (var i = 0; i < addSubtractSigns.length - 1; i++) {
      if (addSubtractSigns[i].sign === "+") {
        res += calc(s.slice(addSubtractSigns[i].index + 1, addSubtractSigns[i + 1].index), options);
      } else if (addSubtractSigns[i].sign === "-") {
        res -= calc(s.slice(addSubtractSigns[i].index + 1, addSubtractSigns[i + 1].index), options);
      }
    }
    if (isNaN(res)) {
      throw new Error("Error");
    }
    return res;
  }
  //multiply, divide, and modulus all the components together
  if (multiplyDivideModulusSigns.length > 0) {
    multiplyDivideModulusSigns.push({
      index: s.length
    });
    var res = calc(s.slice(0, multiplyDivideModulusSigns[0].index), options);
    for (var i = 0; i < multiplyDivideModulusSigns.length - 1; i++) {
      if (multiplyDivideModulusSigns[i].sign === "*") {
        res *= calc(s.slice(multiplyDivideModulusSigns[i].index + 1, multiplyDivideModulusSigns[i + 1].index), options);
      } else if (multiplyDivideModulusSigns[i].sign === "/") {
        res /= calc(s.slice(multiplyDivideModulusSigns[i].index + 1, multiplyDivideModulusSigns[i + 1].index), options);
      } else if (multiplyDivideModulusSigns[i].sign === "%") {
        res %= calc(s.slice(multiplyDivideModulusSigns[i].index + 1, multiplyDivideModulusSigns[i + 1].index), options);
      }
    }
    if (isNaN(res)) {
      throw new Error("Error");
    }
    return res;
  }
  //raise to the exponent for all the components together, right-associative
  if (exponentsSign.length > 0) {
    exponentsSign.unshift(-1);
    var res = calc(s.slice(exponentsSign[exponentsSign.length - 1] + 1), options);
    for (var i = exponentsSign.length - 2; i > -1; i--) {
      res = Math.pow(calc(s.slice(exponentsSign[i] + 1, exponentsSign[i + 1]), options), res);
    }
    if (isNaN(res)) {
      throw new Error("Error");
    }
    return res;
  }
  //assume that expression either is surrounded by parentheses or is a function call
  //remove outer parentheses if they functions as a grouper
  if (/^[\+\-]?\(.*\)$/.test(s)) {
    if (s[0] !== "-") {
      return calc(s.replace(/^\+?\((.*)\)$/, "$1"), options);
    } else {
      return -calc(s.replace(/^\-\((.*)\)$/, "$1"), options);
    }
  }
  if (/^[\+\-]?[a-zA-Z\.]+[\d\.]*\(.*\)$/.test(s)) {
    var funcCall = s.replace(/^[\+\-]?([a-zA-Z\.]+[\d\.]*)\(.*\)$/, "$1");
    var params = s.replace(/^[\+\-]?[a-zA-Z\.]+[\d\.]*\((.*)\)$/, "$1");
    var commas = [];
    var args = [];
    if (!functions[funcCall]) {
      throw new Error("Unrecognized function: " + funcCall);
    }
    if (params.length > 0) {
      for (var i = 0; i < params.length; i++) {
        if (params[i] === "(") {
          balancedParen++;
        } else if (params[i] === ")") {
          balancedParen--;
        } else if (params[i] === "," && balancedParen === 0) {
          commas.push(i);
        }
      }
      commas.push(params.length);
      args.push(calc(params.slice(0, commas[0]), options));
      for (var i = 0; i < commas.length; i++) {
        args.push(calc(params.slice(commas[i] + 1, commas[i + 1]), options));
      }
    }
    var res = functions[funcCall].apply(functions, args);
    if (isNaN(res)) {
      throw new Error("Error");
    }
    if (s[0] !== "-") {
      return res;
    } else {
      return -res;
    }
  }
  throw new Error("Error")
}
