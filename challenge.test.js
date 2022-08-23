const { uniqueIpCount, ipCount, topUrls, topIps } = require("./challenge");

describe("Unique IPs", () => {
	it("should return only 11 unique IPs", () => {
		expect(uniqueIpCount).toEqual(11);
	});
	it("should have the same amount of IP keys as unique IPs", () => {
		expect(Object.keys(ipCount).length).toEqual(11);
	});
});

describe("Top 3 visited URLs", () => {
	it("should return 3 URL keys with the highest frequency value", () => {
		expect(topUrls[0]).toEqual("docs");
		expect(topUrls[1]).toEqual("faq");
		expect(topUrls[2]).toEqual("blog");
	});
});

describe("Top 3 active IPs", () => {
	it("should return 3 IP keys with the highest frequency value", () => {
		expect(topIps[0]).toEqual("168.41.191.40");
		expect(topIps[1]).toEqual("177.71.128.21");
		expect(topIps[2]).toEqual("50.112.00.11");
	});
});
