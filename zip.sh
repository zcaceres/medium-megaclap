#!/bin/bash
set -eo pipefail

cd ./src && zip -r medium-megaclap ./ && mv medium-megaclap.zip ../
echo "READ ME: DID YOU BUMP THE VERSION NUMBER IN THE MANIFEST.JSON?"
