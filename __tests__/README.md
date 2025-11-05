# Tests

This directory contains automated tests for the AoE2-Civbuilder project.

## Running Tests

To run all tests:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

## Test Structure

- `__tests__/` - Test files (files ending with `.test.js`)
- `__tests__/fixtures/` - Test data and fixtures

## Current Tests

### Dat File Creation Tests

These tests reproduce the crash issue reported in the GitHub issue. They test all available dat files with the exact input data from the crash log.

**Status**: All dat files currently crash with the test data - this is expected and reproduces the reported crash.

**Test File**: `__tests__/datFileCreation.test.js`
**Test Data**: `__tests__/fixtures/crash-test-data.json`

#### Tested Dat Files:

1. **empires2_x2_p1.dat** - Current default dat file (crashes)
2. **empires2_x2_p1_3k.dat** - 3K dat file (crashes, but worked before merge #5)
3. **empires2_x2_p1_august2025.dat** - August 2025 dat file (crashes, status unknown)
4. **empires2_x2_p1_october2025.dat** - October 2025 dat file (crashes, status unknown)

The tests show that all dat files crash with a `std::length_error: vector::_M_default_append` exception, which suggests the issue is in the C++ code handling the dat file processing.

## Setup for Local Testing

1. Initialize git submodules:
   ```bash
   git submodule update --init --recursive
   ```

2. Install system dependencies:
   ```bash
   sudo apt-get install -y build-essential cmake liblz4-dev libboost-iostreams-dev libjsoncpp-dev libbz2-dev liblzma-dev
   ```

3. Install Node.js dependencies:
   ```bash
   npm install
   ```

4. Build the C++ component:
   ```bash
   cd modding
   ./scripts/build.sh
   ```

5. Run tests:
   ```bash
   npm test
   ```

## CI/CD

Tests are automatically run in GitHub Actions on every push and pull request. See `.github/workflows/test.yml` for the CI configuration.
