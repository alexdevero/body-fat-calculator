'use strict'
/* If JavaScript is enabled, display content */
document.getElementsByName('bfCalculator')[0].style.display = 'block'
document.getElementById('bfNoScript').style.display = 'none'

/* Global variables */
var _bf_units
var _bf_genre
var _bf_formula

/* Set default measurement system. 'i' for imperial, 'm' for metric */
bfSetUnit('i')

/* Set default formula. You can use one of these values: 'ymca', 'mymca', 'covert', 'jack7', 'jack4', 'jack3', 'parrillo', 'durnin', 'navy' */
bfSetFormula('ymca')

/* Set default genre. 'm' for male, 'f' for female */
_bf_genre = 'm'
bfSetGenre(_bf_genre)

/* Input and Input Labels size adjustments */
function bfAdjustInputSizes() {
  var _inputLabels = document.getElementsByClassName('bf-input-label')
  var _inputs = document.getElementsByClassName('bf-calculator-input')

  for (var i = 0; i < _inputs.length; i++) {
    if (_inputLabels[i] != undefined) _inputs[i].style.paddingLeft = 10 * 1 + _inputLabels[i].offsetWidth
    // '10' is left padding in pixels
  }
}

/* Check if the input is a number */
function isNumeric(n) {
  if (!isNaN(n)) {
    return Number(n)
  } else {
    return 0
  }
}

/* Reset form's data */
function bfCalculatorReset() {
  /* Reset inputs */
  document.getElementsByName('bfCalculator')[0].reset()
  /* Reset results */
  document.getElementById('bfBodyFatRes').innerHTML = '-'
  document.getElementById('bfLeanRes').innerHTML = '-'
  document.getElementById('bfFatRes').innerHTML = '-'
  document.getElementById('bfClassRes').innerHTML = '-'

  bfSetUnit(_bf_units)
  bfSetFormula(_bf_formula)

  _bf_genre = _bf_genre
}

/* Change measurement unit */
function bfSetUnit(unitType, event) {
  if (event != null) event.preventDefault()

  var oldUnitType = _bf_units
  var imperialButton = document.getElementById('bfMeasurement2')
  var metricButton = document.getElementById('bfMeasurement1')
  var unitKG = document.getElementsByClassName('bfUnitKG')
  var unitCM = document.getElementsByClassName('bfUnitCM')
  var unitMM = document.getElementsByClassName('bfUnitMM')
  var unitConvertKG = document.getElementsByClassName('bfUnitConvertKG')
  var unitConvertCM = document.getElementsByClassName('bfUnitConvertCM')
  var unitConvertMM = document.getElementsByClassName('bfUnitConvertMM')
  var fatRes = document.getElementById('bfFatRes')
  var leanRes = document.getElementById('bfLeanRes')

  metricButton.className = (metricButton.className).replace('bf-active', '')
  imperialButton.className = (imperialButton.className).replace('bf-active', '')

  if (unitType == 'i') {
    _bf_units = 'i'

    /* Make the imperial button active */
    imperialButton.className += ' bf-active'

    /* Replace labels from metric to imperial */
    for (var i = 0; i < unitKG.length; i++) {
      unitKG[i].innerHTML = 'lb'
    }

    for (var i = 0; i < unitCM.length; i++) {
      unitCM[i].innerHTML = 'in'
    }

    for (var i = 0; i < unitMM.length; i++) {
      unitMM[i].innerHTML = 'in'
    }

    /* Convert input values from metric to imperial */
    if (oldUnitType == 'm') {
      /* Convert result data */
      fatRes.innerHTML = Math.round(isNumeric(fatRes.innerHTML) * 2.20462262 * 100) / 100
      leanRes.innerHTML = Math.round(isNumeric(leanRes.innerHTML) * 2.20462262 * 100) / 100

      for (var i = 0; i < unitConvertKG.length; i++) {
        unitConvertKG[i].value = Math.round(unitConvertKG[i].value * 2.20462262 * 1000) / 1000
      }

      for (var i = 0; i < unitConvertCM.length; i++) {
        unitConvertCM[i].value = Math.round(unitConvertCM[i].value * 0.393700787 * 1000) / 1000
      }

      for (var i = 0; i < unitConvertMM.length; i++) {
        unitConvertMM[i].value = Math.round(unitConvertMM[i].value * 0.0393700787 * 1000) / 1000
      }
    }
  } else {
    _bf_units = 'm'
    /* Make the metric button active */

    metricButton.className += ' bf-active'

    /* Replace labels from imperial to metric */
    for (var i = 0; i < unitKG.length; i++) {
      unitKG[i].innerHTML = 'kg'
    }

    for (var i = 0; i < unitCM.length; i++) {
      unitCM[i].innerHTML = 'cm'
    }

    for (var i = 0; i < unitMM.length; i++) {
      unitMM[i].innerHTML = 'mm'
    }

    /* Convert input values from imperial to metric */
    if (oldUnitType == 'i') {
      /* Convert result data */
      fatRes.innerHTML = Math.round(isNumeric(fatRes.innerHTML) / 2.20462262 * 100) / 100
      leanRes.innerHTML = Math.round(isNumeric(leanRes.innerHTML) / 2.20462262 * 100) / 100

      for (var i = 0; i < unitConvertKG.length; i++) {
        unitConvertKG[i].value = Math.round(unitConvertKG[i].value / 2.20462262 * 1000) / 1000
      }

      for (var i = 0; i < unitConvertCM.length; i++) {
        unitConvertCM[i].value = Math.round(unitConvertCM[i].value / 0.393700787 * 1000) / 1000
      }

      for (var i = 0; i < unitConvertMM.length; i++) {
        unitConvertMM[i].value = Math.round(unitConvertMM[i].value / 0.0393700787 * 1000) / 1000
      }
    }
  }

  /* Since the label size was changed (because of replacing its value, ex 'mm' -> 'in' or viceversa)
   * we need to re-adjust input sizes
   */
  bfAdjustInputSizes()
}

/* Change genre */
function bfSetGenre(genre, event) {
  if (event != null) event.preventDefault()

  var maleButton = document.getElementById('bfGenre1')
  var femaleButton = document.getElementById('bfGenre2')

  /* Change buttons' style */
  maleButton.className = (maleButton.className).replace('bf-active', '')
  femaleButton.className = (femaleButton.className).replace('bf-active', '')

  if (genre == 'm') {
    _bf_genre = 'm'
    maleButton.className += ' bf-active'
  } else {
    _bf_genre = 'f'
    femaleButton.className += ' bf-active'
  }

  /* Show/hide additional inputs if female, as some formulas require */
  if (_bf_formula == 'mymca') {
    if (_bf_genre == 'f') {
      bfShowElement('bfWristContainer')
      bfShowElement('bfHipsContainer')
      bfShowElement('bfForearmContainer')
    } else {
      bfHideElement('bfWristContainer')
      bfHideElement('bfHipsContainer')
      bfHideElement('bfForearmContainer')
    }
  } else if (_bf_formula == 'covert') {
    if (_bf_genre == 'f') {
      bfShowElement('bfThighContainer')
      bfShowElement('bfCalfContainer')
      bfHideElement('bfWaistContainer')
      bfHideElement('bfForearmContainer')
    } else {
      bfHideElement('bfThighContainer')
      bfHideElement('bfCalfContainer')
      bfShowElement('bfWaistContainer')
      bfShowElement('bfForearmContainer')
    }
  } else if (_bf_formula == 'jack3') {
    if (_bf_genre == 'm') {
      bfShowElement('bfChestContainer')
      bfShowElement('bfAbdominalContainer')
      bfHideElement('bfTricepContainer')
      bfHideElement('bfSuprailiacContainer')
    } else if (_bf_genre == 'f') {
      bfHideElement('bfChestContainer')
      bfHideElement('bfAbdominalContainer')
      bfShowElement('bfTricepContainer')
      bfShowElement('bfSuprailiacContainer')
    }
  } else if (_bf_formula == 'navy') {
    if (_bf_genre == 'm') {
      bfShowElement('bfAbdomenContainer')
      bfHideElement('bfWaistContainer')
      bfHideElement('bfHipsContainer')
    } else {
      bfShowElement('bfWaistContainer')
      bfShowElement('bfHipsContainer')
      bfHideElement('bfAbdomenContainer')
    }
  }

  bfAdjustInputSizes()
}
/* Change formula used */
function bfSetFormula(formula) {
  var formulaSelect = document.getElementById('bfFormula')

  _bf_formula = formula || formulaSelect.options[formulaSelect.selectedIndex].value
  /* If formula is set programmatically, update the default option on select element */

  for (var i, j = 0; i = formulaSelect.options[j]; j++) {
    if (i.value == formula) {
      formulaSelect.selectedIndex = j

      break
    }
  }

  /* Hide all inputs */
  bfHideInputs()

  /* Display only inputs that the selected formula requires */
  bfShowElement('bfMeasurement')
  bfShowElement('bfGenre')
  bfShowElement('bfWeightContainer')
  bfShowElement('bfFormulaContainer')
  bfShowElement('bfCalculateButtons', 'block')

  /* Show result area */
  var resultItems = document.getElementsByClassName('bfResults')

  for (var i = 0; i < resultItems.length; i++) {
    resultItems[i].style.display = 'inline-block'
  }

  /* Display only inputs that the selected formula requires */
  if (_bf_formula == 'mymca' || _bf_formula == 'ymca') {
    bfShowElement('bfWaistContainer')
  } else if (_bf_formula == 'covert') {
    bfShowElement('bfHipsContainer')
    bfShowElement('bfWaistContainer')
    bfShowElement('bfWristContainer')
    bfShowElement('bfForearmContainer')
    bfShowElement('bfAgeContainer')
  } else if (_bf_formula == 'jack7') {
    bfShowElement('bfChestContainer')
    bfShowElement('bfAbdominalContainer')
    bfShowElement('bfThigh2Container')
    bfShowElement('bfTricepContainer')
    bfShowElement('bfSubscapularContainer')
    bfShowElement('bfSuprailiacContainer')
    bfShowElement('bfMidaxillaryContainer')
    bfShowElement('bfAgeContainer')
  } else if (_bf_formula == 'jack4') {
    bfShowElement('bfAgeContainer')
    bfShowElement('bfTricepContainer')
    bfShowElement('bfAbdominalContainer')
    bfShowElement('bfSuprailiacContainer')
    bfShowElement('bfThigh2Container')
  } else if (_bf_formula == 'jack3') {
    bfShowElement('bfThigh2Container')
  } else if (_bf_formula == 'parrillo') {
    bfShowElement('bfChestContainer')
    bfShowElement('bfAbdominalContainer')
    bfShowElement('bfThigh2Container')
    bfShowElement('bfBicepContainer')
    bfShowElement('bfTricepContainer')
    bfShowElement('bfSubscapularContainer')
    bfShowElement('bfSuprailiacContainer')
    bfShowElement('bfLowerBackContainer')
    bfShowElement('bfCalf2Container')
  } else if (_bf_formula == 'durnin') {
    bfShowElement('bfTricepContainer')
    bfShowElement('bfBicepContainer')
    bfShowElement('bfSubscapularContainer')
    bfShowElement('bfSuprailiacContainer')
    bfShowElement('bfAgeContainer')
  } else if (_bf_formula == 'navy') {
    bfShowElement('bfHeightContainer')
    bfShowElement('bfNeckContainer')
  }

  bfSetGenre(_bf_genre, null)

  bfAdjustInputSizes()
}

/* Hide given element */
function bfHideElement(element) {
  document.getElementById(element).style.display = 'none'
}

/* Show given element */
function bfShowElement(element, type) {
  type = type || 'inline-block'

  document.getElementById(element).style.display = type
}

/* Hide all inputs */
function bfHideInputs() {
  var inputs = document.getElementsByClassName('bf-calculator-item-container')

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].style.display = 'none'
  }
}

/* Convert to imperial system */
function bfImperial(number, type) {
  if (_bf_units == 'i') {
    return number
  } else {
    if (type == 'kg') {
      return number * 2.20462262
    } else if (type == 'cm') {
      return number * 0.393700787
    } else if (type == 'mm') {
      return number * 0.0393700787
    }
  }
}

/* Convert to metric system */
function bfMetric(number, type) {
  if (_bf_units == 'm') {
    return number
  } else {
    if (type == 'kg') {
      return number / 2.20462262
    } else if (type == 'cm') {
      return number / 0.393700787
    } else if (type == 'mm') {
      return number / 0.0393700787
    }
  }
}

/* Calculate function */
function bfCalculatorCalculate() {
  /* Input fields */
  var ageVal = isNumeric(document.getElementById('bfAge').value)
  var waistVal = isNumeric(document.getElementById('bfWaist').value)
  var wristVal = isNumeric(document.getElementById('bfWrist').value)
  var hipsVal = isNumeric(document.getElementById('bfHips').value)
  var forearmVal = isNumeric(document.getElementById('bfForearm').value)
  var thighVal = isNumeric(document.getElementById('bfThigh').value)
  var calfVal = isNumeric(document.getElementById('bfCalf').value)
  var heightVal = bfImperial(isNumeric(document.getElementById('bfHeight').value), 'cm')
  var chestVal = bfMetric(isNumeric(document.getElementById('bfChest').value), 'mm')
  var abdominalVal = bfMetric(isNumeric(document.getElementById('bfAbdominal').value), 'mm')
  var tricepVal = bfMetric(isNumeric(document.getElementById('bfTricep').value), 'mm')
  var subscapularVal = bfMetric(isNumeric(document.getElementById('bfSubscapular').value), 'mm')
  var suprailiacVal = bfMetric(isNumeric(document.getElementById('bfSuprailiac').value), 'mm')
  var midaxillaryVal = bfMetric(isNumeric(document.getElementById('bfMidaxillary').value), 'mm')
  var thigh2Val = bfMetric(isNumeric(document.getElementById('bfThigh2').value), 'mm')
  var calf2Val = bfMetric(isNumeric(document.getElementById('bfCalf2').value), 'mm')
  var bicepVal = bfMetric(isNumeric(document.getElementById('bfBicep').value), 'mm')
  var lowerBackVal = bfMetric(isNumeric(document.getElementById('bfLowerBack').value), 'mm')
  var originalAbdomen = isNumeric(document.getElementById('bfAbdomen').value)
  var abdomenVal = bfMetric(originalAbdomen, 'mm')
  var originalNeck = isNumeric(document.getElementById('bfNeck').value)
  var neckVal = bfMetric(originalNeck, 'mm')
  var originalWeight = isNumeric(document.getElementById('bfWeight').value)
  var weightVal = bfMetric(originalWeight, 'kg')

  if (_bf_units == 'm') {
    originalWeight = bfMetric(originalWeight)
  } else {
    originalWeight = bfImperial(originalWeight)
  }

  /* Output fields */
  var bodyFatRes = document.getElementById('bfBodyFatRes')
  var leanRes = document.getElementById('bfLeanRes')
  var fatRes = document.getElementById('bfFatRes')
  var classRes = document.getElementById('bfClassRes')
  var bodyFat = 0
  var bodyDensity = 0

  /* Check which calculation method is selected and apply its formula */
  if (_bf_formula == 'ymca') {
    /* Convert values to inch, required by formula */
    weightVal = bfImperial(originalWeight, 'kg')
    waistVal = bfImperial(waistVal, 'mm')

    if (_bf_genre == 'm') {
      bodyFat = 100 * (4.15 * waistVal - 0.082 * weightVal - 98.42) / weightVal
    } else {
      bodyFat = 100 * (4.15 * waistVal - 0.082 * weightVal - 76.76) / weightVal
    }
  } else if (_bf_formula == 'mymca') {
    /* Convert values to inch, required by formula */
    weightVal = bfImperial(originalWeight, 'kg')
    waistVal = bfImperial(waistVal, 'mm')
    wristVal = bfImperial(wristVal, 'mm')
    hipsVal = bfImperial(hipsVal, 'mm')
    forearmVal = bfImperial(forearmVal, 'mm')

    if (_bf_genre == 'm') {
      bodyFat = 100 * ((4.15 * waistVal - 0.082 * weightVal - 94.42) / weightVal)
    } else {
      bodyFat = 100 * ((0.268 * weightVal - 0.318 * wristVal + 0.157 * waistVal + 0.245 * hipsVal - 0.434 * forearmVal - 8.987) / weightVal)
    }
  } else if (_bf_formula == 'covert') {
    /* Convert values to inch, required by formula */
    waistVal = bfImperial(waistVal, 'mm')
    wristVal = bfImperial(wristVal, 'mm')
    hipsVal = bfImperial(hipsVal, 'mm')
    forearmVal = bfImperial(forearmVal, 'mm')
    thighVal = bfImperial(thighVal, 'mm')
    calfVal = bfImperial(calfVal, 'mm')

    if (_bf_genre == 'm') {
      if (ageVal > 30) {
        bodyFat = (waistVal + 0.5 * hipsVal - 2.7 * forearmVal - wristVal)
      } else {
        bodyFat = (waistVal + 0.5 * hipsVal - 3 * forearmVal - wristVal)
      }
    } else {
      if (ageVal > 30) {
        bodyFat = hipsVal + thighVal - 2 * calfVal - wristVal
      } else {
        bodyFat = hipsVal + 0.8 * thighVal - 2 * calfVal - wristVal
      }
    }
  } else if (_bf_formula == 'jack7') {
    var sumOfSkinfolds = chestVal + abdominalVal + thigh2Val + tricepVal + subscapularVal + suprailiacVal + midaxillaryVal

    if (_bf_genre == 'm') {
      bodyDensity = 1.112 - (0.00043499 * sumOfSkinfolds) + (0.00000055 * Math.pow(sumOfSkinfolds, 2)) - (0.00028826 * ageVal)
      bodyFat = (495 / bodyDensity) - 450
    } else {
      bodyDensity = 1.097 - (0.00046971 * sumOfSkinfolds) + (0.00000056 * Math.pow(sumOfSkinfolds, 2)) - (0.00012828 * ageVal)
      bodyFat = (495 / bodyDensity) - 450
    }

    console.log(bodyDensity, bodyFat, ageVal)

  } else if (_bf_formula == 'jack4') {
    var sumOfSkinfolds = abdominalVal + thigh2Val + tricepVal + suprailiacVal

    if (_bf_genre == 'm') {
      bodyFat = (0.29288 * sumOfSkinfolds) - (0.0005 * Math.pow(sumOfSkinfolds, 2)) + (0.15845 * ageVal) - 5.76377
    } else {
      bodyFat = (0.29669 * sumOfSkinfolds) - (0.00043 * Math.pow(sumOfSkinfolds, 2)) + (0.02963 * ageVal) + 1.4072
    }
  } else if (_bf_formula == 'jack3') {
    if (_bf_genre == 'm') {
      var sumOfSkinfolds = chestVal + abdominalVal + thigh2Val
      bodyDensity = 1.10938 - (0.0008267 * sumOfSkinfolds) + (0.0000016 * Math.pow(sumOfSkinfolds, 2)) - (0.0002574 * ageVal)
      bodyFat = (495 / bodyDensity) - 450
    } else {
      var sumOfSkinfolds = tricepVal + suprailiacVal + thigh2Val

      bodyDensity = 1.0994921 - (0.0009929 * sumOfSkinfolds) + (0.0000023 * Math.pow(sumOfSkinfolds, 2)) - (0.0001392 * ageVal)
      bodyFat = (495 / bodyDensity) - 450
    }
  } else if (_bf_formula == 'parrillo') {
    weightVal = bfImperial(originalWeight, 'kg')

    bodyFat = (chestVal + abdominalVal + thigh2Val + bicepVal + tricepVal + subscapularVal + suprailiacVal + lowerBackVal + calf2Val) * 27 / weightVal
  } else if (_bf_formula == 'durnin') {
    var sumOfSkinfolds = Math.log10(bicepVal + tricepVal + subscapularVal + suprailiacVal)

    console.log(bicepVal + tricepVal + subscapularVal + suprailiacVal, sumOfSkinfolds, ageVal)

    if (_bf_genre == 'm') {
      if (ageVal < 17) {
        bodyDensity = 1.1533 - (0.0643 * sumOfSkinfolds)
      } else if (ageVal >= 17 && ageVal <= 19) {
        bodyDensity = 1.1620 - (0.0630 * sumOfSkinfolds)
      } else if (ageVal >= 20 && ageVal <= 29) {
        bodyDensity = 1.1631 - (0.0632 * sumOfSkinfolds)
      } else if (ageVal >= 30 && ageVal <= 39) {
        bodyDensity = 1.1422 - (0.0544 * sumOfSkinfolds)
      } else if (ageVal >= 40 && ageVal <= 49) {
        bodyDensity = 1.1620 - (0.0700 * sumOfSkinfolds)
      } else if (ageVal >= 50) {
        bodyDensity = 1.1715 - (0.0779 * sumOfSkinfolds)
      }
    } else {
      if (ageVal < 17) {
        bodyDensity = 1.1369 - (0.0598 * sumOfSkinfolds)
      } else if (ageVal >= 17 && ageVal <= 19) {
        bodyDensity = 1.1549 - (0.0678 * sumOfSkinfolds)
      } else if (ageVal >= 20 && ageVal <= 29) {
        bodyDensity = 1.1599 - (0.0717 * sumOfSkinfolds)
      } else if (ageVal >= 30 && ageVal <= 39) {
        bodyDensity = 1.1423 - (0.0632 * sumOfSkinfolds)
      } else if (ageVal >= 40 && ageVal <= 49) {
        bodyDensity = 1.1333 - (0.0612 * sumOfSkinfolds)
      } else if (ageVal >= 50) {
        bodyDensity = 1.1339 - (0.0645 * sumOfSkinfolds)
      }
    }

    bodyFat = (495 / bodyDensity) - 450

  } else if (_bf_formula == 'navy') {
    hipsVal = bfImperial(hipsVal, 'mm')
    abdomenVal = bfImperial(originalAbdomen, 'mm')
    neckVal = bfImperial(originalNeck, 'mm')
    waistVal = bfImperial(waistVal, 'mm')

    if (_bf_genre == 'm') {
      // [86.010 x log10(abdomen - neck)] - [70.041 x log10(height in inches)] + 36.76
      bodyFat = 86.010 * Math.log10(abdomenVal - neckVal) - 70.041 * Math.log10(heightVal) + 36.76
    } else {
      // [163.205 x log10(waist + hip - neck)] - [97.684 x log10(height in inches)] - 78.387
      bodyFat = 163.205 * Math.log10(waistVal + hipsVal - neckVal) - 97.684 * Math.log10(heightVal) - 78.387
    }
  }

  /* Output results */
  bodyFatRes.innerHTML = Math.round(bodyFat * 100) / 100
  fatRes.innerHTML = Math.round(originalWeight * bodyFat / 100 * 100) / 100
  leanRes.innerHTML = Math.round((originalWeight - (originalWeight * bodyFat / 100)) * 100) / 100

  /* Find classification based on body fat */
  var classif = '-'

  if (_bf_genre == 'm') {
    if (bodyFat >= 2 && bodyFat < 6) {
      classif = 'Essential fat (2-5%)'
    } else if (bodyFat >= 6 && bodyFat < 14) {
      classif = 'Athletes (6-13%)'
    } else if (bodyFat >= 14 && bodyFat < 18) {
      classif = 'Fitness (14-17%)'
    } else if (bodyFat >= 18 && bodyFat < 25) {
      classif = 'Acceptable (18-25%)'
    } else if (bodyFat >= 25) {
      classif = 'Obese (> 25%)'
    }
  } else {
    if (bodyFat >= 10 && bodyFat < 14) {
      classif = 'Essential fat (10-13%)'
    } else if (bodyFat >= 14 && bodyFat < 21) {
      classif = 'Athletes (14-20%)'
    } else if (bodyFat >= 21 && bodyFat < 25) {
      classif = 'Fitness (21-24%)'
    } else if (bodyFat >= 25 && bodyFat < 31) {
      classif = 'Acceptable (25-31%)'
    } else if (bodyFat > 31) {
      classif = 'Obese (> 31%)'
    }
  }

  /* Output classification */
  classRes.innerHTML = classif
}
