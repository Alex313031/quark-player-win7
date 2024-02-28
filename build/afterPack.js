exports.default = function (context) {
  // Make sure it is synchronous so that we don't
  // package it before .sig is generated.
  const { execSync } = require('child_process');
  // Not applicable on Linux
  if (process.platform == 'linux') {
    console.log('  • VMP not applicable on Linux')
    return;
  } else if (process.platform == 'win32') {
    // Sign for VMP via EVS
    console.log('  • VMP signing start...')
      execSync('python3 -m castlabs_evs.vmp sign-pkg ./dist/win-unpacked')
    console.log('  • VMP signing complete')
  } else {
    // Sign for VMP via EVS
    console.log('  • VMP signing start...')
      execSync('python3 -m castlabs_evs.vmp sign-pkg ./dist/mac ' + context.appOutDir)
    console.log('  • VMP signing complete')
  }
}
