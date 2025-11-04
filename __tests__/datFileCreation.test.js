const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

describe('Dat File Creation', () => {
  let testDir;
  let outputDatPath;
  let outputAiConfigPath;

  beforeAll(() => {
    // Create a temporary directory for test outputs
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'civbuilder-test-'));
    outputDatPath = path.join(testDir, 'empires2_x2_p1.dat');
    outputAiConfigPath = path.join(testDir, 'aiconfig.json');
  });

  afterAll(() => {
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  test('should not crash when creating dat file with test data from issue log', () => {
    const projectRoot = path.join(__dirname, '..');
    const createDataModPath = path.join(projectRoot, 'modding', 'build', 'create-data-mod');
    const testDataPath = path.join(__dirname, 'fixtures', 'crash-test-data.json');
    const vanillaDatPath = path.join(projectRoot, 'public', 'vanillaFiles', 'empires2_x2_p1.dat');

    // Check that the executable exists
    expect(fs.existsSync(createDataModPath)).toBe(true);
    
    // Check that test data exists
    expect(fs.existsSync(testDataPath)).toBe(true);
    
    // Check that vanilla dat file exists
    expect(fs.existsSync(vanillaDatPath)).toBe(true);

    // This is the exact command that crashes according to the issue log
    const cmd = `${createDataModPath} ${testDataPath} ${vanillaDatPath} ${outputDatPath} ${outputAiConfigPath}`;

    let stdout, stderr;
    let exitCode = 0;

    try {
      // Execute the command
      stdout = execSync(cmd, {
        encoding: 'utf8',
        cwd: projectRoot,
        timeout: 30000, // 30 second timeout
      });
    } catch (error) {
      stderr = error.stderr;
      stdout = error.stdout;
      exitCode = error.status;
    }

    // Log output for debugging
    if (stdout) {
      console.log('STDOUT:', stdout);
    }
    if (stderr) {
      console.error('STDERR:', stderr);
    }

    // The test should not crash (exit code 0) or segfault (exit code 139)
    // Exit code 139 is SIGSEGV (segmentation fault)
    expect(exitCode).not.toBe(139);
    
    // Ideally, the command should succeed
    expect(exitCode).toBe(0);

    // Check that output files were created
    expect(fs.existsSync(outputDatPath)).toBe(true);
    expect(fs.existsSync(outputAiConfigPath)).toBe(true);

    // Check that output files have content
    const datStats = fs.statSync(outputDatPath);
    expect(datStats.size).toBeGreaterThan(0);
  }, 60000); // 60 second Jest timeout
});
