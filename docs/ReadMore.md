<!-- @upd|2025-10-22|refreshed captures and screenshots for Nordic nRF52832|-->
<!-- @upd|2025-10-17|new scores &ndash; EM Microelectronic EM9305 · EM Bleu SDK|-->
<!-- @upd|2025-09-11|new scores &ndash; Nordic nRF52832 · EM&bull;Script SDK|-->
<!-- @upd|2025-09-09|inaugural scores &ndash; Analog Devices · InPlay · Nordic · Texas Instruments|-->

<!-- @entry|js220/adi-m17-evk/msdk-3V3| -->
<!-- @entry|js220/emm-9305-dvk/emb-1V8| -->
<!-- @entry|js220/in-100-dk/none-1V8| -->
<!-- @entry|js220/nrf-52-dk/zephyr-3V3| -->
<!-- @entry|js220/nrf-54-dk/zephyr-1V8| -->
<!-- @entry|js220/sil-g22e-ehk/rail-1V8| -->
<!-- @entry|js220/ti-23-lp/simplelink-2V2| -->

<!-- @_medal|js220/emm-9305-dvk/emb                  |-|-|-|B| -->
<!-- @_medal|js220/emm-9305-dvk/emb-1V8              |G|-|S|-| -->
<!-- @_medal|js220/in-100-dk/none                    |-|-|-|S| -->
<!-- @_medal|js220/in-100-dk/none-1V8                |S|-|G|-| -->
<!-- @_medal|js220/nrf-52-dk/zephyr                  |-|-|-|-| -->
<!-- @_medal|js220/nrf-54-dk/baremetal-1V8           |-|-|-|-| -->
<!-- @_medal|js220/nrf-54-dk/zephyr                  |-|S|-|-| -->
<!-- @_medal|js220/nrf-54-dk/zephyr-1V8              |S|-|-|-| -->
<!-- @_medal|js220/sil-g22e-ehk/rail                 |-|S|-|-| -->
<!-- @_medal|js220/sil-g22e-ehk/rail-1V8             |B|-|-|-| -->
<!-- @_medal|js220/ti-23-lp/simplelink               |-|B|-|G| -->
<!-- @_medal|js220/ti-23-lp/simplelink-2V2           |-|-|B|-| -->

<!-- @_medal|ppk2/in-100-dk/none                     |-|-|-|S| -->
<!-- @_medal|ppk2/in-100-dk/none-1V8                 |S|-|G|-| -->
<!-- @_medal|ppk2/nrf-52-dk/zephyr                   |-|-|-|B| -->
<!-- @_medal|ppk2/nrf-54-dk/baremetal-1V8            |B|-|-|-| -->
<!-- @_medal|ppk2/nrf-54-dk/zephyr                   |-|S|-|-| -->
<!-- @_medal|ppk2/nrf-54-dk/zephyr-1V8               |G|-|-|-| -->
<!-- @_medal|ppk2/sil-g22e-ehk/rail                  |-|S|-|-| -->
<!-- @_medal|ppk2/ti-23-lp/simplelink                |-|-|B|G| -->
<!-- @_medal|ppk2/ti-23-lp/simplelink-2V2            |-|-|S|-| -->

<p align="center">
    <img src="images/logo.png" alt="Logo" width="680">
</p>

---

<a id="toc"></a>

<h3 align="center">
  <a href="#application">Application</a>&nbsp;&#xFF5C;&nbsp;
  <a href="#catalog">Catalog</a>&nbsp;&#xFF5C;&nbsp;
  <a href="#scores">Scores</a>&nbsp;&#xFF5C;&nbsp;
  <a href="#contributing">Contributing</a>
</h3>

<br>

This repository uses **EM&bull;Scope** to benchmark **BlueJoule** &ndash; a representative **Bluetooth Low Energy** [BLE] application executing on a wide-range of HW/SW platforms.&thinsp; Visit the [em-foundation/emscope](https://github.com/em-foundation/emscope/blob/docs-stable/docs/ReadMore.md) project to learn more about the **EM&bull;Scope** tool itself.

<h4 align=“left”>Updates</h4>

<!-- @updates-begin -->
<details><summary>
&emsp;&thinsp;<img src="images/badge-2025-10-22.svg" height="16" alt="2025-10-12"></img>&emsp;refreshed captures and screenshots for Nordic nRF52832</summary><p>
&emsp;&emsp;<img src="images/badge-2025-10-17.svg" height="16" alt="2025-10-12"></img>&emsp;new scores &ndash; EM Microelectronic EM9305 · EM Bleu SDK<br>
&emsp;&emsp;<img src="images/badge-2025-09-11.svg" height="16" alt="2025-10-12"></img>&emsp;new scores &ndash; Nordic nRF52832 · EM&bull;Script SDK<br>
&emsp;&emsp;<img src="images/badge-2025-09-09.svg" height="16" alt="2025-10-12"></img>&emsp;inaugural scores &ndash; Analog Devices · InPlay · Nordic · Texas Instruments
</p></details>
<!-- @updates-end -->

<p align="right"><sub>
  ⭐ <a href="https://github.com/em-foundation/BlueJoule">Star</a>
  👁️ <a href="https://github.com/em-foundation/BlueJoule/subscription">Watch</a>
  📡 <a href="https://github.com/em-foundation/BlueJoule/commits/main.atom">RSS</a>
</sub></p>

----

## Application

Repetitve advertising serves as a fundamental capability of any Bluetooth Low Energy application.&thinsp; Because of its inherent simplicity, programs illustrating the [BLE broadcaster role](https://novelbits.io/bluetooth-low-energy-advertisements-part-1/) often serve as the "Hello World" within this space.

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

This repository houses the following curated **EM&bull;Scope** capture directories &ndash; each initially populated using the `emscope grab` command with either its `-J, --js220` or its `-P, --ppk2` option:

<!-- @catalog-begin -->
| &emsp;Capture&emsp;&emsp;&emsp;&emsp; | &emsp;JS220&emsp; | &emsp;PPK2&nbsp;&emsp; | &emsp;&emsp;&emsp;&emsp;Description&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
|---|:---:|:---:|---|
| `adi-m17-evk/msdk-3V3`&emsp; | 📄&ensp;[&nearr;](../captures/js220/adi-m17-evk/msdk-3V3/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/adi-m17-evk/msdk-3V3/ABOUT.md) | &emsp; Analog Devices MAX32655 · Maxim SDK |
| `emm-9305-dvk/emb-1V8`&emsp; | 📄&ensp;[&nearr;](../captures/js220/emm-9305-dvk/emb-1V8/ABOUT.md) |  | &emsp; EM Microelectronic EM9305 · EM Bleu SDK |
| `emm-9305-dvk/emb-3V3`&emsp; | 📄&ensp;[&nearr;](../captures/js220/emm-9305-dvk/emb-3V3/ABOUT.md) |  | &emsp; EM Microelectronic EM9305 · EM Bleu SDK |
| `in-100-dk/none-1V8`&emsp; | 📄&ensp;[&nearr;](../captures/js220/in-100-dk/none-1V8/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/in-100-dk/none-1V8/ABOUT.md) | &emsp; InPlay IN100 · &lt;no software&gt; |
| `in-100-dk/none-3V3`&emsp; | 📄&ensp;[&nearr;](../captures/js220/in-100-dk/none-3V3/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/in-100-dk/none-3V3/ABOUT.md) | &emsp; InPlay IN100 · &lt;no software&gt; |
| `nrf-52-dk/emscript-2V7`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-52-dk/emscript-2V7/ABOUT.md) |  | &emsp; Nordic nRF52832 · EM&bull;Script SDK |
| `nrf-52-dk/emscript-3V3`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-52-dk/emscript-3V3/ABOUT.md) |  | &emsp; Nordic nRF52832 · EM&bull;Script SDK |
| `nrf-52-dk/zephyr-3V3`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-52-dk/zephyr-3V3/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/nrf-52-dk/zephyr-3V3/ABOUT.md) | &emsp; Nordic nRF52832 · Zephyr OS |
| `nrf-54-dk/emscript-1V8`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-54-dk/emscript-1V8/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/nrf-54-dk/emscript-1V8/ABOUT.md) | &emsp; Nordic nRF54L15 · EM&bull;Script SDK |
| `nrf-54-dk/emscript-3V3`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-54-dk/emscript-3V3/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/nrf-54-dk/emscript-3V3/ABOUT.md) | &emsp; Nordic nRF54L15 · EM&bull;Script SDK |
| `nrf-54-dk/zephyr-1V8`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-54-dk/zephyr-1V8/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/nrf-54-dk/zephyr-1V8/ABOUT.md) | &emsp; Nordic nRF54L15 · Zephyr OS |
| `nrf-54-dk/zephyr-3V3`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-54-dk/zephyr-3V3/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/nrf-54-dk/zephyr-3V3/ABOUT.md) | &emsp; Nordic nRF54L15 · Zephyr OS |
| `sil-g22e-ehk/rail-1V8`&emsp; | 📄&ensp;[&nearr;](../captures/js220/sil-g22e-ehk/rail-1V8/ABOUT.md) |  | &emsp; SiLabs EFR32xG22E · Simplicity (RAIL) |
| `sil-g22e-ehk/rail-3V3`&emsp; | 📄&ensp;[&nearr;](../captures/js220/sil-g22e-ehk/rail-3V3/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/sil-g22e-ehk/rail-3V3/ABOUT.md) | &emsp; SiLabs EFR32xG22E · Simplicity (RAIL) |
| `ti-23-lp/emscript-2V2`&emsp; | 📄&ensp;[&nearr;](../captures/js220/ti-23-lp/emscript-2V2/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/ti-23-lp/emscript-2V2/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · EM&bull;Script SDK |
| `ti-23-lp/emscript-3V3`&emsp; | 📄&ensp;[&nearr;](../captures/js220/ti-23-lp/emscript-3V3/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/ti-23-lp/emscript-3V3/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · EM&bull;Script SDK |
| `ti-23-lp/simplelink-2V2`&emsp; | 📄&ensp;[&nearr;](../captures/js220/ti-23-lp/simplelink-2V2/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/ti-23-lp/simplelink-2V2/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · SimpleLink SDK |
| `ti-23-lp/simplelink-3V3`&emsp; | 📄&ensp;[&nearr;](../captures/js220/ti-23-lp/simplelink-3V3/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/ti-23-lp/simplelink-3V3/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · SimpleLink SDK |
<!-- @catalog-end -->

An `ABOUT.md` file found in each directory describes the capture's HW/SW configuration as well as summarizes its benchmark scores.&thinsp; This file also contains a screen-shot of a typical advertising event, prepared using the `emscope view` command.

> [!TIP]
> We recommend opening any links marked with &thinsp;&nearr;&thinsp; in a new **Tab** or **Window** within your browser

## Scores

We've compiled a set of **EM&bull;erald** scores for each capture, assuming a 1&thinsp;s and 10&thinsp;s event period in each case.&thinsp; We've also broken out a subset of these scores which supplied 3V3 during the capture &ndash; as opposed to a more optimal voltage for the target configuration.

<p>We've awarded <b>Gold&thinsp;🥇</b>, <b>Silver&thinsp;🥈</b>, and <b>Bronze&thinsp;🥉</b> medals when merited.&thinsp; We've also highlighted scores whose configurations deploy firmware written in <a href="https://docs.emscript.openem.org/"><b>EM&bull;Script</b></a>&thinsp;<img src="images/em-dot.svg" width="20", alt="">&thinsp;&ndash; a novel programming platform which targets resource-constrained MCUs.</p>

> [!IMPORTANT]
> Because of their different signal acquisition and power analysis capabilities, we've presented the **Joulescope JS220** and **Nordic PPK2** scores separately.&thinsp; While their respective results will generally align, anomalies can sometimes occur.

> [!TIP]
> Hovering over individual capture links within the following tables provides an unabbreviated description of the target HW/SW configu&shy;ration.&thinsp; Each of these links takes you to a screen-shot of typical advertising event.

<!-- @scores-begin -->
<br><a name="js220-scores"></a><p align="center"><img src="images/emeralds.svg" width="200" alt=""></p>

| &emsp;&emsp;JS220 Capture&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | sleep current [&thinsp;&mu;A&thinsp;] &ensp; | event energy [&thinsp;&mu;J&thinsp;] &ensp; | 1&thinsp;s period [<img src="images/em-dot.svg" width="12" alt="">] &emsp; | 10&thinsp;s period [<img src="images/em-dot.svg" width="12" alt="">] &emsp; |
|---|---|---|---|---|
| &nbsp;📈&nbsp;`adi-m17-evk/msdk-3V3`[&nbsp;&nearr;](../captures/js220/adi-m17-evk/msdk-3V3/ABOUT.md#typical-event "Analog Devices MAX32655 · Maxim SDK") | &emsp;` 4.422` | &emsp;`48.216` | &emsp;` 14.75` | &emsp;` 47.75` |
| &nbsp;📈&nbsp;`emm-9305-dvk/emb-1V8`[&nbsp;&nearr;](../captures/js220/emm-9305-dvk/emb-1V8/ABOUT.md#typical-event "EM Microelectronic EM9305 · EM Bleu SDK") | &emsp;` 0.840` | &emsp;`17.996` | &emsp;` 47.48` | &emsp;`280.05` |
| &nbsp;📈&nbsp;`in-100-dk/none-1V8`[&nbsp;&nearr;](../captures/js220/in-100-dk/none-1V8/ABOUT.md#typical-event "InPlay IN100 · &lt;no software&gt;") | &emsp;` 0.494` | &emsp;`21.189` | &emsp;` 41.92` | &emsp;`306.84` |
| &nbsp;📈&nbsp;`nrf-52-dk/zephyr-3V3`[&nbsp;&nearr;](../captures/js220/nrf-52-dk/zephyr-3V3/ABOUT.md#typical-event "Nordic nRF52832 · Zephyr OS") | &emsp;` 1.416` | &emsp;`28.736` | &emsp;` 27.72` | &emsp;`122.85` |
| &nbsp;📈&nbsp;`nrf-54-dk/zephyr-1V8`[&nbsp;&nearr;](../captures/js220/nrf-54-dk/zephyr-1V8/ABOUT.md#typical-event "Nordic nRF54L15 · Zephyr OS") | &emsp;` 4.684` | &emsp;`14.984` | &emsp;` 39.61` | &emsp;` 93.59` |
| &nbsp;📈&nbsp;`sil-g22e-ehk/rail-1V8`[&nbsp;&nearr;](../captures/js220/sil-g22e-ehk/rail-1V8/ABOUT.md#typical-event "SiLabs EFR32xG22E · Simplicity (RAIL)") | &emsp;` 2.468` | &emsp;`21.821` | &emsp;` 35.28` | &emsp;`140.22` |
| &nbsp;📈&nbsp;`ti-23-lp/simplelink-2V2`[&nbsp;&nearr;](../captures/js220/ti-23-lp/simplelink-2V2/ABOUT.md#typical-event "Texas Instruments CC2340R5 · SimpleLink SDK") | &emsp;` 0.793` | &emsp;`29.381` | &emsp;` 29.73` | &emsp;`197.07` |

<!-- @scores-end -->

> [!NOTE]
> By way of review, **EM&bull;eralds** quantify _energy efficiency_ &ndash; with higher scores implying lower energy consumption per period:
>
><p align="left"><b><sup>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;EM•eralds = 2400 / (<i>Joules per day</i> × 30) = 80 / <i>Joules per day</i><br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;CR2032 energy:&nbsp; 225 mAh × 3.6 × 3.0 V ≈ 2.43 kJ<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1 EM•erald ≈ 1 CR2032-month</sup></b></p>

Consider installing the [open-source](https://github.com/em-foundation/emscope/blob/docs-stable/docs/ReadMore.md) **EM&bull;Scope** tool.&thinsp; You can then query _other_ event period scenarios, as well as interactively view individual data captures using the [**Joulescope File Viewer**](https://www.joulescope.com/pages/downloads).

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

For any technical questions or roadmap suggestions, create a new thread on our [discussions](https://github.com/em-foundation/BlueJoule/discussions/) page.

