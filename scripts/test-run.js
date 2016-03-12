import '~/scripts/helpers/cssModulesHook'
import '~/scripts/helpers/globalJSDOM'
import '~/test/hooks'
import path from 'path'
import Mocha from 'mocha'
import glob from 'glob'
import { TESTS, ROOT, SRC } from 'config/paths'
import { argv } from 'yargs'

const mocha = new Mocha({
  reporter: argv.reporter || 'nyan',
  ui: 'bdd',
})

const functionalTests = TESTS
const unitTests = SRC
const testsPath = argv.functional ? functionalTests : unitTests

const filesToRun = [
  ...[ `${TESTS}/test.setup.js` ],
  ...glob.sync(`${testsPath}/**/*.test.js`),
]

filesToRun.forEach(file => {
  mocha.addFile(path.resolve(ROOT, file))
})

mocha.run(failures => {
  process.on('exit', () => {
    process.exit(failures)
  })
})
