const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

describe('Debug Dat File Crash', () => {
  const projectRoot = path.join(__dirname, '..');
  const createDataModPath = path.join(projectRoot, 'modding', 'build', 'create-data-mod');
  const testDataPath = path.join(__dirname, 'fixtures', 'crash-test-data.json');

  test('should help debug the crash with detailed error info', () => {
    // Skip if executable doesn't exist
    if (!fs.existsSync(createDataModPath)) {
      console.log('Skipping - create-data-mod not built');
      return;
    }

    const datFiles = [
      { name: 'empires2_x2_p1.dat', expectedCivs: '50+' },
      { name: 'empires2_x2_p1_3k.dat', expectedCivs: '45 (3K civs)' },
      { name: 'empires2_x2_p1_august2025.dat', expectedCivs: '?' },
      { name: 'empires2_x2_p1_october2025.dat', expectedCivs: '?' },
    ];

    console.log('\n=== Debugging Information ===\n');
    console.log('The crash happens during civbuilder initialization.');
    console.log('The error "std::length_error: vector::_M_default_append" suggests:');
    console.log('1. A vector is trying to allocate more memory than allowed');
    console.log('2. Likely cause: df->Civs.size() differs between dat files');
    console.log('3. The code has hardcoded numCivs = 50 (line 43 in civbuilder.cpp)');
    console.log('');
    console.log('Dat file sizes:');
    datFiles.forEach(({ name, expectedCivs }) => {
      const filepath = path.join(projectRoot, 'public', 'vanillaFiles', name);
      if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        console.log(`  ${name}: ${(stats.size / 1024 / 1024).toFixed(2)} MB (expected civs: ${expectedCivs})`);
      }
    });

    console.log('\n=== Recommended Debug Steps ===\n');
    console.log('1. Add debug output to civbuilder.cpp after line 43:');
    console.log('   cout << "Loaded dat with " << df->Civs.size() << " civs, using numCivs=" << numCivs << endl;');
    console.log('');
    console.log('2. Check the loop at line 831 that iterates df->Civs.size():');
    console.log('   for (int k = 0; k < df->Civs.size(); k++) {');
    console.log('   This might be accessing Units[280] or Units[550] that don\'t exist in all civs');
    console.log('');
    console.log('3. The crash happens in "Reconfiguring" phase, likely in reconfigureEffects()');
    console.log('   Check if all civs have Units[280] and Units[550]');
    console.log('');
    console.log('4. Run with gdb to get exact crash location:');
    console.log('   gdb --args ./modding/build/create-data-mod \\');
    console.log('     ./__tests__/fixtures/crash-test-data.json \\');
    console.log('     ./public/vanillaFiles/empires2_x2_p1_3k.dat \\');
    console.log('     /tmp/out.dat /tmp/aiconfig.json');
    console.log('   Then: run, bt (backtrace when crashed)');
    console.log('');
    console.log('5. Possible fix: Make numCivs dynamic based on dat file:');
    console.log('   this->numCivs = df->Civs.size();');
    console.log('   Or add bounds checking before accessing civ units');

    // This test just provides debugging info
    expect(true).toBe(true);
  });

  test('should provide instructions for fixing the issue', () => {
    console.log('\n=== Potential Fix Locations ===\n');
    console.log('File: modding/civbuilder.cpp');
    console.log('');
    console.log('Line 43 - Change hardcoded value:');
    console.log('  BEFORE: this->numCivs = 50;');
    console.log('  AFTER:  this->numCivs = df->Civs.size(); // Dynamic based on dat file');
    console.log('');
    console.log('Line 831-835 - Add bounds checking:');
    console.log('  for (int k = 0; k < df->Civs.size(); k++) {');
    console.log('    if (df->Civs[k].Units.size() <= 550) {');
    console.log('      // Skip civs that don\'t have these units');
    console.log('      continue;');
    console.log('    }');
    console.log('    // ... rest of code');
    console.log('  }');
    console.log('');
    console.log('Alternative: Check which dat files work and which don\'t to identify the pattern');

    expect(true).toBe(true);
  });
});
