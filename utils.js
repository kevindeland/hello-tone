/**
 * Returns array of notes
 */
function octaveBassline(note) {
  return [0,1,2,3,4,5,6,7].map(n => {
      return {"time": n*dt, "note": `${note}${ n%2 === 0 ? 2 : 3}`, "velocity":0.9}
  });
}

function initAudioNodes() {

  const opts1 = {
    oscillator : {
        volume: 5,
        count: 3,
        spread: 40,
        type : "fatsawtooth"
    }
  };

  const opts2 = {
      oscillator: { type: "triangle" }
  };

  const opts3 = {
      
  };

  bass = new Tone.Synth().toMaster()
  melody = new Tone.Synth(opts1).toMaster();

}