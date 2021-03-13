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

				resEnd = "<ul>";
				for (var i = 0; i < inputData.length; i++)
				{
					resEnd = resEnd + "<li>" + inputData[i] + "</li>";
				}
				resEnd = resEnd + "</ul>";
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(resEnd);
				res.end();
			});
		});
	} 
}).listen(8000);

console.log("server listening on http://localhost:8000");