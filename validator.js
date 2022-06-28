/**
 * Duomenu objekto validatorius, kuris tikrina, ar duomenu objekte yra tik leistini raktazodziai.
 * 
 * Objekte gali buti ir papildomu neprivalomu, bet vis vien leistinu raktazodziu (optional keys)
 * @param {Object} obj Duomenu objektas
 * @param {Object} rules Nustatymu objektas
 * @returns {[boolean, string]} Rezultatas, kur pirmasis parametras reiskia ar buvo rasta klaida, o antrasis - zinute (aprasanti klaida)
 */
function validator(obj, rules) {
  // tikriname duomenu tipus
  if (typeof obj !== 'object'
    || obj === null
    || Array.isArray(obj)) {
    return [true, 'Neduotas objektas'];
  }

  if (typeof rules !== 'object'
    || rules === null
    || Array.isArray(rules)) {
    return [true, 'Neduotas strukturos objektas'];
  }

  // uzisipildome trukstama informacija
  if (!('required' in rules)) {
    rules.required = [];
  }
  if (!('optional' in rules)) {
    rules.optional = [];
  }

  const objKeys = Object.keys(obj);
  const { required, optional } = rules;
  const totalRulesKeys = [...required, ...optional];

  // jei atejes objektas yra mazesnis uz privalomu lauku kieki
  // tai jam akivaizdziai kazkokio privalomo lauko truksta
  // net neidomu kokio, vis vien klaida
  if (objKeys.length < required.length) {
    return [true, 'Truksta privalomo key'];
  }

  // kai objektas neturi bent vieno privalomo lauko
  // tai einam per privalomus ir ziurim, is kurio lauko atejes
  // duomenu objektas savyje neturi
  for (const reqKey of required) {
    if (!objKeys.includes(reqKey)) {
      return [true, 'Truksta privalomo key'];
    }
  }

  // jei atejes objektas savyje turi bent viena lauka
  // kuris nera tarp leistinu lauku, tai klaida
  for (const objKey of objKeys) {
    if (!totalRulesKeys.includes(objKey)) {
      return [true, 'Pateiktas netinkamas key'];
    }
  }

  return [false, 'OK'];
}

module.exports = validator;