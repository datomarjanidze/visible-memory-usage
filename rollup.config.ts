import type { InputOptions, OutputOptions, RollupOptions } from 'rollup'

import typescriptPlugin from '@rollup/plugin-typescript'
import dtsPlugin from 'rollup-plugin-dts'

const outputPath = 'dist/visible-memory-usage'
const commonInputOptions: InputOptions = {
  input: 'src/index.ts',
  plugins: [typescriptPlugin()]
}

const config: RollupOptions[] = [
  {
    ...commonInputOptions,
    output: [
      {
        file: `${outputPath}.esm.js`,
        format: 'esm'
      }
    ]
  },
  {
    ...commonInputOptions,
    output: [
      {
        file: `${outputPath}.cjs.js`,
        format: 'cjs'
      }
    ]
  },
  {
    ...commonInputOptions,
    plugins: [commonInputOptions.plugins, dtsPlugin()],
    output: [
      {
        file: `${outputPath}.d.ts`,
        format: 'esm'
      }
    ]
  }
]

export default config
