#Parking lot problems

Install dependencies
"npm install formidable"

Run the main server
"node upload_file.js"

Run tests cases file
• Install all dependencies.<br/>
• Run the main server (make sure there are success message displayed on the terminal: "server listening on http://localhost:8000").<br/>
• Create a tests case file (or use file_input.txt file). <br />
• Open http://localhost:8000/ on your browser. <br />
• Choose the file_input.txt or test case file from the form displayed. <br />
• Click upload and the output will be displayed. <br />

_____________________________________________________________________________________________________

Problem Statement:

I own a parking lot that can hold up to 'n' cars at any given point in time. Each slot is 
given a number starting at 1 increasing with increasing distance from the entry point 
in steps of one. I want to create an automated ticketing system that allows my 
customers to use my parking lot without human intervention.
When a car enters my parking lot, I want to have a ticket issued to the driver. The 
ticket issuing process includes us documenting the registration number (number 
plate) and the colour of the car and allocating an available parking slot to the car 
before actually handing over a ticket to the driver (we assume that our customers are 
nice enough to always park in the slots allocated to them). The customer should be 
allocated a parking slot which is nearest to the entry. At the exit the customer returns 
the ticket with the time the car was parked in the lot, which then marks the slot they 
were using as being available. Total parking charge should be calculated as per the 
parking time. Charge applicable is $10 for first 2 hours and $10 for every additional 
hour.
We interact with the system via a simple set of commands which produce a specific 
output. Please take a look at the example below, which includes all the commands 
you need to support - they're self explanatory. The system should accept a filename
as a parameter at the command prompt and read the commands from that file.

Commands:
• Create parking lot of size n : create_parking_lot 
{capacity}
• Park a car : park {car_number} • Remove(Unpark) car from : leave {car_number} {hours}
• Print status of parking slot : status

Input (contents of file):

create_parking_lot 6 <br />
park KA-01-HH-1234 White <br />
park KA-01-HH-9999 White <br />
park KA-01-BB-0001 Black <br />
park KA-01-HH-7777 Red <br />
park KA-01-HH-2701 Blue <br />
park KA-01-HH-3141 Black <br />
leave 4 <br />
status <br />
park KA-01-P-333 White <br />
park DL-12-AA-9999 White <br />
registration_numbers_for_cars_with_colour White <br />
slot_numbers_for_cars_with_colour White <br />
slot_number_for_registration_number KA-01-HH-3141 <br />
slot_number_for_registration_number MH-04-AY-1111 <br />

Output (to STDOUT):

Created a parking lot with 6 slots <br />
Allocated slot number: 1 <br />
Allocated slot number: 2 <br />
Allocated slot number: 3 <br />
Allocated slot number: 4 <br />
Allocated slot number: 5 <br />
Allocated slot number: 6 <br />
Slot number 4 is free <br />
Slot No. Registration No <br />
Colour <br />
1 <br />
KA-01-HH-1234 <br />
White <br />
2 <br />
KA-01-HH-9999 <br />
White <br />
3 <br />
KA-01-BB-0001 <br />
Black <br />
5 <br />
KA-01-HH-2701 <br />
Blue <br />
6 <br />
KA-01-HH-3141<br />
Black <br />
Allocated slot number: 4 <br />
Sorry, parking lot is full <br />
KA-01-HH-1234, KA-01-HH-9999, KA-01-P-333 <br />
1, 2, 4 <br />
6 <br />
Not found <br />