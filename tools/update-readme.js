// @ts-check
/// <reference types="node" />

const Fs = require('node:fs')
const Path = require('node:path')

const CAPS = new Map()
const TARGS = new Set()

const BQ = '`'

/*
for (const de of Fs.readdirSync('data')) {
    const about = Fs.readFileSync(Path.join('data', de, 'ABOUT.md'), 'utf-8')
    const re = /<h1\b[^>]*>(.*?)<\/h1>/is
    const m = about.match(re)
    if (!m) continue
    if (de.endsWith('-J') || de.endsWith('-P')) {}
}
*/

function findCaps() {
    for (const de of Fs.readdirSync('data')) {
        if (!de.endsWith('-J') && !de.endsWith('-P')) continue
        const about = Fs.readFileSync(Path.join('data', de, 'ABOUT.md'), 'utf-8')
        CAPS.set(de, about)
        TARGS.add(de.slice(0, de.length - 2))
    }
}

function genCatalog() {
    let res =
`<!-- @catalog-begin -->
| JS220 Capture | PPK2 Capture | &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Description&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
|---|---|---|
`
    for (const targ of TARGS) {
        let line = '| '
        let desc = undefined
        const re = /<h1\b[^>]*>(.*?)<\/h1>/is
        for (const suf of ['-J', '-P']) {
            const cn = `${targ}${suf}`
            let about = CAPS.get(cn)
            if (about) {
                line += `[${cn}](data/${cn}/ABOUT.md)` 
                desc = desc || `&emsp; ${about.match(re)[1]}`
            }
            line += ' | '
        }
        line += `${desc} |\n`
        res += line
    }
    return `${res} |\n<!-- @catalog-end -->`
}

function genScores() {
    return `<!-- @scores-begin -->

${genScoreTab('JS220')}

${genScoreTab('PPK2')}

<!-- @scores-end -->`
}

function genScoreTab(aname) {
    const pre = `-${aname[0]}`
    const pad = aname[0] == 'P' ? '&emsp;' : ''
    let res = `<br>

| ${aname} Capture${pad}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | EM&bull;eralds&thinsp; &mdash;&thinsp;${BQ}00:00:01${BQ} event cycle | EM&bull;eralds&thinsp; &mdash;&thinsp;${BQ}00:00:10${BQ} event cycle |
|---|---|---|
`
    for (const [k, v] of CAPS) {
        if (!(k.endsWith(pre))) continue
        const [ems1, ems10] = getEmeralds(v)
        let line = `| &emsp;[${k}](data/${k}/ABOUT.md) | &emsp;${BQ}${ems1}${BQ} | &emsp;${BQ}${ems10}${BQ} |`
        getEmeralds(v)
        res += `${line}\n`
    }
    return res
}

function getEmeralds(about) {
    let state = -1
    let ems1
    let ems10
    for (const ln of about.split('\n')) {
        if (state < 0) {
            state = ln.startsWith('<!-- @emscope-pack:start -->') ? 0 : -1
            continue
        }
        if (ln.match(/^\|\s*\d/)) {
            switch (state) {
                case 0:
                    state = 1
                    break
                case 1:
                    state = 2
                    ems1 = (ln.split('|')[4]).trim()
                    break
                case 2:
                    ems10 = (ln.split('|')[4]).trim()
                    return [ems1.padStart(7, ' '), ems10.padStart(7, ' ')]
            }
        }
    }
}

let txt = Fs.readFileSync('README.md', 'utf-8')
findCaps()
const catalog = genCatalog()
const RE_CAT = /<!--\s*@catalog-begin\s*-->[\s\S]*?<!--\s*@catalog-end\s*-->/m
txt = txt.replace(RE_CAT, catalog)
const scores = genScores()
const RE_SCO = /<!--\s*@scores-begin\s*-->[\s\S]*?<!--\s*@scores-end\s*-->/m
txt = txt.replace(RE_SCO, scores)
Fs.writeFileSync('README.md', txt)
