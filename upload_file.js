//this file is the main server file where the magic begin


//define class Car from car_model.js as constanta Car, so we can use it on this file
const Car = require('./car_model')

//define http module to http constanta, so we can use it on this file
var http = require('http');

//define fs module to fs constanta, so we can use it on this file
//fs is a library to read file
var fs = require('fs');

//define formidable module to formidable constanta, so we can use it on this file
//formidable is a library to show form on nodejs
var formidable = require('formidable');

http.createServer(function (req, res)
{
	//it's the place where the user open the page for the first time
	//it will show the upload form
	if (req.url === "/" && req.method === "GET")
	{
		//read upload form from file form_upload.html and show it
		fs.readFile("form_upload.html", (err, data) =>
		{
			//add html header
			res.writeHead(200, { 'Content-Type': 'text/html' });

			//if error throw the error
			if (err)
			{
				throw err;
			}

			//show the form to response (res.end)
			res.end(data);
		});
	}

	//it's the place where the user already submit the file (testcase file)
	//it will show the output of the processed file (processes with the test rules)
	if (req.url == '/' && req.method === "POST")
	{
		//create form object using formidable
		var form = new formidable.IncomingForm();

		//parse the uploaded content
		form.parse(req, function (err, fields, files)
		{
			//read the file
			fs.readFile(files.filetoupload.path, function (err, data)
			{
				//parse the data to string so we can manipulate using String command
				let stringData = String(data);

				//split stringData per command by splitting it per they found \n 
				inputData = stringData.split("\n");

				//define the variable for response output (res.end)
				resEnd = "<p>";

				//array for storing parked cars data
				let cars = [];

				//itterate through all the splited command string
				for (let i = 0; i < inputData.length; i++)
				{
					//for each command splited again (per word) so we can know which function and parameter they call
					let inputLine = inputData[i].split(" ");

					//protection to check if there are no word at all on the current command
					if(inputLine.length>0)
					{
						//check the first word (index 0) of current command, to check what command did they use
						switch(inputLine[0])
						{
							//if current command is create parking lot
							case "create_parking_lot":

								//protection for how much parameter did the current command use
								if (inputLine.length > 1)
								{
									//get the second (index: 1) parameter as parkingLotSize
									let parkingLotSize = parseInt(inputLine[1]);

									//check wheter the parking lot size is on the wrong format
									if (isNaN(parkingLotSize))
									{
										parkingLotSize = 0;
									}

									//check wheter the parking lot size is bigger than 0
									if (parkingLotSize > 0)
									{
										//initialize / reinitialize the cars array by creating new array and pushing it with null for parking lot size times
										cars = [];
										for (let j = 0; j < parkingLotSize; j++)
										{
											cars.push(null);
										}

										//add the message to the response (res.end)
										resEnd = resEnd + "Created parking lot with " + parkingLotSize + " slots<br/>";
									}
									//error because parking lot size is on the wrong format or no more than zero
									else
									{
										resEnd = resEnd + "Error parking lot size should be number and bigger than 0<br/>";
									}
								}
								//error because the parameter count is not match the command parameter count
								else
								{
									resEnd = resEnd + "Error input format<br/>";
								}
								break;

							//if current command is park
							case "park":
								//protection for how much parameter did the current command use
								if (inputLine.length > 1)
								{
									//get the second (index: 1) parameter as carNumber
									let carNumber = inputLine[1];

									//this variable is for checking if the insert command is success or not
									let allocated = false;
									
									//itterate through all car in the parking lot
									for (let j = 0; j < cars.length; j++)
									{
										//check if current itteration parking lot is available (is null)
										if (cars[j] == null)
										{
											//create new Car using the carNumber entered
											cars[j] = new Car(carNumber);
											
											//add the message to the response (res.end)
											resEnd = resEnd + "Allocated slot number: " + (j + 1) + "<br/>";

											//set allocated status to true
											allocated = true;

											//break itteration process
											break;
										}
									}

									//if the insert command is not success
									if (!allocated)
									{
										resEnd = resEnd + "Sorry, parking lot is full<br/>";
									}
								}
								//error because the parameter count is not match the command parameter count
								else
								{
									resEnd = resEnd + "Error input format<br/>";
								}
								break;
							
							//if current command is leave
							case "leave":
								//protection for how much parameter did the current command use
								if (inputLine.length > 2)
								{
									//get the second (index: 1) parameter as carNumber
									let carNumber = inputLine[1];

									//get the third (index: 2) parameter as parkTime
									let parkTime = inputLine[2];

									//variable to know if the leaving car is found or not
									let found = false;

									//itterate through all car in the parking lot
									for (let j = 0; j < cars.length; j++)
									{
										//check if current itteration parking lot is not empty (!= null)
										if (cars[j] != null)
										{
											//check wether the carNumber is equal current itteration carNumber
											if (cars[j].carNumber === carNumber)
											{
												//variable for counting how much charge applied to the current car owner
												let charge;

												//if there are no park time or minus zero
												if (parkTime <= 0)
												{
													charge = 0;
												}
												//if the park time is 1 or 2 (charge 5 dollars per hour)
												else if (parkTime <= 2)
												{
													charge = 10;
												}
												//everything else (charge 10 dollars per hour)
												else
												{
													charge = 10 + (parkTime - 2) * 10;
												}

												//add the message to the response (res.end)
												resEnd = resEnd + "Registration number " + cars[j].carNumber + " with Slot Number " + (j + 1) + " is free with Charge " + charge + "<br/>";

												//remove current car from the parking lot
												cars[j] = null;

												//set the found status to true
												found = true;

												//break itteration process
												break;
											}
										}
									}
									//error because the parameter count is not match the command parameter count
									if (!found)
									{
										resEnd = resEnd + "Registration number " + carNumber + " not found<br/>";
									}
								}
								//error because the parameter count is not match the command parameter count
								else
								{
									resEnd = resEnd + "Error input format<br/>";
								}
								break;
							
							//if current command is status
							case "status":
								resEnd = resEnd + "Slot No.\tRegistration No.<br/>";

								//itteration to check the parking lot status
								for (let j = 0; j < cars.length; j++)
								{
									if (cars[j] != null)
									{
										//add the current itterated status to the response (res.end)
										resEnd = resEnd + (j + 1) + "\t" + cars[j].carNumber + "<br/>";
									}
								}
								break;
							
							//if current command is other than defined command
							default:
								resEnd = resEnd + "Error input format<br/>";
						}
					}
					//this else happen if there are no word at all on the current command
					else
					{
						resEnd = resEnd + "Error input format<br/>";
					}
				}
				//add the paragraph closing to the end of response
				resEnd = resEnd + "</p>";

				//add html header
				res.writeHead(200, {'Content-Type': 'text/html'});

				//write the resEnd to the html response
				res.write(resEnd);

				res.end();
			});
		});
	} 
}).listen(8000);

//show something on the terminal so the user of the server know if the server is already running
console.log("server listening on http://localhost:8000");