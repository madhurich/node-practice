function myFunc(){
	console.log("this is in module1");
}

var myQuote = "Work Hard"; 

module.exports.myFunc = myFunc;
module.exports.myQuote = myQuote;