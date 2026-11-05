# Bayes Explorer

Bayes Explorer is a small, browser-only lesson about Bayesian probability. It uses plain HTML, CSS, and JavaScript so the interactive examples are easy to inspect and run without a build step.

## Run locally

Open `index.html` in a browser, or serve this directory with any static file server. For example:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## The theorem

The calculator uses Bayes’ theorem:

```text
P(H | E) = P(E | H) × P(H) / P(E)
```

`P(H)` is the prior probability, `P(E | H)` is the likelihood, `P(E)` is the overall probability of the evidence, and `P(H | E)` is the posterior probability. The calculator derives `P(E)` from the selected prior and the evidence rates under the two hypotheses.

The coin example uses a Beta(2, 2) prior and a Bernoulli likelihood. After `h` heads and `t` tails, its posterior mean is `(2 + h) / (2 + 2 + h + t)`. The prior is an explicit teaching assumption; other priors can yield different posteriors.

## Interactive features

- Adjustable prior, true-positive rate, and false-positive rate, with positive and negative posteriors, calculation steps, and expected counts per 1,000 cases.
- Coin-flip updater with editable head and tail counts and a stated Beta prior.
- Worked hypothetical test and weather examples, common pitfalls, symbol definitions, and further reading.
- Responsive layout, keyboard focus styles, labeled inputs, a skip link, and reduced-motion support.

## Limitations and privacy

All calculations run in the visitor’s browser. The project has no accounts, analytics, database, or application API. It does not send the entered values anywhere. These compact examples assume specified rates and simplified models; real data may violate those assumptions. The hypothetical test values are educational and are not medical, legal, or financial advice. The weather likelihoods are invented for arithmetic practice and are not a forecast.

Bayesian reasoning updates uncertainty; it does not guarantee certainty. Bayes’ theorem is a mathematical rule, while Bayesian statistics is a broader framework for reasoning about unknown probabilities and parameters.

## Sources

- Thomas Bayes, [“An Essay towards solving a Problem in the Doctrine of Chances” (1763)](https://bayes.wustl.edu/Manual/an.essay.pdf).
- Slavutsky and Blei, [“Quantifying Uncertainty in the Presence of Distribution Shifts” (NeurIPS 2025)](https://proceedings.neurips.cc/paper_files/paper/2025/hash/8b7d8779c020fa3671ad267152362d56-Abstract-Conference.html) — modern research, not a beginner prerequisite.
- Chan, Molina, and Metzler, [“Estimating Epistemic and Aleatoric Uncertainty with a Single Model” (NeurIPS 2024)](https://proceedings.neurips.cc/paper_files/paper/2024/hash/c693c3ff83259aebcd55a41ab19a5d84-Abstract-Conference.html) — introduces hyper-diffusion models to estimate reducible model uncertainty and inherent data uncertainty with one model; modern research, not a beginner prerequisite.

## License

Project code is released under the MIT License; see [LICENSE](LICENSE). Third-party articles are linked, not reproduced.

## Deployment

The public preview is published with GitHub Pages from the `main` branch root: <https://hamdamme.github.io/bayes-explorer/>. GitHub Actions builds and deploys each update to that branch.

A deployment at `hamdam.me/bayes` requires a dedicated route in Hamdam’s existing Next.js App Router project or a host-level path rewrite to this static site. Keep that integration isolated from the portfolio’s root page and existing routes.
