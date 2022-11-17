//Initiallising node modules
const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const Cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("./config/jwtConfig");
// var app = express(); 
// import express from 'express';
// import bodyParser from 'body-parser';
// import sql from 'mssql';
// import Cors from 'cors';
// import bcrypt from 'bcrypt';
// import jwtSecret from '/config/jwtConfig';
// import jwt from 'jsonwebtoken';
const app = express(); 
//----SECURITY PART--------


// const API_PORT = process.env.API_PORT || 3000;

// Body Parser Middleware
app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(Cors());
//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
const server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

// app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

//Initializing connection string
const dbConfig = {
    user: 'azureuser',
    password: 'Root_password',
    server: 'ofbank-test.database.windows.net',
    database: 'MA-test',
    // If you are on Microsoft Azure, you need this:
    options: {encrypt: true}
};
  


//Function to connect to database and execute query
var executeQuery = function(res, query){
    sql.connect(dbConfig, (err) => {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function(err, rs) {
            if (err) {
                console.log("Error while querying database :- " + err);
                res.send(err);
                sql.close();
            }
            else {
                // console.log(rs);
                // res.send(rs);
                console.log('user created in db');
                res.status(200).send({ message: 'user created' });
                sql.close();
            }
            });
        }
    });
}

//------------LOGIN USER----------------------------------
app.get('/loginUser', (req , res) => {

        const findOneMatchQuery = "SELECT TOP 1 * from Users WHERE username = \'"+ req.query.username+"\'";
        
        sql.connect(dbConfig, (err) => {
            if (err) {
                console.log("problem communicating with db " );
                res.status(500).json(err)
                // res.send(err);
            }
            else {
                // create Request object
                var request = new sql.Request();
                // query to the database
                request.query(findOneMatchQuery, (err, rs) => {
                    if (err) {
                        console.log("Error while querying database :- " + err);
                        res.status(500).json(err)
                        sql.close();
                    }
                    else {
                        // console.log(rs[0].password)
                        const findOneMatchResult = rs[0];
                        bcrypt.compare(req.query.password,findOneMatchResult.password).then(response => {
                            if(response === true){
                                const token = jwt.sign({id:findOneMatchResult.username}, jwtSecret.jwtSecret, {
                                    expiresIn: 86400,
                                });
                                console.log('user found & logged in');
                                res
                                .status(200)
                                .send({ auth: true, token, message: 'user found & logged in' });
                                sql.close();
                            } else {
                                console.log('passwords do not match');
                                res.status(400).send({
                                auth: false,
                                token: null,
                                message: 'passwords do not match',
                                });
                            }
                        });
                        // console.log(rs);
                    }
                });
            }
        });
        
        // console.log(req)
        // var findOneMatchResult = executeQuery(res,findOneMatchQuery);
        // console.log("ASDASDAS")
        // console.log(findOneMatchResult);
        // obj = JSON.stringify(findOneMatchResult);
        // var temp = JSON.parse(obj)
        // console.log(obj)
        // bcrypt.compare(req.query.password,findOneMatchResult.password).then(response => {
        //     if(response === true){
        //         const token = jwt.sign({id:findOneMatchResult.username}, jwtSecret.jwtSecret, {
        //             expiresIn: 86400,
        //         });
        //     }
        // });

        // if(req.body.password == false || req.body.password === '')
                // var query = "select * from Users";
                // executeQuery (res, query);
});

//------------REGISTER USER-------------------------------
const BCRYPT_SALT_ROUNDS = 12;
 app.post("/registerUser", (req , res) => {
    // var query = "INSERT INTO Users (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
    // executeQuery (res, query);

    const data = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        birthday: req.body.birthday,
        civilStatus: req.body.civilStatus,
        address: req.body.address,
        mobileNumber: req.body.mobileNumber,
        emailAddress: req.body.emailAddress,
    };

    const findOneMatchQuery = "SELECT TOP 1 * from Users WHERE username = \'"+ data.username+"\' OR emailAddress = \'" + data.emailAddress + "\'";
        
    sql.connect(dbConfig, (err) => {
        if (err) {
            console.log("problem communicating with db " );
            res.status(500).json(err)
            // res.send(err);
        }
        else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            
            request.query(findOneMatchQuery, (err, rs) => {
                console.log(rs)
                // var checkObject = [];
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.status(500).json(err)
                    sql.close();
                }
                else {
                    if(typeof rs[0] != 'undefined'){
                        console.log('username/email_address already taken');
                        res.json('username/email_address already taken');
                    }else{
                        bcrypt
                        .hash(data.password, BCRYPT_SALT_ROUNDS)
                        .then((hashedPassword) => {
                        
                            const createUserQuery = "INSERT INTO Users (firstName, middleName, lastName, username, password, birthday, civilStatus, address, mobileNumber, emailAddress) VALUES ("+
                            "\'"+data.firstName+
                            "\',\'"+data.middleName+
                            "\',\'"+data.lastName+
                            "\',\'"+data.username+
                            "\',\'"+hashedPassword+
                            "\',\'"+data.birthday+
                            "\',\'"+data.civilStatus+
                            "\',\'"+data.address+
                            "\',\'"+data.mobileNumber+
                            "\',\'"+data.emailAddress+"\')"
                            // console.log(createUserQuery);
                            executeQuery(res,createUserQuery);
                            // then(() => {
                            //     console.log('user created in db');
                            //     res.status(200).send({ message: 'user created' });
                            // });
                            
                        // User.create({
                        //     firstName: data.firstName,
                        //     middleName: data.middleName,
                        //     lastName: data.lastName,
                        //     username: data.username,
                        //     password: hashedPassword,
                        //     birthday: data.birthday,
                        //     civilStatus: data.civilStatus,
                        //     address: data.address,
                        //     mobileNumber: data.mobileNumber,
                        //     emailAddress: data.emailAddress,
                        // })
                        });
                    }
                }
            });
        }
    });


});


// //GET API
// app.get("/api/get", function(req , res){
//                 var query = "select * from Users";
//                 executeQuery (res, query);
// });

// app.get('/customers', function (req, res) {
//     sql.connect(dbConfig, function() {
//         var request = new sql.Request();
//         request.query('select * from Users', function(err, recordset) {
//             if(err) console.log(err);
//             res.end(JSON.stringify(recordset)); // Result in JSON format
//         });
//     });
// })

// //POST API
//  app.post("/api/post", function(req , res){
//                 var query = "INSERT INTO Users (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
//                 executeQuery (res, query);
// });

// //PUT API
//  app.put("/api/user/:id", function(req , res){
//                 var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
//                 executeQuery (res, query);
// });

// // DELETE API
//  app.delete("/api/user /:id", function(req , res){
//                 var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
//                 executeQuery (res, query);
// });