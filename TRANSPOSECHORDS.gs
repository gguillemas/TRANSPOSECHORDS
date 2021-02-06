/*
Copyright 2020 Gerard Guillemas Martos

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

function TRANSPOSECHORDS(chords, semitones) {
  // We only allow transposing of up to 11 semitones.
  if(semitones == null || Math.abs(semitones)>11){
          throw new Error("You must specify a number of semitones to transpose between -11 and 11.");
  }
  
  // We only allow transposing chords with a single type of accidental.
  if(chords.indexOf("b")>-1 && chords.indexOf("#")>-1) {
    throw new Error("It is not possible to transpose chords with both flats and sharps.");
  }
  
  // We define the list of notes for keys with flat and sharp accidentals.
  var notes= {
    "b": ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
    "#": ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
  };
  
  // First we determine if the key has sharps or flats.
  // Accidentals will be 0 if the key has no accidentals, 1 if it has flats and 2 if it has sharps.
  var key_accidental = "";
  if(chords.indexOf("b")>-1) {
    key_accidental = "b";
  } else if(chords.indexOf("#")>-1) {
    key_accidental = "#";
  } else {
    Logger.log("Key has no accidentals, considering transposed key.");
    if(semitones < 0) {
      key_accidental = "b";
    } else {
      key_accidental = "#";
    }
  }
  
  Logger.log("Key accidental identified: " + key_accidental);
  Logger.log("Key accidental notes: " + notes[key_accidental]);

  for(var i = 0; i<chords.length; i++) {
    var chord_note = "";
    // If character is between A and G in their ASCII values.
    if(chords.charCodeAt(i) >= 65 && chords.charCodeAt(i) <= 71) {
      chord_note = chords.charAt(i);
      // If following character is an accidental symbol, add it to the chord.
      if(key_accidental != "" && chords.charAt(i+1) == key_accidental) {
        chord_note += chords.charAt(i+1);
      }
      
      Logger.log("Chord note identified: " + chord_note);
      
      var transposed_chord_note = "";
      // TODO: Do not assume the accidental symbol is still the same after key change.
      for(var j = 0; j<notes[key_accidental].length; j++) {
        if(chord_note == notes[key_accidental][j]) {
          transposed_chord_note = notes[key_accidental][(notes[key_accidental].length+j+semitones) % notes[key_accidental].length];
          break;
        }
      }
              
      if(transposed_chord_note == "") {
        throw new Error("Failed to transpose note: " + chord_note);
        return chords
      }
      
      Logger.log("Chord note transposed: " + transposed_chord_note);
      
      // Replace old note for new note.
      chords = chords.substring(0, i) + transposed_chord_note + chords.substring(i + chord_note.length);
    }
  }
  
  return chords
}
