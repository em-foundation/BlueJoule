// @ts-check
/// <reference types="node" />

const Fs = require('node:fs')
const Path = require('node:path')

const CAPS = new Map()
const TARGS = new Set()

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

function genCatTab() {
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
                line += `[${cn}](data/${cn})` 
                desc = desc || `&emsp; ${about.match(re)[1]}`
            }
            line += ' | '
        }
        line += `${desc} |\n`
        res += line
    }
    return `${res} |\n<!-- @catalog-end -->`
}

let txt = Fs.readFileSync('README.md', 'utf-8')
findCaps()
// console.log(CAPS.keys())
const ct = genCatTab()
const RE = /<!--\s*@catalog-begin\s*-->[\s\S]*?<!--\s*@catalog-end\s*-->/m
txt = txt.replace(RE, ct)
Fs.writeFileSync('README.md', txt)
// const out = txt.replace(RE, '1234')
// console.log(out)
