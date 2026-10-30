# Academy starters

The starter and finished code for [Vercel Academy](https://vercel.com/academy) courses. Each course has its own folder, and each course page tells you which folder you need and when.

New here? Find your course below, open its page, and follow along from the first lesson. You don't need to clone this whole repo. The course gives you a Deploy button or a copy command for the one folder it uses.

## Find your course

| Course | Folders |
|---|---|
| [Agent-Friendly APIs](https://vercel.com/academy/agent-friendly-apis) | [`starter`](agent-friendly-apis/starter), [`complete`](agent-friendly-apis/complete) |
| [Build Durable Workflows](https://vercel.com/academy/workflow-foundations) | [`starter`](workflow-foundations/starter), [`complete`](workflow-foundations/complete) |
| [Build Visual Workflow Plugins on Vercel](https://vercel.com/academy/visual-workflow-builder-on-vercel) | [`starter`](visual-workflow-builder-on-vercel/starter) |
| [Build with Next.js](https://vercel.com/academy/nextjs-foundations) | [`starter`](nextjs-foundations/starter) |
| [Builders Guide to the AI SDK](https://vercel.com/academy/ai-sdk) | [`starter`](ai-sdk/starter) |
| [Building Agents with eve](https://vercel.com/academy/building-agents-with-eve) | [`complete`](building-agents-with-eve/complete) |
| [Building Filesystem Agents](https://vercel.com/academy/filesystem-agents) | [`starter`](filesystem-agents/starter), [`complete`](filesystem-agents/complete) |
| [Creating a Software Factory](https://vercel.com/academy/creating-a-software-factory) | [`starter`](creating-a-software-factory/starter), [`complete`](creating-a-software-factory/complete) |
| [Enterprise Apps and Agents](https://vercel.com/academy/enterprise-apps-agents) | [`starter`](enterprise-apps-agents/starter), [`implementation-start`](enterprise-apps-agents/implementation-start), [`agent-start`](enterprise-apps-agents/agent-start), [`complete`](enterprise-apps-agents/complete) |
| [Make Decisions with Jev](https://vercel.com/academy/make-decisions-with-jev) | [`starter`](make-decisions-with-jev/starter), [`complete`](make-decisions-with-jev/complete) |
| [Nuxt on Vercel](https://vercel.com/academy/nuxt-on-vercel) | [`starter`](nuxt-on-vercel/starter), [`complete`](nuxt-on-vercel/complete) |
| [Optimize Your Vercel Account](https://vercel.com/academy/optimize-your-vercel-account) | [`starter`](optimize-your-vercel-account/starter), [`complete`](optimize-your-vercel-account/complete) |
| [Production Monorepos with Turborepo](https://vercel.com/academy/production-monorepos) | [`starter`](production-monorepos/starter), [`complete`](production-monorepos/complete) |
| [Python on Vercel](https://vercel.com/academy/python-on-vercel) | [`starter`](python-on-vercel/starter), [`complete`](python-on-vercel/complete) |
| [Slack Agents on Vercel with the AI SDK](https://vercel.com/academy/slack-agents) | [`starter`](slack-agents/starter) |
| [Svelte on Vercel](https://vercel.com/academy/svelte-on-vercel) | [`starter`](svelte-on-vercel/starter), [`complete`](svelte-on-vercel/complete) |
| [Using AI Gateway in Production](https://vercel.com/academy/ai-gateway) | [`starter`](ai-gateway/starter) |
| [Vercel Sandbox](https://vercel.com/academy/vercel-sandbox) | [`starter`](vercel-sandbox/starter), [`complete`](vercel-sandbox/complete) |

## What's in a course folder

- **`starter/`** is where you begin. It's a working app with the parts the course teaches left for you to build.
- **`complete/`** is the finished app, with every change the course makes. Use it to check your work, or to see where a lesson is headed.
- **Checkpoint folders**, like `enterprise-apps-agents/implementation-start/`, hold files a course hands you partway through. The lesson that needs one tells you what to copy.

Some courses only have one of these. A course where you build from scratch keeps just `complete/` as a reference, and a course that builds on one deployed app may have just `starter/`.

## Getting a starter

Most courses start with a **Deploy with Vercel** button. It copies the starter into a new repository on your GitHub account and deploys it, so you're live before you write any code.

To work from the code locally instead, copy just the folder you need:

```bash
git clone --depth 1 https://github.com/vercel/academy-starters.git
cp -R academy-starters/optimize-your-vercel-account/starter my-saturday-store
cd my-saturday-store
```

Each folder's `README.md` and `package.json` list what it needs to run, like the Node.js version and the environment variables to set.

## Stuck?

1. Check the lesson's troubleshooting section. Most snags you'll hit are already in there.
2. Compare your code with the course's `complete/` folder. To see everything a course changes, diff the two:

   ```bash
   diff -r optimize-your-vercel-account/starter optimize-your-vercel-account/complete
   ```

3. Head back to [Vercel Academy](https://vercel.com/academy) for the full course list and the lessons themselves.
