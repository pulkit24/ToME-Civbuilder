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

### Dat File Creation Test

This test reproduces the crash issue reported in the GitHub issue. It uses the exact input data from the crash log to verify the C++ `create-data-mod` executable behavior.

**Status**: Currently failing with segmentation fault (exit code 139) - this is expected and reproduces the reported crash.

**Test File**: `__tests__/datFileCreation.test.js`
**Test Data**: `__tests__/fixtures/crash-test-data.json`

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
