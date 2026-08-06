const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourceIndexCandidates = [
  path.join(root, 'dist', 'bank-app', 'browser', 'browser', 'index.csr.html'),
  path.join(root, 'dist', 'bank-app', 'browser', 'browser', 'index.html'),
  path.join(root, 'src', 'index.html')
];
const browserOutput = path.join(root, 'dist', 'bank-app', 'browser');
const nestedBrowserOutput = path.join(browserOutput, 'browser');
const outputDir = fs.existsSync(nestedBrowserOutput) ? nestedBrowserOutput : browserOutput;
const targetIndex = path.join(outputDir, 'index.html');

const sourceIndex = sourceIndexCandidates.find((candidate) => fs.existsSync(candidate));

if (!sourceIndex) {
  throw new Error(
    `No index source file found. Checked:\n  ${sourceIndexCandidates.join('\n  ')}`
  );
}

if (!fs.existsSync(outputDir)) {
  throw new Error(`Firebase hosting output folder does not exist: ${outputDir}`);
}

fs.copyFileSync(sourceIndex, targetIndex);
console.log(`Copied generated index file to Firebase hosting folder:\n  ${sourceIndex}\n  → ${targetIndex}`);
console.log(`Using output directory: ${outputDir}`);
