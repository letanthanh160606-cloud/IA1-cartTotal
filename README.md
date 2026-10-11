# cart — session 2 starter

Run the test first and watch it fail:

```bash
npm test
```

## What to implement

`cartTotal(items, options)` in `src/cart.js`. Plain JavaScript, **no dependencies**.

- `items`: `[{ name, price, qty }]` · `options`: `{ vatRate, freeShipFrom, shipFee }`
- `subtotal` = sum of `price × qty`
- VAT = `vatRate` applied to the subtotal
- shipping = `0` when `subtotal >= freeShipFrom`, otherwise `shipFee`
- return `subtotal + VAT + shipping`, **a number**, rounded to the whole đồng
- an empty cart returns `0` — no VAT, no shipping
- a negative `price`, or a `qty` that is not a positive integer, throws `RangeError`

Worked example: 2 × 180000 + 1 × 45000 = 405000 subtotal, VAT 32400,
shipping 30000 (below the 500000 threshold) → **467400**.

## What you hand in

One zip named `<StudentID>_<total>.zip` — the total being the mark you give
yourself against the rubric — containing:

1. This repository, with `npm test` green
2. The brief you gave your assistant
3. `AI-LOG.md` — template on Classroom
4. `SELF_ASSESSMENT_REPORT.md` — template on Classroom, one row per rubric
   criterion with evidence

The rubric is attached to the assignment on Classroom. Read it before you start:
30 of the 100 marks are for behaviour, and they are checked by running your code.

## Running the completed project

No dependencies need to be installed. Run from the project root:

~~~sh
npm test
npm run format:check
npm run check
~~~

The gate runs a basic whitespace check, then the Node test runner. The format check rejects tabs, trailing whitespace and missing final newlines in JavaScript/workflow files and package.json. It is not a full formatter.

GitHub Actions is configured in .github/workflows/ci.yml for push and pull_request. A successful local gate does not prove that CI has run on GitHub.

## Documentation

- [CLAUDE.md](CLAUDE.md): project rules.
- [brief.md](brief.md): brief for completing and validating the existing implementation; written after the initial implementation.
- [AI-LOG.md](AI-LOG.md): actual AI assistance and workflow history.
- [SELF_ASSESSMENT_REPORT.md](SELF_ASSESSMENT_REPORT.md): draft score and evidence.
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md): requirements, results, limits and oral-exam preparation in Vietnamese.

## Packaging on Windows

~~~powershell
./scripts/package.ps1
# After filling student details and reviewing the score:
./scripts/package.ps1 -StudentID 'YOUR_STUDENT_ID'
~~~

The script runs the gate and reads the claimed score from the report. Without a student ID, it creates a clearly marked draft in submission/. With an ID, the name follows <StudentID>_<total>.zip. Existing archives are not overwritten. The archive includes .github and excludes .git, .env, node_modules and previous ZIPs. Check npm run check again from an extracted copy before submitting.

Student ID and name have been filled in from the student’s supplied details; the GitHub URL remains blank. Submission is a ZIP according to the original requirements above; successful CI on push supports the highest harness rubric band. The configured origin still points to the course starter until the student chooses a personal repository.
