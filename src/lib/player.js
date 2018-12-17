// import * as app from './app';

class audioPlayer {
  constructor(options) {
    const mergedOptions = {
      playbackRate: 1,
      volume: 1,
      muted: false,
      ...options,
    };

    this.audio = new Audio();

    this.audio.defaultPlaybackRate = mergedOptions.playbackRate;
    this.audio.playbackRate = mergedOptions.playbackRate;
    this.audio.volume = mergedOptions.volume;
    this.audio.muted = mergedOptions.muted;

    this.threshold = 0.75;
    this.durationThresholdReached = false;


    // stuff for visualizer
    // http://ianreah.com/2013/02/28/Real-time-analysis-of-streaming-audio-data-with-Web-Audio-API.html
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyserPlayer = this.audioCtx.createAnalyser();


    this.sourceAudio = this.audioCtx.createMediaElementSource(this.audio);
    this.sourceAudio.connect(this.analyserPlayer);
    this.sourceAudio.connect(this.audioCtx.destination);
  }

  getAnalyser() {
    return this.analyserPlayer;
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
  }

  mute() {
    this.audio.muted = true;
  }

  unmute() {
    this.audio.muted = false;
  }

  getAudio() {
    return this.audio;
  }

  getCurrentTime() {
    return this.audio.currentTime;
  }

  getVolume() {
    return this.audio.volume;
  }

  getSrc() {
    return this.audio.src;
  }

  setAudioVolume(volume) {
    this.audio.volume = volume;
  }

  setAudioPlaybackRate(playbackRate) {
    this.audio.playbackRate = playbackRate;
    this.audio.defaultPlaybackRate = playbackRate;
  }

  setAudioSrc(src) {
    // When we change song, need to update the thresholdReached indicator.
    this.durationThresholdReached = false;
    this.audio.src = src;
  }

  setAudioCurrentTime(currentTime) {
    this.audio.currentTime = currentTime;
  }

  isMuted() {
    return this.audio.muted;
  }

  isPaused() {
    return this.audio.paused;
  }

  isThresholdReached() {
    if (!this.durationThresholdReached && this.audio.currentTime >= this.audio.duration * this.threshold) {
      this.durationThresholdReached = true;
    }

    return this.durationThresholdReached;
  }

  changeFftSize(size) {
    this.analyserPlayer.fftSize = size;
  }
}

export default new audioPlayer({
  // volume: app.config.get('audioVolume'),
  // playbackRate: app.config.get('audioPlaybackRate'),
  // muted: app.config.get('audioMuted'),
});
