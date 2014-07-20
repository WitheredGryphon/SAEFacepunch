CAT=type

all: scrape build

build:
	cd src && $(CAT) header.js emotes.js post_insert.js > saefacepunch.user.js && mv saefacepunch.user.js ..

scrape:
	cd scraper && node find_emotes.js && mv emotes.js ../src