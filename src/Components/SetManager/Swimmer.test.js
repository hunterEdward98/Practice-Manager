convertTimeToInt = (min, sec) => {
    if ((typeof (min) !== typeof (5) || typeof (sec) !== typeof (5)) || min < 0 || sec < 0) {
        return NaN
    }
    return Math.floor(Number(min * 60) + Number(sec))
}

test(`expect 5,00 to output 300`, () => {
    expect(convertTimeToInt(5, 6)).toBe(306);
})
test(`expect 5,00 to output 300`, () => {
    expect(convertTimeToInt(-2, 6)).toBe(NaN);
})
test(`expect undefined 0 to output NaN`, () => {
    expect(convertTimeToInt(undefined, 6)).toBe(NaN);
})
test(`expect null 0 to output NaN`, () => {
    expect(convertTimeToInt(null, 6)).toBe(NaN);
})
test(`expect NaN 0 to output NaN`, () => {
    expect(convertTimeToInt(NaN, 6)).toBe(NaN);
})
test(`expect {} 0 to output NaN`, () => {
    expect(convertTimeToInt({}, 6)).toBe(NaN);
})
test(`expect [] 0 to output NaN`, () => {
    expect(convertTimeToInt([], 6)).toBe(NaN);
})
test(`expect '' 0 to output NaN`, () => {
    expect(convertTimeToInt("", 6)).toBe(NaN);
})
test(`expect '6' 0 to output NaN`, () => {
    expect(convertTimeToInt('5', 6)).toBe(NaN);
})
test(`expect {number:6} 0 to output NaN`, () => {
    expect(convertTimeToInt({ number: 5 }, 6)).toBe(NaN);
})
test(`expect [6] 0 to output NaN`, () => {
    expect(convertTimeToInt([5], 6)).toBe(NaN);
})


test(`expect 5,-3 to output NaN`, () => {
    expect(convertTimeToInt(5, -3)).toBe(NaN);
})
test(`expect 5,-3 to output NaN`, () => {
    expect(convertTimeToInt(-2, -3)).toBe(NaN);
})
test(`expect undefined 0 to output NaN`, () => {
    expect(convertTimeToInt(undefined, -3)).toBe(NaN);
})
test(`expect null 0 to output NaN`, () => {
    expect(convertTimeToInt(null, -3)).toBe(NaN);
})
test(`expect NaN 0 to output NaN`, () => {
    expect(convertTimeToInt(NaN, -3)).toBe(NaN);
})
test(`expect {} 0 to output NaN`, () => {
    expect(convertTimeToInt({}, -3)).toBe(NaN);
})
test(`expect [] 0 to output NaN`, () => {
    expect(convertTimeToInt([], -3)).toBe(NaN);
})
test(`expect '' 0 to output NaN`, () => {
    expect(convertTimeToInt("", -3)).toBe(NaN);
})
test(`expect '-2' 0 to output NaN`, () => {
    expect(convertTimeToInt('5', -3)).toBe(NaN);
})
test(`expect {number:-3} 0 to output NaN`, () => {
    expect(convertTimeToInt({ number: 5 }, -3)).toBe(NaN);
})
test(`expect [-2] -3 to output NaN`, () => {
    expect(convertTimeToInt([5], -3)).toBe(NaN);
})



test(`expect 5,undefined to output NaN`, () => {
    expect(convertTimeToInt(5, undefined)).toBe(NaN);
})
test(`expect 5,undefined to output NaN`, () => {
    expect(convertTimeToInt(-2, undefined)).toBe(NaN);
})
test(`expect undefined undefined to output NaN`, () => {
    expect(convertTimeToInt(undefined, undefined)).toBe(NaN);
})
test(`expect null undefined to output NaN`, () => {
    expect(convertTimeToInt(null, undefined)).toBe(NaN);
})
test(`expect NaN undefined to output NaN`, () => {
    expect(convertTimeToInt(NaN, undefined)).toBe(NaN);
})
test(`expect {} undefined to output NaN`, () => {
    expect(convertTimeToInt({}, undefined)).toBe(NaN);
})
test(`expect [] undefined to output NaN`, () => {
    expect(convertTimeToInt([], undefined)).toBe(NaN);
})
test(`expect '' undefined to output NaN`, () => {
    expect(convertTimeToInt("", undefined)).toBe(NaN);
})
test(`expect '-2' undefined to output NaN`, () => {
    expect(convertTimeToInt('5', undefined)).toBe(NaN);
})
test(`expect {number:undefined} undefined to output NaN`, () => {
    expect(convertTimeToInt({ number: 5 }, undefined)).toBe(NaN);
})
test(`expect [-2] undefined to output NaN`, () => {
    expect(convertTimeToInt([5], undefined)).toBe(NaN);
})


test(`expect 5,null to output NaN`, () => {
    expect(convertTimeToInt(5, null)).toBe(NaN);
})
test(`expect 5,null to output NaN`, () => {
    expect(convertTimeToInt(-2, null)).toBe(NaN);
})
test(`expect undefined null to output NaN`, () => {
    expect(convertTimeToInt(undefined, null)).toBe(NaN);
})
test(`expect null null to output NaN`, () => {
    expect(convertTimeToInt(null, null)).toBe(NaN);
})
test(`expect NaN null to output NaN`, () => {
    expect(convertTimeToInt(NaN, null)).toBe(NaN);
})
test(`expect {} null to output NaN`, () => {
    expect(convertTimeToInt({}, null)).toBe(NaN);
})
test(`expect [] null to output NaN`, () => {
    expect(convertTimeToInt([], null)).toBe(NaN);
})
test(`expect '' null to output NaN`, () => {
    expect(convertTimeToInt("", null)).toBe(NaN);
})
test(`expect '-2' null to output NaN`, () => {
    expect(convertTimeToInt('5', null)).toBe(NaN);
})
test(`expect {number:null} null to output NaN`, () => {
    expect(convertTimeToInt({ number: 5 }, null)).toBe(NaN);
})
test(`expect [-2] null to output NaN`, () => {
    expect(convertTimeToInt([5], null)).toBe(NaN);
})

test(`expect 5,NaN to output NaN`, () => {
    expect(convertTimeToInt(5, NaN)).toBe(NaN);
})
test(`expect 5,NaN to output NaN`, () => {
    expect(convertTimeToInt(-2, NaN)).toBe(NaN);
})
test(`expect undefined NaN to output NaN`, () => {
    expect(convertTimeToInt(undefined, NaN)).toBe(NaN);
})
test(`expect null NaN to output NaN`, () => {
    expect(convertTimeToInt(null, NaN)).toBe(NaN);
})
test(`expect NaN NaN to output NaN`, () => {
    expect(convertTimeToInt(NaN, NaN)).toBe(NaN);
})
test(`expect {} NaN to output NaN`, () => {
    expect(convertTimeToInt({}, NaN)).toBe(NaN);
})
test(`expect [] NaN to output NaN`, () => {
    expect(convertTimeToInt([], NaN)).toBe(NaN);
})
test(`expect '' NaN to output NaN`, () => {
    expect(convertTimeToInt("", NaN)).toBe(NaN);
})
test(`expect '-2' NaN to output NaN`, () => {
    expect(convertTimeToInt('5', NaN)).toBe(NaN);
})
test(`expect {number:NaN} NaN to output NaN`, () => {
    expect(convertTimeToInt({ number: 5 }, NaN)).toBe(NaN);
})
test(`expect [-2] NaN to output NaN`, () => {
    expect(convertTimeToInt([5], NaN)).toBe(NaN);
})

test(`expect 5,{} to output NaN`, () => {
    expect(convertTimeToInt(5, {})).toBe(NaN);
})
test(`expect 5,{} to output NaN`, () => {
    expect(convertTimeToInt(-2, {})).toBe(NaN);
})
test(`expect undefined {} to output NaN`, () => {
    expect(convertTimeToInt(undefined, {})).toBe(NaN);
})
test(`expect null {} to output NaN`, () => {
    expect(convertTimeToInt(null, {})).toBe(NaN);
})
test(`expect NaN {} to output NaN`, () => {
    expect(convertTimeToInt(NaN, {})).toBe(NaN);
})
test(`expect {} {} to output NaN`, () => {
    expect(convertTimeToInt({}, {})).toBe(NaN);
})
test(`expect [] {} to output NaN`, () => {
    expect(convertTimeToInt([], {})).toBe(NaN);
})
test(`expect '' {} to output NaN`, () => {
    expect(convertTimeToInt("", {})).toBe(NaN);
})
test(`expect '-2' {} to output NaN`, () => {
    expect(convertTimeToInt('5', {})).toBe(NaN);
})
test(`expect {number:{}} {} to output NaN`, () => {
    expect(convertTimeToInt({ number: 5 }, {})).toBe(NaN);
})
test(`expect [-2] {} to output NaN`, () => {
    expect(convertTimeToInt([5], {})).toBe(NaN);
})

test(`expect 5,[] to output NaN`, () => {
    expect(convertTimeToInt(5, [])).toBe(NaN);
})
test(`expect 5,[] to output NaN`, () => {
    expect(convertTimeToInt(-2, [])).toBe(NaN);
})
test(`expect undefined [] to output NaN`, () => {
    expect(convertTimeToInt(undefined, [])).toBe(NaN);
})
test(`expect null [] to output NaN`, () => {
    expect(convertTimeToInt(null, [])).toBe(NaN);
})
test(`expect NaN [] to output NaN`, () => {
    expect(convertTimeToInt(NaN, [])).toBe(NaN);
})
test(`expect {} [] to output NaN`, () => {
    expect(convertTimeToInt({}, [])).toBe(NaN);
})
test(`expect [] [] to output NaN`, () => {
    expect(convertTimeToInt([], [])).toBe(NaN);
})
test(`expect '' [] to output NaN`, () => {
    expect(convertTimeToInt("", [])).toBe(NaN);
})
test(`expect '-2' [] to output NaN`, () => {
    expect(convertTimeToInt('5', [])).toBe(NaN);
})
test(`expect {number:[]} [] to output NaN`, () => {
    expect(convertTimeToInt({ number: 5 }, [])).toBe(NaN);
})
test(`expect [-2] [] to output NaN`, () => {
    expect(convertTimeToInt([5], [])).toBe(NaN);
})

test(`expect 5,"" to output NaN`, () => {
    expect(convertTimeToInt(5, "")).toBe(NaN);
})
test(`expect 5,"" to output NaN`, () => {
    expect(convertTimeToInt(-2, "")).toBe(NaN);
})
test(`expect undefined "" to output NaN`, () => {
    expect(convertTimeToInt(undefined, "")).toBe(NaN);
})
test(`expect null "" to output NaN`, () => {
    expect(convertTimeToInt(null, "")).toBe(NaN);
})
test(`expect NaN "" to output NaN`, () => {
    expect(convertTimeToInt(NaN, "")).toBe(NaN);
})
test(`expect {} "" to output NaN`, () => {
    expect(convertTimeToInt({}, "")).toBe(NaN);
})
test(`expect [] "" to output NaN`, () => {
    expect(convertTimeToInt([], "")).toBe(NaN);
})
test(`expect '' "" to output NaN`, () => {
    expect(convertTimeToInt("", "")).toBe(NaN);
})
test(`expect '-2' "" to output NaN`, () => {
    expect(convertTimeToInt('5', "")).toBe(NaN);
})
test(`expect {number:""} "" to output NaN`, () => {
    expect(convertTimeToInt({ number: 5 }, "")).toBe(NaN);
})
test(`expect [-2] "" to output NaN`, () => {
    expect(convertTimeToInt([5], "")).toBe(NaN);
})

test(`expect 5,'2' to output NaN`, () => {
    expect(convertTimeToInt(5, '2')).toBe(NaN);
})
test(`expect 5,'2' to output NaN`, () => {
    expect(convertTimeToInt(-2, '2')).toBe(NaN);
})
test(`expect undefined '2' to output NaN`, () => {
    expect(convertTimeToInt(undefined, '2')).toBe(NaN);
})
test(`expect null '2' to output NaN`, () => {
    expect(convertTimeToInt(null, '2')).toBe(NaN);
})
test(`expect NaN '2' to output NaN`, () => {
    expect(convertTimeToInt(NaN, '2')).toBe(NaN);
})
test(`expect {} '2' to output NaN`, () => {
    expect(convertTimeToInt({}, '2')).toBe(NaN);
})
test(`expect [] '2' to output NaN`, () => {
    expect(convertTimeToInt([], '2')).toBe(NaN);
})
test(`expect '' '2' to output NaN`, () => {
    expect(convertTimeToInt("", '2')).toBe(NaN);
})
test(`expect '-2' '2' to output NaN`, () => {
    expect(convertTimeToInt('5', '2')).toBe(NaN);
})
test(`expect {number:'2'} '2' to output NaN`, () => {
    expect(convertTimeToInt({ number: 5 }, '2')).toBe(NaN);
})
test(`expect [-2] '2' to output NaN`, () => {
    expect(convertTimeToInt([5], '2')).toBe(NaN);
})

test(`expect 5,{number:3} to output NaN`, () => {
    expect(convertTimeToInt(5, { number: 3 })).toBe(NaN);
})
test(`expect 5,{number:3} to output NaN`, () => {
    expect(convertTimeToInt(-2, { number: 3 })).toBe(NaN);
})
test(`expect undefined {number:3} to output NaN`, () => {
    expect(convertTimeToInt(undefined, { number: 3 })).toBe(NaN);
})
test(`expect null {number:3} to output NaN`, () => {
    expect(convertTimeToInt(null, { number: 3 })).toBe(NaN);
})
test(`expect NaN {number:3} to output NaN`, () => {
    expect(convertTimeToInt(NaN, { number: 3 })).toBe(NaN);
})
test(`expect {} {number:3} to output NaN`, () => {
    expect(convertTimeToInt({}, { number: 3 })).toBe(NaN);
})
test(`expect [] {number:3} to output NaN`, () => {
    expect(convertTimeToInt([], { number: 3 })).toBe(NaN);
})
test(`expect '' {number:3} to output NaN`, () => {
    expect(convertTimeToInt("", { number: 3 })).toBe(NaN);
})
test(`expect '-2' {number:3} to output NaN`, () => {
    expect(convertTimeToInt('5', { number: 3 })).toBe(NaN);
})
test(`expect {number:{number:3}} {number:3} to output NaN`, () => {
    expect(convertTimeToInt({ number: 5 }, { number: 3 })).toBe(NaN);
})
test(`expect [-2] {number:3} to output NaN`, () => {
    expect(convertTimeToInt([5], { number: 3 })).toBe(NaN);
})

test(`expect 5,[-3] to output NaN`, () => {
    expect(convertTimeToInt(5, [-3])).toBe(NaN);
})
test(`expect 5,[-3] to output NaN`, () => {
    expect(convertTimeToInt(-2, [-3])).toBe(NaN);
})
test(`expect undefined [-3] to output NaN`, () => {
    expect(convertTimeToInt(undefined, [-3])).toBe(NaN);
})
test(`expect null [-3] to output NaN`, () => {
    expect(convertTimeToInt(null, [-3])).toBe(NaN);
})
test(`expect NaN [-3] to output NaN`, () => {
    expect(convertTimeToInt(NaN, [-3])).toBe(NaN);
})
test(`expect {} [-3] to output NaN`, () => {
    expect(convertTimeToInt({}, [-3])).toBe(NaN);
})
test(`expect [] [-3] to output NaN`, () => {
    expect(convertTimeToInt([], [-3])).toBe(NaN);
})
test(`expect '' [-3] to output NaN`, () => {
    expect(convertTimeToInt("", [-3])).toBe(NaN);
})
test(`expect '-2' [-3] to output NaN`, () => {
    expect(convertTimeToInt('5', [-3])).toBe(NaN);
})
test(`expect {number:[-3]} [-3] to output NaN`, () => {
    expect(convertTimeToInt({ number: 5 }, [-3])).toBe(NaN);
})
test(`expect [-2] [-3] to output NaN`, () => {
    expect(convertTimeToInt([5], [-3])).toBe(NaN);
})


convertIntToTime = (int) => {
    if (typeof (int) !== typeof (5) || int < 0 || isNaN(int)) {
        return NaN
    }
    let outNum = Math.floor(Number(int / 60)) + ': ';
    if (
        Math.floor(Number(int % 60)) < 10
    ) {
        outNum += 0
    }
    outNum +=
        Math.floor(Number(int % 60))
    return outNum
}
test(`expect 1 to output 0: 01`, () => {
    expect(convertIntToTime(1)).toBe('0: 01')
})
test(`expect 61 to output 1: 01`, () => {
    expect(convertIntToTime(61)).toBe('1: 01')
})
test(`expect -1 to output NaN`, () => {
    expect(convertIntToTime(-1)).toBe(NaN)
})
test(`expect 1.7 to output 0: 01`, () => {
    expect(convertIntToTime(1.7)).toBe('0: 01')
})
test(`expect 61.7 to output 1: 01`, () => {
    expect(convertIntToTime(61.7)).toBe('1: 01')
})
test(`expect -1.7 to output NaN`, () => {
    expect(convertIntToTime(-1)).toBe(NaN)
})

test(`expect null to output 0: 01`, () => {
    expect(convertIntToTime(null)).toBe(NaN)
})
test(`expect undefined to output 1: 01`, () => {
    expect(convertIntToTime(undefined)).toBe(NaN)
})
test(`expect NaN to output NaN`, () => {
    expect(convertIntToTime(NaN)).toBe(NaN)
})
test(`expect {} to output 0: 01`, () => {
    expect(convertIntToTime({})).toBe(NaN)
})
test(`expect [] to output 1: 01`, () => {
    expect(convertIntToTime([])).toBe(NaN)
})
test(`expect '' to output NaN`, () => {
    expect(convertIntToTime('')).toBe(NaN)
})