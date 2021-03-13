const Car = require('./car_model')
var http = require('http');
var fs = require('fs');
var formidable = require('formidable');

http.createServer(function (req, res)
{
	//show upload form
	if (req.url === "/" && req.method === "GET")
	{
		fs.readFile("form_upload.html", (err, data) =>
		{
			res.writeHead(200, { 'Content-Type': 'text/html' });
			if (err) throw err;
			res.end(data);
		});
	}

	//upload file
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
				let hasil = String(data);
				inputData = hasil.split("\n");
				resEnd = "<p>";
				let cars = [];
				for (let i = 0; i < inputData.length; i++)
				{
					let inputLine = inputData[i].split(" ");
					if(inputLine.length>0)
					{
						switch(inputLine[0])
						{
							case "create_parking_lot":
								if (inputLine.length > 1)
								{
									let maxParkingLot = parseInt(inputLine[1]);
									if (isNaN(maxParkingLot))
									{
										maxParkingLot = 0;
									}
									if (maxParkingLot > 0)
									{
										cars = [];
										for (let j = 0; j < maxParkingLot; j++)
										{
											cars.push(null);
										}
										resEnd = resEnd + "Created parking lot with " + maxParkingLot + " slots<br/>";
									}
									else
									{
										resEnd = resEnd + "Error parking lot size should be bigger than 0<br/>";
									}
								}
								else
								{
									resEnd = resEnd + "Error input format<br/>";
								}
								break;
							case "park":
								if (inputLine.length > 1)
								{
									let carNumber = inputLine[1];
									let allocated = false;
									for (let j = 0; j < cars.length; j++)
									{
										if (cars[j] == null)
										{
											cars[j] = new Car(carNumber);
											resEnd = resEnd + "Allocated slot number: " + (j + 1) + "<br/>";
											allocated = true;
											break;
										}
									}
									if (!allocated)
									{
										resEnd = resEnd + "Sorry, parking lot is full<br/>";
									}
								}
								else
								{
									resEnd = resEnd + "Error input format<br/>";
								}
								break;
							case "leave":
								if (inputLine.length > 2)
								{
									let carNumber = inputLine[1];
									let parkTime = inputLine[2];
									let found = false;
									for (let j = 0; j < cars.length; j++)
									{
										if (cars[j] != null)
										{
											if (cars[j].carNumber === carNumber)
											{
												cars[j] = new Car(carNumber);

												let charge;
												if (parkTime <= 0)
												{
													charge = 0;
												}
												else if (parkTime <= 2)
												{
													charge = 10;
												}
												else
												{
													charge = 10 + (parkTime - 2) * 10;
												}
												resEnd = resEnd + "Registration number " + cars[j].carNumber + " with Slot Number " + (j + 1) + " is free with Charge " + charge + "<br/>";
												cars[j] = null;
												found = true;
												break;
											}
										}
									}
									if (!found)
									{
										resEnd = resEnd + "Registration number " + carNumber + " not found<br/>";
									}
								}
								else
								{
									resEnd = resEnd + "Error input format<br/>";
								}
								break;
							case "status":
								resEnd = resEnd + "Slot No.\tRegistration No.<br/>";
								for (let j = 0; j < cars.length; j++)
								{
									if (cars[j] != null)
									{
										resEnd = resEnd + (j + 1) + "\t" + cars[j].carNumber + "<br/>";
									}
								}
								break;
						}
					}
				}
				resEnd = resEnd + "</p>";
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(resEnd);
				res.end();
			});
		});
	} 
}).listen(8000);

console.log("server listening on http://localhost:8000");