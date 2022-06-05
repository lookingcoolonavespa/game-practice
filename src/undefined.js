const recipeDict = {};
const sideDict = {};

function calculateNutrients() {}

function generatePlan(startDate, endDate) {
  function getOneMeal(cals) {
    const rdmEntreeId = Math.floor(
      Math.random() * Object.keys(recipeDict).length
    );

    const rdmNumOfSides = Math.floor(Math.random() * 4);

    const sideIds = Array(rdmNumOfSides).map((v) =>
      Math.floor(Math.random() * Object.keys(sideDict).length)
    );
  }

  return {
    startDate,
    endDate,
    meals: [{}]
  };
}
