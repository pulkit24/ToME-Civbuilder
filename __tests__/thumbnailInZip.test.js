const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Thumbnail in Mod Zip', () => {
  const testId = 'test-thumbnail-' + Date.now();
  const modsDir = path.join(__dirname, '..', 'modding', 'requested_mods');
  const appDir = path.join(__dirname, '..');
  const thumbnailPath = path.join(appDir, 'public', 'img', 'thumbnail.jpg');
  
  beforeAll(() => {
    // Ensure thumbnail.jpg exists
    if (!fs.existsSync(thumbnailPath)) {
      throw new Error('thumbnail.jpg not found at ' + thumbnailPath);
    }
  });

  afterAll(() => {
    // Clean up test files
    try {
      const zipPath = path.join(modsDir, `${testId}.zip`);
      if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath);
      }
      const testDir = path.join(modsDir, testId);
      if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true, force: true });
      }
    } catch (error) {
      console.log('Cleanup error:', error.message);
    }
  });

  test('should check if zip command is available', () => {
    expect(() => {
      execSync('which zip', { stdio: 'pipe' });
    }).not.toThrow();
  });

  test('should include thumbnail.jpg in mod zip after running createModFolder and zipModFolder scripts', () => {
    // Create mod folder structure (without UI mod for simplicity)
    execSync(`bash ./process_mod/createModFolder.sh ./modding/requested_mods ${testId} ${appDir} 0`, {
      cwd: appDir,
      stdio: 'pipe'
    });

    // Verify thumbnail was copied to the data folder
    const dataFolderThumbnail = path.join(modsDir, testId, `${testId}-data`, 'thumbnail.jpg');
    expect(fs.existsSync(dataFolderThumbnail)).toBe(true);

    // Create the zip file
    execSync(`bash ./process_mod/zipModFolder.sh ${testId} 0`, {
      cwd: appDir,
      stdio: 'pipe'
    });

    // Check that the zip file was created
    const zipPath = path.join(modsDir, `${testId}.zip`);
    expect(fs.existsSync(zipPath)).toBe(true);

    // List contents of the zip file
    const zipContents = execSync(`unzip -l "${zipPath}"`, {
      cwd: appDir,
      encoding: 'utf8'
    });

    // Verify thumbnail.jpg is in the zip
    expect(zipContents).toContain('thumbnail.jpg');
    
    // Also verify the data zip is included
    expect(zipContents).toContain(`${testId}-data.zip`);
  });

  test('should include thumbnail.jpg in mod zip with UI mod', () => {
    const testIdUI = testId + '-ui';
    
    try {
      // Create mod folder structure (with UI mod)
      execSync(`bash ./process_mod/createModFolder.sh ./modding/requested_mods ${testIdUI} ${appDir} 1`, {
        cwd: appDir,
        stdio: 'pipe'
      });

      // Verify thumbnail was copied to both data and UI folders
      const dataFolderThumbnail = path.join(modsDir, testIdUI, `${testIdUI}-data`, 'thumbnail.jpg');
      const uiFolderThumbnail = path.join(modsDir, testIdUI, `${testIdUI}-ui`, 'thumbnail.jpg');
      expect(fs.existsSync(dataFolderThumbnail)).toBe(true);
      expect(fs.existsSync(uiFolderThumbnail)).toBe(true);

      // Create the zip file
      execSync(`bash ./process_mod/zipModFolder.sh ${testIdUI} 1`, {
        cwd: appDir,
        stdio: 'pipe'
      });

      // Check that the zip file was created
      const zipPath = path.join(modsDir, `${testIdUI}.zip`);
      expect(fs.existsSync(zipPath)).toBe(true);

      // List contents of the zip file
      const zipContents = execSync(`unzip -l "${zipPath}"`, {
        cwd: appDir,
        encoding: 'utf8'
      });

      // Verify thumbnail.jpg is in the zip
      expect(zipContents).toContain('thumbnail.jpg');
      
      // Also verify both data and UI zips are included
      expect(zipContents).toContain(`${testIdUI}-data.zip`);
      expect(zipContents).toContain(`${testIdUI}-ui.zip`);
    } finally {
      // Clean up
      try {
        const zipPath = path.join(modsDir, `${testIdUI}.zip`);
        if (fs.existsSync(zipPath)) {
          fs.unlinkSync(zipPath);
        }
        const testDir = path.join(modsDir, testIdUI);
        if (fs.existsSync(testDir)) {
          fs.rmSync(testDir, { recursive: true, force: true });
        }
      } catch (error) {
        console.log('Cleanup error:', error.message);
      }
    }
  });
});
