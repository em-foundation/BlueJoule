
<h1 align="center">Texas Instruments CC2340R5 · SimpleLink SDK · 3V3</h1>

<!-- @emscope-pack:start -->

<!-- *** AUTOMATICALLY GENERATED CONTENT – DO NOT EDIT *** -->  

<p align="right"><sub>captured on 2025-08-16 @ 02:36:43<br>generated on 2025-11-09 @ 00:38:09</sub></p>

## HW/SW Configuration

* [LP-EM-CC2340R5 dev kit](https://www.ti.com/tool/LP-EM-CC2340R5) &thinsp;&ratio;&thinsp; **Texas Instruments CC2340R5 LaunchPad**
* [CC2340R5 SoC](https://www.ti.com/product/CC2340R5) &thinsp;&ratio;&thinsp; 48&thinsp;MHz Cortex-M0+ &thinsp;·&thinsp; 512&thinsp;KB flash &thinsp;·&thinsp; 64&thinsp;KB SRAM

* [BOARD PINOUT](https://github.com/em-foundation/emscope/blob/docs-stable/docs/boards/ti-23-lp.png) &thinsp;⚙️

* [Code Composer Studio IDE](https://www.ti.com/tool/CCSTUDIO) &ndash; version 12.4.0
* [TI Arm Clang compiler](https://www.ti.com/tool/download/ARM-CGT-CLANG) &ndash; version 2.1.3
* [SimpleLink SDK](https://www.ti.com/tool/SIMPLELINK-LOWPOWER-SDK) &ndash; version 8.10.0

* [BUILD ARTIFACTS](../simplelink) &thinsp;⚙️



## EM&bull;Scope results · JS220

### 🟠&ensp;sleep

| supply voltage | &emsp;current (avg)&emsp; | &emsp;current (std)&emsp; | &emsp;average power&emsp;
|:---:|:---:|:---:|:---:|
| 3.3 V |  0.6 µA | 14.5 µA |  1.9 µW |

### 🟠&ensp;1&thinsp;s event period

| &emsp;&emsp;event energy (avg)&emsp;&emsp; | &emsp;&emsp;energy per period&emsp;&emsp; | &emsp;&emsp;energy per day&emsp;&emsp; | &emsp;&emsp;&emsp;**EM&bull;eralds**&emsp;&emsp;&emsp;
|:---:|:---:|:---:|:---:|
| 31.0 µJ | 32.9 µJ |  2.8 J | 28.13 |

### 🟠&ensp;10&thinsp;s event period

| &emsp;&emsp;event energy (avg)&emsp;&emsp; | &emsp;&emsp;energy per period&emsp;&emsp; | &emsp;&emsp;energy per day&emsp;&emsp; | &emsp;&emsp;&emsp;**EM&bull;eralds**&emsp;&emsp;&emsp;
|:---:|:---:|:---:|:---:|
| 31.0 µJ | 50.4 µJ |  0.4 J | 183.76 |

## Typical Event

<p align="center"><img src="event-B.png" alt="Event" width="900"></p>

## Notes

<!-- @emscope-pack:end -->

* results align with the vendor's power specifications
* highly competitive deep-sleep current (~600&thinsp;nA)
* excessive CPU activity (~750&thinsp;&mu;S) lowers final score
