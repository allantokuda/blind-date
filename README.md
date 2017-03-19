# blind-date

A JavaScript library for smart interpretation of text into dates, based on assumptions:
- A specific date format presented to the user such as `mm/dd/yyyy`
- The user may want to enter a two-digit year for convenience, and when doing so, the year is assumed to be within the last 100 years.
- Some users on mobile devices such as iPhone may not have the necessary divider key (e.g. '/') available on their numeric keypad and would prefer to only enter numeric digits.

The provided function returns suggestions to allow the user to pick which one they meant, in cases where it is ambiguous. For example, '12317' could mean January 23, 2017, or it could mean December 3, 2017.

## Development

```
$ npm install
$ karma start
```
