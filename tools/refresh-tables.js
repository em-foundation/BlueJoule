#!/usr/bin/env node
// @ts-check
/// <reference types="node" />

const Fs = require('node:fs')
const Path = require('node:path')

const CAPS = new Map()
const ENTRIES = new Set()
const MEDALS = new Array()
const UPDATES = new Array()
const TARGS = new Set()

const BQ = '`'
const CAPDIR = 'captures'
const DESC_RE = /<h1\b[^>]*>(.*?)<\/h1>/is
const EMS = `<img src="images/em-dot.svg" width="12" alt="">`

function SP(n) {
    return '&emsp;'.repeat(n)
}

function findCaps() {
    const path1 = CAPDIR
    for (const be of Fs.readdirSync(path1)) {
        const path2 = Path.join(path1, be)
        if (!Fs.lstatSync(path2).isDirectory()) continue
        for (const ce of Fs.readdirSync(path2)) {
            if (!ce.endsWith('-J') && !ce.endsWith('-P')) continue
            const path3 = Path.join(path2, ce)
            const about_file = Path.join(path3, 'ABOUT.md')
            if (!Fs.existsSync(about_file)) continue
            const about_txt = Fs.readFileSync(about_file, 'utf-8')
            CAPS.set(`${be}/${ce}`, about_txt)
            TARGS.add(`${be}/${ce.slice(0, ce.length-2)}`)
        }
    }
}

function findEntries(txt) {
    for (const ln of txt.split('\n')) {
        if (!ln.startsWith('<!-- @entry|')) continue
        const flds = ln.split('|')
        const cn = flds[1].trim()
        ENTRIES.add(cn)
    }
}

function findMedals(txt) {
    for (const ln of txt.split('\n')) {
        if (!ln.startsWith('<!-- @medal|')) continue
        const flds = ln.split('|')
        MEDALS.push(flds.slice(1, 4))
    }
}

function findUpdates(txt) {
    for (const ln of txt.split('\n')) {
        if (!ln.startsWith('<!-- @upd|')) continue
        const flds = ln.split('|')
        UPDATES.push({date: flds[1], msg: flds[2]})
    }
}

function genCatalog() {
    let res =
`<!-- @catalog-begin -->
| &emsp;Capture&emsp;&emsp;&emsp;&emsp; | &emsp;JS220&emsp; | &emsp;PPK2&nbsp;&emsp; | &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Description&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
|---|:---:|:---:|---|
`
    for (const targ of TARGS) {
        let line = `| ${BQ}${targ}${BQ}&emsp; | `
        let desc = undefined
        for (const suf of ['-J', '-P']) {
            const cn = `${targ}${suf}`
            let about = CAPS.get(cn)
            if (about) {
                line += mkLink(cn) 
                desc = desc || `&emsp; ${getDescription(about)}`
            }
            line += ' | '
        }
        line += `${desc} |\n`
        res += line
    }
    return `${res}<!-- @catalog-end -->`
}

function genMedals() {
    return `<!-- @medals-begin -->
${genMedalTab('1')}
${genMedalTab('10')}
<!-- @medals-end -->`
}

function genMedalTab(ps) {
    const sp = (ps == '1') ? '&ensp;' : ''
    let res = `<details open><summary>&emsp;${sp}${ps}&thinsp;s event period [<b>EM${EMS}eralds</b>]</summary><p>
`
    for (const flds of MEDALS) {
        if (flds[0] != ps) continue
        const cn = flds[1].trim()
        const about = CAPS.get(cn)
        if (!about) {
            console.log(`*** no capture named '${cn}'`)
            continue
        }
        const [ , , ems1, ems10] = getResults(about)
        const score = (ps == '1') ? ems1 : ems10
        const link = mkLink(cn)
        const desc = getDescription(about)
        const m = mkMedal(flds[2])
        res += `${SP(23)}${m}&emsp;${score}${SP(18)}${link}${SP(2)}${desc}<br>\n`
    }
     res += `
</p></details>`
    return res
}

function genScores() {
    return `<!-- @scores-begin -->
${genScoreTab('Entry')}

<p>&nbsp;</p>
<h4 align=“left”>ALL JS220 SCORES&emsp;<sub><i>click below</i> ▶ <i>to expand</i> ▼</sub></h4>

<a id="js220-scores"></a>
<details><summary>&nbsp;</summary>
${genScoreTab('JS220')}
</details>

<h4 align=“left”>ALL PPK2 SCORES&nbsp;&emsp;<sub><i>click below</i> ▶ <i>to expand</i> ▼</sub></h4>

<a id="ppk2-scores"></a>
<details><summary>&nbsp;</summary>
${genScoreTab('PPK2')}
</details>
<!-- @scores-end -->`
}

function genScoreTab(aname) {
    const is_entry = (aname == 'Entry')
    const pre = `${aname.toLowerCase()}/`
    const suf = !is_entry ? `-${aname[0]}` : undefined
    let res = ''
    if (aname == 'Entry') {
        const img = '<img src="images/emeralds.svg" width="200" alt="">'
        res += `<a name="${aname.toLowerCase()}-scores"></a><p align="center">${img}</p>`
    }
    res += `
    
| &emsp;Capture&emsp;&emsp;&emsp;&emsp; | sleep current [&thinsp;&mu;A&thinsp;] | event energy [&thinsp;&mu;J&thinsp;] | 1&thinsp;s period [${EMS}] | 10&thinsp;s period [${EMS}] |
|---|:---:|:---:|:---:|:---:|
`
    for (const [k, v] of CAPS) {
        if (is_entry) {
            if (!ENTRIES.has(k)) continue
        } else {
            if (!k.endsWith(suf)) continue
        }
        const [sleep, eveng, ems1, ems10] = getResults(v)
        const cn = k.slice(0, k.length - 2).padEnd(28, '\u00A0')
        let desc = ''
        let about = CAPS.get(k)
        if (about) {
            desc = `"${about.match(DESC_RE)[1]}"`
        }
        let line = `| ${BQ}${cn}${BQ}&nbsp;📈&nbsp;[&nbsp;&nearr;](../${CAPDIR}/${k}/ABOUT.md#typical-event ${desc}) | ${sleep} | ${eveng} | ${ems1} | ${ems10} |`
        getResults(v)
        res += `${line}\n`
    }
    return res
}

function genTimestamp() {
    const d = new Date()
    const pad = n => String(n).padStart(2, '0')
    const yy = String(d.getUTCFullYear()).slice(2)
    const mm = pad(d.getUTCMonth() + 1)
    const dd = pad(d.getUTCDate())
    const HH = pad(d.getUTCHours())
    const MM = pad(d.getUTCMinutes())
    const SS = pad(d.getUTCSeconds())
    return `<!-- @timestamp-begin -->
${yy}${mm}${dd}${HH}${MM}${SS}
<!-- @timestamp-end -->`
}

function genUpdates() {
    let res = `<!-- @updates-begin -->
<details><summary>
`
    res += `&emsp;&thinsp;${mkDateBadge(UPDATES[0].date, 'hsl(156, 80%, 50%)')}&emsp;${UPDATES[0].msg}`
    res += '</summary><p>\n'
    let sep = ''
    for (const upd of UPDATES.slice(1)) {
        res += `${sep}&emsp;&emsp;${mkDateBadge(upd.date, 'hsl(156, 0%, 50%)')}&emsp;${upd.msg}`
        sep = '<br>\n'
    }
    res += `
</p></details>
<!-- @updates-end -->`
    return res
}

function getDescription(about) {
    return about.match(DESC_RE)[1]
}

function getResults(about) {
    let state = -1
    let sleep
    let eveng
    let ems1
    let ems10
    for (const ln of about.split('\n')) {
        if (state < 0) {
            state = ln.startsWith('<!-- @emscope-pack:start -->') ? 0 : -1
            continue
        }
        if (ln.match(/^\|\s*\d/)) {
            const segs = ln.split('|')
            switch (state) {
                case 0:
                    state = 1
                    let a = parseFloat(segs[2])
                    if (segs[2].indexOf('nA') != -1) {
                        a /= 1000
                    }
                    sleep = a.toFixed(1)
                    break
                case 1:
                    state = 2
                    eveng = parseFloat(segs[1].trim()).toFixed(1)
                    ems1 = segs[4].trim()
                    break
                case 2:
                    ems10 = segs[4].trim()
                    return [`${mkNum(sleep, 4)}`, `${mkNum(eveng, 5)}`, `${mkNum(ems1, 6)}`, `${mkNum(ems10, 6)}`]
            }
        }
    }
}

function mkLink(cn) {
    return `📄&ensp;<a href="../${CAPDIR}/${cn}/ABOUT.md">&nearr;</a>`    
}

function mkDateBadge(date, color) {
    const src = 'tools/date-badge-master.svg'
    const dst = `docs/images/badge-${date}.svg`
    Fs.writeFileSync(dst, Fs.readFileSync(src, 'utf8').replace('1970-01-01', date).replace('#fff', color))
    return `<img src="images/badge-${date}.svg" height="16" alt="2025-10-12"></img>`
}

function mkMedal(s) {
    switch (s) {
        case 'G': return `${SP(2)}<b>🥇</b>`
        case 'S': return `${SP(2)}<b>🥈</b>`
        case 'B': return `${SP(2)}<b>🥉</b>`
        default: return `${SP(4)}&thinsp;`
    }
}

function mkNum(ns, pad) {
    const segs = ns.split(' ')
    if (segs.length == 1) {
        return `<code>${ns.padStart(pad, '\u00A0')}</code>`
    }
    if (segs[1] != 'nA') {
        return `<code>${segs[0].padStart(pad, '\u00A0')}</code>`
    }
    const uA = `0.${segs[0].slice(0, 3)}`
    return `<code>${uA.padStart(pad, '\u00A0')}</code>`
}

function SP(n) {
    return '&nbsp;'.repeat(n)
}

const FILE = 'docs/ReadMore.md'

findCaps()

let txt = Fs.readFileSync(FILE, 'utf-8')
findEntries(txt)
findMedals(txt)
findUpdates(txt)

const medals = genMedals()
const RE_MED = /<!--\s*@medals-begin\s*-->[\s\S]*?<!--\s*@medals-end\s*-->/m
txt = txt.replace(RE_MED, medals)

const updates = genUpdates()
const RE_UPD = /<!--\s*@updates-begin\s*-->[\s\S]*?<!--\s*@updates-end\s*-->/m
txt = txt.replace(RE_UPD, updates)

const catalog = genCatalog()
const RE_CAT = /<!--\s*@catalog-begin\s*-->[\s\S]*?<!--\s*@catalog-end\s*-->/m
txt = txt.replace(RE_CAT, catalog)

const scores = genScores()
const RE_SCO = /<!--\s*@scores-begin\s*-->[\s\S]*?<!--\s*@scores-end\s*-->/m
txt = txt.replace(RE_SCO, scores)

const timestamp = genTimestamp()
const RE_TIM = /<!--\s*@timestamp-begin\s*-->[\s\S]*?@timestamp-end\s*-->/m
txt = txt.replace(RE_TIM, timestamp)


Fs.writeFileSync(FILE, txt)
