<p align="center">
    <img src="docs/images/logo.png" alt="Logo" width="680">
</p>

<br>
<br>
<br>

<p align="right">
  <sup><a href="README.md">for a better view <b>&#x27a6;</b></a></sup>
</p>

<p align="center"><img src="docs/images/uc-banner.svg" width="400" alt="Under construction"></p>


---

<a id="toc"></a>

<h3 align="center">
  <a href="#application">Application</a>&nbsp;&#xFF5C;&nbsp;
  <a href="#catalog">Catalog</a>&nbsp;&#xFF5C;&nbsp;
  <a href="#scores">Scores</a>&nbsp;&#xFF5C;&nbsp;
  <a href="#contributing">Contributing</a>
</h3>

<br>

This repository uses **EM&bull;Scope** to benchmark **BlueJoule** &ndash; a representative **Bluetooth Low Energy** [BLE] application executing on a wide-range of HW/SW platforms.&thinsp; Visit the [em-foundation/emscope](https://github.com/em-foundation/emscope/blob/main/README.md) project to learn more about the **EM&bull;Scope** tool itself.

## Application

Repetitve advertising remains a fundamental capability of any Bluetooth Low Energy application.&thinsp; Because of its inherent simplicity, programs illustrating the [BLE broadcaster role](https://novelbits.io/bluetooth-low-energy-advertisements-part-1/) often serve as the "Hello World" within this space.

The **BlueJoule** benchmark will broadcast the same packet on the three standard BLE advertising channels.&thinsp; These transmissions occur back-to-back within a single _advertising event_; and these events will unfold at a 1&thinsp;s _advertising interval_. 

To faciliate "apples-to-apples" comparisons among different platforms, we require the underlying BLE radio to transmit packets at 0&thinsp;dB.&thinsp; A differentiator for HW vendors, TX power consumption in `mW` will often headline their datasheets.

And finally, the advertising packet itself comprises 19 bytes of payload defined with the following BLE data types:

| Len | Type | Data (hex)                                   | Notes                                         |
|----:|-----:|----------------------------------------------|-----------------------------------------------|
| `02`  |  `01`  | `06`                                     | Flags &mdash; LE General Disc + BR/EDR not supported      |
| `0A`  |  `08`  | `42 6C 75 65 4A 6F 75 6C 65`             | Local Name &mdash; `"BlueJoule"`             |
| `04`  |  `FF`  | `D3 08 FF`                               | Manufacturer &mdash; Company:&thinsp; [Novel Bits](https://novelbits.io/) (`0x08D3`),&thinsp; Data: `0xFF`&emsp; |

When _not_ actively advertising &ndash; over 99% of the time, in fact, within a 1&thinsp;s event period &ndash; we presume that the application has entered some "deep-sleep" mode to minimize power consumption.

## Catalog

This repository houses the following curated **EM&bull;Scope** capture directories &ndash; each initially populated using the `emscope grab` command with either its `-J, --js220` or `-P, --ppk2` option:

<!-- @catalog-begin -->
| &emsp;Capture&emsp;&emsp;&emsp;&emsp; | &emsp;JS220&emsp; | &emsp;PPK2&nbsp;&emsp; | &emsp;&emsp;&emsp;&emsp;Description&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
|---|:---:|:---:|---|
| `adi-m17-evk/msdk`&emsp; | [**&nearr;**](captures/js220/adi-m17-evk/msdk/ABOUT.md) | [**&nearr;**](captures/ppk2/adi-m17-evk/msdk/ABOUT.md) | &emsp; Analog Device MAX32655 · Maxim SDK |
| `in-100-dk/none`&emsp; | [**&nearr;**](captures/js220/in-100-dk/none/ABOUT.md) | [**&nearr;**](captures/ppk2/in-100-dk/none/ABOUT.md) | &emsp; InPlay IN100 · &lt;no software&gt; |
| `in-100-dk/none-1V8`&emsp; | [**&nearr;**](captures/js220/in-100-dk/none-1V8/ABOUT.md) | [**&nearr;**](captures/ppk2/in-100-dk/none-1V8/ABOUT.md) | &emsp; InPlay IN100 · &lt;no software&gt; |
| `nrf-52-dk/zephyr`&emsp; | [**&nearr;**](captures/js220/nrf-52-dk/zephyr/ABOUT.md) | [**&nearr;**](captures/ppk2/nrf-52-dk/zephyr/ABOUT.md) | &emsp; Nordic nRF52832 · Zephyr OS |
| `nrf-54-dk/baremetal`&emsp; | [**&nearr;**](captures/js220/nrf-54-dk/baremetal/ABOUT.md) | [**&nearr;**](captures/ppk2/nrf-54-dk/baremetal/ABOUT.md) | &emsp; Nordic nRF54L15 · Bare-Metal SDK |
| `nrf-54-dk/baremetal-1V8`&emsp; | [**&nearr;**](captures/js220/nrf-54-dk/baremetal-1V8/ABOUT.md) | [**&nearr;**](captures/ppk2/nrf-54-dk/baremetal-1V8/ABOUT.md) | &emsp; Nordic nRF54L15 · Bare-Metal SDK |
| `nrf-54-dk/zephyr`&emsp; | [**&nearr;**](captures/js220/nrf-54-dk/zephyr/ABOUT.md) | [**&nearr;**](captures/ppk2/nrf-54-dk/zephyr/ABOUT.md) | &emsp; Nordic nRF54L15 · Zephyr OS |
| `nrf-54-dk/zephyr-1V8`&emsp; | [**&nearr;**](captures/js220/nrf-54-dk/zephyr-1V8/ABOUT.md) | [**&nearr;**](captures/ppk2/nrf-54-dk/zephyr-1V8/ABOUT.md) | &emsp; Nordic nRF54L15 · Zephyr OS |
| `sil-g22e-ehk/rail`&emsp; | [**&nearr;**](captures/js220/sil-g22e-ehk/rail/ABOUT.md) | [**&nearr;**](captures/ppk2/sil-g22e-ehk/rail/ABOUT.md) | &emsp; SiLabs EFR32xG22E · Simplicity (RAIL) |
| `ti-23-lp/emscript`&emsp; | [**&nearr;**](captures/js220/ti-23-lp/emscript/ABOUT.md) | [**&nearr;**](captures/ppk2/ti-23-lp/emscript/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · EM&bull;Script SDK |
| `ti-23-lp/emscript-2V2`&emsp; | [**&nearr;**](captures/js220/ti-23-lp/emscript-2V2/ABOUT.md) | [**&nearr;**](captures/ppk2/ti-23-lp/emscript-2V2/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · EM&bull;Script SDK |
| `ti-23-lp/simplelink`&emsp; | [**&nearr;**](captures/js220/ti-23-lp/simplelink/ABOUT.md) | [**&nearr;**](captures/ppk2/ti-23-lp/simplelink/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · SimpleLink SDK |
| `ti-23-lp/simplelink-2V2`&emsp; | [**&nearr;**](captures/js220/ti-23-lp/simplelink-2V2/ABOUT.md) | [**&nearr;**](captures/ppk2/ti-23-lp/simplelink-2V2/ABOUT.md) | &emsp; Hardware Platform · Software Environment |
<!-- @catalog-end -->

An `ABOUT.md` file found in each directory describes the capture's HW/SW configuration as well as summarizes its benchmark scores.

## Scores

We've compiled a set of **EM&bull;erald** scores for each capture, assuming a 1&thinsp;s and 10&thinsp;s event period in each case.&thinsp; We've also broken out a subset of these scores which supplied 3V3 during the capture &ndash; as opposed to a more optimal voltage for the target configuration.

<p>We've awarded <b>Gold&thinsp;🥇</b>, <b>Silver&thinsp;🥈</b>, and <b>Bronze&thinsp;🥉</b> medals when merited.&thinsp; We also highlighted scores whose configurations deploy firmware written in <a href="https://docs.emscript.openem.org/"><b>EM&bull;Script</b></a>&thinsp;<img src="docs/images/em-dot.svg" width="14", alt="">&thinsp;&ndash; a novel programming platform which targets resource-constrained MCUs.</p>

> [!IMPORTANT]
> Because of their different signal acquisition and power analysis capabilities, we've presented the **Joulescope JS220** and **Nordic PPK2** scores separately.&thinsp; While results generally seem consistent, anomalies can sometimes occur.

<!-- @medal|js220/in-100-dk/none            |S|G| -->
<!-- @medal|js220/nrf-54-dk/zephyr          |S|N| -->
<!-- @medal|js220/ti-23-lp/simplelink       |N|B| -->

<!-- @medal|ppk2/in-100-dk/none             |S|G| -->
<!-- @medal|ppk2/nrf-54-dk/zephyr           |G|B| -->
<!-- @medal|ppk2/ti-23-lp/simplelink        |N|S| -->

<!-- @scores-begin -->



<br>    

<p align="center"><img src="docs/images/emeralds.svg" width="200" alt=""></p>
    
| JS220 Capture&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | 00:00:01 &emsp; | 00:00:01 &ndash; 3V3 &emsp;&emsp;&emsp; | 00:00:10 &emsp; | 00:00:10 &ndash; 3V3 &emsp; |
|---|---|---|---|---|
| &emsp;[adi-m17-evk/msdk](captures/js220/adi-m17-evk/msdk/ABOUT.md) | &emsp;` 14.75`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 14.75`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 47.75`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 47.75`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;[in-100-dk/none](captures/js220/in-100-dk/none/ABOUT.md) | &emsp;` 22.85`&nbsp;&nbsp;<b>🥈</b> | &emsp;` 22.85`&nbsp;&nbsp;<b>🥈</b> | &emsp;`155.14`&nbsp;&nbsp;<b>🥇</b> | &emsp;`155.14`&nbsp;&nbsp;<b>🥇</b> |
| &emsp;[in-100-dk/none-1V8](captures/js220/in-100-dk/none-1V8/ABOUT.md) | &emsp;` 41.92`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`306.84`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |
| &emsp;[nrf-52-dk/zephyr](captures/js220/nrf-52-dk/zephyr/ABOUT.md) | &emsp;` 27.72`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 27.72`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;`122.85`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;`122.85`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;[nrf-54-dk/baremetal](captures/js220/nrf-54-dk/baremetal/ABOUT.md) | &emsp;` 27.09`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 27.09`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 64.82`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 64.82`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;[nrf-54-dk/baremetal-1V8](captures/js220/nrf-54-dk/baremetal-1V8/ABOUT.md) | &emsp;` 33.64`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;` 89.74`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |
| &emsp;[nrf-54-dk/zephyr](captures/js220/nrf-54-dk/zephyr/ABOUT.md) | &emsp;` 31.07`&nbsp;&nbsp;<b>🥈</b> | &emsp;` 31.07`&nbsp;&nbsp;<b>🥈</b> | &emsp;` 71.43`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 71.43`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;[nrf-54-dk/zephyr-1V8](captures/js220/nrf-54-dk/zephyr-1V8/ABOUT.md) | &emsp;` 41.93`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`121.06`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |
| &emsp;[sil-g22e-ehk/rail](captures/js220/sil-g22e-ehk/rail/ABOUT.md) | &emsp;` 31.85`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 31.85`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 99.02`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 99.02`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;[ti-23-lp/emscript](captures/js220/ti-23-lp/emscript/ABOUT.md) | &emsp;` 48.62`&nbsp;&nbsp;<img src="docs/images/em-dot.svg" width="14" alt=""> | &emsp;` 48.62`&nbsp;&nbsp;<img src="docs/images/em-dot.svg" width="14" alt=""> | &emsp;`249.88`&nbsp;&nbsp;<img src="docs/images/em-dot.svg" width="14" alt=""> | &emsp;`249.88`&nbsp;&nbsp;<img src="docs/images/em-dot.svg" width="14" alt=""> |
| &emsp;[ti-23-lp/emscript-2V2](captures/js220/ti-23-lp/emscript-2V2/ABOUT.md) | &emsp;` 72.21`&nbsp;&nbsp;<img src="docs/images/em-dot.svg" width="14" alt=""> | &emsp; | &emsp;`379.34`&nbsp;&nbsp;<img src="docs/images/em-dot.svg" width="14" alt=""> | &emsp; |
| &emsp;[ti-23-lp/simplelink](captures/js220/ti-23-lp/simplelink/ABOUT.md) | &emsp;` 28.13`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 28.13`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;`183.76`&nbsp;&nbsp;<b>🥉</b> | &emsp;`183.76`&nbsp;&nbsp;<b>🥉</b> |
| &emsp;[ti-23-lp/simplelink-2V2](captures/js220/ti-23-lp/simplelink-2V2/ABOUT.md) | &emsp;` 29.73`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`197.07`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |




<br>    

<p align="center"><img src="docs/images/emeralds.svg" width="200" alt=""></p>
    
| PPK2 Capture&ensp;&thinsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | 00:00:01 &emsp; | 00:00:01 &ndash; 3V3 &emsp;&emsp;&emsp; | 00:00:10 &emsp; | 00:00:10 &ndash; 3V3 &emsp; |
|---|---|---|---|---|
| &emsp;[adi-m17-evk/msdk](captures/ppk2/adi-m17-evk/msdk/ABOUT.md) | &emsp;` 14.02`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 14.02`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 47.36`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 47.36`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;[in-100-dk/none](captures/ppk2/in-100-dk/none/ABOUT.md) | &emsp;` 22.95`&nbsp;&nbsp;<b>🥈</b> | &emsp;` 22.95`&nbsp;&nbsp;<b>🥈</b> | &emsp;`148.92`&nbsp;&nbsp;<b>🥇</b> | &emsp;`148.92`&nbsp;&nbsp;<b>🥇</b> |
| &emsp;[in-100-dk/none-1V8](captures/ppk2/in-100-dk/none-1V8/ABOUT.md) | &emsp;` 43.11`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`301.01`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |
| &emsp;[nrf-52-dk/zephyr](captures/ppk2/nrf-52-dk/zephyr/ABOUT.md) | &emsp;` 27.30`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 27.30`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;`113.68`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;`113.68`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;[nrf-54-dk/baremetal](captures/ppk2/nrf-54-dk/baremetal/ABOUT.md) | &emsp;` 27.35`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 27.35`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 64.54`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 64.54`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;[nrf-54-dk/baremetal-1V8](captures/ppk2/nrf-54-dk/baremetal-1V8/ABOUT.md) | &emsp;` 35.09`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;` 86.91`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |
| &emsp;[nrf-54-dk/zephyr](captures/ppk2/nrf-54-dk/zephyr/ABOUT.md) | &emsp;` 31.94`&nbsp;&nbsp;<b>🥇</b> | &emsp;` 31.94`&nbsp;&nbsp;<b>🥇</b> | &emsp;` 71.26`&nbsp;&nbsp;<b>🥉</b> | &emsp;` 71.26`&nbsp;&nbsp;<b>🥉</b> |
| &emsp;[nrf-54-dk/zephyr-1V8](captures/ppk2/nrf-54-dk/zephyr-1V8/ABOUT.md) | &emsp;` 57.21`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`153.61`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |
| &emsp;[sil-g22e-ehk/rail](captures/ppk2/sil-g22e-ehk/rail/ABOUT.md) | &emsp;` 31.92`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 31.92`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 92.80`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 92.80`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;[ti-23-lp/emscript](captures/ppk2/ti-23-lp/emscript/ABOUT.md) | &emsp;` 39.95`&nbsp;&nbsp;<img src="docs/images/em-dot.svg" width="14" alt=""> | &emsp;` 39.95`&nbsp;&nbsp;<img src="docs/images/em-dot.svg" width="14" alt=""> | &emsp;`228.08`&nbsp;&nbsp;<img src="docs/images/em-dot.svg" width="14" alt=""> | &emsp;`228.08`&nbsp;&nbsp;<img src="docs/images/em-dot.svg" width="14" alt=""> |
| &emsp;[ti-23-lp/emscript-2V2](captures/ppk2/ti-23-lp/emscript-2V2/ABOUT.md) | &emsp;` 42.09`&nbsp;&nbsp;<img src="docs/images/em-dot.svg" width="14" alt=""> | &emsp; | &emsp;`228.65`&nbsp;&nbsp;<img src="docs/images/em-dot.svg" width="14" alt=""> | &emsp; |
| &emsp;[ti-23-lp/simplelink](captures/ppk2/ti-23-lp/simplelink/ABOUT.md) | &emsp;` 27.37`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;` 27.37`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp;`173.87`&nbsp;&nbsp;<b>🥈</b> | &emsp;`173.87`&nbsp;&nbsp;<b>🥈</b> |
| &emsp;[ti-23-lp/simplelink-2V2](captures/ppk2/ti-23-lp/simplelink-2V2/ABOUT.md) | &emsp;` 29.62`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`182.12`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |


<!-- @scores-end -->

> [!NOTE]
> By way of review, **EM&bull;eralds** quantify _energy efficiency_ &ndash; with higher scores implying lower energy consumption per period:
>
><p align="left"><b><sup>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;EM•eralds = 2400 / (<i>Joules per day</i> * 30) = 800 / <i>Joules per day</i><br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;CR2032 energy:&nbsp; 225 mAh × 3.6 × 3.0 V ≈ 2.43 kJ<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1 EM•erald ≈ 1 CR2032-month</sup></b></p>

Consider installing the [open-source](https://github.com/em-foundation/emscope) **EM&bull;Scope** tool.&thinsp; You can then query _other_ event period scenarios, as well as interactively view individual data captures raw using the [**Joulescope File Viewer**](https://www.joulescope.com/pages/downloads).

## Contributing

To contribute new captures (or to refine existing captures), fork this repository and then submit a pull request (PR) for our consideration.&thinsp; Needless to say, we presume prior experience with the [`emscope`](https://github.com/em-foundation/emscope) command-line tool.

> [!TIP]
> Use this command sequence when locally cloning your fork of this repo:
>
>```
> $ GIT_LFS_SKIP_SMUDGE=1 git clone --filter=blob:none https://github.com/<USER-NAME>/<FORKED-REPO-NAME>
> $ cd <FORKED-REPO-NAME>
> $ git lfs install --local --skip-smudge
>```
>From here, you can use `emscope pack -u` to deflate `emscope-capture.zip` files locally as needed.

If you plan to submit a new capture, create a directory whose name follows the labeling conventions used throughout this repo.&thinsp; Copy an existing capture's `ABOUT.md` file into your new directory, and then modify this file's contents accordingly.

For any technical questions or roadmap suggestions, create a new thread on our [discussions](https://github.com/em-foundation/bleadv-data/discussions/) page.


