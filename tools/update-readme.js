// @ts-check
/// <reference types="node" />

const Fs = require('node:fs')
const Path = require('node:path')

const CAPS = new Map()
const MEDALS_1 = new Map()
const MEDALS_10 = new Map()
const TARGS = new Set()

const BQ = '`'
const CAPDIR = 'captures'

function findCaps(adir) {
    const path1 = Path.join(CAPDIR, adir)
    for (const be of Fs.readdirSync(path1)) {
        const path2 = Path.join(path1, be)
        if (!Fs.lstatSync(path2).isDirectory()) continue
        for (const ce of Fs.readdirSync(path2)) {
            const path3 = Path.join(path2, ce)
            const about_file = Path.join(path3, 'ABOUT.md')
            if (!Fs.existsSync(about_file)) continue
            const about_txt = Fs.readFileSync(about_file, 'utf-8')
            CAPS.set(`${adir}/${be}/${ce}`, about_txt)
            TARGS.add(`${be}/${ce}`)
        }
    }
}

function findMedals(txt) {
    for (const ln of txt.split('\n')) {
        if (!ln.startsWith('<!-- @medal|')) continue
        const flds = ln.split('|')
        const cn = flds[1].trim()
        const m1 = flds[2]
        const m10 = flds[3]
        if (isMedal(m1)) {
            MEDALS_1.set(cn, m1)
        }
        if (isMedal(m10)) {
            MEDALS_10.set(cn, m10)
        }
    }
}

function genCatalog() {
    let res =
`<!-- @catalog-begin -->
| &emsp;Capture&emsp;&emsp;&emsp;&emsp; | &emsp;JS220&emsp; | &emsp;PPK2&nbsp;&emsp; | &emsp;&emsp;&emsp;&emsp;Description&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
|---|:---:|:---:|---|
`
    for (const targ of TARGS) {
        let line = `| ${BQ}${targ}${BQ}&emsp; | `
        let desc = undefined
        const re = /<h1\b[^>]*>(.*?)<\/h1>/is
        for (const pre of ['js220/', 'ppk2/']) {
            const cn = `${pre}${targ}`
            let about = CAPS.get(cn)
            if (about) {
                line += `[**&nearr;**](${CAPDIR}/${cn}/ABOUT.md)` 
                desc = desc || `&emsp; ${about.match(re)[1]}`
            }
            line += ' | '
        }
        line += `${desc} |\n`
        res += line
    }
    return `${res}<!-- @catalog-end -->`
}

function genScores() {
    return `<!-- @scores-begin -->

${genScoreTab('JS220')}

${genScoreTab('PPK2')}

<!-- @scores-end -->`
}

function genScoreTab(aname) {
    const pre = `${aname.toLowerCase()}/`
    const pad = aname[0] == 'P' ? '&ensp;&thinsp;' : ''
    const img = '<img src="docs/images/emeralds.svg" width="150" alt="">'
    let res = `

<br>    

<p align="center">${img}</p>
    
| ${aname} Capture${pad}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | 00:00:01 &emsp; | 00:00:01 &ndash; 3V3 &emsp;&emsp;&emsp; | 00:00:10 &emsp; | 00:00:10 &ndash; 3V3 &emsp; |
|---|---|---|---|---|
`
    for (const [k, v] of CAPS) {
        if (!(k.startsWith(pre))) continue
        const [ems1, ems10] = getEmeralds(v)
        const m1 = mkMedal(MEDALS_1, k)
        const m10 = mkMedal(MEDALS_10, k)
        const cn = k.slice(pre.length)
        const has_v = cn.match(/-\dV\d$/)
        const x1 = !has_v ? `${ems1}${m1}` : ''
        const x10 = !has_v ? `${ems10}${m10}` : ''

        let line = `| &emsp;[${cn}](captures/${k}/ABOUT.md) | &emsp;${ems1}${m1} | &emsp;${x1} | &emsp;${ems10}${m10} | &emsp;${x10} |`
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
                    return [`${BQ}${ems1.padStart(6, '\u00A0')}${BQ}`, `${BQ}${ems10.padStart(6, '\u00A0')}${BQ}`]
            }
        }
    }
}

function isMedal(s) {
    return s == 'G' || s == 'S' || s == 'B'
}

// function mkMedal(map, cn) {
//     const mk = map.get(cn)
//     const mn = mk == 'G' ? 'gold' : mk == 'S' ? 'silver' : mk == 'B' ? 'bronze' : 'empty'
//     return `<img src="docs/images/${mn}-medal.svg" width="16" alt="">`
// }


function mkMedal(map, cn) {
    switch (map.get(cn)) {
        case 'G': return `${SP(2)}<b>🥇</b>`
        case 'S': return `${SP(2)}<b>🥈</b>`
        case 'B': return `${SP(2)}<b>🥉</b>`
        default: return `${SP(4)}&thinsp;`
    }
}

function SP(n) {
    return '&nbsp;'.repeat(n)
}

findCaps('js220')
findCaps('ppk2')
let txt = Fs.readFileSync('README.md', 'utf-8')
findMedals(txt)
const catalog = genCatalog()
const RE_CAT = /<!--\s*@catalog-begin\s*-->[\s\S]*?<!--\s*@catalog-end\s*-->/m
txt = txt.replace(RE_CAT, catalog)
const scores = genScores()
const RE_SCO = /<!--\s*@scores-begin\s*-->[\s\S]*?<!--\s*@scores-end\s*-->/m
txt = txt.replace(RE_SCO, scores)
Fs.writeFileSync('README.md', txt)
