import { INestiaConfig } from '@nestia/sdk';

const NESTIA_CONFIG: INestiaConfig = {
  input: {
    include: ['src/api'],
  },
  output: 'src/apiGenerated',
  distribute: 'packages/sdk-api',
};
export default NESTIA_CONFIG;
