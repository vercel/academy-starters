import type { PlopTypes } from '@turbo/gen'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Component generator
  plop.setGenerator('component', {
    description: 'Generate a new UI component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (e.g., MyButton):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/ui/src/{{kebabCase name}}.tsx',
        templateFile: 'templates/component.hbs',
      },
    ],
  })

  // Package generator
  plop.setGenerator('package', {
    description: 'Generate a new package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Package name (e.g., auth):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{name}}/package.json',
        templateFile: 'templates/package.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/src/index.ts',
        template: 'export const hello = () => "Hello from {{name}}"\n',
      },
    ],
  })
}
