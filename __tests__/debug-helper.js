const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper script to check dat file properties
const datFiles = [
  'empires2_x2_p1.dat',
  'empires2_x2_p1_3k.dat',
  'empires2_x2_p1_august2025.dat',
  'empires2_x2_p1_october2025.dat'
];

console.log('\nChecking dat file properties:\n');

datFiles.forEach(filename => {
  const filepath = path.join(__dirname, '..', 'public', 'vanillaFiles', filename);
  if (fs.existsSync(filepath)) {
    const stats = fs.statSync(filepath);
    console.log(`${filename}:`);
    console.log(`  Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Modified: ${stats.mtime.toISOString()}`);
  } else {
    console.log(`${filename}: NOT FOUND`);
  }
  console.log('');
});

// Try running create-data-mod with verbose output to see where it crashes
console.log('\nTo debug the crash, you can:');
console.log('1. Run with gdb: gdb --args ./modding/build/create-data-mod <args>');
console.log('2. Run with valgrind: valgrind ./modding/build/create-data-mod <args>');
console.log('3. Add debug prints in civbuilder.cpp around line 831 (Civs.size() loop)');
console.log('4. Check if dat file has more civs than hardcoded numCivs=50');
console.log('\nThe error "vector::_M_default_append" suggests:');
console.log('- A vector resize/reserve is being called with invalid size');
console.log('- Possibly df->Civs.size() > numCivs (50)');
console.log('- Or accessing an out-of-bounds index in a vector');
