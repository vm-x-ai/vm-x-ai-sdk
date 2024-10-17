import type { Logger } from 'pino';

export abstract class BaseCommand<TArgs> {
  constructor(protected logger: Logger) {}

  abstract run(args: TArgs): Promise<void>;
}
