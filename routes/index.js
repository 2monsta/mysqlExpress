var express = require('express');
var router = express.Router();
var sql = require("mysql");
// include mysql node module
//create connection is a method of sql object included aboce
// that takes 1 arg which is an object with properties

var connection = sql.createConnection({
	host: "127.0.0.1",
	user: "x",
	password:"x",
	database: "classicmodels"
})
connection.connect((error)=>{
	if(error){
		console.log(error.stack);
		return;
	}
	else{
		console.log("connected as id " + connection.threadId);
	}
})



/* GET home page. */

router.get("/", (req, res, next)=>{
	res.render("index");
})
// PRODUCTLINE GET
router.get('/productline', function(req, res, next) {
	var selectQuery = "SELECT * FROM productLines;";
	// call query agasint our connection, takes 2 args, query to run, and call back function
	// the callback with error , results, fields
	connection.query(selectQuery,(error, results, fields)=>{
		// res.json(results);
		res.render("productline", {results});
	});
  	// res.render('index', { title: 'Express' });
});
// PRODUCTLINE POST
router.post("/productLine", (req, res, next)=>{
	var productLineInfo = req.body.productLine;
	var tDescription =  req.body.textDescription;
	var hDescription = req.body.htmlDescription;
	var productImage = req.body.image;
	// var insertQuery = `INSERT INTO productLines (productLine, textDescription, htmlDescription, image) VALUES ('${productLineInfo}', '${tDescription}', '${hDescription}', '${productImage}');`;
	// console.log(insertQuery);
	var insertQuery = `INSERT INTO productLines (productLine, textDescription, htmlDescription, image) VALUES (?,?,?,?);`;
	
	connection.query(insertQuery, [productLineInfo,tDescription,hDescription,productImage], function(error, results, field){
		res.redirect("/productline");
	})
})


//need TO change deleteQuery
router.get("/deletePost/:id", function(req, res, next){
	var postToDelete = req.params.id;
	var deleteQuery = `delete from productLines where productLine = ?;`;
	connection.query(deleteQuery,[postToDelete], (error, results, field)=>{
		if(error){
			console.log(error);
		}else{
			console.log("you have delete me succesfully");
			res.redirect("/productline");
		}
	});
});


// OFFICES GET
router.get("/offices", (req, res, next)=>{
	var selectQuery = "SELECT * FROM offices;";
	connection.query(selectQuery, (error, results, field)=>{
		res.render("offices", {results:results});	
	})
});

// CUSTOMERS GET
router.get("/customers", (req, res, next)=>{
	var selectQuery = "SELECT customerName,customerNumber, city, phone, country, salesRepEmployeeNumber FROM customers;";
	connection.query(selectQuery, (error, results, field)=>{
		res.render("customers", {results:results});	
	})
});

// EMPLOYEE GET
router.get("/orders", (req, res, next)=>{
	res.render("orders");
});

module.exports = router;
