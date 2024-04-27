# 1A3L-conway-game-of-life

This is a project under the 1-App-3-Languages (1A3L) series.
Implement the Conway's Game of Life under 3 language: Svelte, React and XXXX (TBD)

## Getting Started

### Install

```bash
npm install
cd libs/core && npm install
```

### React app

```bash
cd libs/react && npm install
cd ../..
npx nx dev react
```

### Svelte app

```bash
cd libs/svelte && npm install
cd ../..
npx nx dev svelte
```

## Features

| Feature                     | Svelte | React | XXXX |
| --------------------------- | ------ | ----- | ---- |
| Rows and Cols configuration | ✅      | ✅     |      |
| Display game board          | ✅      | ✅     |      |
| Reset game board            | ✅      | ✅     |      |
| Start/Stop the game         | ✅      | ✅     |      |
| Growth speed configuration  | ✅      | ✅     |      |
| Click to change cell state  | ✅      | ✅     |      |
| Drag to change cells states | ✅      | ✅     |      |
| Randomize cells             |        |       |      |

---

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Nx plugins and code generators

Add Nx plugins to leverage their code generators and automated, inferred tasks.

```
# Add plugin
npx nx add @nx/react

# Use code generator
npx nx generate @nx/react:app demo

# Run development server
npx nx serve demo

# View project details
npx nx show project demo --web
```

Run `npx nx list` to get a list of available plugins and whether they have generators. Then run `npx nx list <plugin-name>` to see what generators are available.

Learn more about [code generators](https://nx.dev/features/generate-code) and [inferred tasks](https://nx.dev/concepts/inferred-tasks) in the docs.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
