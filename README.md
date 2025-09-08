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
| &emsp;Capture | &emsp;&emsp;JS220&emsp;&emsp; | &emsp;&emsp;PPK2&nbsp;&emsp;&emsp; | &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Description&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
|---|:---:|:---:|---|
| `adi-m17-evk/msdk` | [**&nearr;**](captures/js220/adi-m17-evk/msdk/ABOUT.md) | [**&nearr;**](captures/ppk2/adi-m17-evk/msdk/ABOUT.md) | &emsp; Analog Device MAX32655 · Maxim SDK |
| `in-100-dk/none` | [**&nearr;**](captures/js220/in-100-dk/none/ABOUT.md) | [**&nearr;**](captures/ppk2/in-100-dk/none/ABOUT.md) | &emsp; InPlay IN100 · &lt;no software&gt; |
| `in-100-dk/none-1V8` | [**&nearr;**](captures/js220/in-100-dk/none-1V8/ABOUT.md) | [**&nearr;**](captures/ppk2/in-100-dk/none-1V8/ABOUT.md) | &emsp; InPlay IN100 · &lt;no software&gt; |
| `nrf-52-dk/zephyr` | [**&nearr;**](captures/js220/nrf-52-dk/zephyr/ABOUT.md) | [**&nearr;**](captures/ppk2/nrf-52-dk/zephyr/ABOUT.md) | &emsp; Nordic nRF52832 · Zephyr OS |
| `nrf-54-dk/baremetal` | [**&nearr;**](captures/js220/nrf-54-dk/baremetal/ABOUT.md) | [**&nearr;**](captures/ppk2/nrf-54-dk/baremetal/ABOUT.md) | &emsp; Nordic nRF54L15 · Bare-Metal SDK |
| `nrf-54-dk/baremetal-1V8` | [**&nearr;**](captures/js220/nrf-54-dk/baremetal-1V8/ABOUT.md) | [**&nearr;**](captures/ppk2/nrf-54-dk/baremetal-1V8/ABOUT.md) | &emsp; Nordic nRF54L15 · Bare-Metal SDK |
| `nrf-54-dk/zephyr` | [**&nearr;**](captures/js220/nrf-54-dk/zephyr/ABOUT.md) | [**&nearr;**](captures/ppk2/nrf-54-dk/zephyr/ABOUT.md) | &emsp; Nordic nRF54L15 · Zephyr OS |
| `nrf-54-dk/zephyr-1V8` | [**&nearr;**](captures/js220/nrf-54-dk/zephyr-1V8/ABOUT.md) | [**&nearr;**](captures/ppk2/nrf-54-dk/zephyr-1V8/ABOUT.md) | &emsp; Nordic nRF54L15 · Zephyr OS |
| `sil-g22e-ehk/rail` | [**&nearr;**](captures/js220/sil-g22e-ehk/rail/ABOUT.md) | [**&nearr;**](captures/ppk2/sil-g22e-ehk/rail/ABOUT.md) | &emsp; SiLabs EFR32xG22E · Simplicity (RAIL) |
| `ti-23-lp/emscript` | [**&nearr;**](captures/js220/ti-23-lp/emscript/ABOUT.md) | [**&nearr;**](captures/ppk2/ti-23-lp/emscript/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · EM&bull;Script SDK |
| `ti-23-lp/emscript-2V2` | [**&nearr;**](captures/js220/ti-23-lp/emscript-2V2/ABOUT.md) | [**&nearr;**](captures/ppk2/ti-23-lp/emscript-2V2/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · EM&bull;Script SDK |
| `ti-23-lp/simplelink` | [**&nearr;**](captures/js220/ti-23-lp/simplelink/ABOUT.md) | [**&nearr;**](captures/ppk2/ti-23-lp/simplelink/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · SimpleLink SDK |
| `ti-23-lp/simplelink-2V2` | [**&nearr;**](captures/js220/ti-23-lp/simplelink-2V2/ABOUT.md) | [**&nearr;**](captures/ppk2/ti-23-lp/simplelink-2V2/ABOUT.md) | &emsp; Hardware Platform · Software Environment |
<!-- @catalog-end -->

An `ABOUT.md` file found in each directory describes the capture's HW/SW configuration as well as summarizes its benchmark scores.

## Scores

We've compiled a pair of **EM&bull;erald** scores for each capture, assuming a 1&thinsp;s and 10&thinsp;s event period in each case.&thinsp; We've also awarded Gold&thinsp;🥇, Silver&thinsp;🥈, and Bronze&thinsp;🥉 medals when merited.

> [!IMPORTANT]
> Because of their different signal acquisition and power analysis capabilities, we've presented the **Joulescope JS220** and **Nordic PPK2** scores separately.&thinsp; While results generally seem consistent, anomalies can sometimes occur.

<!-- @medal|in-100-dk-none__J          |S|G| -->
<!-- @medal|nrf-54-dk-zephyr__J        |S|N| -->
<!-- @medal|ti-23-lp-3V3__simplelink__J    |N|B| -->

<!-- @medal|in-100-dk-none__P          |S|G| -->
<!-- @medal|nrf-54-dk-zephyr__P        |G|B| -->
<!-- @medal|ti-23-lp-slsdk__P          |N|S| -->

<!-- @scores-begin -->

<br>

| JS220 Capture&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | EM&bull;eralds&thinsp; &mdash;&thinsp;`00:00:01` event cycle | EM&bull;eralds&thinsp; &mdash;&thinsp;`00:00:10` event cycle |
|---|---|---|
| &emsp;[adi-m17-evk__msdk__J](captures/adi-m17-evk__msdk__J/ABOUT.md) | &emsp;`  14.75` | &emsp;`  47.75` |
| &emsp;[in-100-dk-1V8__none__J](captures/in-100-dk-1V8__none__J/ABOUT.md) | &emsp;`  41.92` | &emsp;` 306.84` |
| &emsp;[in-100-dk__none__J](captures/in-100-dk__none__J/ABOUT.md) | &emsp;`  22.85` | &emsp;` 155.14` |
| &emsp;[nrf-52-dk__zephyr__J](captures/nrf-52-dk__zephyr__J/ABOUT.md) | &emsp;`  27.72` | &emsp;` 122.85` |
| &emsp;[nrf-54-dk-1V8__baremetal__J](captures/nrf-54-dk-1V8__baremetal__J/ABOUT.md) | &emsp;`  33.64` | &emsp;`  89.74` |
| &emsp;[nrf-54-dk-1V8__zephyr__J](captures/nrf-54-dk-1V8__zephyr__J/ABOUT.md) | &emsp;`  41.93` | &emsp;` 121.06` |
| &emsp;[nrf-54-dk__baremetal__J](captures/nrf-54-dk__baremetal__J/ABOUT.md) | &emsp;`  27.09` | &emsp;`  64.82` |
| &emsp;[nrf-54-dk__zephyr__J](captures/nrf-54-dk__zephyr__J/ABOUT.md) | &emsp;`  31.07` | &emsp;`  71.43` |
| &emsp;[sil-g22e-ehk__simplicity__J](captures/sil-g22e-ehk__simplicity__J/ABOUT.md) | &emsp;`  31.85` | &emsp;`  99.02` |
| &emsp;[ti-23-lp-2V2__emscript__J](captures/ti-23-lp-2V2__emscript__J/ABOUT.md) | &emsp;`  72.21` | &emsp;` 379.34` |
| &emsp;[ti-23-lp-2V2__simplelink__J](captures/ti-23-lp-2V2__simplelink__J/ABOUT.md) | &emsp;`  29.73` | &emsp;` 197.07` |
| &emsp;[ti-23-lp__emscript__J](captures/ti-23-lp__emscript__J/ABOUT.md) | &emsp;`  48.62` | &emsp;` 249.88` |
| &emsp;[ti-23-lp__simplelink__J](captures/ti-23-lp__simplelink__J/ABOUT.md) | &emsp;`  28.13` | &emsp;` 183.76` |


<br>

| PPK2 Capture&ensp;&thinsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | EM&bull;eralds&thinsp; &mdash;&thinsp;`00:00:01` event cycle | EM&bull;eralds&thinsp; &mdash;&thinsp;`00:00:10` event cycle |
|---|---|---|
| &emsp;[adi-m17-evk__msdk__P](captures/adi-m17-evk__msdk__P/ABOUT.md) | &emsp;`  14.02` | &emsp;`  47.36` |
| &emsp;[in-100-dk-1V8__none__P](captures/in-100-dk-1V8__none__P/ABOUT.md) | &emsp;`  43.11` | &emsp;` 301.01` |
| &emsp;[in-100-dk__none__P](captures/in-100-dk__none__P/ABOUT.md) | &emsp;`  22.95` | &emsp;` 148.92` |
| &emsp;[nrf-52-dk__zephyr__P](captures/nrf-52-dk__zephyr__P/ABOUT.md) | &emsp;`  27.30` | &emsp;` 113.68` |
| &emsp;[nrf-54-dk-1V8__baremetal__P](captures/nrf-54-dk-1V8__baremetal__P/ABOUT.md) | &emsp;`  35.09` | &emsp;`  86.91` |
| &emsp;[nrf-54-dk-1V8__zephyr__P](captures/nrf-54-dk-1V8__zephyr__P/ABOUT.md) | &emsp;`  57.21` | &emsp;` 153.61` |
| &emsp;[nrf-54-dk__baremetal__P](captures/nrf-54-dk__baremetal__P/ABOUT.md) | &emsp;`  27.35` | &emsp;`  64.54` |
| &emsp;[nrf-54-dk__zephyr__P](captures/nrf-54-dk__zephyr__P/ABOUT.md) | &emsp;`  31.94` | &emsp;`  71.26` |
| &emsp;[sil-g22e-ehk__simplicity__P](captures/sil-g22e-ehk__simplicity__P/ABOUT.md) | &emsp;`  31.92` | &emsp;`  92.80` |
| &emsp;[ti-23-lp-2V2__emscript__P](captures/ti-23-lp-2V2__emscript__P/ABOUT.md) | &emsp;`  42.09` | &emsp;` 228.65` |
| &emsp;[ti-23-lp-2V2__simplelink__P](captures/ti-23-lp-2V2__simplelink__P/ABOUT.md) | &emsp;`  29.62` | &emsp;` 182.12` |
| &emsp;[ti-23-lp__emscript__P](captures/ti-23-lp__emscript__P/ABOUT.md) | &emsp;`  39.95` | &emsp;` 228.08` |
| &emsp;[ti-23-lp__simplelink__P](captures/ti-23-lp__simplelink__P/ABOUT.md) | &emsp;`  27.37` | &emsp;` 173.87` |


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


