#! /bin/bash

# run this script from the modding directory: ./scripts/build.sh
# It will build the entire project for production

set -e

# Apply patch to genieutils if needed
if [ -f genieutils-cmake.patch ] && [ -d genieutils ]; then
    cd genieutils
    if ! git diff --quiet CMakeLists.txt; then
        echo "Patch already applied or CMakeLists.txt already modified"
    else
        echo "Applying genieutils CMakeLists.txt patch..."
        patch -p1 < ../genieutils-cmake.patch
    fi
    cd ..
fi

mkdir -p build
cmake -S . -B build -DSTATIC_COMPILE=TRUE
cmake --build build
