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
| &emsp;Capture&emsp;&emsp;&emsp;&emsp; | &emsp;JS220&emsp; | &emsp;PPK2&nbsp;&emsp; | &emsp;&emsp;&emsp;&emsp;Description&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
|---|:---:|:---:|---|
`
    for (const targ of TARGS) {
        let line = `| ${BQ}${targ}${BQ}&emsp; | `
        let desc = undefined
        for (const pre of ['js220/', 'ppk2/']) {
            const cn = `${pre}${targ}`
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
    let res = `<details><summary>&emsp;${sp}${ps}&thinsp;s event period [${EMS}]</summary><p>
`
    for (const flds of MEDALS) {
        if (flds[0] != ps) continue
        const cn = flds[1].trim()
        const about = CAPS.get(cn)
        const [ , , ems1, ems10] = getResults(about)
        const score = (ps == '1') ? ems1 : ems10
        const link = mkLink(cn)
        const desc = getDescription(about)
        const m = mkMedal(flds[2])
        res += `${SP(22)}${m}&emsp;${score}${SP(11)}${link}${SP(2)}${desc}<br>\n`
    }
     res += `
</p></details>`
    return res
}

function genScores() {
    return `<!-- @scores-begin -->
${genScoreTab('JS220')}
<!-- @scores-end -->`
}

function genScoreTab(aname) {
    const pre = `${aname.toLowerCase()}/`
    const pad = aname[0] == 'P' ? '&ensp;&thinsp;' : ''
    const img = '<img src="images/emeralds.svg" width="200" alt="">'
    let res = `<br><a name="${aname.toLowerCase()}-scores"></a><p align="center">${img}</p>

| &emsp;&emsp;${aname} Capture${pad}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | sleep power [&thinsp;&mu;W&thinsp;] &ensp; | event energy [&thinsp;&mu;J&thinsp;] &ensp; | 1&thinsp;s period [${EMS}] &emsp;&emsp; | 10&thinsp;s period [${EMS}] &emsp;&emsp; |
|---|---|---|---|---|
`
    for (const [k, v] of CAPS) {
        if (!k.startsWith(pre)) continue
        if (!ENTRIES.has(k)) continue
        const [sleep, eveng, ems1, ems10] = getResults(v)
        const cn = k.slice(pre.length)
        let desc = ''
        let about = CAPS.get(k)
        if (about) {
            desc = `"${about.match(DESC_RE)[1]}"`
        }
        let line = `| &nbsp;📈&nbsp;${BQ}${cn}${BQ}[&nbsp;&nearr;](../${CAPDIR}/${k}/ABOUT.md#typical-event ${desc}) | &emsp;${sleep} | &emsp;${eveng} | &emsp;${ems1} | &emsp;${ems10} |`
        getResults(v)
        res += `${line}\n`
    }
    return res
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
                    const v = parseFloat(segs[1])
                    let a = parseFloat(segs[2])
                    if (segs[2].indexOf('nA') != -1) {
                        a /= 1000
                    }
                    const ws = (v * a).toFixed(3)
                    sleep = ws
                    break
                case 1:
                    state = 2
                    eveng = segs[1].trim()
                    ems1 = segs[4].trim()
                    break
                case 2:
                    ems10 = segs[4].trim()
                    return [`${mkNum(sleep)}`, `${mkNum(eveng)}`, `${mkNum(ems1)}`, `${mkNum(ems10)}`]
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

function mkNum(ns) {
    const segs = ns.split(' ')
    if (segs.length == 1) {
        return `<code>${ns.padStart(6, '\u00A0')}</code>`
    }
    if (segs[1] != 'nA') {
        return `<code>${segs[0].padStart(6, '\u00A0')}</code>`
    }
    const uA = `0.${segs[0].slice(0, 3)}`
    return `<code>${uA.padStart(6, '\u00A0')}</code>`
}

function SP(n) {
    return '&nbsp;'.repeat(n)
}

const FILE = 'docs/ReadMore.md'

findCaps('js220')
findCaps('ppk2')
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

Fs.writeFileSync(FILE, txt)
