#!/usr/bin/env node

import fs from 'fs';
import dotenv from 'dotenv';
import { prompt } from 'enquirer';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { logger, setGlobalLevel } from '../logger';
import { yargsDecorator } from './decorator';
import type { InitCommandArgs } from './init';
import { InitCommand } from './init';
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
        .option('watch', {
          type: 'boolean',
          description: 'Watch for changes and publish automatically',
          default: false,
        })
        .option('workspaceId', {
          type: 'string',
          description: 'VM-X Workspace ID (By default, it will be read from the environment variable VMX_WORKSPACE_ID)',
        })
        .option('environmentId', {
          type: 'string',
          description:
            'VM-X Environment ID (By default, it will be read from the environment variable VMX_ENVIRONMENT_ID)',
        })
        .env('VMX');
    },
    async (argv) => {
      await new PublishCommand(logger).run(argv);
    },
  )
  .command<InitCommandArgs>(
    'init',
    'Initialize the completion provider project',
    (yargs) =>
      yargs
        .option('name', {
          alias: 'n',
          type: 'string',
          description: 'AI Provider name',
        })
        .option('type', {
          alias: 't',
          type: 'string',
          description: 'AI Provider type',
          choices: ['official', 'community'],
          default: 'community',
        })
        .option('visibility', {
          alias: 'v',
          type: 'string',
          description: 'AI Provider Visibility',
          choices: ['public', 'private'],
          default: 'private',
        })
        .option('interactive', {
          type: 'boolean',
          description: 'Run in interactive mode',
          default: process.env.CI !== 'true',
        }),
    async (argv) => {
      if (argv.interactive) {
        const response = await prompt<{
          name: string;
          type: string;
          visibility: string;
        }>([
          {
            type: 'input',
            name: 'name',
            message: 'AI Provider name:',
            initial: argv.name,
          },
          {
            type: 'select',
            name: 'type',
            message: 'AI Provider type:',
            choices: ['official', 'community'],
            initial: 1,
          },
          {
            type: 'select',
            name: 'visibility',
            message: 'AI Provider visibility:',
            choices: ['public', 'private'],
            initial: 1,
          },
        ]);

        argv.name = response.name;
        argv.type = response.type;
        argv.visibility = response.visibility;
      }

      await new InitCommand(logger).run(argv);
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
