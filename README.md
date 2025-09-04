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

When _not_ actively advertising &ndash; over 99% of the time, in fact, within a 1&thinsp;s event cycle &ndash; we presume that the application has entered some "deep-sleep" mode to minimize power consumption.

## Catalog

This repository houses the following curated **EM&bull;Scope** capture directories &ndash; each initially populated using the `emscope grab` command with either its `-J, --js220` or `-P, --ppk2` option:

<!-- @catalog-begin -->
| JS220 Capture | PPK2 Capture | &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Description&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
|---|---|---|
| [adi-m17-evk-msdk__J](captures/adi-m17-evk-msdk__J/ABOUT.md) | [adi-m17-evk-msdk__P](captures/adi-m17-evk-msdk__P/ABOUT.md) | &emsp; Analog Device MAX32655 · Maxim SDK |
| [in-100-dk-none__J](captures/in-100-dk-none__J/ABOUT.md) | [in-100-dk-none__P](captures/in-100-dk-none__P/ABOUT.md) | &emsp; InPlay IN100 · &lt;no software&gt; |
| [nrf-52-dk-zephyr__J](captures/nrf-52-dk-zephyr__J/ABOUT.md) | [nrf-52-dk-zephyr__P](captures/nrf-52-dk-zephyr__P/ABOUT.md) | &emsp; Nordic nRF52832 · Zephyr OS |
| [nrf-54-dk-bmsdk__J](captures/nrf-54-dk-bmsdk__J/ABOUT.md) |  | &emsp; Nordic nRF54L15 · Bare-Metal SDK |
| [nrf-54-dk-zephyr__J](captures/nrf-54-dk-zephyr__J/ABOUT.md) | [nrf-54-dk-zephyr__P](captures/nrf-54-dk-zephyr__P/ABOUT.md) | &emsp; Nordic nRF54L15 · Zephyr OS |
| [si-g22e-ehk-rail__J](captures/si-g22e-ehk-rail__J/ABOUT.md) | [si-g22e-ehk-rail__P](captures/si-g22e-ehk-rail__P/ABOUT.md) | &emsp; SiLabs EFR32xG22E · RAIL |
| [ti-23-lp-3V3__simplelink__J](captures/ti-23-lp-3V3__simplelink__J/ABOUT.md) |  | &emsp; Texas Instruments CC2340R5 · SimpleLink SDK |
|  | [ti-23-lp-slsdk__P](captures/ti-23-lp-slsdk__P/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · SimpleLink SDK |
<!-- @catalog-end -->

An `ABOUT.md` file found in each directory describes the capture's HW/SW configuration as well as summarizes its benchmark scores.

## Scores

We've compiled a pair of **EM&bull;erald** scores for each capture, assuming a 1&thinsp;s and 10&thinsp;s event cycle in each case.&thinsp; We've also awarded Gold&thinsp;🥇, Silver&thinsp;🥈, and Bronze&thinsp;🥉 medals when merited.

> [!IMPORTANT]
> Because of their different signal acquisition and power analysis capabilities, we've presented the **Joulescope JS220** and **Nordic PPK2** scores separately.&thinsp; While results generally seem consistent, anomalies can sometimes occur.

<!-- @medal|in-100-dk-none-J    |S|G| -->
<!-- @medal|nrf-54-dk-zephyr-J  |S|N| -->
<!-- @medal|ti-23-lp-emsdk-J    |G|S| -->
<!-- @medal|ti-23-lp-slsdk-J    |N|B| -->

<!-- @medal|in-100-dk-none-P    |S|G| -->
<!-- @medal|nrf-54-dk-zephyr-P  |G|B| -->
<!-- @medal|ti-23-lp-slsdk-P    |N|S| -->

<!-- @scores-begin -->

<br>

| JS220 Capture&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | EM&bull;eralds&thinsp; &mdash;&thinsp;`00:00:01` event cycle | EM&bull;eralds&thinsp; &mdash;&thinsp;`00:00:10` event cycle |
|---|---|---|


<br>

| PPK2 Capture&ensp;&thinsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | EM&bull;eralds&thinsp; &mdash;&thinsp;`00:00:01` event cycle | EM&bull;eralds&thinsp; &mdash;&thinsp;`00:00:10` event cycle |
|---|---|---|


<!-- @scores-end -->

> [!NOTE]
> By way of review, **EM&bull;eralds** quantify _energy efficiency_ &ndash; with higher scores implying lower energy consumption per cycle:
>
><p align="center"><b><sup>EM•eralds = 2400 / (<i>Joules per day</i> * 30) = 800 / <i>Joules per day</i><br>CR2032 energy:&nbsp; 225 mAh × 3.6 × 3.0 V ≈ 2.43 kJ<br>1 EM•erald ≈ 1 CR2032-month</sup></b></p>
>
> Consider installing the [`emscope`](https://github.com/em-foundation/emscope) tool.&thinsp; You can then query _other_ event cycle scenarios, as well as interactively view individual data captures raw using the [**Joulescope File Viewer**](https://www.joulescope.com/pages/downloads).

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


