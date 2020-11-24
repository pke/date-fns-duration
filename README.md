# data-fns-duration

Complementary package for `date-fns` to add/subtract ISO 8601 durations to/from
dates.

## Installation

Install it alongside `date-fns`

`npm i -S date-fns-duration`

## API

```js

import addDuration from 'date-fns-duration';

// addDuration(date, duration);

// Add duration
const two_hours_from_now = addDuration(Date.now(), "PT2H");

// Subtract duration
const month_before = addDuration("2018-10-02T10:00", "-P1M");

```
