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

<!-- @upd|2025-10-17|new emm-9305-dvk/emb* scores|-->
<!-- @upd|2025-09-11|new nrf-52-dk/emscript* scores|-->
<!-- @upd|2025-09-09|baseline scores|-->







<!-- @updates-begin -->
<details><summary>
&thinsp;<img src="images/badge-2025-10-17.svg" height="16" alt="2025-10-12"></img>&ensp;new emm-9305-dvk/emb* scores</summary><p>
&emsp;<img src="images/badge-2025-09-11.svg" height="16" alt="2025-10-12"></img>&ensp;new nrf-52-dk/emscript* scores<br>
&emsp;<img src="images/badge-2025-09-09.svg" height="16" alt="2025-10-12"></img>&ensp;baseline scores
</p></details>
<!-- @updates-end -->






<p align=“right”><sub>
  Follow: :star: Star • :eye: Watch → <em>Releases</em> •
  <a href=“https://github.com/USER/BlueJoule/commits/main.atom”>RSS</a>
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
| `adi-m17-evk/msdk`&emsp; | 📄&ensp;[&nearr;](../captures/js220/adi-m17-evk/msdk/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/adi-m17-evk/msdk/ABOUT.md) | &emsp; Analog Device MAX32655 · Maxim SDK |
| `emm-9305-dvk/emb`&emsp; | 📄&ensp;[&nearr;](../captures/js220/emm-9305-dvk/emb/ABOUT.md) |  | &emsp; EM Microelectronic · EM Bleu |
| `emm-9305-dvk/emb-1V8`&emsp; | 📄&ensp;[&nearr;](../captures/js220/emm-9305-dvk/emb-1V8/ABOUT.md) |  | &emsp; EM Microelectronic · EM Bleu |
| `in-100-dk/none`&emsp; | 📄&ensp;[&nearr;](../captures/js220/in-100-dk/none/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/in-100-dk/none/ABOUT.md) | &emsp; InPlay IN100 · &lt;no software&gt; |
| `in-100-dk/none-1V8`&emsp; | 📄&ensp;[&nearr;](../captures/js220/in-100-dk/none-1V8/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/in-100-dk/none-1V8/ABOUT.md) | &emsp; InPlay IN100 · &lt;no software&gt; |
| `nrf-52-dk/emscript`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-52-dk/emscript/ABOUT.md) |  | &emsp; Nordic nRF52832 · EM&bull;Script SDK |
| `nrf-52-dk/emscript-2V7`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-52-dk/emscript-2V7/ABOUT.md) |  | &emsp; Nordic nRF52832 · EM&bull;Script SDK |
| `nrf-52-dk/zephyr`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-52-dk/zephyr/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/nrf-52-dk/zephyr/ABOUT.md) | &emsp; Nordic nRF52832 · Zephyr OS |
| `nrf-54-dk/baremetal`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-54-dk/baremetal/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/nrf-54-dk/baremetal/ABOUT.md) | &emsp; Nordic nRF54L15 · Bare-Metal SDK |
| `nrf-54-dk/baremetal-1V8`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-54-dk/baremetal-1V8/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/nrf-54-dk/baremetal-1V8/ABOUT.md) | &emsp; Nordic nRF54L15 · Bare-Metal SDK |
| `nrf-54-dk/emscript`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-54-dk/emscript/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/nrf-54-dk/emscript/ABOUT.md) | &emsp; Nordic nRF54L15 · EM&bull;Script SDK |
| `nrf-54-dk/emscript-1V8`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-54-dk/emscript-1V8/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/nrf-54-dk/emscript-1V8/ABOUT.md) | &emsp; Nordic nRF54L15 · EM&bull;Script SDK |
| `nrf-54-dk/zephyr`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-54-dk/zephyr/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/nrf-54-dk/zephyr/ABOUT.md) | &emsp; Nordic nRF54L15 · Zephyr OS |
| `nrf-54-dk/zephyr-1V8`&emsp; | 📄&ensp;[&nearr;](../captures/js220/nrf-54-dk/zephyr-1V8/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/nrf-54-dk/zephyr-1V8/ABOUT.md) | &emsp; Nordic nRF54L15 · Zephyr OS |
| `sil-g22e-ehk/rail`&emsp; | 📄&ensp;[&nearr;](../captures/js220/sil-g22e-ehk/rail/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/sil-g22e-ehk/rail/ABOUT.md) | &emsp; SiLabs EFR32xG22E · Simplicity (RAIL) |
| `sil-g22e-ehk/rail-1V8`&emsp; | 📄&ensp;[&nearr;](../captures/js220/sil-g22e-ehk/rail-1V8/ABOUT.md) |  | &emsp; SiLabs EFR32xG22E · Simplicity (RAIL) |
| `ti-23-lp/emscript`&emsp; | 📄&ensp;[&nearr;](../captures/js220/ti-23-lp/emscript/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/ti-23-lp/emscript/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · EM&bull;Script SDK |
| `ti-23-lp/emscript-2V2`&emsp; | 📄&ensp;[&nearr;](../captures/js220/ti-23-lp/emscript-2V2/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/ti-23-lp/emscript-2V2/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · EM&bull;Script SDK |
| `ti-23-lp/simplelink`&emsp; | 📄&ensp;[&nearr;](../captures/js220/ti-23-lp/simplelink/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/ti-23-lp/simplelink/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · SimpleLink SDK |
| `ti-23-lp/simplelink-2V2`&emsp; | 📄&ensp;[&nearr;](../captures/js220/ti-23-lp/simplelink-2V2/ABOUT.md) | 📄&ensp;[&nearr;](../captures/ppk2/ti-23-lp/simplelink-2V2/ABOUT.md) | &emsp; Texas Instruments CC2340R5 · SimpleLink SDK |
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

<!-- @medal|js220/emm-9305-dvk/emb                  |-|-|-|B| -->
<!-- @medal|js220/emm-9305-dvk/emb-1V8              |G|-|S|-| -->
<!-- @medal|js220/in-100-dk/none                    |-|-|-|S| -->
<!-- @medal|js220/in-100-dk/none-1V8                |S|-|G|-| -->
<!-- @medal|js220/nrf-52-dk/zephyr                  |-|-|-|-| -->
<!-- @medal|js220/nrf-54-dk/baremetal-1V8           |-|-|-|-| -->
<!-- @medal|js220/nrf-54-dk/zephyr                  |-|S|-|-| -->
<!-- @medal|js220/nrf-54-dk/zephyr-1V8              |S|-|-|-| -->
<!-- @medal|js220/sil-g22e-ehk/rail                 |-|S|-|-| -->
<!-- @medal|js220/sil-g22e-ehk/rail-1V8             |B|-|-|-| -->
<!-- @medal|js220/ti-23-lp/simplelink               |-|B|-|G| -->
<!-- @medal|js220/ti-23-lp/simplelink-2V2           |-|-|B|-| -->

<!-- @medal|ppk2/in-100-dk/none                     |-|-|-|S| -->
<!-- @medal|ppk2/in-100-dk/none-1V8                 |S|-|G|-| -->
<!-- @medal|ppk2/nrf-52-dk/zephyr                   |-|-|-|B| -->
<!-- @medal|ppk2/nrf-54-dk/baremetal-1V8            |B|-|-|-| -->
<!-- @medal|ppk2/nrf-54-dk/zephyr                   |-|S|-|-| -->
<!-- @medal|ppk2/nrf-54-dk/zephyr-1V8               |G|-|-|-| -->
<!-- @medal|ppk2/sil-g22e-ehk/rail                  |-|S|-|-| -->
<!-- @medal|ppk2/ti-23-lp/simplelink                |-|-|B|G| -->
<!-- @medal|ppk2/ti-23-lp/simplelink-2V2            |-|-|S|-| -->


<!-- @scores-begin -->



<br>    

<p align="center"><img src="images/emeralds.svg" width="200" alt=""></p>
    
| JS220 Capture&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | 00:00:01 · <var>d</var>V<var>d</var> &emsp; | 00:00:01 · 3V3 &emsp;&emsp;&emsp; | 00:00:10 · <var>d</var>V<var>d</var> &emsp; | 00:00:10 · 3V3 &emsp; |
|---|---|---|---|---|
| &emsp;📈&ensp;[adi-m17-evk/msdk&thinsp;&nearr;](../captures/js220/adi-m17-evk/msdk/ABOUT.md#typical-event "Analog Device MAX32655 · Maxim SDK") | &emsp; | &emsp;` 14.75`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;` 47.75`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;📈&ensp;[emm-9305-dvk/emb&thinsp;&nearr;](../captures/js220/emm-9305-dvk/emb/ABOUT.md#typical-event "EM Microelectronic · EM Bleu") | &emsp; | &emsp;` 25.71`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`148.39`&nbsp;&nbsp;<b>🥉</b> |
| &emsp;📈&ensp;[emm-9305-dvk/emb-1V8&thinsp;&nearr;](../captures/js220/emm-9305-dvk/emb-1V8/ABOUT.md#typical-event "EM Microelectronic · EM Bleu") | &emsp;` 47.48`&nbsp;&nbsp;<b>🥇</b> | &emsp; | &emsp;`280.05`&nbsp;&nbsp;<b>🥈</b> | &emsp; |
| &emsp;📈&ensp;[in-100-dk/none&thinsp;&nearr;](../captures/js220/in-100-dk/none/ABOUT.md#typical-event "InPlay IN100 · &lt;no software&gt;") | &emsp; | &emsp;` 22.85`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`155.14`&nbsp;&nbsp;<b>🥈</b> |
| &emsp;📈&ensp;[in-100-dk/none-1V8&thinsp;&nearr;](../captures/js220/in-100-dk/none-1V8/ABOUT.md#typical-event "InPlay IN100 · &lt;no software&gt;") | &emsp;` 41.92`&nbsp;&nbsp;<b>🥈</b> | &emsp; | &emsp;`306.84`&nbsp;&nbsp;<b>🥇</b> | &emsp; |
| &emsp;📈&ensp;[nrf-52-dk/emscript&thinsp;&nearr;](../captures/js220/nrf-52-dk/emscript/ABOUT.md#typical-event "Nordic nRF52832 · EM&bull;Script SDK") | &emsp; | &emsp;` 28.57`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; | &emsp;` 88.03`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> |
| &emsp;📈&ensp;[nrf-52-dk/emscript-2V7&thinsp;&nearr;](../captures/js220/nrf-52-dk/emscript-2V7/ABOUT.md#typical-event "Nordic nRF52832 · EM&bull;Script SDK") | &emsp;` 32.40`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; | &emsp;`109.14`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; |
| &emsp;📈&ensp;[nrf-52-dk/zephyr&thinsp;&nearr;](../captures/js220/nrf-52-dk/zephyr/ABOUT.md#typical-event "Nordic nRF52832 · Zephyr OS") | &emsp; | &emsp;` 27.72`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`122.85`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;📈&ensp;[nrf-54-dk/baremetal&thinsp;&nearr;](../captures/js220/nrf-54-dk/baremetal/ABOUT.md#typical-event "Nordic nRF54L15 · Bare-Metal SDK") | &emsp; | &emsp;` 27.09`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;` 64.82`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;📈&ensp;[nrf-54-dk/baremetal-1V8&thinsp;&nearr;](../captures/js220/nrf-54-dk/baremetal-1V8/ABOUT.md#typical-event "Nordic nRF54L15 · Bare-Metal SDK") | &emsp;` 33.64`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;` 89.74`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |
| &emsp;📈&ensp;[nrf-54-dk/emscript&thinsp;&nearr;](../captures/js220/nrf-54-dk/emscript/ABOUT.md#typical-event "Nordic nRF54L15 · EM&bull;Script SDK") | &emsp; | &emsp;` 37.01`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; | &emsp;` 84.65`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> |
| &emsp;📈&ensp;[nrf-54-dk/emscript-1V8&thinsp;&nearr;](../captures/js220/nrf-54-dk/emscript-1V8/ABOUT.md#typical-event "Nordic nRF54L15 · EM&bull;Script SDK") | &emsp;` 44.67`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; | &emsp;`118.67`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; |
| &emsp;📈&ensp;[nrf-54-dk/zephyr&thinsp;&nearr;](../captures/js220/nrf-54-dk/zephyr/ABOUT.md#typical-event "Nordic nRF54L15 · Zephyr OS") | &emsp; | &emsp;` 31.07`&nbsp;&nbsp;<b>🥈</b> | &emsp; | &emsp;` 71.43`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;📈&ensp;[nrf-54-dk/zephyr-1V8&thinsp;&nearr;](../captures/js220/nrf-54-dk/zephyr-1V8/ABOUT.md#typical-event "Nordic nRF54L15 · Zephyr OS") | &emsp;` 41.93`&nbsp;&nbsp;<b>🥈</b> | &emsp; | &emsp;`121.06`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |
| &emsp;📈&ensp;[sil-g22e-ehk/rail&thinsp;&nearr;](../captures/js220/sil-g22e-ehk/rail/ABOUT.md#typical-event "SiLabs EFR32xG22E · Simplicity (RAIL)") | &emsp; | &emsp;` 31.93`&nbsp;&nbsp;<b>🥈</b> | &emsp; | &emsp;`128.64`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;📈&ensp;[sil-g22e-ehk/rail-1V8&thinsp;&nearr;](../captures/js220/sil-g22e-ehk/rail-1V8/ABOUT.md#typical-event "SiLabs EFR32xG22E · Simplicity (RAIL)") | &emsp;` 35.28`&nbsp;&nbsp;<b>🥉</b> | &emsp; | &emsp;`140.22`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |
| &emsp;📈&ensp;[ti-23-lp/emscript&thinsp;&nearr;](../captures/js220/ti-23-lp/emscript/ABOUT.md#typical-event "Texas Instruments CC2340R5 · EM&bull;Script SDK") | &emsp; | &emsp;` 40.62`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; | &emsp;`263.43`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> |
| &emsp;📈&ensp;[ti-23-lp/emscript-2V2&thinsp;&nearr;](../captures/js220/ti-23-lp/emscript-2V2/ABOUT.md#typical-event "Texas Instruments CC2340R5 · EM&bull;Script SDK") | &emsp;` 43.05`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; | &emsp;`260.67`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; |
| &emsp;📈&ensp;[ti-23-lp/simplelink&thinsp;&nearr;](../captures/js220/ti-23-lp/simplelink/ABOUT.md#typical-event "Texas Instruments CC2340R5 · SimpleLink SDK") | &emsp; | &emsp;` 28.13`&nbsp;&nbsp;<b>🥉</b> | &emsp; | &emsp;`183.76`&nbsp;&nbsp;<b>🥇</b> |
| &emsp;📈&ensp;[ti-23-lp/simplelink-2V2&thinsp;&nearr;](../captures/js220/ti-23-lp/simplelink-2V2/ABOUT.md#typical-event "Texas Instruments CC2340R5 · SimpleLink SDK") | &emsp;` 29.73`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`197.07`&nbsp;&nbsp;<b>🥉</b> | &emsp; |




<br>    

<p align="center"><img src="images/emeralds.svg" width="200" alt=""></p>
    
| PPK2 Capture&ensp;&thinsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | 00:00:01 · <var>d</var>V<var>d</var> &emsp; | 00:00:01 · 3V3 &emsp;&emsp;&emsp; | 00:00:10 · <var>d</var>V<var>d</var> &emsp; | 00:00:10 · 3V3 &emsp; |
|---|---|---|---|---|
| &emsp;📈&ensp;[adi-m17-evk/msdk&thinsp;&nearr;](../captures/ppk2/adi-m17-evk/msdk/ABOUT.md#typical-event "Analog Device MAX32655 · Maxim SDK") | &emsp; | &emsp;` 14.02`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;` 47.36`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;📈&ensp;[in-100-dk/none&thinsp;&nearr;](../captures/ppk2/in-100-dk/none/ABOUT.md#typical-event "InPlay IN100 · &lt;no software&gt;") | &emsp; | &emsp;` 22.95`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`148.92`&nbsp;&nbsp;<b>🥈</b> |
| &emsp;📈&ensp;[in-100-dk/none-1V8&thinsp;&nearr;](../captures/ppk2/in-100-dk/none-1V8/ABOUT.md#typical-event "InPlay IN100 · &lt;no software&gt;") | &emsp;` 43.11`&nbsp;&nbsp;<b>🥈</b> | &emsp; | &emsp;`301.01`&nbsp;&nbsp;<b>🥇</b> | &emsp; |
| &emsp;📈&ensp;[nrf-52-dk/zephyr&thinsp;&nearr;](../captures/ppk2/nrf-52-dk/zephyr/ABOUT.md#typical-event "Nordic nRF52832 · Zephyr OS") | &emsp; | &emsp;` 27.30`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`113.68`&nbsp;&nbsp;<b>🥉</b> |
| &emsp;📈&ensp;[nrf-54-dk/baremetal&thinsp;&nearr;](../captures/ppk2/nrf-54-dk/baremetal/ABOUT.md#typical-event "Nordic nRF54L15 · Bare-Metal SDK") | &emsp; | &emsp;` 27.35`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;` 64.54`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;📈&ensp;[nrf-54-dk/baremetal-1V8&thinsp;&nearr;](../captures/ppk2/nrf-54-dk/baremetal-1V8/ABOUT.md#typical-event "Nordic nRF54L15 · Bare-Metal SDK") | &emsp;` 35.09`&nbsp;&nbsp;<b>🥉</b> | &emsp; | &emsp;` 86.91`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |
| &emsp;📈&ensp;[nrf-54-dk/emscript&thinsp;&nearr;](../captures/ppk2/nrf-54-dk/emscript/ABOUT.md#typical-event "Nordic nRF54L15 · EM&bull;Script SDK") | &emsp; | &emsp;` 35.75`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; | &emsp;` 81.83`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> |
| &emsp;📈&ensp;[nrf-54-dk/emscript-1V8&thinsp;&nearr;](../captures/ppk2/nrf-54-dk/emscript-1V8/ABOUT.md#typical-event "Nordic nRF54L15 · EM&bull;Script SDK") | &emsp;` 46.07`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; | &emsp;`117.95`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; |
| &emsp;📈&ensp;[nrf-54-dk/zephyr&thinsp;&nearr;](../captures/ppk2/nrf-54-dk/zephyr/ABOUT.md#typical-event "Nordic nRF54L15 · Zephyr OS") | &emsp; | &emsp;` 31.94`&nbsp;&nbsp;<b>🥈</b> | &emsp; | &emsp;` 71.26`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;📈&ensp;[nrf-54-dk/zephyr-1V8&thinsp;&nearr;](../captures/ppk2/nrf-54-dk/zephyr-1V8/ABOUT.md#typical-event "Nordic nRF54L15 · Zephyr OS") | &emsp;` 57.21`&nbsp;&nbsp;<b>🥇</b> | &emsp; | &emsp;`153.61`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; |
| &emsp;📈&ensp;[sil-g22e-ehk/rail&thinsp;&nearr;](../captures/ppk2/sil-g22e-ehk/rail/ABOUT.md#typical-event "SiLabs EFR32xG22E · Simplicity (RAIL)") | &emsp; | &emsp;` 31.92`&nbsp;&nbsp;<b>🥈</b> | &emsp; | &emsp;` 92.80`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; |
| &emsp;📈&ensp;[ti-23-lp/emscript&thinsp;&nearr;](../captures/ppk2/ti-23-lp/emscript/ABOUT.md#typical-event "Texas Instruments CC2340R5 · EM&bull;Script SDK") | &emsp; | &emsp;` 38.29`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; | &emsp;`214.10`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> |
| &emsp;📈&ensp;[ti-23-lp/emscript-2V2&thinsp;&nearr;](../captures/ppk2/ti-23-lp/emscript-2V2/ABOUT.md#typical-event "Texas Instruments CC2340R5 · EM&bull;Script SDK") | &emsp;` 42.09`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; | &emsp;`228.65`&nbsp;&nbsp;<img src="images/em-dot.svg" width="14" alt=""> | &emsp; |
| &emsp;📈&ensp;[ti-23-lp/simplelink&thinsp;&nearr;](../captures/ppk2/ti-23-lp/simplelink/ABOUT.md#typical-event "Texas Instruments CC2340R5 · SimpleLink SDK") | &emsp; | &emsp;` 27.37`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`173.87`&nbsp;&nbsp;<b>🥇</b> |
| &emsp;📈&ensp;[ti-23-lp/simplelink-2V2&thinsp;&nearr;](../captures/ppk2/ti-23-lp/simplelink-2V2/ABOUT.md#typical-event "Texas Instruments CC2340R5 · SimpleLink SDK") | &emsp;` 29.62`&nbsp;&nbsp;&nbsp;&nbsp;&thinsp; | &emsp; | &emsp;`182.12`&nbsp;&nbsp;<b>🥈</b> | &emsp; |


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

