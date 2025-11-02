
<h1 align="center">SiLabs EFR32xG24 · Simplicity (RAIL) · 3V0</h1>

## HW/SW configuration

## EM&bull;Scope results

<!-- @emscope-pack:start -->


### 🟠&ensp;sleep

| supply voltage | &emsp;current (avg)&emsp; | &emsp;current (std)&emsp; | &emsp;average power&emsp;
|:---:|:---:|:---:|:---:|
| 2.99 V |   3.880 µA | 607.005 nA |  11.590 µW |

### 🟠&ensp;1&thinsp;s event period

| &emsp;&emsp;event energy (avg)&emsp;&emsp; | &emsp;&emsp;energy per period&emsp;&emsp; | &emsp;&emsp;energy per day&emsp;&emsp; | &emsp;&emsp;&emsp;**EM&bull;eralds**&emsp;&emsp;&emsp;
|:---:|:---:|:---:|:---:|
|  37.183 µJ |  48.773 µJ |   4.214 J | 18.98 |

### 🟠&ensp;10&thinsp;s event period

| &emsp;&emsp;event energy (avg)&emsp;&emsp; | &emsp;&emsp;energy per period&emsp;&emsp; | &emsp;&emsp;energy per day&emsp;&emsp; | &emsp;&emsp;&emsp;**EM&bull;eralds**&emsp;&emsp;&emsp;
|:---:|:---:|:---:|:---:|
|  37.183 µJ | 153.079 µJ |   1.323 J | 60.49 |

<br>
<p align="right"><sub>generated at 2025-11-02T01:05:22.432Z</sub></p>
    

<!-- @emscope-pack:end -->

## Typical event

<p align="center">
    <img src="event-B.png" alt="Event" width="900">
</p>

## Observations

* power is _way_ too high; is DCDC enabled in SW

