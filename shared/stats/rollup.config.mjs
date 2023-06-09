import { dirname, join, parse } from 'path'

import resolve from '@rollup/plugin-node-resolve'
import { packageNameToPath } from 'govuk-frontend-lib/names'
import { defineConfig } from 'rollup'
import { visualizer } from 'rollup-plugin-visualizer'

import { modulePaths } from './src/index.mjs'

/**
 * Rollup config with stats output
 */
export default defineConfig(modulePaths
  .map((modulePath) => /** @satisfies {import('rollup').RollupOptions} */({
    input: join('govuk-frontend/dist/govuk-esm', modulePath),

    /**
     * Output options
     */
    output: {
      file: join('dist', modulePath),
      format: 'es'
    },

    /**
     * Input plugins
     */
    plugins: [
      resolve(),

      // Stats: File size
      visualizer({
        filename: join('dist', dirname(modulePath), `${parse(modulePath).name}.yaml`),
        projectRoot: join(packageNameToPath('govuk-frontend'), 'dist/govuk-esm/'),
        template: 'list'
      }),

      // Stats: Module tree map
      visualizer({
        filename: join('dist', dirname(modulePath), `${parse(modulePath).name}.html`),
        projectRoot: join(packageNameToPath('govuk-frontend'), 'dist/govuk-esm/'),
        template: 'treemap'
      })
    ]
  }))
)
