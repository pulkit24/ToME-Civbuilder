#! /bin/bash

# run this script from the modding directory: ./scripts/build.sh
# It will build the entire project for production

set -e

# Apply patch to genieutils if needed
if [ -f genieutils-cmake.patch ] && [ -d genieutils ]; then
    cd genieutils
    # Check if the patch has already been applied by looking for the added lines
    if grep -q "src/dat/ResearchLocation.cpp" CMakeLists.txt && grep -q "src/dat/unit/TrainLocation.cpp" CMakeLists.txt; then
        echo "Patch already applied"
    else
        echo "Applying genieutils CMakeLists.txt patch..."
        patch -p1 < ../genieutils-cmake.patch || echo "Patch application failed or already applied"
    fi
    cd ..
fi

mkdir -p build
cmake -S . -B build -DSTATIC_COMPILE=TRUE
cmake --build build
