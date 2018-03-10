import _ from 'lodash';
import calculateBonuses from './StatBonuses'

export const prepare = (character) => {
  const result = calculateBonuses(character.characteristics || {})
 //  _.set(character, 'calculated', result)
  console.log(character);
  return character;
};