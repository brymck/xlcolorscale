#!/bin/sh
name=xlcolorscale
DIR="$( cd "$( dirname "$0" )" && pwd )"
cd "$DIR/.."
echo "Enter version number (leave blank for none): "
read version
if [ "$version" != "" ]; then
  version="-$version"
fi

echo "Compiling $name.js to $name$version.min.js..."
java -jar ~/bin/compiler.jar --js $name.js --js_output_file $name$version.min.js

echo "Done!"

