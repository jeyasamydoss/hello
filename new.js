const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const Port = 3000;

app.post('/studata', (req, res) => {
console.log(req.body);
const data = req.body.data;

fs.appendFile('./test.txt', data, (err) => {
if (err) {
console.error('The file is showing an error');
res.status(500).send('Error while appending');
} else {
console.log('File successfully saved');
res.status(200).send('File saved into test.txt');
}
});
});

app.get('/getdata', (req, res) => {
fs.readFile('./test.txt', (err, data) => {
if (err) {
console.error('Error reading the file');
res.status(500).send('Error reading the file');
} else {
console.log('File content retrieved');
res.status(200).send(data);
}
});
});

app.put('/updatedata', (req, res) => {
console.log(req.body);
const newData = req.body.data;

fs.writeFile('./test.txt', newData, (err) => {
if (err) {
console.error('Error updating the file');
res.status(500).send('Error updating the file');
} else {
console.log('File successfully updated');
res.status(200).send('File updated');
}
});
});

app.delete('/deletedata', (req, res) => {
fs.unlink('./test.txt', (err) => {
if (err) {
console.error('Error deleting the file');
res.status(500).send('Error deleting the file');
} else {
console.log('File successfully deleted');
res.status(200).send('File deleted');
}
});
});

app.listen(Port, () => console.log(`This application runs on ${Port}`));

