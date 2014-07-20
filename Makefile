CAT=type

all: scrape build

build:
	cd src && echo ^ var stylesheet = ^"\> stylesheet.js
	cd src && stylus -c -p stylesheet.styl >> stylesheet.js 
	cd src && echo ^"; >> stylesheet.js
	cd src && $(CAT) header.js stylesheet.js fuse.min.js emotes.js post_insert.js > saefacepunch.user.js && mv saefacepunch.user.js ..

scrape:
	cd scraper && node find_emotes.js && mv emotes.js ../src