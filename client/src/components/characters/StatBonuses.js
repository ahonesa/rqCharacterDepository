export default ({str, str_max, str_org, con, con_org, con_max, siz, siz_org, siz_max, int, int_org, int_max, pow, pow_org, pow_max, dex, dex_org, dex_max, cha, cha_org, cha_max }) => {
  
  const characteristics = {
    STR: { original: parseInt(str_org, 0) || 10, current: parseInt(str, 0) || 10, max: parseInt(str_max, 0) || 10 },
    CON: { original: parseInt(con_org, 0) || 10, current: parseInt(con, 0) || 10, max: parseInt(con_max, 0) || 10 },
    SIZ: { original: parseInt(siz_org, 0) || 10, current: parseInt(siz, 0) || 10, max: parseInt(siz_max, 0) || 10 },
    INT: { original: parseInt(int_org, 0) || 10, current: parseInt(int, 0) || 10, max: parseInt(int_max, 0) || 10 },
    POW: { original: parseInt(pow_org, 0) || 10, current: parseInt(pow, 0) || 10, max: parseInt(pow_max, 0) || 10 },
    DEX: { original: parseInt(dex_org, 0) || 10, current: parseInt(dex, 0) || 10, max: parseInt(dex_max, 0) || 10 },
    CHA: { original: parseInt(cha_org, 0) || 10, current: parseInt(cha, 0) || 10, max: parseInt(cha_max, 0) || 10 }
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
    
  const agilityModifier       = calculateModifier(characteristics.DEX.current, 10, characteristics.STR.current, characteristics.POW.current, characteristics.SIZ.current, 10)
  const communicationModifier = calculateModifier(characteristics.CHA.current, 10, characteristics.POW.current, characteristics.INT.current, 10, 10)
  const knowledgeModifier     = calculateModifier(characteristics.INT.current, 10, characteristics.POW.current, 10, 10, 10)
  const magicModifier         = calculateModifier(characteristics.POW.current, 10, characteristics.CHA.current, 10, 10, 10)
  const manipulationModifier  = calculateModifier(characteristics.DEX.current, characteristics.INT.current, characteristics.STR.current, characteristics.POW.current, 10, 10)
  const perceptionModifier    = calculateModifier(characteristics.INT.current, 10, characteristics.POW.current, 10, 10, 10)
  const stealthModifier       = calculateModifier(characteristics.DEX.current, characteristics.INT.current, 10, 10, characteristics.POW.current, characteristics.SIZ.current)
  
  const damageModifier = calculateDamageModifier(characteristics.STR.current, characteristics.SIZ.current)

  const bonuses = {
    agilityModifier,
    communicationModifier,
    knowledgeModifier,
    magicModifier,
    manipulationModifier,
    perceptionModifier,
    stealthModifier
  }
  
  return ( {
    characteristics,
    bonuses,
    hitPoints,
    magicPoints,
    fatiguePoints,
    damageModifier
  } );
}

const calculateDamageModifier = (str, siz) => {
  const total = str+siz

  if(total < 13) return "- D4"
  else if(total < 25) return ""
  else if(total < 33) return "+ D4"
  else if(total < 37) return "+ D6"
  else if(total < 41) return "+ D8"
  else if(total < 57) return "+ 2D6"
  else {
    const diceNumber = 2 + Math.ceil((total - 56) / 16)
    return "+ " + diceNumber + "D6"
  } 
}

const calculateModifier = (primary1, primary2, secondary1, secondary2, negative1, negative2) => (
    calculatePrimary(primary1) +
    calculatePrimary(primary2) +
    calculateSecondary(secondary1) +
    calculateSecondary(secondary2) +
    calculateSecNegative(negative1) +
    calculatePriNegative(negative2)
)

const calculatePrimary = (primary) => {
    if (primary < 5) return -10
    else if (primary < 9) return -5
    else if (primary < 13) return 0
    else if (primary < 17) return 5
    else if (primary < 21) return 10
    else {
        return (10 + Math.floor((primary - 20) / 4) * 5);
    }
}

const calculateSecondary = (secondary) => {
    if (secondary < 5) return -5
    else if (secondary < 17) return 0
    else if (secondary < 21) return 5
    else {
        return (10 + (Math.floor((secondary - 20) / 4) * 5));
    }
}

const calculateSecNegative = (negative) => {
    if (negative < 5) return 5
    else if (negative < 17) return 0
    else if (negative < 21) return -5
    else {
        return (-10 - (Math.floor((negative - 20) / 4) * 5));
    }
}

const calculatePriNegative = (negative) => {
    if (negative < 5) return 10
    else if (negative < 9) return 5
    else if (negative < 13) return 0
    else if (negative < 17) return -5
    else if (negative < 21) return -10
    else {
        return (-10 - Math.floor((negative - 20) / 4) * 5);
    }
}




