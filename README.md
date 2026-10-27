# Academy starters

Starter and finished apps for [Vercel Academy](https://vercel.com/academy) courses, one folder per course.

```
<course-slug>/
  starter/    the app learners deploy at the start of the course
  complete/   the finished app, with every change the course makes
```

A course has whichever of the two it teaches: a course that deploys one app and builds on it has only `starter/`, and a course that learners build from scratch keeps only `complete/` as the reference. A folder can hold more than one service (`python-on-vercel/starter/` has `frontend/` and `backend/`).

## Using a starter

Each course links a **Deploy with Vercel** button that copies its `starter/` folder into a new repository on your GitHub account and deploys it. To browse the finished code, open the course's `complete/` folder here.

To see everything a course changes, clone this repo and compare the two folders:

```bash
git clone https://github.com/vercel/academy-starters.git
cd academy-starters
diff -r optimize-your-vercel-account/starter optimize-your-vercel-account/complete
```

## Rules for every folder

Every change goes through a pull request. The **Build changed folders** check installs and builds each course folder the PR touches, on its own, the way a deploy button copies it. Don't merge on red.


- **It stands alone.** A deploy button copies one folder, so each `starter/` and `complete/` installs and runs by itself. No workspace references to other folders, no shared root `package.json`.
- **Starter and complete move together.** An upgrade changes both in the same PR, so they never teach different versions.
- **Latest releases only.** Courses teach the current release of everything they use. The weekly maintenance run in vercel/academy-courses flags anything behind.

Course lessons live in [vercel/academy-courses](https://github.com/vercel/academy-courses), which also checks these folders every week.
