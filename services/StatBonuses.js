module.exports = ({str, str_max, str_org, con, con_org, con_max, siz, siz_org, siz_max, int, int_org, int_max, pow, pow_org, pow_max, dex, dex_org, dex_max, app, app_org, app_max }) => {
  
  const characteristics = {
    STR: { original: parseInt(str_org, 0) || 10, current: parseInt(str, 0) || 10, max: parseInt(str_max, 0) || 10 },
    CON: { original: parseInt(con_org, 0) || 10, current: parseInt(con, 0) || 10, max: parseInt(con_max, 0) || 10 },
    SIZ: { original: parseInt(siz_org, 0) || 10, current: parseInt(siz, 0) || 10, max: parseInt(siz_max, 0) || 10 },
    INT: { original: parseInt(int_org, 0) || 10, current: parseInt(int, 0) || 10, max: parseInt(int_max, 0) || 10 },
    POW: { original: parseInt(pow_org, 0) || 10, current: parseInt(pow, 0) || 10, max: parseInt(pow_max, 0) || 10 },
    DEX: { original: parseInt(dex_org, 0) || 10, current: parseInt(dex, 0) || 10, max: parseInt(dex_max, 0) || 10 },
    APP: { original: parseInt(app_org, 0) || 10, current: parseInt(app, 0) || 10, max: parseInt(app_max, 0) || 10 } 
  }  

  const hitPoints = {
    base: Math.ceil( (characteristics.CON.current + characteristics.SIZ.current) / 2, 0 ),
    current: Math.ceil( (characteristics.CON.current + characteristics.SIZ.current) / 2, 0 )
  }

  const magicPoints = {
    base: characteristics.POW.current,
    current: characteristics.POW.current
  }

  const fatiguePoints = {
    base: characteristics.STR.current + characteristics.CON.current,
    current: characteristics.STR.current + characteristics.CON.current
  }
    
  const dexterityBonus     = calculateBonus(characteristics.DEX.current, 10, characteristics.STR.current, 10, characteristics.SIZ.current, 10)
  const communicationBonus = calculateBonus(characteristics.INT.current, 10, characteristics.POW.current, characteristics.APP.current, 10, 10)
  const knowledgeBonus     = calculateBonus(characteristics.INT.current, 10, 10, 10, 10, 10)
  const magicalBonus       = calculateBonus(characteristics.INT.current, characteristics.POW.current, characteristics.DEX.current, 10, 10, 10)
  const manipulationBonus  = calculateBonus(characteristics.DEX.current, characteristics.INT.current, characteristics.STR.current, 10, 10, 10)
  const perceptionBonus    = calculateBonus(characteristics.INT.current, 10, characteristics.POW.current, characteristics.CON.current, 10, 10)
  const stealthBonus       = calculateBonus(characteristics.DEX.current, 10, 10, 10, characteristics.POW.current, characteristics.SIZ.current)
  
  const bonuses = {
    dexterityBonus,
    communicationBonus,
    knowledgeBonus,
    magicalBonus,
    manipulationBonus,
    perceptionBonus,
    stealthBonus
  }
  
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