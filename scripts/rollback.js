#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const environment =
  args[0] || process.env.DEPLOY_ENV || process.env.APP_ENV || 'development';

if (!environment) {
  console.error('Environment name is required to rollback');
  process.exit(1);
}

const logPath = path.resolve(__dirname, '../deployments.json');
if (!fs.existsSync(logPath)) {
  console.error('No deployments recorded yet');
  process.exit(1);
}

const deployments = JSON.parse(fs.readFileSync(logPath, 'utf8'));
const entries = deployments
  .map((entry, index) => ({ entry, index }))
  .filter(({ entry }) => entry.environment === environment);

if (entries.length < 2) {
  console.error(`No previous stable deployment for ${environment}`);
  process.exit(1);
}

const last = entries[entries.length - 1];
const previous = entries[entries.length - 2];

deployments.splice(last.index, 1);
fs.writeFileSync(logPath, JSON.stringify(deployments, null, 2));
console.log(`Rolled back ${environment} to ${previous.entry.version}`);
