export default ({str, str_max, con, con_max, siz, siz_max, int, int_max, pow, pow_max, dex, dex_max, app, app_max }) => {
  
  const characteristics = {
    STR: { original: parseInt(str, 0) || 10, current: parseInt(str_max, 0) || 10 },
    CON: { original: parseInt(con, 0) || 10, current: parseInt(con_max, 0) || 10 },
    SIZ: { original: parseInt(siz, 0) || 10, current: parseInt(siz_max, 0) || 10 },
    INT: { original: parseInt(int, 0) || 10, current: parseInt(int_max, 0) || 10 },
    POW: { original: parseInt(pow, 0) || 10, current: parseInt(pow_max, 0) || 10 },
    DEX: { original: parseInt(dex, 0) || 10, current: parseInt(dex_max, 0) || 10 },
    APP: { original: parseInt(app, 0) || 10, current: parseInt(app_max, 0) || 10 } 
  }  

  const hitPoints = {
    base: Math.ceil( (characteristics.CON.original + characteristics.SIZ.original) / 2, 0 ),
    current: Math.ceil( (characteristics.CON.original + characteristics.SIZ.original) / 2, 0 )
  }

  const magicPoints = {
    base: characteristics.POW.original,
    current: characteristics.POW.original
  }

  const fatiguePoints = {
    base: characteristics.STR.original + characteristics.CON.original,
    current: characteristics.STR.original + characteristics.CON.original
  }
    
  const dexterityBonus     = calculateBonus(characteristics.DEX.original, 10, characteristics.STR.original, 10, characteristics.SIZ.original, 10)
  const communicationBonus = calculateBonus(characteristics.INT.original, 10, characteristics.POW.original, characteristics.APP.original, 10, 10)
  const knowledgeBonus     = calculateBonus(characteristics.INT.original, 10, 10, 10, 10, 10)
  const magicalBonus       = calculateBonus(characteristics.INT.original, characteristics.POW.original, characteristics.DEX.original, 10, 10, 10)
  const manipulationBonus  = calculateBonus(characteristics.DEX.original, characteristics.STR.original, characteristics.INT.original, 10, 10, 10)
  const perceptionBonus    = calculateBonus(characteristics.INT.original, 10, characteristics.POW.original, characteristics.CON.original, 10, 10)
  const stealthBonus       = calculateBonus(characteristics.DEX.original, 10, 10, 10, characteristics.POW.original, characteristics.SIZ.original)
  
  const bonuses = {
    dexterityBonus,
    communicationBonus,
    knowledgeBonus,
    magicalBonus,
    manipulationBonus,
    perceptionBonus,
    stealthBonus
  }


  console.log( bonuses )

  return ( {
    characteristics,
    bonuses,
    hitPoints,
    magicPoints,
    fatiguePoints
  } );
}

const calculateBonus = (primary1, primary2, secondary1, secondary2, negative1, negative2) => (
  (primary1 - 10) +
  (primary2 - 10) +
  Math.ceil((secondary1 - 10) / 2, 0) +
  Math.ceil((secondary2 - 10) / 2, 0) +
  (-(negative2 - 10)) +
  (-(negative1 - 10))
)