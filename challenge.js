// Set node filesystem
const fs = require("fs");

// Read content of log file. Use synchronous readFileSync due to small log file size
const content = fs.readFileSync(
	"./programming-task-example-data_(1).log",
	"utf-8"
);

// Set lines variable.
let lines = content
	// Remove whitespaces and split string into an array of substrings each on a new line
	.trim()
	.split("\n")
	// Map over array of lines and further split with regex at every line of - or " symbol. Use regex to filter and return lines that match any alphanumeric character
	.map(function (line) {
		return line.split(/( -|")/gi).filter(function (str) {
			return /\w/.test(str);
		});
	});

// Obtain list of IPs. Map over lines at element position 0 to obtain IP addresses. Count unique IPs
let ipList = lines.map((x) => x[0]);
let uniqueIpCount = new Set(ipList).size;

// Obtain URLs. Map over lines at element position 2 to obtain URL addresses. Map again to remove GET and HTTP
let rawUrlList = lines.map((x) => x[2]);
let urlList = rawUrlList
	.map((x) => x.split(" "))
	.flat()
	.filter(function (str) {
		return /^(?!GET|HTTP)/.test(str);
	});
// Map over urlList to obtain root URLs
let urlRootList = urlList
	.map((x) => x.split("/"))
	.map((x) => x[1])
	.filter(function (str) {
		return /\w/.test(str);
	});

// Count unique URLs
let uniqueUrlCount = new Set(urlRootList).size;

// Count URL occurrences
let urlCount = {};

for (const count of urlRootList) {
	urlCount[count] = (urlCount[count] || 0) + 1;
}

// Sort URL occurrences descending
const urlSort = Object.fromEntries(
	Object.entries(urlCount).sort(([, a], [, b]) => b - a)
);

// Obtain top 3 URLs. Loop and push into topUrls array
topUrls = [];
for (let i = 0; i < 3; i++) {
	topUrls.push(Object.keys(urlSort)[i]);
}

// Count occurrences of IP addresses.
let ipCount = {};

for (const count of ipList) {
	ipCount[count] = (ipCount[count] || 0) + 1;
}

// Sort IP occurrences descending
const ipSort = Object.fromEntries(
	Object.entries(ipCount).sort(([, a], [, b]) => b - a)
);

// Obtain top 3 IPs. Loop and push into topIps array
topIps = [];
for (let i = 0; i < 3; i++) {
	topIps.push(Object.keys(ipSort)[i]);
}

console.log(`The number of unique ip addresses is: ${uniqueIpCount}`);
console.log(
	`The top 3 most visited URLs are: ${topUrls[0]}, ${topUrls[1]} and ${topUrls[2]}`
);
console.log(
	`The top 3 most active IPs are: ${topIps[0]}, ${topIps[1]} and ${topIps[2]}`
);

module.exports = { uniqueIpCount, ipCount, topUrls, topIps };
