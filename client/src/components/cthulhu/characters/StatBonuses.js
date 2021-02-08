export default ({age, str, str_org, dex, dex_org, int, int_org, con, con_org, app, app_org, pow, pow_org, siz, siz_org, edu, edu_org}) => {

    const characteristics = {
        STR: {
            original: parseInt(str_org, 0) || 50,
            current: parseInt(str, 0) || 50,
            half: Math.floor((parseInt(str, 0) || 50) / 2),
            fifth: Math.floor((parseInt(str, 0) || 50) / 5)
        },
        DEX: {
            original: parseInt(dex_org, 0) || 50,
            current: parseInt(dex, 0) || 50,
            half: Math.floor((parseInt(dex, 0) || 50) / 2),
            fifth: Math.floor((parseInt(dex, 0) || 50) / 5)
        },
        INT: {
            original: parseInt(int_org, 0) || 50,
            current: parseInt(int, 0) || 50,
            half: Math.floor((parseInt(int, 0) || 50) / 2),
            fifth: Math.floor((parseInt(int, 0) || 50) / 5)
        },
        CON: {
            original: parseInt(con_org, 0) || 50,
            current: parseInt(con, 0) || 50,
            half: Math.floor((parseInt(con, 0) || 50) / 2),
            fifth: Math.floor((parseInt(con, 0) || 50) / 5)
        },
        APP: {
            original: parseInt(app_org, 0) || 50,
            current: parseInt(app, 0) || 50,
            half: Math.floor((parseInt(app, 0) || 50) / 2),
            fifth: Math.floor((parseInt(app, 0) || 50) / 5)
        },
        POW: {
            original: parseInt(pow_org, 0) || 50,
            current: parseInt(pow, 0) || 50,
            half: Math.floor((parseInt(pow, 0) || 50) / 2),
            fifth: Math.floor((parseInt(pow, 0) || 50) / 5)
        },
        SIZ: {
            original: parseInt(siz_org, 0) || 50,
            current: parseInt(siz, 0) || 50,
            half: Math.floor((parseInt(siz, 0) || 50) / 2),
            fifth: Math.floor((parseInt(siz, 0) || 50) / 5)
        },
        EDU: {
            original: parseInt(edu_org, 0) || 50,
            current: parseInt(edu, 0) || 50,
            half: Math.floor((parseInt(edu, 0) || 50) / 2),
            fifth: Math.floor((parseInt(edu, 0) || 50) / 5)
        }
    }

    const hitPoints = Math.floor((characteristics.CON.current + characteristics.SIZ.current) / 10)

    const magicPoints = Math.floor((characteristics.POW.current / 5))

    const damageModifier = calculateDamageModifier(characteristics.STR.current, characteristics.SIZ.current)

    const build = calculateBuild(characteristics.STR.current, characteristics.SIZ.current)

    const movementRate = calculateMovementRate(age, calculateBaseMovementRate(characteristics.DEX.current, characteristics.SIZ.current, characteristics.STR.current))

    return ({
        characteristics,
        hitPoints,
        magicPoints,
        damageModifier,
        build,
        movementRate
    });
}

const calculateDamageModifier = (str, siz) => {
    const total = str + siz

    if (total < 65) return "- 2"
    else if (total < 85) return "-1"
    else if (total < 125) return ""
    else if (total < 165) return "+ 1D4"
    else if (total < 205) return "+ 1D6"
    else if (total < 285) return "+ 2D6"
    else if (total < 365) return "+ 3D6"
    else if (total < 445) return "+ 4D6"
    else if (total < 525) return "+ 5D6"
    else {
        const diceNumber = 5 + Math.ceil((total - 524) / 80)
        return "+ " + diceNumber + "D6"
    }
}

const calculateBuild = (str, siz) => {
    const total = str + siz

    if (total < 65) return -2
    else if (total < 85) return -1
    else if (total < 125) return 0
    else if (total < 165) return 1
    else if (total < 205) return 2
    else if (total < 285) return 3
    else if (total < 365) return 4
    else if (total < 445) return 5
    else if (total < 525) return 6
    else {
        const build = 6 + Math.ceil((total - 524) / 80)
        return build
    }
}

const calculateMovementRate = (age, baseMov) => {
    if (age > 79) return (baseMov - 5)
    else if (age > 69) return (baseMov - 4)
    else if (age > 59) return (baseMov - 3)
    else if (age > 49) return (baseMov - 2)
    else if (age > 39) return (baseMov - 1)
    else return baseMov
}


const calculateBaseMovementRate = (dex, siz, str) => {
    if (dex < siz && str < siz) {
        return 7;
    } else if (dex > siz && str > siz) {
        return 9;
    } else {
        return 8;
    }
}
