<p align="center">
    <img src="docs/images/logo.png" alt="Logo" width="400">
</p>
<br>
<p align="center">
    &emsp;&ensp;<img src="docs/images/tagline.png" alt="TagLine" width="750">
</p>

<br>
<br>
<br>

<p align="right">
  <sup><a href="README.md">for a better view <b>&#x27a6;</b></a></sup>
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

This repository uses **EM&bull;Scope** to benchmark a representative **Bluetooth Low Energy** [BLE] application executing on a wide-range of HW/SW platforms.&thinsp; Visit the [em-foundation/emscope](https://github.com/em-foundation/emscope) project to learn more about the **EM&bull;Scope** tool itself.

## Application

Repetitve advertising remains a fundamental modality of any Bluetooth Low Energy application.&thinsp; Because of its inherent simplicity, programs illustrating the [BLE broadcaster role](https://novelbits.io/bluetooth-low-energy-advertisements-part-1/) often serve as the "Hello World" within this space.

Our benchmark will broadcast the same packet on the three standard BLE advertising channels.&thinsp; These transmissions occur back-to-back within a single _advertising event_; and these events will unfold at a 1&thinsp;s _advertising interval_. 

To faciliate "apples-to-apples" comparisons among different platforms, we require the underlying BLE radio to transmit packets at 0&thinsp;dB.&thinsp; A differentiator for HW vendors, TX power consumption in `mW` will often headline their datasheets.

And finally, the BLE advertising packet itself with 17 bytes of payload comprising the following standard data types:

| Len | Type | Data (hex)                                   | Notes                                         |
|----:|-----:|----------------------------------------------|-----------------------------------------------|
| `02`  |  `01`  | `06`                                     | Flags &mdash; LE General Disc + BR/EDR not supported      |
| `0A`  |  `08`  | `42 6C 75 65 4A 6F 75 6C 65`             | Local Name &mdash; `"BlueJoule"`             |
| `05`  |  `FF`  | `D3 08 FF`                               | Manufacturer &mdash; Company:&thinsp; [Novel Bits](https://novelbits.io/) (`0x08D3`),&thinsp; Data: `0xFF`&emsp; |

When _not_ actively advertising &ndash; over 99% of the time, in fact, within a 1&thinsp;Hz event cycle &ndash; we presume that the application has entered some "deep-sleep" mode to minimize power consumption.

## Catalog

This repository

| JS220 Capture | PPK2 Capture | &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Description&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
|---|---|---|
| [`adi-m17-evk-msdk-J`](captures/adi-m17-evk-msdk-J/) | [`adi-m17-evk-msdk-P`](captures/adi-m17-evk-msdk-P/) | &emsp; Analog Device MAX32655 · Maxim SDK|
| [`in-100-dk-none-J`](captures/in-100-dk-none-J/) | [`in-100-dk-none-P`](captures/in-100-dk-none-P/) | &emsp; InPlay IN100 · &lt;no software&gt; |
| [`nrf-52-dk-zephyr-J`](captures/nrf-52-dk-zephyr-J/) | [`nrf-52-dk-zephyr-P`](captures/nrf-52-dk-zephyr-P/) | &emsp; Nordic nRF52832 · Zephyr OS |
| [`nrf-54-dk-zephyr-J`](captures/nrf-54-dk-zephyr-J/) | [`nrf-54-dk-zephyr-P`](captures/nrf-54-dk-zephyr-P/) | &emsp; Nordic nRF54L15 · Zephyr OS |
| [`ti-23-lp-emsdk-J`](captures/ti-23-lp-emsdk-J/) | [`ti-23-lp-emsdk-P`](captures/ti-23-lp-emsdk-P/) | &emsp; Texas Instruments CC2340R5 · EM&bull;Script SDK |
| [`ti-23-lp-slsdk-J`](captures/ti-23-lp-slsdk-J/) | [`ti-23-lp-slsdk-P`](captures/ti-23-lp-slsdk-P/) | &emsp; Texas Instruments CC2340R5 · SimpleLink SDK |

## Scores

| Capture | ![EM•eralds](https://img.shields.io/badge/EM%E2%80%A2eralds-%C2%A0-9ca3af?labelColor=005d2a) | Comments |
|---|---:|---|
| [`nrf-54-dk-zephyr-J`](captures/nrf-54-dk-zephyr-J/) | `12.30`&#8239;<img src="docs/images/gold-medal.svg"   width="16" alt="">  | nRF54L15-DK · Zephyr |
| [`nrf52dk-zephyr-B`](captures/nrf52dk-zephyr-B/)     | `10.20`&#8239;<img src="docs/images/silver-medal.svg" width="16" alt=""> | nRF52 DK · Zephyr |
| [`xg24-silabs-C`](captures/xg24-silabs-C/)           | `09.60`&#8239;<img src="docs/images/bronze-medal.svg" width="16" alt=""> | SiLabs XG24 |
| [`esp32c6-idf-D`](captures/esp32c6-idf-D/)           | `08.90`&#8239;<img src="docs/images/empty-medal.svg"  width="16" alt=""> | ESP32-C6 · IDF |



## Contributing

