const percent = (value, digits = 1) => `${new Intl.NumberFormat(undefined, { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(value)}%`;
const probability = (numerator, denominator) => denominator > 0 ? numerator / denominator : null;
const numberLabel = (value) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value);

function updateBayes() {
  const prior = Number(document.querySelector("#prior").value) / 100;
  const sensitivity = Number(document.querySelector("#sensitivity").value) / 100;
  const falsePositive = Number(document.querySelector("#false-positive").value) / 100;
  document.querySelector("#prior-value").textContent = percent(prior * 100);
  document.querySelector("#sensitivity-value").textContent = percent(sensitivity * 100);
  document.querySelector("#false-positive-value").textContent = percent(falsePositive * 100);

  const positiveMass = prior * sensitivity;
  const falsePositiveMass = (1 - prior) * falsePositive;
  const pPositive = positiveMass + falsePositiveMass;
  const afterPositive = probability(positiveMass, pPositive);
  const negativeMass = prior * (1 - sensitivity);
  const trueNegativeMass = (1 - prior) * (1 - falsePositive);
  const pNegative = negativeMass + trueNegativeMass;
  const afterNegative = probability(negativeMass, pNegative);

  document.querySelector("#positive-result").textContent = afterPositive === null ? "Undefined" : percent(afterPositive * 100, 2);
  document.querySelector("#negative-result").textContent = afterNegative === null ? "Undefined" : percent(afterNegative * 100, 2);
  document.querySelector("#posterior-bar").style.width = `${afterPositive === null ? 0 : afterPositive * 100}%`;
  document.querySelector("#positive-step").textContent = afterPositive === null
    ? "P(+) = 0: a positive result is impossible under these settings, so P(H | +) is undefined."
    : `P(H | +) = (${percent(sensitivity * 100)} × ${percent(prior * 100)}) ÷ ${percent(pPositive * 100, 2)} = ${percent(afterPositive * 100, 2)}`;
  document.querySelector("#negative-step").textContent = afterNegative === null
    ? "P(−) = 0: a negative result is impossible under these settings, so P(H | −) is undefined."
    : `P(H | −) = (${percent((1 - sensitivity) * 100)} × ${percent(prior * 100)}) ÷ ${percent(pNegative * 100, 2)} = ${percent(afterNegative * 100, 2)}`;

  const truePositives = 1000 * positiveMass;
  const falsePositives = 1000 * falsePositiveMass;
  document.querySelector("#true-count").textContent = numberLabel(truePositives);
  document.querySelector("#false-count").textContent = numberLabel(falsePositives);
  document.querySelector("#all-positive-count").textContent = numberLabel(truePositives + falsePositives);
  const note = pPositive === 0 || pNegative === 0
    ? "A denominator is zero at these boundary settings; the corresponding conditional probability cannot be determined from this model."
    : "";
  document.querySelector("#edge-message").textContent = note;
}

function updateCoin() {
  const headsField = document.querySelector("#heads");
  const tailsField = document.querySelector("#tails");
  const error = document.querySelector("#coin-error");
  const heads = Number(headsField.value);
  const tails = Number(tailsField.value);
  const valid = headsField.value.trim() !== "" && tailsField.value.trim() !== "" && Number.isInteger(heads) && Number.isInteger(tails) && heads >= 0 && tails >= 0 && heads <= 100000 && tails <= 100000;
  if (!valid) {
    error.textContent = "Enter whole numbers from 0 to 100,000 for both observations.";
    document.querySelector("#coin-posterior").textContent = "—";
    document.querySelector("#coin-equation").textContent = "No update shown until both values are valid.";
    document.querySelector("#coin-meter-fill").style.width = "0%";
    return;
  }
  error.textContent = "";
  const a = 2;
  const b = 2;
  const updated = (a + heads) / (a + b + heads + tails);
  const pct = updated * 100;
  document.querySelector("#coin-posterior").textContent = percent(pct, 2);
  document.querySelector("#coin-equation").textContent = `(${a} + ${heads}) ÷ (${a} + ${b} + ${heads} + ${tails}) = ${percent(pct, 2)}`;
  document.querySelector("#coin-meter-fill").style.width = `${pct}%`;
  document.querySelector("#coin-explanation").textContent = heads + tails === 0
    ? "With no observed flips, the posterior equals the assumed prior mean of 50%."
    : `With this prior and these ${heads + tails} observations, the estimated chance of heads is ${percent(pct, 2)}.`;
}

document.querySelectorAll("#bayes-form input").forEach((input) => input.addEventListener("input", updateBayes));
document.querySelectorAll("#coin-form input").forEach((input) => input.addEventListener("input", updateCoin));
updateBayes();
updateCoin();
