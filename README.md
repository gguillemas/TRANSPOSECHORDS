# TRANSPOSECHORDS

TRANSPOSECHORDS is a Google Sheets function to transpose chord symbols by a number of semitones.

## Usage

To use this function in your own sheets, follow the instructions [here](https://developers.google.com/apps-script/guides/sheets/functions#creating_a_custom_function) and copy the code in the `TRANSPOSECHORDS.gs` file.

## Examples

Formula | Output
--- | ---
`=TRANSPOSECHORDS("C G Am F", 7)` | G D Em C
`=TRANSPOSECHORDS("C G Am F", -2)` | Bb F Gm Eb
`=TRANSPOSECHORDS("C G Am F", 3)` | D# A# Cm G#
`=TRANSPOSECHORDS("Gmaj7 Dm7 Cmaj7 Ebmaj7", 1)` | Abmaj7 Ebm7 Dbmaj7 Emaj7
`=TRANSPOSECHORDS("G/B C Em Gmaj7/D", -1)` | Gb/Bb B Ebm Gbmaj7/Db *

\* This is an example of the limitations described below, where `B` should be notated as `Cb`.

## Limitations

This function was developed for my own personal use and has some known limitations:

- Does not guess the key, it will assume that no accidentals in the chords means no accidentals in the key.
- Does not transpose each chord in relation to the key, so chords may be notated as enharmonic equivalents.
- Does not change the accidental when transposing from a key with sharps to a key with flats and vice versa.
- Does not identify and process double accidentals such as double-sharps or double-flats.

Note that most of those limitations do not affect the playability of the resulting chords, just the notational correction.
