# Calc
Calc is a JavaScript mathematical expression evaluator. Simply use it like this:

    calc("round((3+2*3/7)^2*pi, 3)"); //will return 46.739

## Syntax
    calc(expression[, options]);


+ *expression*: a string of a mathematical expression that would be evaluated
+ *options*: an object that specifies the following options when the expression is evaluated
  + *constants*: an object that specifies a list of constants to be used when evaluating the expression
  + *functions*: an object that specifies a list of functions to be used when evaluating the expression
  + *includeDefaults*: an object that specifies whether to include the default constants and functions
    + *constants*: a boolean that specifies whether to include the default constants; defaults to true if undefined
    + *functions*: a boolean that specifies whether to include the default functions; defaults to true if undefined

## Usage
### Expression
The expression is the first argument of the function and represents a mathematical expression.

#### Operations
Calc supports the following arithmetic operations (in the order of how they are evaluated):

|Order|Name|Symbol|Description|Example|
|-----|----|------|-----------|-------|
|1|Parentheses|( and )|Groups an expression that should be evaluated first; also acts as a function call|3\*(2+3) === 15; max(1, 2, 3) === 3|
|2|Unary positive|\+|Causes the following number to be positive|\+3 === 3|
|2|Unary negation<sup>†</sup>|-|Negates the following number|-3 === -3|
|3|Exponentiation|^|Raises a number to the specified power; evaluated right to left|3^2 === 9; 3^0.23 === 1.2874722840771342|
|4|Multiplication|\*|Multiplies a number by another number; evaluated left to right|6\*2 === 12; 3.2*1.342 === 4.2944|
|4|Division|/|Divides a number by another number; evaluated left to right|5/3 === 1.6666666666666667; -3/1.3 === -2.3076923076923075|
|4|Modulus|%|Divides a number by another number and returns the remainder; evaluated left to right|34%2 === 0; -1131%34 === -9|
|5|Subtraction|-|Subtracts a number from another number; evaluated left to right|5-3 === 2; 3-1.3 === 1.7|
|5|Addition|+|Adds a number to anther number; evaluated left to right|6+3 === 9; 3.1+1.342 === 4.442|

<sup>† Even though the symbol for negation is the same as subtraction, it is treated differently than subtraction in that it has a higher priority than exponentiation. For example, -3^2 === 9, but 0-3^2 === -9.</sup>

#### Predefined constants
Calc includes two predefined constants (constants can be specified via the options argument; read more in the options section). Please note that constants are case-sensitive (e.g., pi !== Pi).

|Name|Value|Description|
|----|-----|-----------|
|pi|3.141592653589793|The ratio of a circle's circumference to its diameter|
|e|2.718281828459045|Euler's constant; the limit of (1+1/n)^n as n goes to Infinity|

#### Predefined functions
In addition to two constants, calc also pre-defines several basic functions (read about custom functions in the options section). These functions can be roughly divided into five groups: statistics, rounding, logarithmic, trigonometric, and random. Please note that functions are case-sensitive (e.g., sum !== SUM).

##### Statistics
The max and min function uses the Javascript built-in functions.

|Name|Arguments|Description|Example|
|----|---------|-----------|-------|
|sum|[num1[, num2[, num3...]]]|Returns the sum of all the arguments (num1+num2+num3...); 0 if no arguments|sum(3, pi, 3^2, (1+0.3)) === 16.441592653589794|
|count|[num1[, num2[, num3...]]]|Returns the number of arguments|count(3, 4,  2, 32, e^2^3) === 5|
|average|num1[, num2[, num3...]]|Returns the arithmetic mean of all the arguments (num1+num2+num3...)/(the number of arguments); error if no arguments|average(3, e, 3^e, (pi+0.3*2^3)) === 7.768216306830871|
|max|[num1[, num2[, num3...]]]|Returns the maximum number of all the arguments; -Infinity if no arguments|max(1, 2, 3, 10e+2, pi) === 1000|
|min|[num1[, num2[, num3...]]]|Returns the minimum number of all the arguments; Infinity if no arguments|max(1, 2, 3, 10e+2, pi) === 1|

##### Rounding
These round functions use the built-in JavaScript functions.

|Name|Arguments|Description|Example|
|----|---------|-----------|-------|
|round|num[, decimal]|Rounds the number to the specified number of decimal places after the decimal point (defaults to 0); error if no arguments|round(pi, 3) === 3.142|
|ceil|num[, decimal]|Rounds the number to the specified number of decimal places after the decimal point (defaults to 0) towards positive Infinity; error if no arguments|ceil(pi, 2) === 3.15|
|floor|num[, decimal]|Rounds the number to the specified number of decimal places after the decimal point (defaults to 0) towards negative Infinity; error if no arguments|floor(pi, 3) === 3.141|

##### Logarithmic
These logaritmic functions depend on the built-in JavaScript functions. For log2 and log10, polyfill functions are used if the JavaScript functions are unavailable.

|Name|Arguments|Description|Example|
|----|---------|-----------|-------|
|ln|num|Returns the natural logarithm of num (logarithm with base e); num ≥ 0; error if no arguments|log(3) === 1.0986122886681098|
|log|num[, base]|Returns the logaritm with the specified base (defaults to 10); num ≥ 0 and base > 0; error if no arguments|log(10, 3) === 2.095903274289385|
|log2|num|Returns the binary logarithm of num (logarithm with base 2); num ≥ 0; error if no arguments|log2(64) === 6|
|log10|num|Returns the common logarithm of num (logarithm with base 10); num ≥ 0; error if no arguments|log10(3e+100) === 100.47712125471966|

##### Trigonometric
Most of these trigonometric functions depend on the built-in JavaScript functions. For trigonometric functions using degrees, there might be a slight inaccuracy in the result. Use the round() function. For hyperbolic trigonometric functions, a polyfill is used if built-in functions are unavailable.

|Name|Arguments|Description|Example|
|----|---------|-----------|-------|
|sin|num|Returns the sine of num (in radians); error if no arguments|sin(1) === 0.8414709848078965|
|sind|num|Returns the sine of num (in degrees); error if no arguments|sind(45) === 0.7071067811865475|
|asin|num|Returns the principal arcsine (in radians) of num; between -π/2 and π/2 (inclusive); -1 ≤ num ≤ 1; error if no arguments|asin(0.5) === 0.5235987755982988|
|asind|num|Returns the principal arcsine (in degrees) of num; between -90˚ and 90˚ (inclusive); -1 ≤ num ≤ 1; error if no arguments|asind(0.5) === 29.999999999999996|
|sinh|num|Returns the hyperbolic sine of num; error if no arguments|sinh(1) === 1.1752011936438014|
|asinh|num|Returns the area hyperbolic sine of num; error if no arguments|asinh(1) === 0.8813735870195429|
|cos|num|Returns the cosine of num (in radians); error if no arguments|cos(1) === 0.5403023058681398|
|cosd|num|Returns the cosine of num (in degrees); error if no arguments|cosd(45) === 0.7071067811865476|
|acos|num|Returns the principal arccosine (in radians) of num; between 0 and π (inclusive); -1 ≤ num ≤ 1; error if no arguments|acos(0.5) === 1.0471975511965976|
|acosd|num|Returns the principal arccosine (in degrees) of num; between 0 and 90˚ (inclusive); -1 ≤ num ≤ 1; error if no arguments|acosd(0.5) === 59.99999999999999|
|cosh|num|Returns the hyperbolic cosine of num; error if no arguments|cosh(1) === 1.5430806348152437|
|acosh|num|Returns the area hyperbolic cosine of num; num ≤ 1; error if no arguments|acosh(1) === 0|
|tan|num|Returns the tangent of num (in radians); error if no arguments|tan(1) === 1.5574077246549023|
|tand|num|Returns the tangent of num (in degrees); error if no arguments|tand(45) === 0.9999999999999999|
|atan|num|Returns the principal arctangent (in radians) of num; between -π/2 and π/2 (inclusive); error if no arguments|atan(0.5) === 0.46364760900080615|
|atan2|num1[, num2]|Returns the principal arctangent (in radians) of num1 / num2; between -π and π (inclusive); error if no arguments|atan2(3, -2) === 2.158798930342464|
|atand|num|Returns the principal arctangent (in degrees) of num; between -90˚ and 90˚ (inclusive); error if no arguments|atand(0.5) === 26.56505117707799|
|atand2|num1[, num2]|Returns the principal arctangent (in degrees) of num1 / num2; between -180˚ and 180˚ (inclusive); error if no arguments|atand(3, -2) === 123.69006752597979|
|tanh|num|Returns the hyperbolic tangent of num; error if no arguments|tanh(1) === 0.7615941559557649|
|atanh|num|Returns the area hyperbolic tangent of num; -1 ≤ num ≤ 1; error if no arguments|atanh(1) === Infinity|

##### Random
These functions depend on the built-in JavaScript Math.random() function.

|Name|Arguments|Description|Example|
|----|---------|-----------|-------|
|rand|[num1[, num2]]|Returns a random number between num1 (inclusive) and num2 (exclusive); returns a random number between 0 (inclusive) and num1 (exclusive) if num2 is not specified; returns a random number between 0 (inclusive) and num1 (exclusive) if num2 is not specified|rand(2,3) === 2.4776391049381346|
|randInt|[num1[, num2]]|Returns a random integer between num1 (inclusive) and num2 (inclusive); returns a random integer between 0 (inclusive) and num1 (inclusive) if num2 is not specified; returns a random integer between 0 (inclusive) and num1 (inclusive) if num2 is not specified|randInt(2, 3) === 3|

### Options
Calc allows several options to be set when evaluating the expression.

#### Constants and functions
Calc allows setting custom constants and functions to be used when evaluating the expression in addition to the ones predefined. The names of custom constants and functions must start with one or more alpabetical characters and the period, and they may end with a series of numbers and the period. Thus, "hello2.32.2" is a valid function name, but "hel2o" is not. In addition, the value of custom constants and functions must be a Javascript number and function, respectively. It is also possible to override the predefined constants and functions.

    calc("phi^2-phi-1+pi", {constants: {phi: calc("(1+5^0.5)/2"), pi: 2}}); //will return 0
    calc("if.eq(phi^2+1, phi, 5, 4)", {constants: {phi: calc("(1+5^0.5)/2")}, functions: {"if.eq": function (num1, num2, t, f) {return num1 === num2 ? t : f;}}}); //will return 4

#### Include defaults
Calc also allows the choice of whether or not to include the predefined constants, which are by default included.

    calc("3+pi", {includeDefaults: {constants: false}}); //will throw error
    calc("tan(3)", {includeDefaults: {functions: false}}); //will throw error
    calc("tan(3)", {includeDefaults: {constants: false}}); //will not throw error, as functions are included
    calc("tand(3)", {includeDefaults: {constants: false, functions: undefined}}); //will not throw error, as setting it to undefined will instruct calc to include it
