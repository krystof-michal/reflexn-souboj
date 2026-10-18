



let start = 0
let cas = 0
let rekord = 0
let bezi = false
let vysledek = false

basic.showString("A=START")

input.onButtonPressed(Button.A, function () {
    if (bezi) {
        return
    }

    // A po výsledku smaže LED a spustí další kolo
    basic.clearScreen()
    vysledek = false
    bezi = true

    basic.showString("CEKEJ")
    basic.pause(Math.randomRange(1000, 4000))

    start = input.runningTime()
    basic.showIcon(IconNames.Heart)
})

input.onButtonPressed(Button.B, function () {
    if (!bezi) {
        return
    }

    cas = input.runningTime() - start
    bezi = false
    vysledek = true

    // Zobraz naměřený čas
    basic.showNumber(cas)

    // Jedna LED = 20 ms, maximum 25 LED
    let pocetLed = Math.min(25, Math.ceil(cas / 20))

    basic.clearScreen()

    for (let i = 0; i < pocetLed; i++) {
        led.plot(i % 5, Math.floor(i / 5))
    }

    // Nový rekord
    if (rekord == 0 || cas < rekord) {
        rekord = cas

        // Tři bliknutí při novém rekordu
        for (let i = 0; i < 3; i++) {
            basic.pause(250)
            basic.clearScreen()
            basic.pause(250)

            for (let j = 0; j < pocetLed; j++) {
                led.plot(j % 5, Math.floor(j / 5))
            }
        }
    }

    // Obrazec zůstane rozsvícený až do dalšího stisku A
})

input.onButtonPressed(Button.AB, function () {
    if (bezi) {
        return
    }

    basic.clearScreen()
    basic.showString("BEST")
    basic.showNumber(rekord)

    // Po zobrazení rekordu se vrátí obrazec posledního výsledku,
    // pokud nějaký existuje.
    if (vysledek) {
        let pocetLed = Math.min(25, Math.ceil(cas / 20))
        basic.clearScreen()

        for (let i = 0; i < pocetLed; i++) {
            led.plot(i % 5, Math.floor(i / 5))
        }
    } else {
        basic.showString("A=START")
    }
})
