#!/usr/bin/env node

import fs from 'fs';
import dotenv from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { logger, setGlobalLevel } from '../logger';
import { yargsDecorator } from './decorator';
import { PublishCommand } from './publish';

if (fs.existsSync('.env')) {
  dotenv.config({
    path: '.env',
  });
} else if (fs.existsSync('.env.local')) {
  dotenv.config({
    path: '.env.local',
  });
}

yargs(hideBin(process.argv))
  .scriptName('vm-x-completion-ai-provider')
  .command(
    'publish',
    'Publish the completion provider',
    (yargs) => {
      return yargs
        .option('manifest', {
          alias: 'm',
          type: 'string',
          description: 'Path to the manifest YAML file',
          demandOption: true,
          default: 'manifest.yaml',
        })
        .option('pat', {
          type: 'string',
          description: 'VM-X Personal Access Token (By default, it will be read from the environment variable VMX_PAT)',
        })
        .option('apiBaseUrl', {
          type: 'string',
          description: 'VM-X API Base URL',
          default: 'https://api.vm-x.ai',
        })
        .option('dryRun', {
          type: 'boolean',
          description: 'Run in dry-run mode',
          default: false,
        })
        .env('VMX');
    },
    async (argv) => {
      await new PublishCommand(logger).run(argv);
    },
  )
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .demandCommand(1, 'Choose a command from the list above')
  .updateLocale(yargsDecorator)
  .middleware((argv) => {
    setGlobalLevel(argv.verbose ? 'debug' : 'info');
  })
  .strict()
  .parse();
