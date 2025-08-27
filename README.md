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
  <a href="#cloning">Cloning</a>&nbsp;&#xFF5C;&nbsp;
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

