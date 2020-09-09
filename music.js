/**
 * https://www.devbridge.com/articles/tonejs-coding-music-production-guide/
 * https://tonejs.github.io/docs/13.8.25/PolySynth
 * https://www.guitarland.com/MusicTheoryWithToneJS/PlayChords.html
 */


const addOctaveNumbers = (scale, octaveNumber) => scale.map(note => {
    const firstOctaveNoteIndex = scale.indexOf('C') !== -1 ? scale.indexOf('C') : scale.indexOf('C#')
    const noteOctaveNumber = scale.indexOf(note) < firstOctaveNoteIndex ? octaveNumber - 1 : octaveNumber;
    return `${note}${noteOctaveNumber}`
});

const constructMajorChord = (scale, octave, rootNote) => {
    const scaleWithOctave = addOctaveNumbers(scale, octave);

    const getNextChordNote = (note, nextNoteNumber) => {
        const nextNoteInScaleIndex = scaleWithOctave.indexOf(note) + nextNoteNumber - 1;
        let nextNote;
        if (typeof(scaleWithOctave[nextNoteInScaleIndex]) !== 'undefined') {
            nextNote = scaleWithOctave[nextNoteInScaleIndex];
        } else {
            nextNote = scaleWithOctave[nextNoteInScaleIndex - 7];
            const updatedOctave = parseInt(nextNote.slice(1)) + 1;
            nextNote = `${nextNote.slice(0,1)}${updatedOctave}`;
        }

        return nextNote;
    }

    const thirdNote = getNextChordNote(rootNote, 3);
    const fifthNote = getNextChordNote(rootNote, 5);
    const chord = [rootNote, thirdNote, fifthNote];

    return chord;
}

window.onload = function() {


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

    const bass = new Tone.Synth().toMaster()
    const melody = new Tone.Synth(opts1).toMaster();

    
    const AMinorScale = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    const AMinorScaleWithOctave = addOctaveNumbers(AMinorScale, 4);

    document.getElementById("play-button").addEventListener("click", function() {

        // synth.triggerAttackRelease('C4', '8n')

        AMinorScaleWithOctave.forEach((note, index) => {
            // synth.triggerAttackRelease(note, '4n', (index)*0.5 + 1)
        });

        if (Tone.Transport.state !== 'started') {
            Tone.Transport.start();
        } else {
            Tone.Transport.stop();
        }

        const IChord = constructMajorChord(AMinorScale, 4, 'A3');
        console.log(IChord);

        const dt = 0.2;

        /**
         * Returns array of notes
         */
        function octaveBassline(note) {
            return [0,1,2,3,4,5,6,7].map(n => {
                return {"time": n*dt, "note": `${note}${ n%2 === 0 ? 2 : 3}`, "velocity":0.9}
            });
        }
        
        const p1 = new Tone.Part(function(time, note) {
            bass.triggerAttackRelease(note.note, "8n", time, note.velocity);
        }, octaveBassline('D'));

        
        const p2 = new Tone.Part(function(time, note) {
            bass.triggerAttackRelease(note.note, "8n", time, note.velocity);
        }, octaveBassline('F#'));


        console.log('ayy lmao');

        const p3 = new Tone.Part(function(time, note) {
            bass.triggerAttackRelease(note.note, "8n", time, note.velocity);
        }, octaveBassline('B'));
        

        const p4 = new Tone.Part(function(time, note) {
            bass.triggerAttackRelease(note.note, "8n", time, note.velocity);
        }, octaveBassline('G'));

        
        const moct = 4;

        const m1 = new Tone.Part(function(time, note) {
            console.log(note);
            console.log(time);
            melody.triggerAttackRelease(note.note, note.dur, time, 0.9);
        }, [
            // measure 1
            {"time": (0+0)*dt, "note": `F#${moct}`, dur: "2n"},
            {"time": (0+4)*dt, "note": `F#${moct}`, dur: "4n"},
            {"time": (0+6)*dt, "note": `F#${moct}`, dur: "8n"},
            {"time": (0+7)*dt, "note": `D${moct+1}`, dur: "8n"},

            // measure 2
            {"time": (8+0)*dt, "note": `C#${moct+1}`, dur: "2n"},
            {"time": (8+4)*dt, "note": `C#${moct+1}`, dur: "4n"},
            {"time": (8+6)*dt, "note": `C#${moct+1}`, dur: "8n"},
            {"time": (8+7)*dt, "note": `D${moct+1}`, dur: "8n"},

            // measure 2
            {"time": (16+0)*dt, "note": "B4", dur: "2n"},
            {"time": (16+4)*dt, "note": "B4", dur: "4n"},
            {"time": (16+6)*dt, "note": "B4", dur: "8n"},
            {"time": (16+7)*dt, "note": "A4", dur: "8n"},

            // measure 4
            {"time": (24+0)*dt, "note": "B4", dur: "4n"},
            {"time": (24+2)*dt, "note": "B4", dur: "4n"},
            {"time": (24+4)*dt, "note": "B4", dur: "8n"},
            {"time": (24+5)*dt, "note": "A4", dur: "8n"},
            {"time": (24+6)*dt, "note": "B4", dur: "8n"},
            {"time": (24+7)*dt, "note": "A4", dur: "8n"}
            
        ]);

        const m2 = new Tone.Part(function(time, note) {
            melody.triggerAttackRelease(note.note, note.dur, time, 0.9);
        }, [
            {"time": (0+0)*dt, "note": `F#${moct}`, dur: "2n"}
        ]);

        p1.start(0*8*dt);
        p1.stop(1*8*dt);
        
        p2.start(1*8*dt);
        p2.stop(2*8*dt);
        
        p3.start(2*8*dt);
        p3.stop(3*8*dt);
        
        p4.start(3*8*dt);
        p4.stop(4*8*dt);

        m1.start(0*8*dt);
        m1.stop(4*8*dt);


        p1.start(4*8*dt);
        p2.start(5*8*dt);
        p3.start(6*8*dt);
        p4.start(7*8*dt);

        m1.start(4*8*dt);
        m1.stop(8*8*dt);

        m2.start(8*8*dt);
        
    });
};
