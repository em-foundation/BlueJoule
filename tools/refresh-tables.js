#!/usr/bin/env node
// @ts-check
/// <reference types="node" />

const Fs = require('node:fs')
const Path = require('node:path')

const CAPS = new Map()
const MEDALS = new Map()
const UPDATES = new Array()
const TARGS = new Set()

const BQ = '`'
const CAPDIR = 'captures'
const DESC_RE = /<h1\b[^>]*>(.*?)<\/h1>/is

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
        const m10 = flds[3]
        MEDALS.set(cn, flds.slice(2, 6))
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
                line += `📄&ensp;[&nearr;](../${CAPDIR}/${cn}/ABOUT.md)` 
                desc = desc || `&emsp; ${about.match(DESC_RE)[1]}`
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
    const img = '<img src="images/emeralds.svg" width="200" alt="">'
    let res = `

<br>    

<p align="center">${img}</p>
    
| ${aname} Capture${pad}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | 00:00:01 · <var>d</var>V<var>d</var> &emsp; | 00:00:01 · 3V3 &emsp;&emsp;&emsp; | 00:00:10 · <var>d</var>V<var>d</var> &emsp; | 00:00:10 · 3V3 &emsp; |
|---|---|---|---|---|
`
    for (const [k, v] of CAPS) {
        if (!(k.startsWith(pre))) continue
        const [ems1, ems10] = getEmeralds(v)
        const [m1, m1_X, m10, m10_X] = getMedals(k)
        const cn = k.slice(pre.length)
        let desc = ''
        let about = CAPS.get(k)
        if (about) {
            desc = `"${about.match(DESC_RE)[1]}"`
        }
        const has_v = cn.match(/-\dV\d$/)
        const x1 = !has_v ? `${ems1}${m1_X}` : ''
        const x10 = !has_v ? `${ems10}${m10_X}` : ''
        const x1_v = has_v ? `${ems1}${m1}` : ''
        const x10_v = has_v ? `${ems10}${m10}` : ''
        let line = `| &emsp;📈&ensp;[${cn}&thinsp;&nearr;](../${CAPDIR}/${k}/ABOUT.md#typical-event ${desc}) | &emsp;${x1_v} | &emsp;${x1} | &emsp;${x10_v} | &emsp;${x10} |`
        getEmeralds(v)
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

function getMedals(cn) {
    const E = `${SP(2)}<img src="images/em-dot.svg" width="14" alt="">`
    if (cn.search('/emscript') > 0) {
        return [E, E, E, E]
    }
    const N = mkMedal('-')
    return MEDALS.has(cn) ? MEDALS.get(cn).map(m => mkMedal(m)) : [N, N, N, N]
}

function mkMedal(s) {
    switch (s) {
        case 'G': return `${SP(2)}<b>🥇</b>`
        case 'S': return `${SP(2)}<b>🥈</b>`
        case 'B': return `${SP(2)}<b>🥉</b>`
        default: return `${SP(4)}&thinsp;`
    }
}

function mkDateBadge(date, color) {
    const src = 'tools/date-badge-master.svg'
    const dst = `docs/images/badge-${date}.svg`
    Fs.writeFileSync(dst, Fs.readFileSync(src, 'utf8').replace('1970-01-01', date).replace('#fff', color))
    return `<img src="images/badge-${date}.svg" height="16" alt="2025-10-12"></img>`
}

function SP(n) {
    return '&nbsp;'.repeat(n)
}

const FILE = 'docs/ReadMore.md'

findCaps('js220')
findCaps('ppk2')
let txt = Fs.readFileSync(FILE, 'utf-8')

findUpdates(txt)
const updates = genUpdates()
const RE_UPD = /<!--\s*@updates-begin\s*-->[\s\S]*?<!--\s*@updates-end\s*-->/m
txt = txt.replace(RE_UPD, updates)

findMedals(txt)
const catalog = genCatalog()
const RE_CAT = /<!--\s*@catalog-begin\s*-->[\s\S]*?<!--\s*@catalog-end\s*-->/m
txt = txt.replace(RE_CAT, catalog)

const scores = genScores()
const RE_SCO = /<!--\s*@scores-begin\s*-->[\s\S]*?<!--\s*@scores-end\s*-->/m
txt = txt.replace(RE_SCO, scores)

Fs.writeFileSync(FILE, txt)
