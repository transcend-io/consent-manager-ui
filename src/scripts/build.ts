// external
import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp';
import * as esbuild from 'esbuild';
import alias from 'esbuild-plugin-alias';

/**
 * Deploy environment
 */
enum Env {
  Local = 'local',
  Dev = 'dev',
  Staging = 'staging',
  Prod = 'prod',
}

export const build = async (
  outDir = 'build',
): Promise<esbuild.BuildResult[]> => {
  const deployEnv = process.env.DEPLOY_ENV || Env.Prod;
  const cwd = `${process.cwd()}/`;
  const dev = deployEnv === Env.Local || deployEnv === Env.Dev;
  const staging = deployEnv === Env.Staging;
  const prod = deployEnv === Env.Prod;
  const shouldMinify = prod || staging;

  if (!dev && !staging && !prod) {
    throw new Error(`Unrecognized environment: ${deployEnv}`);
  }

  const modules = Object.entries({
    ui: {
      location: `${cwd}/src/index.ts`,
      tsconfig: `${cwd}/tsconfig.json`,
    },
  });

  const out = `${cwd}${outDir}`;

  const results = await Promise.all(
    modules.map(([moduleName, { location, tsconfig }]) =>
      esbuild.build({
        plugins: [
          alias({
            react: require.resolve('preact/compat'),
            // 'react-dom/test-utils': require.resolve('preact/test-utils'),
            // 'react-dom': require.resolve('preact/compat'),
          }),
          pnpPlugin(),
        ],
        format: 'esm',
        treeShaking: true,
        external: ['fs', 'stream'],
        sourcemap: dev ? 'inline' : false,
        entryPoints: [location],
        bundle: true,
        platform: 'browser',
        outfile: `${out}/${moduleName}.js`,
        minify: shouldMinify,
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        legalComments: 'none',
        target: ['esnext', 'chrome92', 'firefox90', 'safari14.1', 'edge18'],
        tsconfig,
        define: {
          'process.env.version': JSON.stringify(
            // eslint-disable-next-line global-require, import/no-dynamic-require
            require(`${cwd}/package.json`).version,
          ),
        },
      }),
    ),
  );

  // eslint-disable-next-line no-console
  console.log(`Consent manager UI modules built. Minified: ${shouldMinify}.`);

  return results;
};

if (require.main === module) {
  build();
}
