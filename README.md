# Academy starters

Starter and finished apps for [Vercel Academy](https://vercel.com/academy) courses, one folder per course.

```
<course-slug>/
  starter/    the app learners deploy at the start of the course
  complete/   the finished app, with every change the course makes
```

A course has whichever of the two it teaches: a course that deploys one app and builds on it has only `starter/`, and a course that learners build from scratch keeps only `complete/` as the reference. A folder can hold more than one service (`python-on-vercel/starter/` has `frontend/` and `backend/`).

A course that hands learners files partway through keeps each checkpoint as its own folder next to `starter/` and `complete/`. `enterprise-apps-agents/` has `implementation-start/` and `agent-start/`.

## Using a starter

Each course links a **Deploy with Vercel** button that copies its `starter/` folder into a new repository on your GitHub account and deploys it. To browse the finished code, open the course's `complete/` folder here.

To see everything a course changes, clone this repo and compare the two folders:

```bash
git clone https://github.com/vercel/academy-starters.git
cd academy-starters
diff -r optimize-your-vercel-account/starter optimize-your-vercel-account/complete
```
