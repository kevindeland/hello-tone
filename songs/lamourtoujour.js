
const dt = 0.2;

// The melody octave
const moct = 4;

const melodyP1 = new Tone.Part(function(time, note) {
    console.log(note);
    console.log(time);
    melody.triggerAttackRelease(note.note, note.dur, time, 0.9);
}, [
    // measure 1
    {"time": (0+0)*dt, "note": `F#${moct}`, dur: "8n"},
    {"time": (0+4)*dt, "note": `F#${moct}`, dur: "8n"},
    {"time": (0+6)*dt, "note": `F#${moct}`, dur: "8n"},
    {"time": (0+7)*dt, "note": `D${moct+1}`, dur: "8n"},

    // measure 2
    {"time": (8+0)*dt, "note": `C#${moct+1}`, dur: "8n"},
    {"time": (8+4)*dt, "note": `C#${moct+1}`, dur: "8n"},
    {"time": (8+6)*dt, "note": `C#${moct+1}`, dur: "8n"},
    {"time": (8+7)*dt, "note": `D${moct+1}`, dur: "8n"},

    // measure 2
    {"time": (16+0)*dt, "note": "B4", dur: "8n"},
    {"time": (16+4)*dt, "note": "B4", dur: "8n"},
    {"time": (16+6)*dt, "note": "B4", dur: "8n"},
    {"time": (16+7)*dt, "note": "A4", dur: "8n"},

    // measure 4
    {"time": (24+0)*dt, "note": "B4", dur: "8n"},
    {"time": (24+2)*dt, "note": "B4", dur: "8n"},
    {"time": (24+4)*dt, "note": "B4", dur: "8n"},
    {"time": (24+5)*dt, "note": "A4", dur: "8n"},
    {"time": (24+6)*dt, "note": "B4", dur: "8n"},
    {"time": (24+7)*dt, "note": "A4", dur: "8n"}
    
]);

const melodyP2 = new Tone.Part(function(time, note) {
    melody.triggerAttackRelease(note.note, note.dur, time, 0.9);
}, [
    {"time": (0+0)*dt, "note": `F#${moct}`, dur: "8n"}
]);


const bassP1 = new Tone.Part(function(time, note) {
  bass.triggerAttackRelease(note.note, "8n", time, note.velocity);
}, octaveBassline('D'));


const bassP2 = new Tone.Part(function(time, note) {
  bass.triggerAttackRelease(note.note, "8n", time, note.velocity);
}, octaveBassline('F#'));


console.log('ayy lmao');

const bassP3 = new Tone.Part(function(time, note) {
  bass.triggerAttackRelease(note.note, "8n", time, note.velocity);
}, octaveBassline('B'));


const bassP4 = new Tone.Part(function(time, note) {
  bass.triggerAttackRelease(note.note, "8n", time, note.velocity);
}, octaveBassline('G'));


function playSong() {
  // Need to stop one before starting another,
  // because they use the same AudioNode (do we?)
  bassP1.start(0*8*dt);
  bassP1.stop(1*8*dt);
  
  bassP2.start(1*8*dt);
  bassP2.stop(2*8*dt);
  
  bassP3.start(2*8*dt);
  bassP3.stop(3*8*dt);
  
  bassP4.start(3*8*dt);
  bassP4.stop(4*8*dt);

  melodyP1.start(0*8*dt);
  melodyP1.stop(4*8*dt);


  bassP1.start(4*8*dt);
  bassP2.start(5*8*dt);
  bassP3.start(6*8*dt);
  bassP4.start(7*8*dt);

  melodyP1.start(4*8*dt);
  melodyP1.stop(8*8*dt);

  melodyP2.start(8*8*dt);
}