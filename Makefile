
NODE_MODULES_BIN = ./node_modules/.bin
JSHINT_OPTIONS   = --verbose --config config/jshint.json --reporter jslint


all:	build

clean:
	@echo ""
	@echo "  - Cleaning node modules ... "
	@rm -rf node_modules/* node_modules/.bin/


build:	install_modules

tests:	test

test:	build lint unit_tests

lint:	build dev_modules
	@echo ""
	@echo "  - Syntax checking (jshint) source files ... "
	@rm -f jslint.xml
	@PATH=${PATH}:${NODE_MODULES_BIN}  \
	  jshint ${JSHINT_OPTIONS} querybuilder/ test/ *.js > jslint.xml  ||  \
	  (echo "  *ERROR*: Lint failed. See jslint.xml for details." && exit 2)
	@echo "  - Syntax check results clean."


unit_tests:	build dev_modules
	./node_modules/.bin/mocha $(T) test/*.test.js


install_modules:
	@echo ""
	@echo "  - Installing modules ..."
	npm install --production

dev_modules:
	@echo ""
	@echo "  - Installing dev dependencies ..."
	npm install --development


.PHONY:	build clean tests test lint unit_tests install_modules dev_modules
