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
				var hasil = String(data);
				inputData = hasil.split("\n");
				resEnd = "";
				let parking_slots = [];
				let cars = [];
				for (var i = 0; i < inputData.length; i++)
				{
					var inputLine = inputData[i].split(" ");
					if(inputLine.length>0)
					{
						switch(inputLine[0])
						{
							case "create":
								resEnd = resEnd + "cre";
								break;
							case "park":
								resEnd = resEnd + "pak";
								break;
							case "leave":
								resEnd = resEnd + "lea";
								break;
							case "status":
								resEnd = resEnd + "sta";
								break;
						}
					}
				}
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(resEnd);
				res.end();
			});
		});
	} 
}).listen(8000);

console.log("server listening on http://localhost:8000");