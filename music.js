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

    const lowPass = new Tone.Filter({
        frequency: 8000,
    }).toMaster();

    const snare = new Tone.NoiseSynth({
        volume: 5,
        noise: {
            type: 'white',
            playbackRate: 3,
        },
        envelope: {
            attack: 0.001,
            decay: 0.20,
            sustain: 0.15,
            release: 0.03,
        },
    }).connect(lowPass);

    
    const AMinorScale = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    const AMinorScaleWithOctave = addOctaveNumbers(AMinorScale, 4);

    initAudioNodes();

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

        playSong();
        
    });
};
