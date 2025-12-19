#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const environment =
  args[0] || process.env.DEPLOY_ENV || process.env.APP_ENV || 'development';
const version =
  args[1] ||
  process.env.DEPLOY_VERSION ||
  process.env.APP_VERSION ||
  process.env.npm_package_version ||
  '0.0.1';

if (!environment || !version) {
  console.error('Both environment and version are required to deploy');
  process.exit(1);
}

const logPath = path.resolve(__dirname, '../deployments.json');
const deployments = fs.existsSync(logPath)
  ? JSON.parse(fs.readFileSync(logPath, 'utf8'))
  : [];

const record = {
  timestamp: new Date().toISOString(),
  environment,
  version
};

deployments.push(record);
fs.writeFileSync(logPath, JSON.stringify(deployments, null, 2));
console.log(`Recorded deployment ${version} → ${environment}`);
