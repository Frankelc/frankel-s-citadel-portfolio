type HowlInstance = {
  play: () => number;
  stop: () => unknown;
  pause: () => unknown;
  fade: (from: number, to: number, duration: number) => unknown;
};

export type BoardAudio = {
  boot: () => void;
  relay: () => void;
  servo: () => void;
  startFan: () => void;
  stopAll: () => void;
};

export async function createBoardAudio(): Promise<BoardAudio> {
  const { Howl } = await import("howler");
  const boot = new Howl({ src: ["/sounds/boot-beep.wav"], volume: 0.38 }) as HowlInstance;
  const relay = new Howl({ src: ["/sounds/relay.wav"], volume: 0.42 }) as HowlInstance;
  const servo = new Howl({ src: ["/sounds/servo.wav"], volume: 0.28 }) as HowlInstance;
  const fan = new Howl({ src: ["/sounds/fan.wav"], loop: true, volume: 0 }) as HowlInstance;

  return {
    boot: () => boot.play(),
    relay: () => relay.play(),
    servo: () => servo.play(),
    startFan: () => {
      fan.play();
      fan.fade(0, 0.14, 900);
    },
    stopAll: () => {
      boot.stop();
      relay.stop();
      servo.stop();
      fan.fade(0.14, 0, 280);
      window.setTimeout(() => fan.stop(), 300);
    },
  };
}
