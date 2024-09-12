# Define variables for commands
YARN_CLEAN = yarn clean
YARN_BUILD = yarn build
SHELL_SCRIPT = ./update_css.sh

# Define the default target
all: clean build run-script

# Target to run yarn clean
clean:
	$(YARN_CLEAN)

# Target to run yarn build
build:
	rm -rf build
	yarn build
	./build.sh

# Target to execute the shell script
run-script:
	$(SHELL_SCRIPT)

# Optional: Define a target to run all steps
.PHONY: all clean build run-script

